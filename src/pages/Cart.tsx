import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  FileCheck,
  ArrowLeft,
  Info,
  ShieldCheck,
} from 'lucide-react';

interface CartPageProps {
  onContinueBrowsing: () => void;
  onProceedToEnquiry: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onContinueBrowsing,
  onProceedToEnquiry,
}) => {
  const { t, isMarathi } = useLanguage();
  const {
    cartCount,
    detailedItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (detailedItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            {t.emptyCartTitle}
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            {t.emptyCartMessage}
          </p>
          <button
            onClick={onContinueBrowsing}
            className="tap-target bg-gem-navy hover:bg-gem-navyLight text-white font-bold px-7 py-3 rounded-xl text-sm transition-colors shadow-md"
          >
            {t.exploreCatalogue}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-amber-600" />
            <span>{t.cart}</span>
            <span className="text-sm font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              {cartCount} {isMarathi ? 'एकूण नग' : 'total quantity'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isMarathi ? 'ग्रामपंचायत खरेदी चौकशीसाठी निवडलेल्या वस्तू' : 'Selected items for institutional procurement enquiry'}
          </p>
        </div>

        <button
          onClick={clearCart}
          className="self-start sm:self-auto text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 tap-target"
        >
          <Trash2 className="w-4 h-4" />
          <span>{isMarathi ? 'संपूर्ण कार्ट रिकामे करा' : 'Clear Entire Cart'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-8 space-y-6">
        {/* Line Items List */}
        <div className="divide-y divide-slate-100">
          {detailedItems.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={isMarathi ? product.title : product.titleEn}
                  className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {isMarathi ? product.title : product.titleEn}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    <span>{isMarathi ? product.categoryName : product.categoryNameEn}</span>
                    {product.modelCode && <span> • {isMarathi ? 'कोड:' : 'Code:'} {product.modelCode}</span>}
                  </div>
                  <span className="inline-block mt-1 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded">
                    {isMarathi ? product.priceLabel : product.priceLabelEn}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 shadow-inner">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed tap-target flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1 text-sm font-bold text-slate-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-2.5 hover:bg-slate-200 text-slate-700 tap-target flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors tap-target"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Transparency Banner (Per Brief Rule: No fabricated total) */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">
              {isMarathi ? 'शासकीय खरेदी दर व कोटेशन पद्धत:' : 'Institutional Pricing Note:'}
            </p>
            <p className="text-amber-900 leading-relaxed">
              {t.priceNote} {isMarathi ? 'अंतिम दर मागणी संख्या, वाहतूक अंतर आणि शासकीय निकषांनुसार निश्चित करून अधिकृत कोटेशन दिले जाते.' : 'Final rates are determined based on quantities, logistics, and institutional criteria upon formal quotation.'}
            </p>
          </div>
        </div>

        {/* Cart Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-200">
          <button
            onClick={onContinueBrowsing}
            className="w-full sm:w-auto px-5 py-3 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors tap-target flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isMarathi ? 'आणखी उत्पादने जोडा' : 'Continue Browsing'}</span>
          </button>

          <button
            onClick={onProceedToEnquiry}
            className="tap-target w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
          >
            <FileCheck className="w-5 h-5" />
            <span>{t.proceedToEnquiry}</span>
          </button>
        </div>
      </div>

      {/* Trust Reminder */}
      <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>{isMarathi ? 'जाणता राजा एंटरप्राइजेस • GeM अधिकृत विक्रेता • लोणार (बुलढाणा)' : 'Jaanta Raja Enterprises • GeM Authorised Seller • Lonar (Buldhana)'}</span>
      </div>
    </div>
  );
};

