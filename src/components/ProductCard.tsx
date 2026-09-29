import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";
import { formatCategory, formatPrice, formatRating, getDiscountedPrice } from "../utils/format";

interface ProductCardProps { product: Product; }

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const price = getDiscountedPrice(product.price, product.discountPercentage);
  return (
    <article className="food-card">
      <Link to={`/products/${product.id}`} className="food-image">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        {product.discountPercentage > 0 && <span className="discount">-{Math.round(product.discountPercentage)}%</span>}
        <span className="heart" aria-label="Favorite">♡</span>
      </Link>
      <div className="food-card-body">
        <span className="eyebrow">{formatCategory(product.category)}</span>
        <h2><Link to={`/products/${product.id}`}>{product.title}</Link></h2>
        <p className="food-desc">{product.description}</p>
        <div className="food-bottom">
          <div><span className="price">{formatPrice(price)}</span>{product.discountPercentage > 0 && <span className="old-price">{formatPrice(product.price)}</span>}</div>
          <span className="rating">★ {formatRating(product.rating)}</span>
        </div>
        <div className="card-actions"><Link to={`/products/${product.id}`} className="add-btn">View food <span>→</span></Link><button className="mini-add" onClick={() => addToCart(product)}>＋ Add</button></div>
      </div>
    </article>
  );
}
