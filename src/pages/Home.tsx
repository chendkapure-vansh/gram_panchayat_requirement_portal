import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { SearchBar } from '../components/SearchBar';
import { CategoryTiles } from '../components/CategoryTiles';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
} from 'lucide-react';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onExploreAll: () => void;
  onSelectCategory: (slug: string) => void;
  onRequestQuote: () => void;
  onSearch: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onExploreAll,
  onSelectCategory,
  onRequestQuote,
  onSearch,
}) => {
  const { isMarathi } = useLanguage();
  const [homeSearchTerm, setHomeSearchTerm] = useState('');
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  const handleSearchSubmit = (term: string) => {
    setHomeSearchTerm(term);
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12 py-2">
      <Hero
        onExplore={onExploreAll}
        onRequestQuote={onRequestQuote}
      />

      <div className="max-w-3xl mx-auto -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-200">
          <SearchBar
            value={homeSearchTerm}
            onChange={handleSearchSubmit}
            onClear={() => setHomeSearchTerm('')}
            placeholder={
              isMarathi
                ? 'येथे साहित्याचे नाव शोधा (उदा. RO प्लांट, पथदिवा, डस्टबिन)...'
                : 'Search equipment (e.g. RO Plant, Street Light, Dustbin)...'
            }
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {isMarathi ? 'ग्रामपंचायत गरजेनुसार साहित्य वर्गवारी' : 'Shop by Gram Panchayat Need'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isMarathi ? '१० अधिकृत शासकीय कॅटलॉग विभाग' : '10 Official Catalogue Categories'}
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="text-xs sm:text-sm font-bold text-gem-navy hover:text-gem-navyLight flex items-center gap-1 tap-target self-start sm:self-auto"
          >
            <span>{isMarathi ? 'सर्व कॅटेगरीज पहा' : 'View All Categories'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <CategoryTiles
          categories={CATEGORIES}
          onSelectCategory={onSelectCategory}
        />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md text-xs font-bold mb-1 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'लोकप्रिय / महत्त्वाची उत्पादने' : 'Featured Institutional Products'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isMarathi ? 'शासकीय खरेदीसाठी प्राधान्य उत्पादने' : 'High Priority Products'}
            </h2>
          </div>

          <button
            onClick={onExploreAll}
            className="tap-target bg-gem-navy hover:bg-gem-navyLight text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
          >
            <span>{isMarathi ? 'सर्व उत्पादने पहा' : 'View All Products'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onSelectProduct}
            />
          ))}
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-md">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            {isMarathi ? 'आमची वैशिष्ट्ये' : 'Why Choose Us'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {isMarathi ? 'प्रत्येक शासकीय खरेदीसाठी विश्वासू नाव' : 'Trusted Institutional Supplier'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            {isMarathi
              ? 'गुणवत्ता • विश्वास • वेळेत सेवा — जाणता राजा एंटरप्राइजेस, लोणार'
              : 'Quality • Trust • Timely Service — Jaanta Raja Enterprises, Lonar'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto sm:mx-0 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">
              {isMarathi ? 'GeM पोर्टलद्वारे सुलभ खरेदी' : 'Easy Procurement via GeM'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isMarathi
                ? 'शासकीय नियमांनुसार पारदर्शक दर, अधिकृत बिलिंग आणि विनात्रास खरेदी प्रक्रिया.'
                : 'Transparent pricing, official billing, and seamless purchase workflow under government norms.'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto sm:mx-0 mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">
              {isMarathi ? 'दर्जेदार व प्रमाणित उत्पादने' : 'Certified Quality Products'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isMarathi
                ? 'प्रत्येक उत्पादनाची चाचणी व हमी. निकृष्ट किंवा अनधिकृत साहित्य पुरवले जात नाही.'
                : 'Pre-tested institutional grade equipment meeting ISI, ISO, and public procurement standards.'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto sm:mx-0 mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">
              {isMarathi ? 'वेळेत पोहोच व थेट मार्गदर्शन' : 'Timely Village Delivery & Guidance'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isMarathi
                ? 'गावपातळीवर थेट वाहतूक पुरवठा आणि आवश्यकतेनुसार तांत्रिक मार्गदर्शन व मदत.'
                : 'Direct transport logistics to village offices and dedicated post-sale technical support.'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {isMarathi ? 'थेट कोटेशन किंवा चौकशीसाठी आजच संपर्क साधा' : 'Need an Official Quotation Today?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {isMarathi
              ? 'प्रो. प्रा. सचिन गायकवाड (लोणार, जि. बुलढाणा) — मोबाईल: 7059587711 / 9371301001'
              : 'Prop. Prof. Sachin Gaikwad (Lonar, Dist. Buldhana) — Mobile: 7059587711 / 9371301001'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <a
            href="tel:7059587711"
            className="tap-target flex-1 md:flex-none bg-gem-navy hover:bg-gem-navyLight text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>{isMarathi ? 'कॉल करा' : 'Call Now'}</span>
          </a>

          <a
            href="https://wa.me/917059587711?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0%2C%20%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%AA%E0%A4%82%E0%A4%9a%E0%A4%BE%E0%A4%AF%E0%A4%A4%20%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF%20%E0%A4%96%E0%A4%B0%E0%A5%87%E0%A4%A6%E0%A5%80%20%E0%A4%9A%E0%A5%8C%E0%A4%95%E0%A4%B8%E0%A5%80%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%95%20%E0%A4%95%E0%A5%87%E0%A4%B2%E0%A4%BE%20%E0%A4%86%E0%A4%B9%E0%A5%87."
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
