import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import { EnquiryProvider } from './context/EnquiryContext';
import { PRODUCTS } from './data/products';
import {
  ShieldCheck,
  Phone,
  CheckCircle2,
  ShoppingBag,
  Globe,
  Plus,
  Minus,
  Trash2,
  FileCheck,
  Check,
} from 'lucide-react';

const PortalDashboard: React.FC = () => {
  const { t, language, toggleLanguage, isMarathi } = useLanguage();
  const {
    cartCount,
    distinctCount,
    detailedItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    feedbackMessage,
  } = useCart();

  const [activeTab, setActiveTab] = useState<'demo' | 'cart'>('demo');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gem-navy text-white px-4 py-3 rounded-lg shadow-xl border-l-4 border-amber-500 flex items-center gap-3 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{feedbackMessage}</span>
        </div>
      )}

      {/* Top GeM-Style Institutional Bar */}
      <div className="bg-gem-navyDark text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-medium text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> {t.gemBadge}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="text-slate-300 text-xs sm:text-sm">{t.supplierTag}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white px-2.5 py-1 rounded transition-colors border border-slate-600 tap-target text-xs font-semibold"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'English' : 'मराठी'}</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <a href="tel:7059587711" className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>7059587711</span>
              </a>
              <span className="text-slate-500">/</span>
              <a href="tel:9371301001" className="hover:text-white transition-colors">
                9371301001
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gem-navy text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-500 text-slate-950 font-black text-xl sm:text-2xl flex items-center justify-center shadow">
              R
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
                {t.siteTitle}
              </h1>
              <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
                {t.tagline} • लोणार (बुलढाणा)
              </p>
            </div>
          </div>

          {/* Cart Quick Action */}
          <button
            onClick={() => setActiveTab(activeTab === 'cart' ? 'demo' : 'cart')}
            className={`tap-target flex items-center gap-2 px-3 py-2 rounded-lg border font-semibold transition-all ${
              activeTab === 'cart'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-800/90 text-white border-slate-700 hover:bg-slate-700'
            }`}
          >
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span className="text-xs sm:text-sm">{t.cart}</span>
            <span className="ml-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-xs font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Phase 2 Status Banner */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4" /> Phase 2 Verified: State & Persistence Layer
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {isMarathi ? 'डेटा साठवणूक व द्विभाषिक प्रणाली कार्यरत' : 'State & Storage System Active'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">निवडलेली भाषा:</span>
              <button
                onClick={toggleLanguage}
                className="bg-gem-navy text-amber-300 hover:text-white px-3 py-1.5 rounded-md text-xs font-bold border border-slate-600 tap-target"
              >
                {language.toUpperCase()} (Switch to {language === 'mr' ? 'English' : 'मराठी'})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block font-semibold">`jr_language` Storage:</span>
              <span className="text-gem-navy font-bold text-base">{language === 'mr' ? 'मराठी (mr)' : 'English (en)'}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block font-semibold">`jr_cart` Storage:</span>
              <span className="text-emerald-700 font-bold text-base">{distinctCount} वस्तू ({cartCount} एकूण नग)</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block font-semibold">`jr_enquiries` Storage:</span>
              <span className="text-gem-navy font-bold text-base">सज्ज (Ready for Phase 4)</span>
            </div>
          </div>
        </div>

        {/* Dynamic View: Cart Drawer vs Product Testing Grid */}
        {activeTab === 'cart' ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                {t.cart} ({cartCount} नग)
              </h3>
              {detailedItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 tap-target"
                >
                  <Trash2 className="w-3.5 h-3.5" /> कार्ट रिकामे करा
                </button>
              )}
            </div>

            {detailedItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-semibold text-slate-700">{t.emptyCartTitle}</h4>
                <p className="text-sm text-slate-500 mt-1 mb-4">{t.emptyCartMessage}</p>
                <button
                  onClick={() => setActiveTab('demo')}
                  className="bg-gem-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gem-navyLight transition-colors tap-target"
                >
                  {t.exploreCatalogue}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="divide-y divide-slate-100">
                  {detailedItems.map(({ product, quantity }) => (
                    <div key={product.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={isMarathi ? product.title : product.titleEn}
                          className="w-16 h-16 object-cover rounded-md border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                            {isMarathi ? product.title : product.titleEn}
                          </h4>
                          <span className="text-xs text-slate-500 block">
                            {isMarathi ? product.categoryName : product.categoryNameEn} • {product.modelCode}
                          </span>
                          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                            {isMarathi ? product.priceLabel : product.priceLabelEn}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="p-2 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed tap-target flex items-center justify-center"
                            title="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 text-sm font-bold text-slate-900 min-w-[2.5rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-2 hover:bg-slate-200 text-slate-700 tap-target flex items-center justify-center"
                            title="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors tap-target"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs sm:text-sm text-amber-900">
                  <p className="font-semibold mb-1">ℹ️ शासकीय खरेदी टीप:</p>
                  <p>{t.priceNote}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t">
                  <button
                    onClick={() => setActiveTab('demo')}
                    className="w-full sm:w-auto px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium tap-target"
                  >
                    ← आणखी उत्पादने जोडा
                  </button>
                  <button
                    onClick={() => alert('Phase 4 मध्ये हा फॉर्म पूर्ण उघडेल!')}
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md tap-target"
                  >
                    <FileCheck className="w-5 h-5" />
                    <span>{t.proceedToEnquiry}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {isMarathi ? 'कॅटलॉगमधील प्रातिनिधिक उत्पादने (State Test Grid)' : 'Representative Catalog Products'}
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {PRODUCTS.length} पैकी ६ उत्पादने चाचणीसाठी दाखवली आहेत
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRODUCTS.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={isMarathi ? product.title : product.titleEn}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-gem-navy/90 text-amber-300 text-xs px-2.5 py-1 rounded font-semibold backdrop-blur-sm">
                      {isMarathi ? product.categoryName : product.categoryNameEn}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 leading-snug mb-1">
                        {isMarathi ? product.title : product.titleEn}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {isMarathi ? product.shortDescription : product.shortDescriptionEn}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 border-t pt-2">
                        <span>मॉडेल: <strong className="text-slate-700">{product.modelCode}</strong></span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          {isMarathi ? product.priceLabel : product.priceLabelEn}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product.id, 1)}
                        className="w-full bg-gem-navy hover:bg-gem-navyLight text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors tap-target text-sm"
                      >
                        <Plus className="w-4 h-4 text-amber-400" />
                        <span>{t.addToCart}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gem-navyDark text-slate-400 py-6 text-sm border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="text-slate-300 font-semibold">{t.sellerName}</p>
            <p className="text-xs text-slate-400">
              {t.sellerAddress} | {t.sellerProprietor}
            </p>
          </div>
          <p className="text-xs text-slate-400 max-w-md text-center sm:text-right">
            {t.disclaimerText}
          </p>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <EnquiryProvider>
          <PortalDashboard />
        </EnquiryProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
