import { Link } from "react-router-dom";
import "./dashboard.css";

import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [totalLojas, setTotalLojas] = useState(0);
  
  const [nichosRanking, setNichosRanking] = useState<any[]>([]);
  const [ultimasLojas, setUltimasLojas] = useState<any[]>([]);
  const [nichoTop, setNichoTop] = useState("");

  useEffect(() => {
    async function carregarDados() {
      const snapshot = await getDocs(collection(db, "lojas"));

      const lojas: any[] = [];
      snapshot.forEach((doc) => {
        lojas.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      /* ===== Totais ===== */
      setTotalLojas(lojas.length);

      

      /* ===== Nichos ===== */
      const categorias: any = {};

      lojas.forEach((l) => {
        const cat = l.categoria || "Outros";
        categorias[cat] = (categorias[cat] || 0) + 1;
      });

      const ranking = Object.entries(categorias)
        .map(([nome, total]) => ({ nome, total }))
        .sort((a: any, b: any) => b.total - a.total);

      setNichosRanking(ranking.slice(0, 5));
      setNichoTop(ranking[0]?.nome || "-");

      /* ===== Últimas lojas ===== */
      const ordenadas = lojas
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        })
        .slice(0, 4);

      setUltimasLojas(ordenadas);
    }

    carregarDados();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* CARDS */}
      <div className="dashboard-cards">
        <div className="dash-card">
          <span>Total de lojas</span>
          <strong>{totalLojas}</strong>
        </div>

        <div className="dash-card">
          <span>Nicho com mais lojas</span>
          <strong>{nichoTop}</strong>
        </div>


        
      </div>

      {/* AÇÕES */}
      <section className="dashboard-section">
        <h2>Ações rápidas</h2>

        <div className="quick-actions">
          <Link to="/lojas/criar">
            <button className="primary">
              Cadastrar Loja
            </button>
          </Link>

          <Link to="/lojas">
            <button>Ver Lojas</button>
          </Link>
        </div>
      </section>

      {/* LISTAS */}
      <div className="dashboard-lists">
        {/* Últimas lojas */}
        <section className="list-card">
          <h2>Últimas lojas cadastradas</h2>

          <ul>
            {ultimasLojas.map((loja, i) => (
              <li key={loja.id}>
                {loja.nome}
                <span className="badge">
                  {i + 1}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Nichos */}
        <section className="list-card">
          <h2>Nichos com mais lojas</h2>

          <ul>
            {nichosRanking.map((nicho) => (
              <li key={nicho.nome}>
                {nicho.nome}
                <span className="badge blue">
                  {nicho.total}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
