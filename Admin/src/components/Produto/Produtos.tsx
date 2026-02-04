import { useState, useEffect } from "react";
import {
  FiMoreVertical,
  FiSearch,
  FiArrowLeft,
} from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import "./produtos.css";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

import { db } from "../../services/firebase";

export default function Produtos() {
  const { lojaId } = useParams();

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [nomeLoja, setNomeLoja] = useState("");

  /* ======================
     CARREGAR PRODUTOS
  ====================== */

  useEffect(() => {
    if (!lojaId) return;

    const carregar = async () => {


      // buscar dados da loja
const lojaSnap = await getDocs(
  collection(db, "lojas")
);

lojaSnap.forEach((docSnap) => {
  if (docSnap.id === lojaId) {
    setNomeLoja(docSnap.data().nome || "");
  }
});

      const snapshot = await getDocs(
        collection(db, "lojas", lojaId, "produtos")
      );

      const lista: any[] = [];

      snapshot.forEach((docSnap) => {
        lista.push({
          id: docSnap.id,
          ...docSnap.data(),
        });
      });

      setProdutos(lista);
    };

    carregar();
  }, [lojaId]);

  /* ======================
     EXCLUIR PRODUTO
  ====================== */

  const excluirProduto = async (produtoId: string) => {
    if (!lojaId) return;

    const confirmar = confirm("Excluir produto?");
    if (!confirmar) return;

    await deleteDoc(
      doc(db, "lojas", lojaId, "produtos", produtoId)
    );

    setProdutos((prev) =>
      prev.filter((p) => p.id !== produtoId)
    );
  };

  /* ======================
     DUPLICAR PRODUTO
  ====================== */

  const duplicarProduto = async (produto: any) => {
    if (!lojaId) return;

    const novo = {
      ...produto,
      nome: produto.nome + " (cópia)",
    };

    delete novo.id;

    await addDoc(
      collection(db, "lojas", lojaId, "produtos"),
      novo
    );

    alert("Produto duplicado!");

    // recarrega lista
    const snapshot = await getDocs(
      collection(db, "lojas", lojaId, "produtos")
    );

    const lista: any[] = [];

    snapshot.forEach((docSnap) => {
      lista.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });

    setProdutos(lista);
  };

  return (
    <div className="produtos-page">
      {/* HEADER */}
      <div className="produtos-header">
        <Link to="/lojas" className="back-button">
          <FiArrowLeft />
          Voltar para lojas
        </Link>

       <h1>
  Produtos da Loja {nomeLoja && `- ${nomeLoja}`}
</h1>

      </div>

      {/* AÇÕES */}
      <div className="produtos-actions">
        <div className="search-box">
          <FiSearch />
          <input placeholder="Buscar produto..." />
        </div>

        <Link to={`/lojas/${lojaId}/produtos/adicionar`}>
          <button className="button-produto">
            Novo Produto
          </button>
        </Link>
      </div>

      {/* LISTA */}
      <div className="produtos-grid">
        {produtos.map((produto, index) => (
          <div key={produto.id} className="produto-card">
            <div className="produto-info">
              <div className="produto-img">
                {produto.imagens?.[0] && (
                  <img
                    src={produto.imagens[0]}
                    alt=""
                  />
                )}
              </div>

              <div>
                <strong>{produto.nome}</strong>
                <span>{produto.categoria}</span>
                <p>R$ {produto.preco}</p>
              </div>
            </div>

            <div className="loja-actions">
              <FiMoreVertical
                onClick={() =>
                  setOpenMenu(
                    openMenu === index ? null : index
                  )
                }
              />

              {openMenu === index && (
                <div className="dropdown">
                  <button>
                    Editar produto
                  </button>

                  <button
                    onClick={() =>
                      duplicarProduto(produto)
                    }
                  >
                    Duplicar
                  </button>

                  <button
                    onClick={() =>
                      excluirProduto(produto.id)
                    }
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
