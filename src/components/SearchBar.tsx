interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-wrap">
      <span className="search-icon">⌕</span>
      <input id="search" type="search" placeholder="Search fruits, snacks, groceries..." value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
