import { useState, useEffect, useRef } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import "./lojas.css";
import { Link } from "react-router-dom";

import { db, storage } from "../../services/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  ref,
  listAll,
  deleteObject,
} from "firebase/storage";

export default function Lojas() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [closingMenu, setClosingMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [lojas, setLojas] = useState<any[]>([]);
  const [lojaParaExcluir, setLojaParaExcluir] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  /* ================= MENU ================= */
  const closeMenu = () => {
    if (openMenu !== null) {
      setClosingMenu(openMenu);

      setTimeout(() => {
        setOpenMenu(null);
        setClosingMenu(null);
      }, 180);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  /* ================= CARREGAR LOJAS ================= */
  useEffect(() => {
    const carregarLojas = async () => {
      const snapshot = await getDocs(collection(db, "lojas"));

      const lista: any[] = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setLojas(lista);
    };

    carregarLojas();
  }, []);

  /* ================= EXCLUIR LOJA ================= */
  const excluirLoja = async () => {
    if (!lojaParaExcluir) return;

    try {
      // apagar imagens
      const pastaRef = ref(storage, `lojas/${lojaParaExcluir}`);
      const lista = await listAll(pastaRef);

      await Promise.all(
        lista.items.map((item) => deleteObject(item))
      );

      // apagar documento
      await deleteDoc(doc(db, "lojas", lojaParaExcluir));

      // atualizar lista local
      setLojas((prev) =>
        prev.filter((l) => l.id !== lojaParaExcluir)
      );

      setLojaParaExcluir(null);

      // mostrar toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

    } catch (error) {
      console.error(error);
      alert("Erro ao excluir loja");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="lojas-page">
      <h1>Lojas</h1>

      {/* AÇÕES */}
      <div className="lojas-actions">
        <div className="search-box">
          <FiSearch />
          <input placeholder="Buscar loja..." />
        </div>
      </div>

      {/* LISTA */}
      <div className="lojas-grid">
        {lojas.map((loja, index) => (
          <div key={loja.id} className="loja-card">
            <div className="loja-info">
              <div className="loja-logo">
                {loja.imagens?.perfil && (
                  <img src={loja.imagens.perfil} alt="logo" />
                )}
              </div>

              <div>
                <strong>{loja.nome}</strong>
                <span>{loja.categoria}</span>
              </div>
            </div>

            <div className="loja-actions">
              <FiMoreVertical
                onClick={() =>
                  openMenu === index
                    ? closeMenu()
                    : setOpenMenu(index)
                }
              />

              {(openMenu === index ||
                closingMenu === index) && (
                <div
                  ref={menuRef}
                  className={`dropdown ${
                    closingMenu === index ? "closing" : ""
                  }`}
                >
                  <Link to={`/lojas/${loja.id}`}>
                    <button>Visualizar loja</button>
                  </Link>

                  <Link to={`/lojas/${loja.id}/produtos`}>
                    <button>Ver produtos</button>
                  </Link>

                  <Link
                    to={`/lojas/${loja.id}/produtos/adicionar`}
                  >
                    <button>Adicionar produto</button>
                  </Link>

                  <Link to={`/lojas/${loja.id}/editar`}>
                    <button>Editar loja</button>
                  </Link>

                  <button
                    onClick={() =>
                      setLojaParaExcluir(loja.id)
                    }
                  >
                    Excluir loja
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {lojaParaExcluir && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Excluir loja</h3>
            <p>
              Tem certeza que deseja excluir esta loja?
              <br />
              Essa ação não pode ser desfeita.
            </p>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() =>
                  setLojaParaExcluir(null)
                }
              >
                Cancelar
              </button>

              <button
                className="btn-delete"
                onClick={excluirLoja}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {showToast && (
        <div className="toast">
          Loja excluída com sucesso
        </div>
      )}
    </div>
  );
}
