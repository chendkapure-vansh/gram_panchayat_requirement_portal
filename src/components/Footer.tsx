import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ActivePage } from './Header';
import { Phone, MapPin, ShieldAlert, Award, MessageCircle } from 'lucide-react';
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
    <footer className="bg-gem-navyDark text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Identity & GeM Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow">
                R
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">
                  {t.siteTitle}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  Jaanta Raja Enterprises
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isMarathi
                ? 'ग्रामपंचायती, नगर परिषदा, जिल्हा परिषद, पंचायत समिती कार्यालये, शाळा, महाविद्यालये व शासकीय रुग्णालयांसाठी दर्जेदार साहित्य पुरवठादार.'
                : 'Trusted supplier of quality infrastructure and technology equipment for Gram Panchayats, schools, and local government bodies.'}
            </p>

            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded text-xs text-amber-300 font-semibold">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>GeM Authorised Seller (नोंदणीकृत विक्रेता)</span>
            </div>
          </div>

          {/* Col 2: Categories Shortcuts */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t.categories}
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    • {isMarathi ? cat.name : cat.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Useful Links & Portal Pages */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {isMarathi ? 'महत्त्वाच्या लिंक्स' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  • {t.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-amber-400 transition-colors"
                >
                  • {t.allProducts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cart')}
                  className="hover:text-amber-400 transition-colors"
                >
                  • {t.cart}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('enquiry')}
                  className="hover:text-amber-400 transition-colors"
                >
                  • {t.enquiryFormTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  • {t.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  • {t.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t.contact}
            </h4>

            <div className="text-xs space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{isMarathi ? 'पत्ता:' : 'Address:'}</strong> {isMarathi ? 'स्टेट बँक समोर, लोणार, जि. बुलढाणा - ४४३३०२' : 'Opposite State Bank, Lonar, Dist. Buldhana - 443302'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:7059587711" className="hover:text-white font-mono font-bold">
                  7059587711
                </a>
                <span>/</span>
                <a href="tel:9371301001" className="hover:text-white font-mono font-bold">
                  9371301001
                </a>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                <strong>{isMarathi ? 'संचालक:' : 'Proprietor:'}</strong> {isMarathi ? 'प्रो. प्रा. सचिन गायकवाड' : 'Prof. Sachin Gaikwad'}
              </p>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/917059587711?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0%2C%20%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%AA%E0%A4%82%E0%A4%9a%E0%A4%BE%E0%A4%AF%E0%A4%A4%20%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF%20%E0%A4%96%E0%A4%B0%E0%A5%87%E0%A4%A6%E0%A5%80%20%E0%A4%9A%E0%A5%8C%E0%A4%95%E0%A4%B8%E0%A5%80%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%95%20%E0%A4%95%E0%A5%87%E0%A4%B2%E0%A4%BE%20%E0%A4%86%E0%A4%B9%E0%A5%87."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm tap-target w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isMarathi ? 'WhatsApp वर थेट संपर्क करा' : 'Contact Direct on WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-300">
              {isMarathi ? 'वैधानिक सूचना (Statutory Disclaimer): ' : 'Statutory Disclaimer: '}
            </span>
            {t.disclaimerText} {isMarathi ? 'हे पोर्टल शासकीय व संस्थात्मक खरेदी सुलभतेसाठीचे खाजगी कॅटलॉग व कोटेशन नोंदणी साधन आहे.' : 'This portal is a private procurement catalogue and quotation utility.'}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} {isMarathi ? 'जाणता राजा एंटरप्राइजेस (Jaanta Raja Enterprises). सर्व हक्क सुरक्षित.' : 'Jaanta Raja Enterprises. All rights reserved.'}</p>
          <p>{isMarathi ? 'गुणवत्ता • विश्वास • वेळेत सेवा' : 'Quality • Trust • Timely Service'}</p>
        </div>
      </div>
    </footer>
  );
};
