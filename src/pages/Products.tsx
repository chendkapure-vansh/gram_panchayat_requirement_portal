import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import {
  Filter,
  ShoppingBag,
  SlidersHorizontal,
  X,
  Check,
} from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  initialCategorySlug?: string | null;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  initialCategorySlug,
}) => {
  const { t, isMarathi } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategorySlug || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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
        const codeMatch = p.modelCode?.toLowerCase().includes(q);
        return titleMatch || catMatch || Boolean(codeMatch);
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

  return (
    <div className="py-4 space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {t.allProducts}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isMarathi ? 'ग्रामपंचायत व शासकीय कामांसाठी प्रमाणित उत्पादने' : 'Institutional catalog for Gram Panchayat & public tenders'}
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-96">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-bold text-gem-navy tap-target"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600" />
            <span>{t.filterByCategory} ({selectedCategory ? '१ निवडले' : 'सर्व'})</span>
          </button>
          {selectedCategory && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-amber-700 font-bold underline"
            >
              {t.clearFilters}
            </button>
          )}
        </div>

        {/* Desktop Sidebar / Filter Drawer */}
        <aside
          className={`lg:block fixed lg:static inset-0 z-50 lg:z-auto bg-slate-900/60 lg:bg-transparent ${
            mobileFilterOpen ? 'flex' : 'hidden'
          }`}
        >
          <div className="w-5/6 max-w-sm lg:w-full bg-white h-full lg:h-auto overflow-y-auto lg:overflow-visible p-5 lg:p-6 rounded-r-2xl lg:rounded-2xl border border-slate-200 shadow-xl lg:shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Filter className="w-4 h-4 text-gem-navy" />
                <span>{t.filterByCategory}</span>
              </h2>
              <div className="flex items-center gap-2">
                {selectedCategory && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-amber-700 font-bold hover:underline"
                  >
                    {t.clearFilters}
                  </button>
                )}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="lg:hidden p-1 text-slate-400 hover:text-slate-700"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Options */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setMobileFilterOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
                  selectedCategory === null
                    ? 'bg-gem-navy text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{isMarathi ? 'सर्व वर्गवारी (All Categories)' : 'All Categories'}</span>
                {selectedCategory === null && <Check className="w-4 h-4 text-amber-400" />}
              </button>

              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-gem-navy text-white shadow-sm font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="line-clamp-1">{isMarathi ? cat.name : cat.nameEn}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.itemCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sort Options */}
            <div className="pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isMarathi ? 'क्रमवारी लावा (Sort by):' : 'Sort Products:'}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none bg-white font-medium"
              >
                <option value="featured">{isMarathi ? 'महत्त्वाची उत्पादने (Featured)' : 'Featured Items'}</option>
                <option value="name-asc">{isMarathi ? 'नाव (अ ते ज्ञ / A to Z)' : 'Name (A to Z)'}</option>
                <option value="name-desc">{isMarathi ? 'नाव (ज्ञ ते अ / Z to A)' : 'Name (Z to A)'}</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Products Grid (3 Columns) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Filter Indicators */}
          {(selectedCategory || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold">फिल्टर:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-gem-navy text-white px-2.5 py-1 rounded-lg font-medium">
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.[isMarathi ? 'name' : 'nameEn']}
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-amber-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg font-medium">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-amber-700 hover:text-amber-800 font-bold ml-1 underline"
              >
                {t.clearFilters}
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-xs text-slate-500 font-medium">
            एकूण {filteredProducts.length} उत्पादने उपलब्ध
          </div>

          {/* Products Cards */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <ShoppingBag className="w-14 h-14 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">{t.noProductsFound}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto">
                {isMarathi ? 'कृपया इतर शब्द शोधून पहा किंवा वर्गवारी फिल्टर काढून टाका.' : 'Please try a different search query or clear your category filters.'}
              </p>
              <button
                onClick={clearAllFilters}
                className="tap-target bg-gem-navy hover:bg-gem-navyLight text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow"
              >
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
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
    </div>
  );
};
