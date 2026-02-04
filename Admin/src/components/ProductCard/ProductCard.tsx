import "./ProductCard.css";

interface ProductCardProps {
  image?: string;
  name?: string;
  price?: number | string;
  oldPrice?: number | string;
  store?: string;
  rating?: number;
}

export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  store,

}: ProductCardProps) {
  /* garante número */
  const preco = Number(price || 0);
  const precoAntigo = oldPrice ? Number(oldPrice) : undefined;

  return (
    <div className="product-card">
      {/* IMAGEM */}
      <div className="product-image">
  <img
    src={
      image && image !== ""
        ? image
        : "https://via.placeholder.com/400x300?text=Sem+Imagem"
    }
    alt={name || "Produto"}
  />
</div>


      <div className="product-info">
        {/* NOME */}
        <h3>{name || "Produto sem nome"}</h3>

        {/* LOJA */}
        {store && (
          <span className="product-store">
            Vendido por <strong>{store}</strong>
          </span>
        )}

       

        {/* PREÇOS */}
        <div className="product-price">
          {precoAntigo && precoAntigo > preco && (
            <span className="old-price">
              R$ {precoAntigo.toFixed(2)}
            </span>
          )}

          <span className="price">
            R$ {preco.toFixed(2)}
          </span>
        </div>

        <button>Adicionar</button>
      </div>
    </div>
  );
}
