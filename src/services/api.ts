import type { Product, ProductsResponse, Review } from "../types/product";

const BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) { super(message); this.name = "ApiError"; this.status = status; }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) throw new ApiError(`Request failed with status ${response.status}`, response.status);
  return (await response.json()) as T;
}

const review: Review = { rating: 5, comment: "Fresh and delicious!", date: "2026-09-01", reviewerName: "FreshMart customer", reviewerEmail: "customer@freshmart.local" };

const extraFoods: Product[] = [
  { id: 9001, title: "Berry Granola Bowl", description: "Crunchy granola with berries for an easy breakfast bowl.", category: "breakfast", price: 149, discountPercentage: 10, rating: 4.8, stock: 28, tags: ["breakfast", "healthy"], brand: "FreshMart Kitchen", sku: "FM-BOWL-01", weight: 350, dimensions: { width: 12, height: 8, depth: 12 }, warrantyInformation: "Freshness guaranteed", shippingInformation: "Ships in 1 day", availabilityStatus: "In Stock", reviews: [review], returnPolicy: "7 days", minimumOrderQuantity: 1, meta: { createdAt: "2026-09-01", updatedAt: "2026-09-01", barcode: "8900009001", qrCode: "" }, images: ["https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=900&q=80"], thumbnail: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=700&q=80" },
  { id: 9002, title: "Avocado Toast Kit", description: "Sourdough bread, creamy avocado and seasoning for quick toast.", category: "ready-to-eat", price: 179, discountPercentage: 8, rating: 4.7, stock: 19, tags: ["toast", "breakfast"], brand: "FreshMart Kitchen", sku: "FM-TOAST-02", weight: 420, dimensions: { width: 18, height: 6, depth: 10 }, warrantyInformation: "Freshness guaranteed", shippingInformation: "Ships in 1 day", availabilityStatus: "In Stock", reviews: [review], returnPolicy: "7 days", minimumOrderQuantity: 1, meta: { createdAt: "2026-09-01", updatedAt: "2026-09-01", barcode: "8900009002", qrCode: "" }, images: ["https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80"], thumbnail: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80" },
  { id: 9003, title: "Tropical Fruit Box", description: "A colorful selection of mango, pineapple, kiwi and grapes.", category: "fresh-fruit", price: 299, discountPercentage: 12, rating: 4.9, stock: 14, tags: ["fruit", "fresh"], brand: "FreshMart Fresh", sku: "FM-FRUIT-03", weight: 1000, dimensions: { width: 24, height: 10, depth: 18 }, warrantyInformation: "Freshness guaranteed", shippingInformation: "Ships in 1 day", availabilityStatus: "In Stock", reviews: [review], returnPolicy: "7 days", minimumOrderQuantity: 1, meta: { createdAt: "2026-09-01", updatedAt: "2026-09-01", barcode: "8900009003", qrCode: "" }, images: ["https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80"], thumbnail: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80" },
  { id: 9004, title: "Paneer Tikka Box", description: "Smoky paneer cubes with peppers and a creamy mint dip.", category: "ready-to-eat", price: 219, discountPercentage: 5, rating: 4.6, stock: 22, tags: ["paneer", "indian"], brand: "FreshMart Kitchen", sku: "FM-PANEER-04", weight: 400, dimensions: { width: 18, height: 8, depth: 12 }, warrantyInformation: "Freshness guaranteed", shippingInformation: "Ships in 1 day", availabilityStatus: "In Stock", reviews: [review], returnPolicy: "7 days", minimumOrderQuantity: 1, meta: { createdAt: "2026-09-01", updatedAt: "2026-09-01", barcode: "8900009004", qrCode: "" }, images: ["https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"], thumbnail: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80" },
  { id: 9005, title: "Cold Brew Coffee", description: "Smooth, chilled coffee concentrate with a rich roasted finish.", category: "beverages", price: 129, discountPercentage: 15, rating: 4.8, stock: 35, tags: ["coffee", "drink"], brand: "FreshMart Café", sku: "FM-COFFEE-05", weight: 500, dimensions: { width: 8, height: 18, depth: 8 }, warrantyInformation: "Freshness guaranteed", shippingInformation: "Ships in 1 day", availabilityStatus: "In Stock", reviews: [review], returnPolicy: "7 days", minimumOrderQuantity: 1, meta: { createdAt: "2026-09-01", updatedAt: "2026-09-01", barcode: "8900009005", qrCode: "" }, images: ["https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80"], thumbnail: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80" },
  { id: 9006, title: "Chocolate Brownie Bites", description: "Soft chocolate brownie bites made for an afternoon treat.", category: "snacks", price: 159, discountPercentage: 10, rating: 4.7, stock: 31, tags: ["chocolate", "snacks"], brand: "FreshMart Bakery", sku: "FM-BROWNIE-06", weight: 300, dimensions: { width: 15, height: 7, depth: 10 }, warrantyInformation: "Freshness guaranteed", shippingInformation: "Ships in 1 day", availabilityStatus: "In Stock", reviews: [review], returnPolicy: "7 days", minimumOrderQuantity: 1, meta: { createdAt: "2026-09-01", updatedAt: "2026-09-01", barcode: "8900009006", qrCode: "" }, images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476a?auto=format&fit=crop&w=900&q=80"], thumbnail: "https://images.unsplash.com/photo-1606313564200-e75d5e30476a?auto=format&fit=crop&w=700&q=80" },
];

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const data = await request<ProductsResponse>("/products/category/groceries?limit=0", signal);
  return [...extraFoods, ...data.products];
}

export async function getProductById(id: number, signal?: AbortSignal): Promise<Product> {
  const local = extraFoods.find((item) => item.id === id);
  if (local) return local;
  return request<Product>(`/products/${id}`, signal);
}
