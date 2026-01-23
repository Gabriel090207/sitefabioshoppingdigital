import "./StoreCard.css";
import { Link } from "react-router-dom";


interface StoreCardProps {
  id: number | string;
  name: string;
  category: string;
  rating: number;
  deliveryTime: string;
  image: string;
}

export default function StoreCard({
  id,
  name,
  category,
  rating,
  deliveryTime,
  image,
}: StoreCardProps) {

 return (
  <Link to={`/loja/${id}`} className="store-card-link">
    <div className="store-card">
      <div className="store-card-image">
        <img src={image} alt={name} />
      </div>

      <div className="store-card-content">
        <h3 className="store-card-title">{name}</h3>

        <span className="store-card-subtitle">
          {category} <span className="dot">•</span> Centro
        </span>

        <div className="store-card-meta">
          <div className="store-card-rating">
            ⭐ <span>{rating}</span>
          </div>

          <div className="store-card-time">
            ⏱ <span>{deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

}
