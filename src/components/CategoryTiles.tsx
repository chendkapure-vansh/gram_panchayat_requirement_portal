import React from 'react';
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
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { Language } from '../types';

interface CategoryTilesProps {
  language: Language;
  selectedCategory: string | null;
  onSelectCategory: (slug: string) => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({
  language,
  selectedCategory,
  onSelectCategory,
}) => {
  const isMr = language === 'mr';

  const iconMap: Record<string, React.ReactNode> = {
    Trash2: <Trash2 className="w-6 h-6 text-emerald-600" />,
    Lightbulb: <Lightbulb className="w-6 h-6 text-amber-500" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    Monitor: <Monitor className="w-6 h-6 text-indigo-600" />,
    Droplets: <Droplets className="w-6 h-6 text-cyan-600" />,
    Armchair: <Armchair className="w-6 h-6 text-amber-700" />,
    Activity: <Activity className="w-6 h-6 text-rose-600" />,
    Landmark: <Landmark className="w-6 h-6 text-slate-700" />,
    Zap: <Zap className="w-6 h-6 text-yellow-600" />,
    Package: <Package className="w-6 h-6 text-teal-600" />,
  };

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-700 font-bold mb-1">
              {isMr ? 'ग्रामपंचायत गरजेनुसार खरेदी' : 'Shop by Institutional Need'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isMr ? 'प्रमुख उत्पादन वर्गवारी (Categories)' : 'Explore Categories'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            {isMr
              ? 'ब्रोशरनुसार शासकीय व ग्रामपंचायत विकासकामांसाठी लागणाऱ्या सर्व साहित्याची विभागणी.'
              : 'Browse essential civic and office products organized strictly as per catalogue specifications.'}
          </p>
        </div>

        {/* 10 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`group cursor-pointer rounded-xl p-4 transition-all duration-150 border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-500/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    {iconMap[cat.iconName] || <Package className="w-6 h-6 text-slate-600" />}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-amber-700 transition-colors">
                    {isMr ? cat.name : cat.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {isMr ? cat.description : cat.descriptionEn}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-emerald-700">
                    {cat.itemCount} {isMr ? 'उत्पादने' : 'items'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
