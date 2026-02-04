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

  // converte qualquer formato para número
  const parsePrice = (value: number | string | undefined) => {
  if (!value) return 0;

  if (typeof value === "number") return value;

  // remove tudo que não é número, vírgula ou ponto
  let cleaned = value.replace(/[^\d.,-]/g, "");

  // se tiver vírgula, assume formato BR
  if (cleaned.includes(",")) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  }

  const number = Number(cleaned);
  return isNaN(number) ? 0 : number;
};


  const preco = parsePrice(price);
  const precoAntigo = oldPrice ? parsePrice(oldPrice) : undefined;


  console.log("PRICE RECEBIDO:", price);

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
              R$ {precoAntigo.toFixed(2).replace(".", ",")}
            </span>
          )}

          <span className="price">
            R$ {preco.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <button>Adicionar</button>
      </div>
    </div>
  );
}
