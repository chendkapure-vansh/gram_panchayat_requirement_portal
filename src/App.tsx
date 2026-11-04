import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import { EnquiryProvider } from './context/EnquiryContext';
import { Header, ActivePage } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomePage } from './pages/Home';
import { ProductsPage } from './pages/Products';
import { ProductDetailsPage } from './pages/ProductDetails';
import { CartPage } from './pages/Cart';
import { EnquiryPage } from './pages/Enquiry';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { Product } from './types';
import { ArrowLeft } from 'lucide-react';

const PortalApp: React.FC = () => {
  const { feedbackMessage, clearFeedback } = useCart();
  const { isMarathi } = useLanguage();

  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [historyStack, setHistoryStack] = useState<ActivePage[]>([]);

  useEffect(() => {
    // Initial browser history state
    if (!window.history.state) {
      window.history.replaceState({ page: 'home' }, '', window.location.pathname);
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        if (e.state.page === 'details' && !e.state.product) {
          setCurrentPage('products');
        } else {
          setCurrentPage(e.state.page);
        }
        if (e.state.product) setSelectedProduct(e.state.product);
        if (e.state.category !== undefined) setSelectedCategorySlug(e.state.category);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectCategory = (slug: string) => {
    setHistoryStack((prev) => [...prev, currentPage]);
    setSelectedCategorySlug(slug || null);
    setSearchQuery('');
    try {
      window.history.pushState({ page: 'products', category: slug }, '', '#products');
    } catch {
      // fallback
    }
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string, catSlug?: string | null) => {
    setHistoryStack((prev) => [...prev, currentPage]);
    setSearchQuery(query);
    if (catSlug !== undefined) {
      setSelectedCategorySlug(catSlug);
    }
    try {
      window.history.pushState({ page: 'products', category: catSlug }, '', '#products');
    } catch {
      // fallback
    }
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setHistoryStack((prev) => [...prev, currentPage]);
    setSelectedProduct(product);
    try {
      window.history.pushState({ page: 'details', product, category: selectedCategorySlug }, '', '#details');
    } catch {
      // fallback
    }
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: ActivePage) => {
    if (page === 'home') {
      setHistoryStack([]);
      setSelectedCategorySlug(null);
    } else if (page !== currentPage) {
      setHistoryStack((prev) => [...prev, currentPage]);
    }
    try {
      window.history.pushState({ page, category: selectedCategorySlug }, '', '#' + page);
    } catch {
      // fallback
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (historyStack.length > 0) {
      const nextStack = [...historyStack];
      const prevPage = nextStack.pop() || 'home';
      setHistoryStack(nextStack);
      try {
        window.history.back();
      } catch {
        // fallback
      }
      setCurrentPage(prevPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-100 selection:text-slate-900">
      <Toast message={feedbackMessage} onClose={clearFeedback} />

      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onSearch={handleSearch}
        onSelectCategory={handleSelectCategory}
        activeCategorySlug={selectedCategorySlug}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-3 sm:py-5">
        {/* Universal Back Button for non-home pages */}
        {currentPage !== 'home' && (
          <div className="mb-3">
            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B2545] bg-white border border-slate-300 hover:border-[#0B2545] px-3 py-1.5 rounded transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#0B2545]" />
              <span>{isMarathi ? 'मागे जा (Back)' : 'Back'}</span>
            </button>
          </div>
        )}
        {currentPage === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onExploreAll={() => {
              setSelectedCategorySlug(null);
              navigateTo('products');
            }}
            onSelectCategory={handleSelectCategory}
            onRequestQuote={() => navigateTo('cart')}
          />
        )}

        {(currentPage === 'products' || (currentPage === 'details' && !selectedProduct)) && (
          <ProductsPage
            onSelectProduct={handleSelectProduct}
            initialCategorySlug={selectedCategorySlug}
            initialSearchQuery={searchQuery}
          />
        )}

        {currentPage === 'details' && selectedProduct && (
          <ProductDetailsPage
            product={selectedProduct}
            onNavigateHome={() => navigateTo('home')}
            onNavigateCategory={handleSelectCategory}
            onSelectProduct={handleSelectProduct}
            onProceedToCart={() => navigateTo('cart')}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onContinueBrowsing={() => navigateTo('products')}
            onProceedToEnquiry={() => navigateTo('enquiry')}
          />
        )}

        {currentPage === 'enquiry' && (
          <EnquiryPage
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onExploreProducts={() => navigateTo('products')}
            onContactClick={() => navigateTo('contact')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onGoToEnquiry={() => navigateTo('enquiry')}
          />
        )}
      </main>

      <Footer
        onNavigate={navigateTo}
        onSelectCategory={(slug) => {
          setSelectedCategorySlug(slug);
          setSearchQuery('');
          navigateTo('products');
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
