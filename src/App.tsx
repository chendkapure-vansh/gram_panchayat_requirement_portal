import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import { EnquiryProvider } from './context/EnquiryContext';
import { Header, ActivePage } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { CategoryTiles } from './components/CategoryTiles';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { CATEGORIES } from './data/categories';
import { PRODUCTS } from './data/products';
import { Product } from './types';
import { Filter, ShoppingBag, Minus, Plus, Trash2, FileCheck, CheckCircle2 } from 'lucide-react';

const PortalApp: React.FC = () => {
  const { t, isMarathi } = useLanguage();
  const {
    cartCount,
    detailedItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    feedbackMessage,
    clearFeedback,
    addToCart,
  } = useCart();

  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Filter products based on search query and selected category
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategorySlug && product.category !== selectedCategorySlug) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesMarathiTitle = product.title.toLowerCase().includes(query);
        const matchesEnglishTitle = product.titleEn.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query) || product.categoryNameEn.toLowerCase().includes(query);
        const matchesModel = product.modelCode?.toLowerCase().includes(query);

        return matchesMarathiTitle || matchesEnglishTitle || matchesCategory || Boolean(matchesModel);
      }

      return true;
    });
  }, [searchQuery, selectedCategorySlug]);

  const handleSelectCategory = (slug: string) => {
    if (selectedCategorySlug === slug) {
      setSelectedCategorySlug(null); // toggle off
    } else {
      setSelectedCategorySlug(slug);
    }
  };

  const handleQuickQuote = (product: Product, quantity: number) => {
    addToCart(product.id, quantity);
    setSelectedProductForModal(null);
    setCurrentPage('cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Toast Notification */}
      <Toast message={feedbackMessage} onClose={clearFeedback} />

      {/* Main Header */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Render depending on current page */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onExplore={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onRequestQuote={() => setCurrentPage('cart')}
            />

            {/* Search Bar Section */}
            <div className="mb-8 max-w-3xl mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </div>

            {/* Shop by Gram Panchayat Need (Category Tiles) */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {isMarathi ? 'ग्रामपंचायत गरजेनुसार साहित्य वर्गवारी' : 'Shop by Institutional Requirement'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    {isMarathi ? '१० अधिकृत शासकीय कॅटलॉग विभाग' : '10 Official Catalogue Categories'}
                  </p>
                </div>
                {selectedCategorySlug && (
                  <button
                    onClick={() => setSelectedCategorySlug(null)}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 tap-target"
                  >
                    {t.clearFilters}
                  </button>
                )}
              </div>

              <CategoryTiles
                categories={CATEGORIES}
                selectedCategorySlug={selectedCategorySlug}
                onSelectCategory={handleSelectCategory}
              />
            </div>

            {/* Products Grid Section */}
            <div id="catalog-section" className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gem-navy" />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {selectedCategorySlug
                      ? `${CATEGORIES.find((c) => c.slug === selectedCategorySlug)?.[isMarathi ? 'name' : 'nameEn']} (${filteredProducts.length})`
                      : `${isMarathi ? 'सर्व उत्पादने व साहित्य' : 'All Institutional Products'} (${filteredProducts.length})`}
                  </h3>
                </div>

                {searchQuery && (
                  <span className="text-xs text-slate-600">
                    "{searchQuery}" साठी शोध निकाल ({filteredProducts.length} वस्तू)
                  </span>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{t.noProductsFound}</h4>
                  <p className="text-sm text-slate-500 mb-4">
                    {isMarathi ? 'कृपया इतर शब्द शोधून पहा किंवा फिल्टर काढा.' : 'Try a different search keyword or clear filters.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategorySlug(null);
                    }}
                    className="bg-gem-navy text-white px-5 py-2.5 rounded-xl font-bold text-sm tap-target"
                  >
                    {t.clearFilters}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={setSelectedProductForModal}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Listing Tab */}
        {currentPage === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {t.allProducts} ({filteredProducts.length})
                </h2>
                <p className="text-xs text-slate-500">
                  {isMarathi ? 'GeM निकषांनुसार प्रमाणित उत्पादने व तांत्रिक तपशील' : 'GeM verified institutional equipment'}
                </p>
              </div>
              <div className="w-full md:w-96">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onClear={() => setSearchQuery('')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProductForModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cart View */}
        {currentPage === 'cart' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-amber-600" />
                <span>{t.cart} ({cartCount} {isMarathi ? 'नग' : 'items'})</span>
              </h2>
              {detailedItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 tap-target"
                >
                  <Trash2 className="w-4 h-4" /> {isMarathi ? 'सर्व रिकामे करा' : 'Clear All'}
                </button>
              )}
            </div>

            {detailedItems.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800">{t.emptyCartTitle}</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">{t.emptyCartMessage}</p>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="bg-gem-navy text-white px-6 py-3 rounded-xl font-bold text-sm tap-target shadow-md hover:bg-gem-navyLight"
                >
                  {t.exploreCatalogue}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="divide-y divide-slate-100">
                  {detailedItems.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={product.image}
                          alt={isMarathi ? product.title : product.titleEn}
                          className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200 shadow-sm"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                            {isMarathi ? product.title : product.titleEn}
                          </h4>
                          <span className="text-xs text-slate-500 block">
                            {isMarathi ? product.categoryName : product.categoryNameEn} • {product.modelCode}
                          </span>
                          <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                            {isMarathi ? product.priceLabel : product.priceLabelEn}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="p-2 hover:bg-slate-200 text-slate-700 disabled:opacity-40 tap-target flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 text-sm font-bold text-slate-900 min-w-[2.5rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-2 hover:bg-slate-200 text-slate-700 tap-target flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 tap-target"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
                  <p className="font-bold mb-1">ℹ️ शासकीय खरेदी व कोटेशन टीप:</p>
                  <p>{t.priceNote}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 tap-target"
                  >
                    ← {isMarathi ? 'आणखी उत्पादने जोडा' : 'Add More Products'}
                  </button>
                  <button
                    onClick={() => setCurrentPage('enquiry')}
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg tap-target"
                  >
                    <FileCheck className="w-5 h-5" />
                    <span>{t.proceedToEnquiry}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enquiry Form Placeholder for Phase 4 */}
        {currentPage === 'enquiry' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {t.enquiryFormTitle}
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              {t.enquiryFormSubtitle} (Phase 4 मध्ये पूर्ण व्हॅलिडेशन फॉर्म व WhatsApp स्लिप सुरू होईल)
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 mb-6">
              <div><strong>निवडलेली उत्पादने:</strong> {cartCount} नग ({detailedItems.length} प्रकार)</div>
              <div><strong>विक्रेता:</strong> जाणता राजा एंटरप्राइजेस, लोणार (जि. बुलढाणा)</div>
              <div><strong>संपर्क:</strong> 7059587711 / 9371301001</div>
            </div>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-gem-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm tap-target"
            >
              ← {t.home}
            </button>
          </div>
        )}

        {/* About Page */}
        {currentPage === 'about' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              {t.about} — जाणता राजा एंटरप्राइजेस
            </h2>
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>जाणता राजा एंटरप्राइजेस (Jaanta Raja Enterprises)</strong> ही GeM पोर्टलवर नोंदणीकृत विश्वासू पुरवठादार संस्था असून, केंद्र व राज्य शासनाच्या विविध विभागांसाठी उच्च दर्जाची उत्पादने उपलब्ध करून देते.
              </p>
              <p>
                ग्रामपंचायत, नगरपालिका, जिल्हा परिषद, पंचायत समिती कार्यालये, शाळा, महाविद्यालये आणि रुग्णालये यांच्या शासकीय गरजा लक्षात घेऊन आम्ही दर्जेदार, प्रमाणित आणि विश्वासाह उत्पादने स्पर्धात्मक दरात पुरवतो.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-6">
                <h4 className="font-bold text-gem-navy mb-2">आमचे ध्येय:</h4>
                <p className="italic text-slate-800">
                  "शासकीय संस्थांना गुणवत्तापूर्ण उत्पादने, पारदर्शक व्यवहार आणि वेळेवर सेवा देऊन दीर्घकालीन विश्वास निर्माण करणे."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Page */}
        {currentPage === 'contact' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              {t.contact}
            </h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-base text-gem-navy mb-1">जाणता राजा एंटरप्राइजेस</p>
                <p><strong>संचालक:</strong> प्रो. प्रा. सचिन गायकवाड</p>
                <p><strong>पत्ता:</strong> स्टेट बँक समोर, लोणार, जि. बुलढाणा - ४४३३०२</p>
                <p className="mt-2"><strong>मोबाईल:</strong> 7059587711 / 9371301001</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Product Details Modal (GeM Style Spec Table & Quick Enquiry) */}
      <ProductDetailsModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onRequestQuoteNow={handleQuickQuote}
      />

      {/* Institutional Footer */}
      <Footer
        onNavigate={setCurrentPage}
        onSelectCategory={(slug) => {
          setSelectedCategorySlug(slug);
          setCurrentPage('home');
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <EnquiryProvider>
          <PortalApp />
        </EnquiryProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
