import { useState } from "react";
import { FiArrowLeft, FiUploadCloud, FiX } from "react-icons/fi";

import { Link, useParams } from "react-router-dom";
import "./produto.css";

import { db, storage } from "../../services/firebase";
import {

  doc,
  setDoc,
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


    const formatarMoeda = (valor: string) => {
  const numeros = valor.replace(/\D/g, "");

  const valorNumero = Number(numeros) / 100;

  return valorNumero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

  const [estoque, setEstoque] = useState("");

  const [marca, setMarca] = useState("");
  const [peso, setPeso] = useState("");
  const [sku, setSku] = useState("");

  const [imagens, setImagens] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);


  const [toast, setToast] = useState({
  texto: "",
  tipo: "success",
});


const mostrarToast = (
  msg: string,
  tipo: "success" | "warning" | "error" = "success"
) => {
  setToast({ texto: msg, tipo });

  setTimeout(() => {
    setToast({ texto: "", tipo: "success" });
  }, 3000);
};

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

const removerImagem = (index: number) => {
  setPreviews(prev => prev.filter((_, i) => i !== index));
  setImagens(prev => prev.filter((_, i) => i !== index));
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
      mostrarToast("Informe o nome do produto", "warning");

      return;
    }

    
    try {

      const nomeBase = nome
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-")
  .replace(/[^\w-]+/g, "");

const produtoId = `${nomeBase}-${Date.now()}`;

      let urlsImagens: string[] = [];

      /* ===== upload imagens ===== */
      for (const file of imagens) {
        const imgRef = ref(
  storage,
  `lojas/${lojaId}/produtos/${produtoId}/${file.name}`
);


        await uploadBytes(imgRef, file);

        const url = await getDownloadURL(imgRef);
        urlsImagens.push(url);
      }

      /* ===== salvar firestore ===== */
     await setDoc(
  doc(db, "lojas", lojaId, "produtos", produtoId),
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

      mostrarToast("Produto salvo com sucesso!", "success");

      limparFormulario();
    } catch (error) {
      console.error(error);
      mostrarToast("Erro ao salvar produto", "error");

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
  <div key={i} className="preview-wrapper">
    <img
      src={img}
      alt=""
      className="preview-img"
    />

    <button
      className="preview-remove"
      onClick={() => removerImagem(i)}
    >
      <FiX size={14} />
    </button>
  </div>
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
  onChange={(e) =>
    setPreco(formatarMoeda(e.target.value))
  }
/>

          </div>

          <div className="field">
            <label>Preço promocional</label>
           <input
  value={precoPromo}
  onChange={(e) =>
    setPrecoPromo(formatarMoeda(e.target.value))
  }
/>

          </div>

          <div className="field">
            <label>Estoque</label>
            <input
  inputMode="numeric"
  pattern="[0-9]*"
  value={estoque}
  onChange={(e) =>
    setEstoque(e.target.value.replace(/\D/g, ""))
  }
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


      {toast.texto && (
  <div className={`toast toast-${toast.tipo}`}>
    {toast.texto}
  </div>
)}

    </div>
  );
}
