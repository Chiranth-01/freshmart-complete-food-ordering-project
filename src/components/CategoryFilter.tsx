import { formatCategory } from "../utils/format";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <div className="category-chips" aria-label="Food categories">
      <button className={value === "all" ? "chip active" : "chip"} onClick={() => onChange("all")}>All items</button>
      {categories.map((category) => (
        <button key={category} className={value === category ? "chip active" : "chip"} onClick={() => onChange(category)}>
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
}
