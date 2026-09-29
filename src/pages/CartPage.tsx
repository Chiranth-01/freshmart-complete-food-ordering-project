import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, getDiscountedPrice } from "../utils/format";

export function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, deliveryFee, total } = useCart();
  const navigate = useNavigate();
  if (!items.length) return <div className="container cart-page empty-cart"><div className="empty-cart-icon">🛒</div><span className="section-kicker">YOUR BASKET</span><h1>Your basket is waiting.</h1><p>Add some fresh food and come back here to check out.</p><Link className="hero-btn" to="/products">Start shopping <span>→</span></Link></div>;
  return <div className="container cart-page">
    <div className="page-title"><div><span className="section-kicker">FRESHMART CHECKOUT</span><h1>Your basket</h1></div><span className="result-pill">{items.reduce((n, i) => n + i.quantity, 0)} items</span></div>
    <div className="cart-layout">
      <section className="cart-items">{items.map(({ product, quantity }) => <article className="cart-item" key={product.id}>
        <img src={product.thumbnail} alt={product.title} />
        <div className="cart-item-info"><span className="eyebrow">{product.category}</span><h2>{product.title}</h2><p>{formatPrice(getDiscountedPrice(product.price, product.discountPercentage))} each</p>
          <div className="quantity"><button onClick={() => updateQuantity(product.id, quantity - 1)}>-</button><strong>{quantity}</strong><button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button></div></div>
        <div className="cart-item-end"><strong>{formatPrice(getDiscountedPrice(product.price, product.discountPercentage) * quantity)}</strong><button className="remove-btn" onClick={() => removeFromCart(product.id)}>Remove</button></div>
      </article>)}</section>
      <aside className="summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Delivery</span><strong>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</strong></div>{deliveryFee > 0 && <small>Free delivery on orders over ₹500</small>}<div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div><button className="checkout-btn" onClick={() => navigate("/checkout")}>Proceed to checkout →</button><Link to="/products" className="continue-link">← Continue shopping</Link></aside>
    </div>
  </div>;
}
