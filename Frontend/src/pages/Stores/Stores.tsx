import SidebarFilter from "../../components/SidebarFilter/SidebarFilter";
import "./Stores.css";
import StoreCard from "../../components/cards/StoreCard/StoreCard";

const stores = [
  {
    id: 1,
    name: "Mercado do Bairro",
    category: "Mercados",
    rating: 4.8,
    deliveryTime: "30-40 min",
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  },
  {
    id: 2,
    name: "Padaria Pão Quente",
    category: "Padarias",
    rating: 4.6,
    deliveryTime: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
    {
    id: 1,
    name: "Mercado do Bairro",
    category: "Mercados",
    rating: 4.8,
    deliveryTime: "30-40 min",
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  },
  {
    id: 2,
    name: "Padaria Pão Quente",
    category: "Padarias",
    rating: 4.6,
    deliveryTime: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },

    {
    id: 1,
    name: "Mercado do Bairro",
    category: "Mercados",
    rating: 4.8,
    deliveryTime: "30-40 min",
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  },
  {
    id: 2,
    name: "Padaria Pão Quente",
    category: "Padarias",
    rating: 4.6,
    deliveryTime: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },



];


export default function Stores() {
  return (
    <div className="stores-page">
      
      {/* SIDEBAR DE FILTRO */}
      <SidebarFilter />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="stores-content">
    <h1 className="stores-title">Lojas disponíveis</h1>

       

       <div className="stores-list">
  {stores.map((store) => (
    <StoreCard
  id={store.id}
  name={store.name}
  category={store.category}
  rating={store.rating}
  deliveryTime={store.deliveryTime}
  image={store.image}
/>

  ))}
</div>

      </main>

     


    </div>
  );
}

