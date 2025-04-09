
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  color: string;
};

type EventCategoryFilterProps = {
  categories: Category[];
  onFilterChange: (selectedCategories: string[]) => void;
  className?: string;
};

const EventCategoryFilter = ({
  categories,
  onFilterChange,
  className,
}: EventCategoryFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
      
      onFilterChange(newSelection);
      return newSelection;
    });
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        
        return (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
              isSelected
                ? `${category.color} text-white`
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
          >
            {isSelected && <Check className="w-3.5 h-3.5 mr-1" />}
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default EventCategoryFilter;
