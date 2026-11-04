import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  Search,
  Phone,
  ShoppingBag,
  Globe,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';

export type ActivePage = 'home' | 'products' | 'details' | 'cart' | 'enquiry' | 'about' | 'contact';

export const PRIMARY_STRIP_CATEGORIES = [
  { slug: 'water-systems', labelEn: 'Water Systems', labelMr: 'पाणीपुरवठा साहित्य' },
  { slug: 'playground-gym', labelEn: 'Playground & Gym', labelMr: 'खेळ व ओपन जिम' },
  { slug: 'civic-infrastructure', labelEn: 'Civic Products', labelMr: 'ग्रामपंचायत सुविधा' },
  { slug: 'power-solar-safety', labelEn: 'Power & Solar', labelMr: 'पॉवर, सोलर व सुरक्षा' },
];

interface HeaderProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onSearch?: (query: string, categorySlug?: string | null) => void;
  onSelectCategory?: (slug: string) => void;
  activeCategorySlug?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onSearch,
  onSelectCategory,
  activeCategorySlug,
}) => {
  const { t, language, setLanguage, isMarathi } = useLanguage();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState<string>('');

  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput.trim(), null);
    }
  };

  const handleStripCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* 1. Top Verified Information Bar */}
      <div className="bg-[#0B2545] text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-slate-200 font-normal text-[11px] sm:text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{t.gemBadge}</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300 text-[11px]">
              {isMarathi ? 'लोणार, जि. बुलढाणा (४४३३०२)' : 'Lonar, Dist. Buldhana (443302)'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Phone numbers */}
            <div className="flex items-center gap-2 font-mono">
              <Phone className="w-3 h-3 text-slate-400" />
              <a href="tel:7059587711" className="hover:text-white transition-colors">
                7059587711
              </a>
              <span className="text-slate-500">/</span>
              <a href="tel:9371301001" className="hover:text-white transition-colors">
                9371301001
              </a>
            </div>

            {/* Language Switcher */}
            <div className="inline-flex items-center gap-1 border border-slate-700 rounded px-1 py-0.5 bg-slate-900/60">
              <Globe className="w-3 h-3 text-amber-500 ml-0.5" />
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  language === 'mr' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  language === 'en' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main E-Commerce Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">
        {/* Wordmark Left */}
        <button
          onClick={() => handleNav('home')}
          className="text-left shrink-0 group focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-[#0B2545] text-white font-bold text-lg flex items-center justify-center border border-slate-300">
              JR
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-[#0B2545] leading-tight group-hover:text-amber-700 transition-colors">
                {t.siteTitle}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {isMarathi ? 'ग्रामपंचायत व संस्था खरेदी' : 'Gram Panchayat Procurement'}
              </div>
            </div>
          </div>
        </button>

        {/* Wide Search Bar in Middle */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-2xl items-center border border-slate-300 rounded focus-within:border-[#0B2545] bg-white overflow-hidden shadow-none"
        >
          <div className="pl-3.5 text-slate-400">
            <Search className="w-4 h-4" />
          </div>

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none min-w-0"
          />

          <button
            type="submit"
            className="bg-[#0B2545] hover:bg-[#133E87] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            aria-label="Search"
          >
            <span>{isMarathi ? 'शोधा' : 'Search'}</span>
          </button>
        </form>

        {/* Right Section: Enquiry Cart & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Enquiry Cart Button */}
          <button
            onClick={() => handleNav('cart')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded border transition-colors text-xs sm:text-sm font-semibold ${
              currentPage === 'cart'
                ? 'bg-slate-100 border-[#0B2545] text-[#0B2545]'
                : 'bg-white border-slate-300 hover:border-slate-400 text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#0B2545]" />
            <span className="hidden sm:inline">{t.cart}</span>
            <span className="bg-amber-600 text-white px-1.5 py-0.5 rounded text-xs font-bold leading-none">
              {cartCount}
            </span>
          </button>

          {/* Mobile Search & Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 border border-slate-200 rounded flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Row (visible on small screens) */}
      <div className="md:hidden px-4 pb-2.5 pt-1 border-t border-slate-100">
        <form onSubmit={handleSearchSubmit} className="flex items-center border border-slate-300 rounded overflow-hidden">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <button
            type="submit"
            className="bg-[#0B2545] text-white px-3.5 py-2 flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 3. Category Strip Below (All Pages) */}
      <nav className="bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto scrollbar-none py-2 gap-1 sm:gap-2 text-xs sm:text-sm">
          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('');
              handleNav('products');
            }}
            className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
              currentPage === 'products' && !activeCategorySlug
                ? 'bg-[#0B2545] text-white'
                : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-100'
            }`}
          >
            {isMarathi ? 'सर्व उत्पादने' : 'All Products'}
          </button>

          <span className="text-slate-300">|</span>

          {PRIMARY_STRIP_CATEGORIES.map((cat) => {
            const isActive = activeCategorySlug === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => {
                  handleStripCategoryClick(cat.slug);
                  handleNav('products');
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#0B2545] text-white font-semibold'
                    : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-100'
                }`}
              >
                {isMarathi ? cat.labelMr : cat.labelEn}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
            <button
              onClick={() => handleNav('home')}
              className={`p-2 rounded text-left font-medium border ${
                currentPage === 'home' ? 'bg-slate-100 border-[#0B2545] text-[#0B2545]' : 'border-slate-200 text-slate-700'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => handleNav('products')}
              className={`p-2 rounded text-left font-medium border ${
                currentPage === 'products' ? 'bg-slate-100 border-[#0B2545] text-[#0B2545]' : 'border-slate-200 text-slate-700'
              }`}
            >
              {t.allProducts}
            </button>
            <button
              onClick={() => handleNav('cart')}
              className={`p-2 rounded text-left font-medium border ${
                currentPage === 'cart' ? 'bg-slate-100 border-[#0B2545] text-[#0B2545]' : 'border-slate-200 text-slate-700'
              }`}
            >
              {t.cart} ({cartCount})
            </button>
            <button
              onClick={() => handleNav('enquiry')}
              className={`p-2 rounded text-left font-medium border ${
                currentPage === 'enquiry' ? 'bg-slate-100 border-[#0B2545] text-[#0B2545]' : 'border-slate-200 text-slate-700'
              }`}
            >
              {isMarathi ? 'कोटेशन अर्ज' : 'Enquiry Form'}
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`p-2 rounded text-left font-medium border ${
                currentPage === 'about' ? 'bg-slate-100 border-[#0B2545] text-[#0B2545]' : 'border-slate-200 text-slate-700'
              }`}
            >
              {t.about}
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`p-2 rounded text-left font-medium border ${
                currentPage === 'contact' ? 'bg-slate-100 border-[#0B2545] text-[#0B2545]' : 'border-slate-200 text-slate-700'
              }`}
            >
              {t.contact}
            </button>
          </div>

          <div className="pt-1 text-xs text-slate-500">
            <div>{isMarathi ? 'संपर्क: ७०५९५८७७११ / ९३७१३०१००१' : 'Contact: 7059587711 / 9371301001'}</div>
            <div>{isMarathi ? 'लोणार, जि. बुलढाणा' : 'Lonar, Dist. Buldhana'}</div>
          </div>
        </div>
      )}
    </header>
  );
};
