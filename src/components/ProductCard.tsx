import React from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Check, ShoppingBag } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { isMarathi } = useLanguage();
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const title = isMarathi ? product.title : product.titleEn;
  const categoryName = isMarathi ? product.categoryName : product.categoryNameEn;
  const shortDesc = isMarathi ? product.shortDescription : product.shortDescriptionEn;

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
      className="bg-white border border-slate-200 rounded p-3 sm:p-3.5 flex flex-col justify-between hover:border-slate-400 transition-colors cursor-pointer group"
    >
      <div>
        {/* Fixed 1:1 Aspect Ratio Cropped Photo on White Square Tile */}
        <div className="relative">
          <ProductImage
            src={product.image}
            alt={title}
            aspectRatio="square"
            className="group-hover:opacity-95 transition-opacity"
          />
          {inCart && (
            <span className="absolute top-2 right-2 bg-[#0B2545] text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>{isMarathi ? 'कार्टमध्ये' : 'In Cart'} ({qty})</span>
            </span>
          )}
        </div>

        {/* Category Label */}
        <div className="mt-2.5 text-[11px] font-medium text-slate-500 uppercase tracking-wide">
          {categoryName}
        </div>

        {/* Product Name (Strictly 2 lines max) */}
        <h3
          className="mt-1 text-sm sm:text-base font-semibold text-[#0B2545] group-hover:text-amber-700 transition-colors line-clamp-2 h-10 sm:h-12 leading-snug"
          title={title}
        >
          {title}
        </h3>

        {/* One-Line Description */}
        <p className="mt-1 text-xs text-slate-500 line-clamp-1">
          {shortDesc}
        </p>
      </div>

      {/* Bottom Area: Price & Action Buttons */}
      <div className="mt-3 pt-2.5 border-t border-slate-100">
        {/* Contact for price */}
        <div className="text-xs sm:text-sm font-medium text-slate-700 mb-2.5">
          {isMarathi ? 'दर चौकशीवर उपलब्ध' : 'Contact for price'}
        </div>

        {/* Buttons: "Get Quote" button + small "Add to Enquiry" */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDetails();
            }}
            className="flex-1 bg-[#0B2545] hover:bg-[#133E87] text-white text-xs sm:text-sm font-medium py-2 px-3 rounded text-center transition-colors truncate"
          >
            {isMarathi ? 'कोटेशन मिळवा' : 'Get Quote'}
          </button>

          <button
            type="button"
            onClick={handleAdd}
            title={isMarathi ? 'चौकशीत जोडा' : 'Add to Enquiry'}
            className={`border py-2 px-2.5 rounded flex items-center justify-center transition-colors shrink-0 ${
              inCart
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                : 'border-slate-300 hover:border-[#0B2545] bg-slate-50 text-slate-700 hover:text-[#0B2545]'
            }`}
          >
            {inCart ? (
              <Check className="w-4 h-4 text-emerald-700" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-slate-700" />
            )}
            <span className="sr-only">{isMarathi ? 'चौकशीत जोडा' : 'Add to Enquiry'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
