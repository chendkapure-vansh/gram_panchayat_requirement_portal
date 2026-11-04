import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ProductImage } from '../components/ProductImage';
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  FileCheck,
  Headphones,
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

  const totalDistinctItems = detailedItems.length;

  return (
    <div className="py-2 space-y-6">
      {/* 1. Steps Header (Image 5 Reference: Cart > Your Details > Done) */}
      <div className="bg-white border border-slate-200 rounded p-3 sm:p-4">
        <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-1.5 text-[#0B2545]">
            <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white text-[11px] flex items-center justify-center font-bold">
              1
            </span>
            <span>{isMarathi ? '१. चौकशी कार्ट' : '1. Cart'}</span>
          </div>

          <span className="text-slate-300">·······</span>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[11px] flex items-center justify-center font-bold">
              2
            </span>
            <span>{isMarathi ? '२. संस्था तपशील' : '2. Your Details'}</span>
          </div>

          <span className="text-slate-300">·······</span>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[11px] flex items-center justify-center font-bold">
              3
            </span>
            <span>{isMarathi ? '३. पूर्ण' : '3. Done'}</span>
          </div>
        </div>
      </div>

      {/* Main Cart Content */}
      {totalDistinctItems === 0 ? (
        <div className="bg-white border border-slate-200 rounded p-10 text-center space-y-4 max-w-xl mx-auto">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">{t.emptyCartTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.emptyCartMessage}
          </p>
          <button
            type="button"
            onClick={onContinueBrowsing}
            className="bg-[#0B2545] hover:bg-[#133E87] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded transition-colors"
          >
            {t.exploreCatalogue}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#0B2545]">
                {t.cart} ({totalDistinctItems} {isMarathi ? 'साहित्य प्रकार' : 'items'})
              </h1>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isMarathi ? 'सर्व काढा' : 'Clear All'}</span>
              </button>
            </div>

            {/* Product Rows */}
            <div className="space-y-3">
              {detailedItems.map(({ product, quantity }) => {
                const itemTitle = isMarathi ? product.title : product.titleEn;
                const catName = isMarathi ? product.categoryName : product.categoryNameEn;

                return (
                  <div
                    key={product.id}
                    className="bg-white border border-slate-200 rounded p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                  >
                    {/* Thumbnail + Title */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                        <ProductImage
                          src={product.image}
                          alt={itemTitle}
                          aspectRatio="square"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                          {catName}
                        </span>
                        <h3 className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-2">
                          {itemTitle}
                        </h3>
                        <div className="text-xs text-slate-600 font-medium mt-1">
                          {isMarathi ? 'दर चौकशीवर उपलब्ध' : 'Contact for price'}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper + Remove */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-300 rounded overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded transition-colors text-xs flex items-center gap-1"
                        title={isMarathi ? 'काढा' : 'Remove item'}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sm:hidden">{isMarathi ? 'काढा' : 'Remove'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Browsing Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onContinueBrowsing}
                className="text-xs sm:text-sm font-semibold text-[#0B2545] hover:text-amber-700 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isMarathi ? 'कॅटलॉग पाहणे चालू ठेवा (Continue browsing)' : 'Continue browsing'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order / Enquiry Summary Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded p-4 sm:p-5 space-y-4">
              <h2 className="font-bold text-base text-[#0B2545] border-b border-slate-200 pb-2">
                {isMarathi ? 'मागणी तपशील (Enquiry Summary)' : 'Enquiry Summary'}
              </h2>

              <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>{isMarathi ? 'साहित्य प्रकार:' : 'Distinct Items:'}</span>
                  <span className="font-bold text-slate-900">{totalDistinctItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isMarathi ? 'एकूण संख्या (नग):' : 'Total Quantity:'}</span>
                  <span className="font-bold text-slate-900">{cartCount}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span>{isMarathi ? 'किंमत मॉडेल:' : 'Pricing Model:'}</span>
                  <span className="font-semibold text-slate-900">{isMarathi ? 'दर चौकशीवर उपलब्ध' : 'Contact for price'}</span>
                </div>
              </div>

              {/* Verified Seller Box */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1 text-slate-600">
                <div className="font-bold text-[#0B2545]">{t.sellerName}</div>
                <div>{t.sellerProprietor}</div>
                <div>{t.sellerAddress}</div>
                <div className="text-[11px] text-slate-500 pt-1">
                  {t.gemBadge}
                </div>
              </div>

              {/* Primary Action Button: Proceed to Your Details */}
              <button
                type="button"
                onClick={onProceedToEnquiry}
                className="w-full bg-[#0B2545] hover:bg-[#133E87] text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded transition-colors flex items-center justify-center gap-2"
              >
                <span>{isMarathi ? 'संस्था माहिती भरा (Proceed to Your Details)' : 'Proceed to Your Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Bottom Trust Feature Bar (Canadian Market layout - Verified Facts Only) */}
      <div className="bg-white border border-slate-200 rounded p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-[#0B2545] shrink-0" />
          <div>
            <div className="font-bold text-slate-900">{isMarathi ? 'थेट गावपातळीवर पुरवठा' : 'Direct Village Delivery'}</div>
            <div className="text-slate-500 text-[11px]">{isMarathi ? 'ग्रामपंचायत कार्यालयापर्यंत वाहतूक' : 'Direct transport to village offices'}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-[#0B2545] shrink-0" />
          <div>
            <div className="font-bold text-slate-900">{isMarathi ? 'पारदर्शक कोटेशन' : 'Transparent Quotations'}</div>
            <div className="text-slate-500 text-[11px]">{isMarathi ? 'संस्थात्मक खरेदी नियमांनुसार' : 'As per institutional norms'}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-slate-900">{isMarathi ? 'GeM नोंदणीकृत विक्रेता' : 'GeM Registered Seller'}</div>
            <div className="text-slate-500 text-[11px]">{isMarathi ? 'व्यवसाय-प्रदान माहिती' : 'Business-provided info'}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Headphones className="w-5 h-5 text-[#0B2545] shrink-0" />
          <div>
            <div className="font-bold text-slate-900">{isMarathi ? 'स्थानिक संपर्क व मदत' : 'Local Assistance'}</div>
            <div className="text-slate-500 text-[11px]">{isMarathi ? 'लोणार, जि. बुलढाणा' : 'Lonar, Dist. Buldhana'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
