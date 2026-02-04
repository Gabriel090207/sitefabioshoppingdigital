import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./layout.css";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
     <Header onToggleMenu={() => setMenuOpen(true)} />


      <Sidebar
        menuOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main id="admin-content" className="content">
  {children}
</main>

    </>
  );
}
