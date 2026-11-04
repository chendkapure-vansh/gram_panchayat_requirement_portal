import React from 'react';
import { Category } from '../types';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { ProductImage } from './ProductImage';
import { ChevronRight } from 'lucide-react';

interface CategoryTilesProps {
  categories: Category[];
  selectedCategorySlug?: string | null;
  onSelectCategory: (slug: string) => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({
  categories,
  selectedCategorySlug,
  onSelectCategory,
}) => {
  const { isMarathi } = useLanguage();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {categories.map((cat) => {
        const isSelected = selectedCategorySlug === cat.slug;
        const name = isMarathi ? cat.name : cat.nameEn;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.slug)}
            className={`text-left bg-white border rounded p-2.5 transition-colors group flex flex-col justify-between ${
              isSelected
                ? 'border-[#0B2545] ring-1 ring-[#0B2545]'
                : 'border-slate-200 hover:border-slate-400'
            }`}
          >
            <div>
              {/* Category Image: fixed 1:1 square tile */}
              <div className="w-full aspect-square bg-slate-50 rounded overflow-hidden border border-slate-100 mb-2">
                <ProductImage
                  src={cat.image || ''}
                  alt={name}
                  aspectRatio="square"
                  className="group-hover:scale-[1.02] transition-transform duration-200"
                />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-[#0B2545] line-clamp-1">
                {name}
              </h3>
            </div>

            {/* Item Count & Action */}
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>{PRODUCTS.filter((p) => p.category === cat.slug).length} {isMarathi ? 'साहित्य' : 'Items'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        );
      })}
    </div>
  );
};
