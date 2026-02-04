import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard";
import Lojas from "./pages/Lojas/lojas";
import CriarLoja from "./pages/criar/criarloja";
import EditarLoja from "./pages/criar/EditarLoja";
import AdminLayout from "./components/Layout/AdminLayout";
import Produtos from "./components/Produto/Produtos";
import AdicionarProduto from "./components/Produto/AdicionarProduto";
import VisualizarLoja from "./pages/Lojas/VisualizarLoja";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />

      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lojas" element={<Lojas />} />
          <Route path="/lojas/criar" element={<CriarLoja />} />
          <Route path="/lojas/:lojaId/produtos" element={<Produtos />} />
          <Route path="/lojas/:lojaId/produtos/adicionar" element={<AdicionarProduto />} />
          <Route path="/lojas/:lojaId" element={<VisualizarLoja />} />
          <Route path="/lojas/:lojaId/editar" element={<EditarLoja />} />



        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
