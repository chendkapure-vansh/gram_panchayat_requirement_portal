import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import { EnquiryProvider } from './context/EnquiryContext';
import { Header, ActivePage } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/Home';
import { ProductsPage } from './pages/Products';
import { CartPage } from './pages/Cart';
import { EnquiryPage } from './pages/Enquiry';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { Product } from './types';

const PortalApp: React.FC = () => {
  const { feedbackMessage, clearFeedback, addToCart } = useCart();

  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  const handleSelectCategoryFromHome = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchFromHome = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickQuote = (product: Product, quantity: number) => {
    addToCart(product.id, quantity);
    setSelectedProductForModal(null);
    setCurrentPage('cart');
  };

  const navigateTo = (page: ActivePage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-200 selection:text-slate-950">
      <Toast message={feedbackMessage} onClose={clearFeedback} />

      <Header currentPage={currentPage} onNavigate={navigateTo} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 sm:py-6">
        {currentPage === 'home' && (
          <HomePage
            onSelectProduct={setSelectedProductForModal}
            onExploreAll={() => navigateTo('products')}
            onSelectCategory={handleSelectCategoryFromHome}
            onRequestQuote={() => navigateTo('cart')}
            onSearch={handleSearchFromHome}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onSelectProduct={setSelectedProductForModal}
            initialCategorySlug={selectedCategorySlug}
            initialSearchQuery={searchQuery}
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
            onNavigateProducts={() => navigateTo('products')}
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

      <ProductDetailsModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onRequestQuoteNow={handleQuickQuote}
        onSelectProduct={setSelectedProductForModal}
      />

      {/* Institutional Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectCategory={(slug) => {
          setSelectedCategorySlug(slug);
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
