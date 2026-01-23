import './ProductCard.css'

interface ProductCardProps {
  image: string
  name: string
  price: number
  oldPrice?: number
  store?: string
  rating?: number
}


export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  store,
  rating
}: ProductCardProps) {

  return (
    <div className="product-card">
      <img src={image} alt={name} />

      <div className="product-info">
        <h3>{name}</h3>

        <span className="product-store">
          Vendido por <strong>{store}</strong>
        </span>

        {rating && (
          <div className="product-rating">
            ⭐ {rating.toFixed(1)}
          </div>
        )}

        <div className="product-price">
          {oldPrice && (
            <span className="old-price">
              R$ {oldPrice.toFixed(2)}
            </span>
          )}

          <span className="price">
            R$ {price.toFixed(2)}
          </span>
        </div>

        <button>Adicionar</button>
      </div>
    </div>
  )
}
