import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import {
  SlidersHorizontal,
  X,
  Package,
} from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  initialCategorySlug?: string | null;
  initialSearchQuery?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  initialCategorySlug,
  initialSearchQuery = '',
}) => {
  const { t, isMarathi } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategorySlug || null);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync props when category or search changes from header
  React.useEffect(() => {
    if (initialCategorySlug !== undefined) {
      setSelectedCategory(initialCategorySlug);
    }
  }, [initialCategorySlug]);

  React.useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q);
        const catMatch = p.categoryName.toLowerCase().includes(q) || p.categoryNameEn.toLowerCase().includes(q);
        const descMatch = p.shortDescription.toLowerCase().includes(q) || p.shortDescriptionEn.toLowerCase().includes(q);
        return titleMatch || catMatch || descMatch;
      });
    }

    // Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => (isMarathi ? a.title.localeCompare(b.title, 'mr') : a.titleEn.localeCompare(b.titleEn)));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => (isMarathi ? b.title.localeCompare(a.title, 'mr') : b.titleEn.localeCompare(a.titleEn)));
    } else {
      // 'featured'
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, isMarathi]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setSortBy('featured');
  };

  const handleCategoryToggle = (slug: string) => {
    if (selectedCategory === slug) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(slug);
    }
  };

  return (
    <div className="py-2 space-y-4">
      {/* Top Controls: Mobile filter trigger + Result count + Sort dropdown */}
      <div className="bg-white border border-slate-200 rounded p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Sheet Trigger */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-slate-300 rounded text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0B2545]" />
            <span>{isMarathi ? 'फिल्टर्स' : 'Filters'}</span>
            {selectedCategory && (
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            )}
          </button>

          {/* Result Count */}
          <div className="text-xs sm:text-sm text-slate-600">
            {isMarathi ? (
              <span>
                एकूण <strong className="text-slate-900">{filteredProducts.length}</strong> उत्पादने उपलब्ध
              </span>
            ) : (
              <span>
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
              </span>
            )}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium whitespace-nowrap">
            {isMarathi ? 'क्रमवारी:' : 'Sort by:'}
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'name-asc' | 'name-desc')}
            className="text-xs sm:text-sm border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 outline-none"
          >
            <option value="featured">{isMarathi ? 'महत्त्वाची उत्पादने' : 'Featured'}</option>
            <option value="name-asc">{isMarathi ? 'नाव (अ ते ज्ञ)' : 'Name (A to Z)'}</option>
            <option value="name-desc">{isMarathi ? 'नाव (ज्ञ ते अ)' : 'Name (Z to A)'}</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedCategory || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500">{isMarathi ? 'सक्रिय फिल्टर:' : 'Active filters:'}</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-300 text-slate-800 px-2.5 py-1 rounded text-xs font-medium">
              {CATEGORIES.find((c) => c.slug === selectedCategory)?.[isMarathi ? 'name' : 'nameEn']}
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="hover:text-amber-700"
                aria-label="Remove category filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-300 text-slate-800 px-2.5 py-1 rounded text-xs font-medium">
              "{searchQuery}"
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="hover:text-amber-700"
                aria-label="Remove search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-amber-700 hover:underline font-semibold ml-1 text-xs"
          >
            {t.clearFilters}
          </button>
        </div>
      )}

      {/* Main Content Layout: Left Filter Panel (Desktop) + 4-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
        {/* Left Filter Panel (Desktop) */}
        <aside className="hidden lg:block bg-white border border-slate-200 rounded p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h2 className="font-bold text-sm text-[#0B2545] uppercase tracking-wide">
              {t.filterByCategory}
            </h2>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-amber-700 hover:underline font-medium"
              >
                {t.clearFilters}
              </button>
            )}
          </div>

          {/* Category Checkboxes with Counts */}
          <div className="space-y-1.5 text-xs sm:text-sm">
            <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={selectedCategory === null}
                  onChange={() => setSelectedCategory(null)}
                  className="rounded border-slate-300 text-[#0B2545] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span className={selectedCategory === null ? 'font-bold text-[#0B2545]' : 'text-slate-700'}>
                  {isMarathi ? 'सर्व वर्गवारी' : 'All Categories'}
                </span>
              </div>
              <span className="text-xs text-slate-400">({PRODUCTS.length})</span>
            </label>

            {CATEGORIES.map((cat) => {
              const isChecked = selectedCategory === cat.slug;
              const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(cat.slug)}
                      className="rounded border-slate-300 text-[#0B2545] focus:ring-0 w-4 h-4 cursor-pointer shrink-0"
                    />
                    <span className={`truncate ${isChecked ? 'font-bold text-[#0B2545]' : 'text-slate-700'}`}>
                      {isMarathi ? cat.name : cat.nameEn}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">({count})</span>
                </label>
              );
            })}
          </div>
        </aside>

        {/* 4-Column Product Grid (2 on Mobile) */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded p-12 text-center space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-base text-slate-800">{t.noProductsFound}</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                {isMarathi
                  ? 'कृपया इतर शब्द शोधून पहा किंवा वर्गवारी फिल्टर काढून टाका.'
                  : 'Please try searching with another keyword or clear current filters.'}
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="bg-[#0B2545] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded transition-colors"
              >
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet (Image 2 Mobile requirement) */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Bottom Sheet Drawer */}
          <div className="relative bg-white rounded-t-lg max-h-[80vh] overflow-y-auto p-4 border-t border-slate-300 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {t.filterByCategory}
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-500 hover:text-slate-800"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              <label className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedCategory === null}
                    onChange={() => setSelectedCategory(null)}
                    className="w-4 h-4 text-[#0B2545] rounded"
                  />
                  <span className="text-sm font-medium">{isMarathi ? 'सर्व वर्गवारी' : 'All Categories'}</span>
                </div>
                <span className="text-xs text-slate-400">({PRODUCTS.length})</span>
              </label>

              {CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
                return (
                  <label key={cat.id} className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedCategory === cat.slug}
                        onChange={() => handleCategoryToggle(cat.slug)}
                        className="w-4 h-4 text-[#0B2545] rounded"
                      />
                      <span className="text-sm">{isMarathi ? cat.name : cat.nameEn}</span>
                    </div>
                    <span className="text-xs text-slate-400">({count})</span>
                  </label>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-700 border border-slate-300 rounded"
              >
                {t.clearFilters}
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#0B2545] rounded"
              >
                {isMarathi ? 'फिल्टर लागू करा' : 'Apply Filters'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
