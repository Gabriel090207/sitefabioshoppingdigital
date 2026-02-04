import { useState } from "react";
import { FiArrowLeft, FiUploadCloud } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import "./produto.css";

import { db, storage } from "../../services/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function AdicionarProduto() {
  const { lojaId } = useParams();

  /* ======================
     STATES
  ====================== */

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");

  const [preco, setPreco] = useState("");
  const [precoPromo, setPrecoPromo] = useState("");
  const [estoque, setEstoque] = useState("");

  const [marca, setMarca] = useState("");
  const [peso, setPeso] = useState("");
  const [sku, setSku] = useState("");

  const [imagens, setImagens] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  /* ======================
     PREVIEW IMAGENS
  ====================== */

  const handleImagens = (files: FileList | null) => {
    if (!files) return;

    const lista = Array.from(files);

    setImagens(lista);

    const previewsGeradas = lista.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(previewsGeradas);
  };

  /* ======================
     LIMPAR FORM
  ====================== */

  const limparFormulario = () => {
    setNome("");
    setCategoria("");
    setDescricao("");

    setPreco("");
    setPrecoPromo("");
    setEstoque("");

    setMarca("");
    setPeso("");
    setSku("");

    setImagens([]);
    setPreviews([]);
  };

  /* ======================
     SALVAR PRODUTO
  ====================== */

  const salvarProduto = async () => {
    if (!lojaId) return;

    if (!nome.trim()) {
      alert("Informe o nome do produto");
      return;
    }

    try {
      let urlsImagens: string[] = [];

      /* ===== upload imagens ===== */
      for (const file of imagens) {
        const imgRef = ref(
          storage,
          `lojas/${lojaId}/produtos/${Date.now()}-${file.name}`
        );

        await uploadBytes(imgRef, file);

        const url = await getDownloadURL(imgRef);
        urlsImagens.push(url);
      }

      /* ===== salvar firestore ===== */
      await addDoc(
        collection(db, "lojas", lojaId, "produtos"),
        {
          nome,
          categoria,
          descricao,

          preco,
          precoPromocional: precoPromo,
          estoque,

          marca,
          peso,
          sku,

          imagens: urlsImagens,

          ativo: true,
          criadoEm: serverTimestamp(),
        }
      );

      alert("Produto salvo com sucesso!");
      limparFormulario();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar produto");
    }
  };

  return (
    <div className="produto-page">
      {/* ===== TOPO ===== */}
      <div className="produto-header">
        <Link to="/lojas" className="back-button">
          <FiArrowLeft />
          Voltar para lojas
        </Link>

        <h1>Adicionar Produto</h1>
      </div>

      {/* ===== INFO ===== */}
      <section className="card">
        <h2>Informações básicas</h2>

        <div className="grid">
          <div className="field">
            <label>Nome do produto</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Categoria</label>
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
      </section>

      {/* ===== IMAGENS ===== */}
      <section className="card">
        <h2>Imagens do produto</h2>

        <div className="upload-area">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImagens(e.target.files)}
          />

          <div className="upload-content">
            <FiUploadCloud className="upload-icon" />
            <strong>Enviar imagens</strong>
          </div>
        </div>

        {previews.length > 0 && (
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {previews.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                style={{ width: 90, borderRadius: 8 }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ===== PREÇO ===== */}
      <section className="card">
        <h2>Preço e estoque</h2>

        <div className="grid">
          <div className="field">
            <label>Preço</label>
            <input
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Preço promocional</label>
            <input
              value={precoPromo}
              onChange={(e) => setPrecoPromo(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Estoque</label>
            <input
              type="number"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ===== DETALHES ===== */}
      <section className="card">
        <h2>Detalhes</h2>

        <div className="grid">
          <div className="field">
            <label>Marca</label>
            <input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Peso / Volume</label>
            <input
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>

          <div className="field">
            <label>SKU</label>
            <input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ===== SALVAR ===== */}
      <div className="actions">
        <button
          className="button-primary"
          onClick={salvarProduto}
        >
          Salvar Produto
        </button>
      </div>
    </div>
  );
}
