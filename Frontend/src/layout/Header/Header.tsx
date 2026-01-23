import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

import './Header.css'
import { Link } from 'react-router-dom'


export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="header">
      <div className="header-top">
        <span>Suporte: (+55) 699251-8657</span>
      </div>

     <div className="header-main">

 

  {/* MENU MOBILE */}
  <button
    className="menu-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <FiX /> : <FiMenu />}
  </button>

  {/* LOGO */}
  <div className="logo">Shopping Digital</div>

  {/* BUSCA */}
  <div className="search-box">
    <FiSearch className="search-icon" />
    <input
      type="text"
      placeholder="Buscar produtos ou serviços..."
    />
  </div>

  {/* AÇÕES */}
  <div className="actions">
    <button className="btn-outline">Entrar</button>
    <button className="btn-primary">Cadastrar</button>
  </div>

</div>

     {/* BUSCA MOBILE */}
<div className="mobile-search">
  <FiSearch className="search-icon" />
  <input
    type="text"
    placeholder="Buscar produtos ou serviços..."
  />
</div>



      {/* MENU */}
     <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
  <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
  <Link to="/lojas" onClick={() => setMenuOpen(false)}>Lojas</Link>
  <Link to="/" onClick={() => setMenuOpen(false)}>Serviços</Link>
  <Link to="/" onClick={() => setMenuOpen(false)}>Seja Parceiro</Link>
</nav>

    </header>
  )
}
