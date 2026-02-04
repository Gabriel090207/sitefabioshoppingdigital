import { Link } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* ===== CARDS TOPO ===== */}
      <div className="dashboard-cards">
        <div className="dash-card">
          <span>Total de lojas</span>
          <strong>128</strong>
        </div>

        <div className="dash-card">
          <span>Nicho com mais lojas</span>
          <strong>Mercados</strong>
        </div>

        <div className="dash-card">
          <span>Lojas ativas</span>
          <strong>112</strong>
        </div>

        <div className="dash-card">
          <span>Lojas pendentes</span>
          <strong>16</strong>
        </div>
      </div>

      {/* ===== AÇÕES ===== */}
      <section className="dashboard-section">
        <h2>Ações rápidas</h2>

        <div className="quick-actions">
          <Link to="/lojas/criar">
            <button className="primary">Cadastrar Loja</button>
          </Link>

          <Link to="/lojas">
            <button>Ver Lojas</button>
          </Link>
        </div>
      </section>

      {/* ===== LISTAS EM CARDS ===== */}
      <div className="dashboard-lists">
        {/* Últimas lojas */}
        <section className="list-card">
          <h2>Últimas lojas cadastradas</h2>

          <ul>
            <li>
              Mercado Central <span className="badge">1</span>
            </li>
            <li>
              Padaria São João <span className="badge">2</span>
            </li>
            <li>
              Farmácia Vida <span className="badge">3</span>
            </li>
            <li>
              Lanchonete Top <span className="badge">4</span>
            </li>
          </ul>
        </section>

        {/* Ranking nichos */}
        <section className="list-card">
          <h2>Nichos com mais lojas</h2>

          <ul>
            <li>
              Mercados <span className="badge blue">32</span>
            </li>
            <li>
              Restaurantes <span className="badge blue">25</span>
            </li>
            <li>
              Padarias <span className="badge blue">18</span>
            </li>
            <li>
              Farmácias <span className="badge blue">14</span>
            </li>
            <li>
              Serviços <span className="badge blue">10</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
