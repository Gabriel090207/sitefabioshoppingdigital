import { useState, useEffect } from "react";
import { FiArrowLeft, FiUploadCloud, FiX } from "react-icons/fi";

import { Link, useParams, useNavigate } from "react-router-dom";

import "./produto.css";

import { db, storage } from "../../services/firebase";
import {
  doc,
  
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";


import {
  ref,
  uploadBytes,
  getDownloadURL,

} from "firebase/storage";

export default function EditarProduto() {

 const { lojaId, produtoId } = useParams();
const navigate = useNavigate();


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


  const [imagensExistentes, setImagensExistentes] = useState<string[]>([]);


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


const formatarMoeda = (valor: string) => {
  const numeros = valor.replace(/\D/g, "");

  const valorNumero = Number(numeros) / 100;

  return valorNumero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
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

 


  /* ======================
     SALVAR PRODUTO
  ====================== */

 const salvarProduto = async () => {
  if (!lojaId || !produtoId) return;


    if (!nome.trim()) {
     mostrarToast("Informe o nome do produto", "warning");

      return;
    }

    
    try {


      let urlsImagens: string[] = [...imagensExistentes];


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
    await updateDoc(

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

   mostrarToast("Produto atualizado com sucesso!", "success");

navigate(`/lojas/${lojaId}/produtos`);

    } catch (error) {
      console.error(error);
      mostrarToast("Erro ao salvar produto", "error");

    }
  };



  useEffect(() => {
  const carregarProduto = async () => {
    if (!lojaId || !produtoId) return;

    const snap = await getDoc(
      doc(db, "lojas", lojaId, "produtos", produtoId)
    );

    if (!snap.exists()) return;

    const data = snap.data();

    setNome(data.nome || "");
    setCategoria(data.categoria || "");
    setDescricao(data.descricao || "");

    setPreco(data.preco || "");
    setPrecoPromo(data.precoPromocional || "");
    setEstoque(data.estoque || "");

    setMarca(data.marca || "");
    setPeso(data.peso || "");
    setSku(data.sku || "");

   setImagensExistentes(data.imagens || []);
setPreviews(data.imagens || []);

  };

  carregarProduto();
}, [lojaId, produtoId]);


   

  return (
    <div className="produto-page">
      {/* ===== TOPO ===== */}
      <div className="produto-header">
       <Link
  to={`/lojas/${lojaId}/produtos`}
  className="back-button"
>

          <FiArrowLeft />
          Voltar para Produtos
        </Link>

        <h1>Editar Produto</h1>
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
    onClick={() => {
      setPreviews(prev => prev.filter((_, index) => index !== i));
      setImagensExistentes(prev => prev.filter((_, index) => index !== i));
    }}
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
  value={precoPromo}
   onChange={(e) =>
    setPrecoPromo(formatarMoeda(e.target.value))
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
          Salvar Alterações
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
