import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiSend,

} from "react-icons/fi";
import "./sidebar.css";

interface SidebarProps {
  menuOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ menuOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FiHome className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/lojas"
            end
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FiShoppingBag className="sidebar-icon" />
            <span>Lojas</span>
          </NavLink>

          <NavLink
            to="/lojas/criar"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FiSend className="sidebar-icon" />
            <span>Criar Loja</span>
          </NavLink>

         
          
        </nav>
      </aside>
    </>
  );
}
