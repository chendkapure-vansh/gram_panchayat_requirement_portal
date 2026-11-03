import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  ShieldCheck,
  Phone,
  ShoppingBag,
  Globe,
  Menu,
  X,
  FileText,
} from 'lucide-react';

export type ActivePage = 'home' | 'products' | 'details' | 'cart' | 'enquiry' | 'about' | 'contact';

interface HeaderProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { t, language, setLanguage, toggleLanguage, isMarathi } = useLanguage();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navLinks: { id: ActivePage; label: string }[] = [
    { id: 'home', label: t.home },
    { id: 'products', label: t.allProducts },
    { id: 'about', label: t.about },
    { id: 'contact', label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Top GeM-Style Institutional Bar */}
      <div className="bg-gem-navyDark text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> {t.gemBadge}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="text-slate-300 font-medium text-xs">{t.supplierTag}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Language Switcher */}
            <div className="inline-flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs font-bold">
              <Globe className="w-3.5 h-3.5 text-amber-400 mx-1.5" />
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded transition-all tap-target ${
                  language === 'mr'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded transition-all tap-target ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            {/* Click to Call Links */}
            <div className="hidden sm:flex items-center gap-2 font-mono">
              <a href="tel:7059587711" className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>7059587711</span>
              </a>
              <span className="text-slate-600">/</span>
              <a href="tel:9371301001" className="text-slate-300 hover:text-white transition-colors">
                9371301001
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Nav Bar */}
      <div className="bg-gem-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left tap-target group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow group-hover:bg-amber-400 transition-colors">
              R
            </div>
            <div>
              <div className="text-base sm:text-xl font-bold tracking-tight text-white leading-tight">
                {t.siteTitle}
              </div>
              <div className="text-[11px] sm:text-xs text-amber-300/90 font-medium">
                {t.tagline} • {isMarathi ? 'लोणार (बुलढाणा)' : 'Lonar (Buldhana)'}
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`tap-target px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Quick Quote / Enquiry link */}
            <button
              onClick={() => handleNav('enquiry')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 rounded-lg tap-target transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{t.requestQuote}</span>
            </button>

            {/* Cart Counter Button */}
            <button
              onClick={() => handleNav('cart')}
              className={`tap-target flex items-center gap-2 px-3 py-2 rounded-lg border font-bold transition-all shadow-sm ${
                currentPage === 'cart'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-xs sm:text-sm">{t.cart}</span>
              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-xs font-black">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-200 hover:text-white rounded-lg hover:bg-slate-800 tap-target flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gem-navyDark text-white border-t border-slate-800 px-4 py-4 space-y-2 animate-fade-in shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm tap-target flex items-center justify-between ${
                currentPage === link.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{link.label}</span>
            </button>
          ))}

          <button
            onClick={() => handleNav('enquiry')}
            className="w-full text-left px-4 py-3 rounded-lg font-bold text-sm text-amber-300 hover:bg-slate-800 tap-target border border-amber-500/30 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>{t.enquiryFormTitle}</span>
          </button>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>{isMarathi ? 'फोन:' : 'Phone:'} 7059587711 / 9371301001</span>
            <button
              onClick={toggleLanguage}
              className="text-amber-300 font-bold underline"
            >
              {language === 'mr' ? 'Switch to English' : 'मराठीत पहा'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
