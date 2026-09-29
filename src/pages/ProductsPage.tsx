import { useMemo, useState } from "react";
import { CategoryFilter } from "../components/CategoryFilter";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { ProductList } from "../components/ProductList";
import { RatingFilter } from "../components/RatingFilter";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";
import { filterProducts, getCategories } from "../utils/filterProducts";

export function ProductsPage() {
  const { products, loading, error, retry } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [minRating, setMinRating] = useState(0);

  const categories = useMemo(() => getCategories(products), [products]);
  const visibleProducts = useMemo(() => filterProducts(products, { query, category, minRating }), [products, query, category, minRating]);
  const hasActiveFilters = query !== "" || category !== "all" || minRating !== 0;
  const clearFilters = () => { setQuery(""); setCategory("all"); setMinRating(0); };

  if (loading) return <div className="container state-area"><LoadingState message="Picking fresh products..." /></div>;
  if (error) return <div className="container state-area"><ErrorState message="We couldn't load the food shelf." onRetry={retry} /></div>;

  return (
    <>
      <section className="hero">
        <div className="hero-inner container">
          <div className="hero-copy">
            <span className="hero-kicker">FRESH PICKS · EVERY DAY</span>
            <h1>Great food<br /><em>starts here.</em></h1>
            <p>Groceries, quick bites, drinks and fresh finds—picked for everyday cravings.</p>
            <a className="hero-btn" href="#foods">Explore foods <span>↓</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun"></div><div className="leaf leaf-one">◜</div><div className="leaf leaf-two">◝</div>
            <div className="fruit fruit-one">🍊</div><div className="fruit fruit-two">🍎</div><div className="fruit fruit-three">🥑</div>
            <div className="hero-note">NATURALLY<br /><b>DELICIOUS</b></div>
          </div>
        </div>
      </section>

      <section id="foods" className="container shop-section">
        <div className="section-heading"><div><span className="section-kicker">FRESHMART PICKS</span><h2>Pick your favorites</h2></div><span className="result-pill">{visibleProducts.length} foods</span></div>
        <div className="shop-tools"><SearchBar value={query} onChange={setQuery} /><RatingFilter value={minRating} onChange={setMinRating} /></div>
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        {hasActiveFilters && <button className="clear-link" onClick={clearFilters}>Reset filters</button>}
        {visibleProducts.length === 0 ? <EmptyState message="No foods match your search." actionLabel="Show all foods" onAction={clearFilters} /> : <ProductList products={visibleProducts} />}
      </section>
    </>
  );
}
