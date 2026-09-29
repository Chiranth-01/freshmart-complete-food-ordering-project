import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";

export interface CartItem { product: Product; quantity: number; }
interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "freshmart-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CartItem[]; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);

  const addToCart = (product: Product, quantity = 1) => setItems(current => {
    const existing = current.find(item => item.product.id === product.id);
    if (existing) return current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
    return [...current, { product, quantity }];
  });
  const removeFromCart = (productId: number) => setItems(current => current.filter(item => item.product.id !== productId));
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setItems(current => current.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };
  const clearCart = () => setItems([]);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * (1 - item.product.discountPercentage / 100)) * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const value = useMemo(() => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal, deliveryFee, total }), [items, itemCount, subtotal, deliveryFee, total]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
