import './FoodBlogModeToggle.css';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

// Switch-style checkbox that turns the food blog preamble on for every card it governs
export default function FoodBlogModeToggle({ checked, onChange }: Props) {
  return (
    <label className="food-blog-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="food-blog-toggle-track" aria-hidden="true" />
      <span className="food-blog-toggle-caption">Food Blog Mode</span>
    </label>
  );
}
