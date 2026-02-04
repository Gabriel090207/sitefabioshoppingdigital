import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./visualizarLoja.css";

import { useEffect, useState } from "react";

import { db } from "../../services/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import ProductCard from "../../components/ProductCard/ProductCard";

export default function VisualizarLoja() {
  const { lojaId } = useParams();

  const [loja, setLoja] = useState<any>(null);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarLoja() {
      if (!lojaId) return;

      try {
        /* ===== BUSCAR LOJA ===== */
        const docRef = doc(db, "lojas", lojaId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("Loja não encontrada");
          setLoading(false);
          return;
        }

        setLoja(docSnap.data());

        /* ===== BUSCAR PRODUTOS ===== */
        const produtosRef = collection(
          db,
          "lojas",
          lojaId,
          "produtos"
        );

        const produtosSnap = await getDocs(produtosRef);

        const listaProdutos: any[] = [];

        produtosSnap.forEach((docItem) => {
          const data: any = docItem.data();

          /* converte preço string -> número */
          const parsePrice = (value: any) => {
  if (!value) return 0;

  if (typeof value === "number") return value;

  let cleaned = String(value).replace(/[^\d.,-]/g, "");

  if (cleaned.includes(",")) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  }

  const number = Number(cleaned);
  return isNaN(number) ? 0 : number;
};

const preco = parsePrice(data.preco);
const precoPromo = parsePrice(data.precoPromocional);


          listaProdutos.push({
            id: docItem.id,

            name: data.nome || "Produto",
            price: precoPromo > 0 ? precoPromo : preco,
oldPrice: precoPromo > 0 ? preco : undefined,

            /* pega primeira imagem */
            image:
              Array.isArray(data.imagens) && data.imagens.length > 0
                ? data.imagens[0]
                : "",

            rating: data.rating || 0,
          });
        });

        setProdutos(listaProdutos);
      } catch (error) {
        console.error("Erro ao buscar loja:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarLoja();
  }, [lojaId]);

  if (loading) {
    return <div>Carregando loja...</div>;
  }

  if (!loja) {
    return <div>Loja não encontrada.</div>;
  }

  return (
    <div className="store-page">
      {/* VOLTAR */}
      <div className="store-back">
        <Link to="/lojas" className="back-button">
          <FiArrowLeft />
          Voltar para lojas
        </Link>
      </div>

      {/* BANNER */}
      <div className="store-cover">
        <img
          src={loja?.imagens?.banner || ""}
          alt="Banner da loja"
        />
      </div>

      {/* HEADER */}
      <div className="store-header">
        <div className="store-header-inner">
          <img
            src={loja?.imagens?.perfil || ""}
            alt="Logo da loja"
            className="store-avatar"
          />

          <div className="store-info">
            <h1>{loja?.nome}</h1>

            <span className="store-meta">
              {loja?.categoria} •{" "}
              {loja?.endereco?.bairro} -{" "}
              {loja?.endereco?.cidade}/
              {loja?.endereco?.estado} • Atende:{" "}
              {loja?.atendimento?.area}
            </span>
          </div>
        </div>
      </div>

      {/* PRODUTOS */}
      <div className="store-products">
        <div className="store-products-inner">
          <div className="store-products-grid">
            {produtos.length === 0 && (
              <p>Esta loja ainda não possui produtos.</p>
            )}

            {produtos.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
              
                rating={product.rating}
                store={loja.nome}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
