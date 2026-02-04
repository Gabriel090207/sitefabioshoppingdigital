import { FiBell, FiMenu } from "react-icons/fi";
import "./header.css";

interface HeaderProps {
  onToggleMenu: () => void;
}

export default function Header({ onToggleMenu }: HeaderProps) {

  return (
    <header className="header">
      {/* ESQUERDA */}
      <div className="header-left">
        <FiMenu
          className="menu-mobile"
          onClick={onToggleMenu}
        />

        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">Shopping Digital</span>
      </div>

      {/* DIREITA */}
      <div className="header-right">
        <FiBell className="header-icon" />
        <span className="user-name">Gabriel</span>
        <div className="user-avatar">G</div>
      </div>
    </header>
  );
}
