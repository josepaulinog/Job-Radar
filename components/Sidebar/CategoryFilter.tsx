import { JOB_CATEGORIES } from '@/lib/job-categories';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export default function CategoryFilter({
  selectedCategories,
  onCategoriesChange
}: CategoryFilterProps) {
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  };

  const clearAll = () => {
    onCategoriesChange([]);
  };

  const selectAll = () => {
    onCategoriesChange(JOB_CATEGORIES.map(cat => cat.id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Job Categories</h3>
        <div className={styles.actions}>
          <button
            onClick={selectAll}
            className={styles.actionButton}
            type="button"
          >
            All
          </button>
          <button
            onClick={clearAll}
            className={styles.actionButton}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>

      <div className={styles.categories}>
        {JOB_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategories.includes(category.id);

          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`${styles.category} ${isSelected ? styles.selected : ''}`}
              type="button"
              style={{
                borderColor: isSelected ? category.color : 'transparent',
                backgroundColor: isSelected ? `${category.color}10` : 'transparent',
              }}
            >
              <Icon
                size={18}
                color={isSelected ? category.color : 'currentColor'}
              />
              <span className={styles.categoryName}>{category.name}</span>
            </button>
          );
        })}
      </div>

      {selectedCategories.length > 0 && (
        <div className={styles.selectedCount}>
          {selectedCategories.length} {selectedCategories.length === 1 ? 'category' : 'categories'} selected
        </div>
      )}
    </div>
  );
}
