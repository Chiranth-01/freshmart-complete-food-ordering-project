import { Link, useLocation } from "react-router-dom";
import { formatPrice } from "../utils/format";

export function OrderSuccessPage() {
  const { state } = useLocation() as { state?: { name?: string; total?: number; address?: string } };
  const orderId = `FM${Math.floor(10000 + Math.random() * 89999)}`;
  return <div className="container success-page"><div className="success-card"><div className="success-icon">✓</div><span className="section-kicker">ORDER CONFIRMED</span><h1>Thanks{state?.name ? `, ${state.name}` : ""}!</h1><p className="thank-you-message">Thank you for ordering from <strong>FreshMart</strong>! 🎉</p><p>Your order has been placed successfully and we’re getting it ready for delivery.</p><div className="order-meta"><span>Order ID<strong>{orderId}</strong></span><span>Total<strong>{state?.total ? formatPrice(state.total) : "Paid at checkout"}</strong></span></div>{state?.address && <div className="delivery-address"><strong>Delivering to</strong><span>{state.address}</span></div>}<div className="success-actions"><Link className="checkout-btn" to="/track-order">Track my order →</Link><Link className="continue-link" to="/products">Continue shopping</Link></div></div></div>;
}
