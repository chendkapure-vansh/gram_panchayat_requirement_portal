import React from 'react';
import { Category } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Trash2,
  Lightbulb,
  ShieldCheck,
  Monitor,
  Droplets,
  Armchair,
  Activity,
  Landmark,
  Zap,
  Package,
  LucideIcon,
  ChevronRight,
} from 'lucide-react';

interface CategoryTilesProps {
  categories: Category[];
  selectedCategorySlug?: string | null;
  onSelectCategory: (slug: string) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Trash2,
  Lightbulb,
  ShieldCheck,
  Monitor,
  Droplets,
  Armchair,
  Activity,
  Landmark,
  Zap,
  Package,
};

export const CategoryTiles: React.FC<CategoryTilesProps> = ({
  categories,
  selectedCategorySlug,
  onSelectCategory,
}) => {
  const { isMarathi } = useLanguage();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {categories.map((cat) => {
        const IconComponent = ICON_MAP[cat.iconName] || Package;
        const isSelected = selectedCategorySlug === cat.slug;
        const name = isMarathi ? cat.name : cat.nameEn;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`tap-target text-left p-4 rounded-xl border transition-all flex flex-col justify-between group ${
              isSelected
                ? 'bg-gem-navy text-white border-amber-400 shadow-md ring-2 ring-amber-400/40'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-100 group-hover:bg-amber-50 text-gem-navy group-hover:text-amber-600'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <h4 className="font-bold text-sm sm:text-base leading-snug mb-1">
                {name}
              </h4>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/40 text-xs">
              <span
                className={`font-semibold ${
                  isSelected ? 'text-amber-300' : 'text-slate-500'
                }`}
              >
                {cat.itemCount} {isMarathi ? 'वस्तू' : 'Items'}
              </span>
              <ChevronRight
                className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  isSelected ? 'text-amber-300' : 'text-slate-400'
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
