import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuoteNow: (product: Product, quantity: number) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onRequestQuoteNow,
}) => {
  const { isMarathi, t } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<'details' | 'specs' | null>('details');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const title = isMarathi ? product.title : product.titleEn;
  const categoryName = isMarathi ? product.categoryName : product.categoryNameEn;
  const fullDesc = isMarathi ? product.description : product.descriptionEn;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-2xl rounded border border-slate-300 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0B2545] text-white px-4 py-3 flex items-center justify-between shrink-0">
          <span className="text-xs font-semibold text-slate-200">
            {categoryName}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div className="w-full">
              <ProductImage
                src={product.image}
                alt={title}
                aspectRatio="square"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#0B2545] leading-snug">
                {title}
              </h2>

              <div className="text-xs text-slate-600">
                {isMarathi ? product.shortDescription : product.shortDescriptionEn}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-500">{isMarathi ? 'खरेदी दर:' : 'Procurement Pricing:'}</div>
                <div className="text-sm sm:text-base font-bold text-slate-900">
                  {isMarathi ? 'दर चौकशीवर उपलब्ध' : 'Contact for price'}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-slate-600">{t.quantity}:</span>
                <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs hover:bg-slate-100"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs hover:bg-slate-100"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-semibold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-500" />
                  <span>{t.addToCart}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRequestQuoteNow(product, quantity)}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 px-3 rounded transition-colors"
                >
                  <span>{isMarathi ? 'थेट कोटेशन फॉर्म' : 'Proceed to Quote'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Accordion specs */}
          <div className="border border-slate-200 rounded divide-y divide-slate-200 text-xs mt-4">
            <div>
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'details' ? null : 'details')}
                className="w-full p-2.5 flex items-center justify-between font-semibold text-slate-800"
              >
                <span>{isMarathi ? 'उत्पादन वर्णन' : 'Product Overview'}</span>
                <ChevronDown className={`w-3.5 h-3.5 ${activeAccordion === 'details' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'details' && (
                <div className="p-3 text-slate-600 border-t border-slate-100">
                  {fullDesc}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setActiveAccordion(activeAccordion === 'specs' ? null : 'specs')}
                className="w-full p-2.5 flex items-center justify-between font-semibold text-slate-800"
              >
                <span>{isMarathi ? 'तांत्रिक तपशील' : 'Specifications on Request'}</span>
                <ChevronDown className={`w-3.5 h-3.5 ${activeAccordion === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'specs' && (
                <div className="p-3 border-t border-slate-100">
                  {product.specifications && product.specifications.length > 0 ? (
                    <table className="w-full text-left">
                      <tbody className="divide-y divide-slate-100">
                        {product.specifications.map((s, idx) => (
                          <tr key={idx}>
                            <td className="py-1 text-slate-500 font-medium">{isMarathi ? s.label : s.labelEn || s.label}</td>
                            <td className="py-1 text-slate-900 font-semibold">{isMarathi ? s.value : s.valueEn || s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <span className="text-slate-500">उपलब्ध</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.gemBadge}</span>
          </div>
          <div>लोणार, जि. बुलढाणा</div>
        </div>
      </div>
    </div>
  );
};
