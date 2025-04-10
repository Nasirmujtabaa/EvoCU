
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
  color: string;
};

type EventCategoryFilterProps = {
  categories: Category[];
  selectedCategories: string[];
  onFilterChange: (categories: string[]) => void;
};

const EventCategoryFilter = ({
  categories,
  selectedCategories,
  onFilterChange,
}: EventCategoryFilterProps) => {
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      // If already selected, remove it
      onFilterChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      // If not selected, add it
      onFilterChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant={selectedCategories.length === 0 ? "default" : "outline"}
        className={
          selectedCategories.length === 0
            ? "bg-indian-primary hover:bg-indian-secondary"
            : ""
        }
        onClick={() => onFilterChange([])}
      >
        All Events
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategories.includes(category.id) ? "default" : "outline"}
          className={`hover:bg-opacity-90 ${
            selectedCategories.includes(category.id)
              ? category.color + " text-white"
              : ""
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default EventCategoryFilter;
