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
  getDoc,
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

  const [mensagem, setMensagem] = useState("");
  const [produtoExcluir, setProdutoExcluir] = useState<any>(null);

  const [busca, setBusca] = useState("");

  const mostrarMensagem = (texto: string) => {
    setMensagem(texto);
    setTimeout(() => setMensagem(""), 2500);
  };

  /* ======================
     FECHAR MENU AO CLICAR FORA
  ====================== */
  useEffect(() => {
    const fechar = () => setOpenMenu(null);
    window.addEventListener("click", fechar);

    return () => window.removeEventListener("click", fechar);
  }, []);

  /* ======================
     CARREGAR PRODUTOS
  ====================== */
  const carregarProdutos = async () => {
    if (!lojaId) return;

    const lojaDoc = await getDoc(doc(db, "lojas", lojaId));

    if (lojaDoc.exists()) {
      setNomeLoja(lojaDoc.data().nome || "");
    }

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

  useEffect(() => {
    carregarProdutos();
  }, [lojaId]);

  /* ======================
     CONFIRMAR EXCLUSÃO
  ====================== */
  const confirmarExclusao = async () => {
    if (!produtoExcluir || !lojaId) return;

    await deleteDoc(
      doc(db, "lojas", lojaId, "produtos", produtoExcluir.id)
    );

    setProdutoExcluir(null);
    mostrarMensagem("Produto excluído!");
    carregarProdutos();
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

    mostrarMensagem("Produto duplicado!");
    setOpenMenu(null);
    carregarProdutos();
  };


  const produtosFiltrados = produtos.filter((produto) => {
  const texto = busca.toLowerCase();

  return (
    produto.nome?.toLowerCase().includes(texto) ||
    produto.categoria?.toLowerCase().includes(texto)
  );
});

  return (
    <div className="produtos-page">
      {/* HEADER */}
      <div className="produtos-header">
        <Link to="/lojas" className="back-button">
          <FiArrowLeft />
          Voltar para lojas
        </Link>

        <h1>
          Produtos da Loja{" "}
          {nomeLoja && `- ${nomeLoja}`}
        </h1>
      </div>

      {/* AÇÕES */}
      <div className="produtos-actions">
        <div className="search-box">
          <FiSearch />
          <input
  placeholder="Buscar produto..."
  value={busca}
  onChange={(e) => setBusca(e.target.value)}
/>

        </div>

        <Link to={`/lojas/${lojaId}/produtos/adicionar`}>
          <button className="button-produto">
            Novo Produto
          </button>
        </Link>
      </div>

      {/* LISTA */}
      <div className="produtos-grid">
        {produtosFiltrados.length === 0 && (
  <p>Nenhum produto encontrado.</p>
)}

      {produtosFiltrados.map((produto, index) => (

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

            <div
              className="loja-actions"
              onClick={(e) => e.stopPropagation()}
            >
              <FiMoreVertical
                onClick={() =>
                  setOpenMenu(
                    openMenu === index ? null : index
                  )
                }
              />

              {openMenu === index && (
                <div className="dropdown">
                  <Link
                    to={`/lojas/${lojaId}/produtos/${produto.id}/editar`}
                  >
                    <button>Editar produto</button>
                  </Link>

                  <button
                    onClick={() =>
                      duplicarProduto(produto)
                    }
                  >
                    Duplicar
                  </button>

                  <button
                    onClick={() => {
                      setProdutoExcluir(produto);
                      setOpenMenu(null);
                    }}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* TOAST */}
      {mensagem && (
        <div className="toast">{mensagem}</div>
      )}

      {/* MODAL EXCLUSÃO */}
      {produtoExcluir && (
        <div
          className="modal-overlay"
          onClick={() => setProdutoExcluir(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Excluir produto</h3>
            <p>
              Deseja realmente excluir{" "}
              <strong>
                {produtoExcluir.nome}
              </strong>
              ?
            </p>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() =>
                  setProdutoExcluir(null)
                }
              >
                Cancelar
              </button>

              <button
                className="btn-delete"
                onClick={confirmarExclusao}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
