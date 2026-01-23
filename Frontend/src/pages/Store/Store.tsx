import "./Store.css";
import ProductCard from "../../components/products/ProductCard";

const products = [
  {
    id: 1,
    name: "Banana Prata",
    price: 3.99,
    store: "Mercado do Bairro",
    image:
      "https://images.unsplash.com/photo-1574226516831-e1dff420e42e",
  },
  {
    id: 2,
    name: "Maçã Gala",
    price: 4.99,
    store: "Mercado do Bairro",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  {
    id: 3,
    name: "Tomate",
    price: 6.49,
    store: "Mercado do Bairro",
    image:
      "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  },
  {
    id: 4,
    name: "Alface",
    price: 2.99,
    store: "Mercado do Bairro",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999",
  },
   {
    id: 4,
    name: "Alface",
    price: 2.99,
    store: "Mercado do Bairro",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999",
  },
   {
    id: 4,
    name: "Alface",
    price: 2.99,
    store: "Mercado do Bairro",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999",
  },
];

export default function Store() {
  return (
    <div className="store-page">

      {/* CAPA */}
      <div className="store-cover">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="Capa da loja"
        />
      </div>

      {/* HEADER DA LOJA */}
      <div className="store-header">
        <div className="store-header-inner">

          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
            alt="Logo da loja"
            className="store-avatar"
          />

          <div className="store-info">
            <h1>Informações</h1>

            
          </div>

        </div>
      </div>

      {/* FILTROS / BUSCA */}
      <div className="store-filters">
        <div className="store-filters-inner">
          <input
            type="text"
            placeholder="Buscar produtos na loja..."
            className="store-search"
          />

          <div className="store-filter-tags">
            <button className="active">Todos</button>
            <button>Ofertas</button>
            <button>Bebidas</button>
            <button>Alimentos</button>
            <button>Limpeza</button>
          </div>
        </div>
      </div>

      {/* PRODUTOS */}
      <div className="store-products">
  <div className="store-products-inner">
    <div className="store-products-grid">
      {products.map((product) => (
      <ProductCard
      key={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      store="Mercado"
    />
    

      ))}
    </div>
  </div>
</div>


    </div>
  );
}
