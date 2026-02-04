import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./visualizarLoja.css";

const products = [
  {
    id: 1,
    name: "Banana Prata",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1574226516831-e1dff420e42e",
  },
  {
    id: 2,
    name: "Maçã Gala",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  {
    id: 3,
    name: "Tomate",
    price: 6.49,
    image:
      "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  },
];

export default function VisualizarLoja() {
  const { lojaId } = useParams();

  return (
    <div className="store-page">
      {/* VOLTAR */}
      <div className="store-back">
        <Link to="/lojas" className="back-button">
          <FiArrowLeft />
          Voltar para lojas
        </Link>
      </div>

      {/* CAPA */}
      <div className="store-cover">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="Capa"
        />
      </div>

      {/* HEADER */}
      <div className="store-header">
        <div className="store-header-inner">
          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
            alt="Logo"
            className="store-avatar"
          />

          <div className="store-info">
            <h1>Mercado do Bairro</h1>
            <span>ID: {lojaId}</span>
          </div>
        </div>
      </div>

      {/* PRODUTOS */}
      <div className="store-products">
        <div className="store-products-inner">
          <div className="store-products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} />

                <div className="product-info">
                  <strong>{product.name}</strong>
                  <span>R$ {product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
