import React from 'react';
import { ShoppingCart, Eye, Check, ShieldCheck } from 'lucide-react';
import { Product, Language } from '../types';

interface ProductCardProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onAddToCart,
  onViewDetails,
  isAdded = false,
}) => {
  const isMr = language === 'mr';

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      {/* Product Image & Badges */}
      <div>
        <div
          onClick={() => onViewDetails(product)}
          className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden cursor-pointer group"
        >
          <img
            src={product.image}
            alt={isMr ? product.title : product.titleEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="bg-[#0B2545]/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
              {isMr ? product.categoryName : product.categoryNameEn}
            </span>
            {product.makeInIndia && (
              <span className="bg-emerald-700/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Make In India
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {product.modelCode && (
            <div className="text-[11px] text-slate-500 font-mono mb-1 font-semibold">
              कॅटलॉग कोड: {product.modelCode}
            </div>
          )}

          <h3
            onClick={() => onViewDetails(product)}
            className="font-bold text-slate-900 text-base sm:text-lg leading-snug line-clamp-2 hover:text-amber-700 cursor-pointer mb-2"
          >
            {isMr ? product.title : product.titleEn}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {isMr ? product.shortDescription : product.shortDescriptionEn}
          </p>

          {/* Institutional Price / Enquiry Status strictly matching PDF */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 mb-4">
            <div className="text-[11px] text-slate-500 font-medium">
              {isMr ? 'किंमत स्थिती (Pricing):' : 'Pricing Status:'}
            </div>
            <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>{isMr ? product.priceLabel : product.priceLabelEn}</span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/80 px-1.5 py-0.5 rounded">
                {isMr ? 'शासकीय कोटेशन' : 'Official Quote'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0 flex gap-2">
        <button
          onClick={() => onViewDetails(product)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold py-2.5 px-3 rounded-lg border border-slate-300 transition-colors"
        >
          <Eye className="w-4 h-4 text-slate-600" />
          <span>{isMr ? 'तपशील' : 'Details'}</span>
        </button>

        <button
          onClick={() => onAddToCart(product)}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold py-2.5 px-3 rounded-lg shadow-sm transition-all active:scale-95 ${
            isAdded
              ? 'bg-emerald-700 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>{isMr ? 'जोडले!' : 'Added!'}</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>{isMr ? 'कार्टमध्ये जोडा' : 'Add to Cart'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
