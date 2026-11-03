import React from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Plus, Check, Eye, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { isMarathi, t } = useLanguage();
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const title = isMarathi ? product.title : product.titleEn;
  const categoryName = isMarathi ? product.categoryName : product.categoryNameEn;
  const shortDesc = isMarathi ? product.shortDescription : product.shortDescriptionEn;
  const priceLabel = isMarathi ? product.priceLabel : product.priceLabelEn;

  const inCart = isInCart(product.id);
  const qty = getItemQuantity(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  const handleDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <div
      onClick={handleDetails}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer focus-within:ring-2 focus-within:ring-amber-500"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Pill */}
        <span className="absolute top-2.5 left-2.5 bg-gem-navy/90 text-amber-300 text-xs px-2.5 py-1 rounded font-semibold shadow-sm backdrop-blur-sm">
          {categoryName}
        </span>

        {/* GeM Seller Indicator Tag */}
        <div className="absolute top-2.5 right-2.5 bg-white/95 text-slate-800 text-[11px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1 font-semibold border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>GeM</span>
        </div>

        {/* In Cart Indicator Ribbon */}
        {inCart && (
          <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow">
            <Check className="w-3 h-3" /> {t.inCart} ({qty})
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{product.modelCode || 'GeM Catalog Item'}</span>
            {product.makeInIndia && (
              <span className="text-emerald-700 font-semibold">Make In India 🇮🇳</span>
            )}
          </div>

          <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-gem-navyLight transition-colors line-clamp-2 mb-1.5">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3">
            {shortDesc}
          </p>
        </div>

        {/* Bottom Section: Price & Action Buttons */}
        <div>
          {/* Institutional Price Status Tag */}
          <div className="mb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {isMarathi ? 'शासकीय खरेदी दर:' : 'Procurement Rate:'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">
              {priceLabel}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDetails}
              className="tap-target border border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4 text-slate-600" />
              <span>{t.viewDetails}</span>
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className="tap-target bg-gem-navy hover:bg-gem-navyLight text-white text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>{t.addToCart}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
