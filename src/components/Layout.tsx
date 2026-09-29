import { Link, Outlet } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Layout() {
  const { itemCount } = useCart();
  return <><header className="site-header"><div className="container nav"><Link to="/products" className="logo" aria-label="FreshMart home"><span className="logo-mark">✦</span> Fresh<span>Mart</span></Link><nav><Link to="/products">Shop</Link><a href="/products#foods">Fresh picks</a><a href="#about">About</a></nav><Link to="/cart" className="nav-cart" aria-label="Open basket">🛒 <span>Basket ({itemCount})</span></Link></div></header><main><Outlet /></main><footer id="about" className="site-footer"><div className="container footer-grid"><div><div className="logo footer-logo"><span className="logo-mark">✦</span> Fresh<span>Mart</span></div><p>Good food, simple shopping, delivered to your table.</p></div><div><strong>Explore</strong><Link to="/products">All foods</Link><Link to="/cart">Your basket</Link><Link to="/track-order">Track order</Link></div><div><strong>Contact</strong><span>hello@freshmart.local</span><span>Open daily · 8 AM–8 PM</span></div></div></footer></>;
}
