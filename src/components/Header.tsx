import React from 'react';
import { Phone, ShoppingCart, Globe, Shield } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  cartCount: number;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  cartCount,
  activeTab,
  onSelectTab,
  onOpenCart,
}) => {
  const isMr = language === 'mr';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Institutional Bar */}
      <div className="bg-[#0B2545] text-slate-100 text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              {isMr ? 'अधिकृत संस्थात्मक पुरवठादार' : 'Institutional Procurement Supplier'}
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300">
              {isMr
                ? 'ग्रामपंचायत, शाळा व शासकीय संस्थांसाठी अधिकृत कॅटलॉग'
                : 'Procurement catalogue for Gram Panchayat & institutional requirements'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-slate-200">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isMr ? 'हेल्पलाईन:' : 'Helpline:'}</span>
              <a href="tel:7059587711" className="font-semibold hover:text-white hover:underline">
                7059587711
              </a>
              <span>/</span>
              <a href="tel:9371301001" className="font-semibold hover:text-white hover:underline">
                9371301001
              </a>
            </div>

            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs px-2.5 py-1 rounded border border-slate-600 transition-colors"
              title={isMr ? 'Switch to English' : 'मराठीत बदला'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-bold">{isMr ? 'English' : 'मराठी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Entity Name */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-12 h-12 rounded-lg bg-[#0B2545] border-2 border-amber-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              <span className="text-amber-400">R</span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight leading-tight">
                {isMr ? 'जाणता राजा एंटरप्राइजेस' : 'Jaanta Raja Enterprises'}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {isMr ? 'लोणार, जि. बुलढाणा • प्रो. प्रा. सचिन गायकवाड' : 'Lonar, Dist. Buldhana • Institutional Supplier'}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'home', labelMr: 'मुख्यपृष्ठ', labelEn: 'Home' },
              { id: 'products', labelMr: 'सर्व उत्पादने', labelEn: 'All Products' },
              { id: 'categories', labelMr: 'वर्गवारी', labelEn: 'Categories' },
              { id: 'about', labelMr: 'आमच्याबद्दल', labelEn: 'About Us' },
              { id: 'contact', labelMr: 'संपर्क', labelEn: 'Contact' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#0B2545] text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#0B2545]'
                }`}
              >
                {isMr ? tab.labelMr : tab.labelEn}
              </button>
            ))}
          </nav>

          {/* Cart / Enquiry Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-transform active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-200" />
              <span>{isMr ? 'चौकशी कार्ट' : 'Enquiry Cart'}</span>
              <span className="bg-white text-emerald-800 text-xs font-black rounded-full px-2 py-0.5 ml-1">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="lg:hidden flex items-center justify-around gap-1 pt-3 mt-2 border-t border-slate-100 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'home', labelMr: 'मुख्यपृष्ठ', labelEn: 'Home' },
            { id: 'products', labelMr: 'उत्पादने', labelEn: 'Products' },
            { id: 'categories', labelMr: 'वर्गवारी', labelEn: 'Categories' },
            { id: 'about', labelMr: 'आमच्याबद्दल', labelEn: 'About' },
            { id: 'contact', labelMr: 'संपर्क', labelEn: 'Contact' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-2.5 py-1.5 rounded transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#0B2545] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {isMr ? tab.labelMr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
