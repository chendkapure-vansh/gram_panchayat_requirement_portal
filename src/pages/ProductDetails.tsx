import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import {
  ChevronRight,
  Plus,
  Minus,
  ShoppingBag,
  Phone,
  ChevronDown,
  ShieldCheck,
  Building2,
  Check,
} from 'lucide-react';

interface ProductDetailsPageProps {
  product: Product;
  onNavigateHome: () => void;
  onNavigateCategory: (slug: string) => void;
  onSelectProduct: (product: Product) => void;
  onProceedToCart: () => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onNavigateHome,
  onNavigateCategory,
  onSelectProduct,
  onProceedToCart,
}) => {
  const { isMarathi, t } = useLanguage();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<'details' | 'specs' | 'seller' | null>('details');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);

  // Sync selected image when product changes
  React.useEffect(() => {
    setSelectedImage(product.image);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const title = isMarathi ? product.title : product.titleEn;
  const categoryName = isMarathi ? product.categoryName : product.categoryNameEn;
  const shortDesc = isMarathi ? product.shortDescription : product.shortDescriptionEn;
  const fullDesc = isMarathi ? product.description : product.descriptionEn;

  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleQuickOrder = () => {
    addToCart(product.id, quantity);
    onProceedToCart();
  };

  const toggleAccordion = (section: 'details' | 'specs' | 'seller') => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // Multiple view thumbnails
  const thumbnails = [
    product.image,
    product.image,
  ];

  return (
    <div className="py-2 space-y-6 pb-20 sm:pb-6">
      {/* 1. Breadcrumb (Home > Category > Product) */}
      <nav className="flex items-center text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#0B2545] font-medium"
        >
          {t.home}
        </button>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
        <button
          type="button"
          onClick={() => onNavigateCategory(product.category)}
          className="hover:text-[#0B2545] font-medium"
        >
          {categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
          {title}
        </span>
      </nav>

      {/* 2. Main Product Info Layout (Image + Thumbnails Left, Details + Action Right) */}
      <div className="bg-white border border-slate-200 rounded p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Left Column: Image with Thumbnails */}
        <div className="md:col-span-5 space-y-3">
          {/* Main 1:1 Square Image Tile */}
          <div className="w-full">
            <ProductImage
              src={selectedImage}
              alt={title}
              aspectRatio="square"
            />
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-2">
            {thumbnails.map((thumbUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(thumbUrl)}
                className={`w-16 h-16 rounded border p-1 bg-white transition-colors ${
                  selectedImage === thumbUrl ? 'border-[#0B2545] ring-1 ring-[#0B2545]' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img
                  src={thumbUrl}
                  alt={`${title} preview ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Title, Category, Price, Stepper, Actions */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {categoryName}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B2545] mt-1 leading-snug">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {shortDesc}
            </p>
          </div>

          {/* Pricing indicator */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-medium">
              {isMarathi ? 'खरेदी दर:' : 'Procurement Pricing:'}
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-800 mt-0.5">
              {isMarathi ? 'दर चौकशीवर उपलब्ध' : 'Contact for price'}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {t.priceNote}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="pt-2 flex items-center gap-3">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              {t.quantity}:
            </span>
            <div className="flex items-center border border-slate-300 rounded overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 hover:bg-slate-100 text-slate-700 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-bold text-xs sm:text-sm text-slate-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 hover:bg-slate-100 text-slate-700 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {inCart && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{isMarathi ? `सध्या कार्टमध्ये ${cartQty} नग` : `Already in cart (${cartQty})`}</span>
              </span>
            )}
          </div>

          {/* Action Buttons: Add to Enquiry, Call Now */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-[#0B2545] hover:bg-[#133E87] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>{t.addToCart}</span>
            </button>

            <button
              type="button"
              onClick={handleQuickOrder}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded transition-colors flex items-center justify-center gap-2"
            >
              <span>{isMarathi ? 'थेट कोटेशन फॉर्म' : 'Proceed to Quote'}</span>
            </button>

            <a
              href="tel:7059587711"
              className="border border-slate-300 hover:border-slate-400 bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold py-2.5 px-3 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>{isMarathi ? 'कॉल करा' : 'Call Now'}</span>
            </a>
          </div>

          {/* Verified seller footnote */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.gemBadge}</span>
          </div>
        </div>
      </div>

      {/* 3. Accordions for Details, Specifications, and Seller Information */}
      <div className="bg-white border border-slate-200 rounded divide-y divide-slate-200">
        {/* Accordion 1: Details */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('details')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-sm text-[#0B2545] hover:bg-slate-50 transition-colors"
          >
            <span>{isMarathi ? 'उत्पादन तपशील (Product Details)' : 'Product Details'}</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                activeAccordion === 'details' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'details' && (
            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
              <p>{fullDesc}</p>
              <div className="mt-3 p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold block text-slate-800 mb-1">
                  {isMarathi ? 'वापर व संस्थात्मक उपयुक्तता:' : 'Application & Public Use:'}
                </span>
                {isMarathi
                  ? 'ग्रामपंचायत कार्यालये, जिल्हा परिषद शाळा, प्राथमिक आरोग्य केंद्रे, सार्वजनिक वाचनालये व सभागृहांसाठी उपयुक्त.'
                  : 'Suitable for Gram Panchayat offices, public schools, primary health centers, and community institutions.'}
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Specifications on Request */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('specs')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-sm text-[#0B2545] hover:bg-slate-50 transition-colors"
          >
            <span>{isMarathi ? 'तांत्रिक तपशील (Specifications on Request)' : 'Specifications (on request)'}</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                activeAccordion === 'specs' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'specs' && (
            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm border-t border-slate-100">
              {product.specifications && product.specifications.length > 0 ? (
                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody className="divide-y divide-slate-200">
                      {product.specifications.map((spec, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="px-4 py-2 font-medium text-slate-600 w-1/3 border-r border-slate-200">
                            {isMarathi ? spec.label : spec.labelEn || spec.label}
                          </td>
                          <td className="px-4 py-2 text-slate-900 font-semibold">
                            {isMarathi ? spec.value : spec.valueEn || spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 text-xs">
                  {isMarathi
                    ? 'या उत्पादनाचे विस्तृत तांत्रिक तपशील कोटेशन अर्जासोबत उपलब्ध करून दिले जातील.'
                    : 'Detailed technical specification sheet is provided upon formal enquiry.'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Accordion 3: Seller Information */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('seller')}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-sm text-[#0B2545] hover:bg-slate-50 transition-colors"
          >
            <span>{t.sellerDetails}</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                activeAccordion === 'seller' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'seller' && (
            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 space-y-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0B2545]" />
                <span className="font-semibold text-slate-900">{t.sellerName}</span>
              </div>
              <div className="text-slate-600">
                {t.sellerProprietor}
              </div>
              <div className="text-slate-600">
                {t.sellerAddress}
              </div>
              <div className="text-slate-600 font-mono">
                {isMarathi ? 'फोन:' : 'Phone:'} 7059587711 / 9371301001
              </div>
              <div className="pt-1 text-xs text-slate-500">
                {t.gemBadge}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Related Products Row */}
      {relatedProducts.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">
              {isMarathi ? 'याच वर्गवारीतील इतर साहित्य' : 'Related Products in Category'}
            </h2>
            <button
              type="button"
              onClick={() => onNavigateCategory(product.category)}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B2545]"
            >
              {isMarathi ? 'सर्व पहा' : 'View All'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. Sticky Bottom Bar on Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-300 p-2.5 sm:hidden flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-10 h-10 shrink-0">
            <ProductImage
              src={product.image}
              alt={title}
              aspectRatio="square"
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">
              {title}
            </div>
            <div className="text-[11px] text-slate-500">
              {isMarathi ? 'दर चौकशीवर उपलब्ध' : 'Contact for price'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-[#0B2545] text-white text-xs font-semibold py-2 px-3 rounded shrink-0 flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.addToCart}</span>
        </button>
      </div>
    </div>
  );
};

