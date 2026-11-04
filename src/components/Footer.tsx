import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ActivePage } from './Header';
import { Phone, MapPin, ShieldCheck, User } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onSelectCategory?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const { t, isMarathi } = useLanguage();

  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
    onNavigate('products');
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-700 pt-10 pb-8 mt-auto text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
          {/* Col 1: Wordmark & Business Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#0B2545] text-white font-bold text-sm flex items-center justify-center">
                JR
              </div>
              <div>
                <h3 className="font-bold text-[#0B2545] text-base leading-tight">
                  {t.siteTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  Jaanta Raja Enterprises
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {isMarathi
                ? 'ग्रामपंचायती, शाळा व शासकीय संस्थांसाठी पाणीपुरवठा, खेळ व ओपन जिम, नागरी सुविधा, पॉवर व सोलर साहित्य पुरवठादार.'
                : 'Procurement catalogue for Gram Panchayats and public institutions. Lonar, Dist. Buldhana.'}
            </p>

            <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-medium">{t.gemBadge}</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-bold text-[#0B2545] text-xs uppercase tracking-wider mb-3">
              {t.categories}
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="text-slate-600 hover:text-[#0B2545] transition-colors text-left"
                  >
                    {isMarathi ? cat.name : cat.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="font-bold text-[#0B2545] text-xs uppercase tracking-wider mb-3">
              {isMarathi ? 'दुवे (Links)' : 'Quick Links'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-slate-600 hover:text-[#0B2545] transition-colors"
                >
                  {t.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="text-slate-600 hover:text-[#0B2545] transition-colors"
                >
                  {t.allProducts}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('cart')}
                  className="text-slate-600 hover:text-[#0B2545] transition-colors"
                >
                  {t.cart}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('enquiry')}
                  className="text-slate-600 hover:text-[#0B2545] transition-colors"
                >
                  {isMarathi ? 'कोटेशन मागणी अर्ज' : 'Enquiry Form'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-slate-600 hover:text-[#0B2545] transition-colors"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-slate-600 hover:text-[#0B2545] transition-colors"
                >
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#0B2545] text-xs uppercase tracking-wider mb-3">
              {t.sellerDetails}
            </h4>

            <div className="flex items-start gap-2 text-xs text-slate-600">
              <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>{t.sellerProprietor}</div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>{t.sellerAddress}</div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-600 pt-1">
              <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="font-mono">
                <a href="tel:7059587711" className="hover:text-[#0B2545]">
                  7059587711
                </a>{' '}
                /{' '}
                <a href="tel:9371301001" className="hover:text-[#0B2545]">
                  9371301001
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {t.siteTitle}. {isMarathi ? 'सर्व हक्क राखीव.' : 'All rights reserved.'}
          </div>
          <div className="text-center sm:text-right text-[11px]">
            {t.disclaimerText}
          </div>
        </div>
      </div>
    </footer>
  );
};
