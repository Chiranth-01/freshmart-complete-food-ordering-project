import { Link } from "react-router-dom";

export function TrackOrderPage() {
  const steps = ["Order confirmed", "Food being prepared", "Out for delivery", "Delivered"];
  return <div className="container tracking-page"><Link to="/products" className="back-link">← Back to FreshMart</Link><div className="tracking-card"><span className="section-kicker">LIVE ORDER STATUS</span><h1>On its way to you.</h1><p>Here is the journey your FreshMart order will follow.</p><div className="tracking-steps">{steps.map((step, index) => <div className={`tracking-step ${index === 2 ? "current" : index < 2 ? "done" : ""}`} key={step}><span>{index < 2 ? "✓" : index === 2 ? "●" : index + 1}</span><div><strong>{step}</strong><small>{index === 0 ? "Order received" : index === 1 ? "Kitchen is preparing your food" : index === 2 ? "Rider is on the way" : "Enjoy your fresh food!"}</small></div></div>)}</div><div className="tracking-note">🚚 Estimated delivery: <strong>30–45 minutes</strong></div><Link to="/products" className="hero-btn">Shop more food <span>→</span></Link></div></div>;
}
