interface RatingFilterProps {
  value: number;
  onChange: (value: number) => void;
}

const OPTIONS = [
  { value: 0, label: "Any rating" },
  { value: 3, label: "3+ stars" },
  { value: 4, label: "4+ stars" },
  { value: 4.5, label: "4.5+ stars" },
];

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <select className="sort-select" aria-label="Minimum rating" value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
