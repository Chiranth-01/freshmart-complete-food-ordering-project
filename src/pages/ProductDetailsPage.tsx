import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useProduct } from "../hooks/useProduct";
import { formatCategory, formatPrice, formatRating, getDiscountedPrice, getStockInfo } from "../utils/format";
import { parseProductId } from "../utils/parseProductId";

function ProductDetails({ id }: { id: number | null }) {
  const { addToCart } = useCart();
  const { product, loading, error, notFound, retry } = useProduct(id);
  if (loading) return <div className="container state-area"><LoadingState message="Opening food details..." /></div>;
  if (notFound) return <div className="container state-area"><ErrorState message="Food item not found." /></div>;
  if (error || !product) return <div className="container state-area"><ErrorState message="Unable to load this food item." onRetry={retry} /></div>;

  const stock = getStockInfo(product.stock);
  const finalPrice = getDiscountedPrice(product.price, product.discountPercentage);

  return (
    <div className="container details-page">
      <Link to="/products" className="back-link">← Back to fresh picks</Link>
      <article className="details">
        <div className="details-image"><img src={product.images[0] ?? product.thumbnail} alt={product.title} /><span className="details-stamp">FRESH<br />PICK</span></div>
        <div className="details-copy">
          <span className="section-kicker">{formatCategory(product.category)}</span>
          <h1>{product.title}</h1>
          <div className="detail-rating">★ {formatRating(product.rating)} <span>· Customer favorite</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price"><strong>{formatPrice(finalPrice)}</strong>{product.discountPercentage > 0 && <><span>{formatPrice(product.price)}</span><b>{Math.round(product.discountPercentage)}% OFF</b></>}</div>
          <div className="stock-row"><span className={stock.className}>● {stock.label}</span><span>• Fast everyday delivery</span></div>
          <dl className="details-list">
            <dt>Brand</dt><dd>{product.brand ?? "FreshMart selection"}</dd>
            <dt>Category</dt><dd>{formatCategory(product.category)}</dd>
            <dt>Weight</dt><dd>{product.weight} g</dd>
          </dl>
          <button className="big-add" onClick={() => addToCart(product)}>Add to basket <span>＋</span></button>
        </div>
      </article>
    </div>
  );
}

export function ProductDetailsPage() {
  const { id } = useParams();
  return <ProductDetails key={id} id={parseProductId(id)} />;
}
