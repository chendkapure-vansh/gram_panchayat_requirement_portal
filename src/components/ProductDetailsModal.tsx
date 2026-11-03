import React, { useState } from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { SpecificationsTable } from './SpecificationsTable';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Phone,
  FileText,
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuoteNow: (product: Product, quantity: number) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onRequestQuoteNow,
}) => {
  const { isMarathi, t } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const title = isMarathi ? product.title : product.titleEn;
  const categoryName = isMarathi ? product.categoryName : product.categoryNameEn;
  const description = isMarathi ? product.description : product.descriptionEn;
  const priceLabel = isMarathi ? product.priceLabel : product.priceLabelEn;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-scale-up my-6 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-gem-navy text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded">
              {categoryName}
            </span>
            <span className="text-xs text-slate-300 font-mono hidden sm:inline">
              {product.modelCode}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors tap-target flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          {/* Main 2-Column Product Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Left: Image Container */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <img
                  src={product.image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* GeM Compliance & Make in India Badges */}
              <div className="flex items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  GeM Approved Quality
                </span>
                {product.makeInIndia && (
                  <span className="text-emerald-800 font-bold bg-emerald-100/70 px-2 py-0.5 rounded">
                    Make in India 🇮🇳
                  </span>
                )}
              </div>
            </div>

            {/* Right: Title, Description, Quantity & Actions */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
                  {title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {description}
                </p>

                {/* Price / Quote Status */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl mb-4">
                  <div className="text-xs text-emerald-800 font-semibold mb-0.5">
                    {isMarathi ? 'शासकीय खरेदी दर स्थिति:' : 'Procurement Pricing Status:'}
                  </div>
                  <div className="text-lg font-extrabold text-emerald-900">
                    {priceLabel}
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-1">
                    {t.priceNote}
                  </p>
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-700">
                    {t.quantity}:
                  </span>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-slate-200 text-slate-700 disabled:opacity-40 tap-target flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 py-1 text-sm font-bold text-slate-900 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-slate-200 text-slate-700 tap-target flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="tap-target bg-gem-navy hover:bg-gem-navyLight text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>{t.addToCart}</span>
                  </button>

                  <button
                    onClick={() => onRequestQuoteNow(product, quantity)}
                    className="tap-target bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t.requestQuote}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Section (GeM Style Table) */}
          <div className="pt-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>{t.specifications}</span>
            </h3>
            <SpecificationsTable
              specifications={product.specifications}
              modelCode={product.modelCode}
              warranty={product.warranty}
              warrantyEn={product.warrantyEn}
              makeInIndia={product.makeInIndia}
            />
          </div>

          {/* Verified Seller Details Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
            <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>{t.sellerDetails}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div>
                <strong>विक्रेता:</strong> {t.sellerName}
              </div>
              <div>
                <strong>संचालक:</strong> {t.sellerProprietor}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{t.sellerAddress}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>7059587711 / 9371301001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
