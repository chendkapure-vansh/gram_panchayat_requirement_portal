import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryTiles } from '../components/CategoryTiles';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';

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

  // Selected categories for horizontal product rows
  const showcaseCategories = [
    { slug: 'water-systems', titleMr: 'पाणीपुरवठा साहित्य व RO सिस्टिम्स', titleEn: 'Water Purification & Supply' },
    { slug: 'playground-gym', titleMr: 'खेळ व ओपन जिम साहित्य', titleEn: 'Playground & Open Gym Equipment' },
    { slug: 'civic-infrastructure', titleMr: 'ग्रामपंचायत नागरी सुविधा साहित्य', titleEn: 'Village Infrastructure & Civic Products' },
    { slug: 'power-solar-safety', titleMr: 'पॉवर, सोलर व सुरक्षा उपकरणे', titleEn: 'Power, Solar & Safety Supplies' },
  ];

  return (
    <div className="space-y-8 py-2">
      {/* 1. Slim Hero with search + real photo & stats-style strip */}
      <Hero
        onExplore={onExploreAll}
        onRequestQuote={onRequestQuote}
        onSearch={onSearch}
      />

      {/* 2. Image-based category tiles */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B2545]">
              {isMarathi ? 'साहित्य वर्गवारी (Categories)' : 'Browse by Category'}
            </h2>
            <p className="text-xs text-slate-500">
              {isMarathi ? '४ मुख्य कॅटलॉग विभाग' : '4 core catalogue categories'}
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreAll}
            className="text-xs sm:text-sm font-semibold text-[#0B2545] hover:text-amber-700 flex items-center gap-1"
          >
            <span>{isMarathi ? 'सर्व पहा' : 'View All'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <CategoryTiles
          categories={CATEGORIES}
          onSelectCategory={onSelectCategory}
        />
      </div>

      {/* 3. Horizontal product rows per category */}
      <div className="space-y-8">
        {showcaseCategories.map((showcase) => {
          const catProducts = PRODUCTS.filter((p) => p.category === showcase.slug).slice(0, 4);
          if (catProducts.length === 0) return null;

          return (
            <section key={showcase.slug} className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2545]">
                    {isMarathi ? showcase.titleMr : showcase.titleEn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCategory(showcase.slug)}
                  className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B2545] flex items-center gap-1"
                >
                  <span>{isMarathi ? 'अधिक उत्पादने' : 'View Category'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4-column product grid (2 on mobile) */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {catProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={onSelectProduct}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. Quote Call-to-Action band with Phone & WhatsApp */}
      <div className="bg-[#0B2545] text-white rounded p-5 sm:p-7 border border-slate-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold">
              {isMarathi
                ? 'ग्रामपंचायत किंवा संस्था खरेदीसाठी कोटेशन हवे आहे?'
                : 'Need a quotation for Gram Panchayat or institutional procurement?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {isMarathi
                ? 'जाणता राजा एंटरप्राइजेस, लोणार, जि. बुलढाणा • प्रो. प्रा. सचिन गायकवाड'
                : 'Jaanta Raja Enterprises, Lonar, Dist. Buldhana • Prop. Prof. Sachin Gaikwad'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <a
              href="tel:7059587711"
              className="flex-1 md:flex-none bg-white hover:bg-slate-100 text-[#0B2545] text-xs sm:text-sm font-semibold px-4 py-2.5 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>{isMarathi ? 'कॉल करा: ७०५९५८७७११' : 'Call: 7059587711'}</span>
            </a>

            <a
              href="https://wa.me/917059587711?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0%2C%20%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%AA%E0%A4%82%E0%A4%9a%E0%A4%BE%E0%A4%AF%E0%A4%A4%20%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF%20%E0%A4%96%E0%A4%B0%E0%A5%87%E0%A4%A6%E0%A5%80%20%E0%A4%9A%E0%A5%8C%E0%A4%95%E0%A4%B8%E0%A5%80%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%95%20%E0%A4%95%E0%A5%87%E0%A4%B2%E0%A4%BE%20%E0%A4%86%E0%A4%B9%E0%A5%87."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
