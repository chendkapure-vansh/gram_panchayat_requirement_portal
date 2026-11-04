import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
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

const PortalApp: React.FC = () => {
  const { feedbackMessage, clearFeedback } = useCart();

  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectCategory = (slug: string) => {
    setSelectedCategorySlug(slug || null);
    setSearchQuery('');
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string, catSlug?: string | null) => {
    setSearchQuery(query);
    if (catSlug !== undefined) {
      setSelectedCategorySlug(catSlug);
    }
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: ActivePage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {currentPage === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onExploreAll={() => {
              setSelectedCategorySlug(null);
              navigateTo('products');
            }}
            onSelectCategory={handleSelectCategory}
            onRequestQuote={() => navigateTo('cart')}
            onSearch={(query) => handleSearch(query)}
          />
        )}

        {currentPage === 'products' && (
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
