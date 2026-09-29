import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderSuccessPage } from "../pages/OrderSuccessPage";
import { TrackOrderPage } from "../pages/TrackOrderPage";

export function AppRoutes() {
  return <Routes><Route element={<Layout />}><Route path="/" element={<Navigate to="/products" replace />} /><Route path="/products" element={<ProductsPage />} /><Route path="/products/:id" element={<ProductDetailsPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/order-success" element={<OrderSuccessPage />} /><Route path="/track-order" element={<TrackOrderPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>;
}
