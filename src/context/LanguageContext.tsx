import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../utils/storage';

export interface Translations {
  siteTitle: string;
  tagline: string;
  gemBadge: string;
  supplierTag: string;
  searchPlaceholder: string;
  categories: string;
  allProducts: string;
  home: string;
  about: string;
  contact: string;
  cart: string;
  addToCart: string;
  inCart: string;
  viewDetails: string;
  requestQuote: string;
  priceNote: string;
  quantity: string;
  specifications: string;
  sellerDetails: string;
  sellerName: string;
  sellerProprietor: string;
  sellerAddress: string;
  warranty: string;
  clearFilters: string;
  noProductsFound: string;
  filterByCategory: string;
  proceedToEnquiry: string;
  emptyCartTitle: string;
  emptyCartMessage: string;
  exploreCatalogue: string;
  enquiryFormTitle: string;
  enquiryFormSubtitle: string;
  institutionName: string;
  institutionType: string;
  contactPerson: string;
  designation: string;
  mobileNumber: string;
  village: string;
  taluka: string;
  district: string;
  notes: string;
  submitEnquiry: string;
  enquirySuccessTitle: string;
  enquirySuccessSubtitle: string;
  whatsappQuote: string;
  newEnquiry: string;
  disclaimerText: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  mr: {
    siteTitle: 'जाणता राजा एंटरप्राइजेस',
    tagline: 'ग्रामपंचायत, शाळा व संस्थात्मक खरेदी पोर्टल',
    gemBadge: 'GeM नोंदणीकृत विक्रेता',
    supplierTag: 'शासकीय व निमशासकीय संस्था पुरवठादार',
    searchPlaceholder: 'उत्पादन किंवा साहित्याचे नाव शोधा (उदा. RO प्लांट, सोलर दिवा, डस्टबिन)...',
    categories: 'वर्गवारी',
    allProducts: 'सर्व उत्पादने',
    home: 'मुख्य पृष्ठ',
    about: 'आमच्याबद्दल',
    contact: 'संपर्क',
    cart: 'चौकशी कार्ट',
    addToCart: 'कार्टमध्ये जोडा',
    inCart: 'कार्टमध्ये आहे',
    viewDetails: 'तपशील पहा',
    requestQuote: 'अधिकृत कोटेशन मागा',
    priceNote: 'शासकीय व संस्थात्मक नियमांनुसार कोटेशन दिल्यानंतर अंतिम दर निश्चित केला जाईल.',
    quantity: 'संख्या',
    specifications: 'तांत्रिक तपशील',
    sellerDetails: 'विक्रेता तपशील',
    sellerName: 'जाणता राजा एंटरप्राइजेस',
    sellerProprietor: 'प्रो. प्रा. सचिन गायकवाड',
    sellerAddress: 'स्टेट बँक समोर, लोणार, जि. बुलढाणा (४४३३०२)',
    warranty: 'हमी / वॉरंटी',
    clearFilters: 'फिल्टर काढा',
    noProductsFound: 'या निकषानुसार कोणतेही उत्पादन आढळले नाही.',
    filterByCategory: 'वर्गवारीनुसार फिल्टर',
    proceedToEnquiry: 'कोटेशन / खरेदी चौकशी अर्ज भरा',
    emptyCartTitle: 'आपले चौकशी कार्ट रिकामे आहे',
    emptyCartMessage: 'कृपया कॅटलॉगमधून आवश्यक उत्पादने निवडा व कार्टमध्ये जोडा.',
    exploreCatalogue: 'उत्पादने पहा',
    enquiryFormTitle: 'ग्रामपंचायत / संस्था खरेदी चौकशी अर्ज',
    enquiryFormSubtitle: 'आपल्या मागणीचे अधिकृत कोटेशन मिळवण्यासाठी खालील माहिती भरा.',
    institutionName: 'ग्रामपंचायत / संस्थेचे नाव',
    institutionType: 'संस्थेचा प्रकार',
    contactPerson: 'अधिकृत प्रतिनिधी / संपर्क व्यक्तीचे नाव',
    designation: 'पद (उदा. सरपंच / ग्रामसेवक / मुख्याध्यापक)',
    mobileNumber: '१०-अंकी मोबाईल नंबर',
    village: 'गाव / शहर',
    taluka: 'तालुका',
    district: 'जिल्हा',
    notes: 'विशेष सूचना / आवश्यकता (पर्यायी)',
    submitEnquiry: 'चौकशी अर्ज नोंदवा',
    enquirySuccessTitle: 'खरेदी चौकशी यशस्वीरीत्या नोंदवली गेली!',
    enquirySuccessSubtitle: 'आपली मागणी स्थानिक पातळीवर जतन झाली असून आमचे प्रतिनिधी लवकरच संपर्क साधतील.',
    whatsappQuote: 'WhatsApp वर कोटेशन पाठवा',
    newEnquiry: 'नवीन चौकशी सुरू करा',
    disclaimerText: 'जाणता राजा एंटरप्राइजेस ही एक GeM नोंदणीकृत स्वतंत्र व्यावसायिक संस्था आहे. हे भारत सरकारचे अधिकृत संकेतस्थळ नाही.',
  },
  en: {
    siteTitle: 'Jaanta Raja Enterprises',
    tagline: 'Gram Panchayat & Institutional Procurement Portal',
    gemBadge: 'GeM Registered Seller',
    supplierTag: 'Government & Public Institutional Supplier',
    searchPlaceholder: 'Search equipment (e.g. RO Plant, Solar Light, Dustbin)...',
    categories: 'Categories',
    allProducts: 'All Products',
    home: 'Home',
    about: 'About Us',
    contact: 'Contact',
    cart: 'Enquiry Cart',
    addToCart: 'Add to Enquiry',
    inCart: 'In Cart',
    viewDetails: 'View Details',
    requestQuote: 'Request Official Quote',
    priceNote: 'Final institutional prices are determined upon formal quotation submission.',
    quantity: 'Quantity',
    specifications: 'Technical Specifications',
    sellerDetails: 'Seller Information',
    sellerName: 'Jaanta Raja Enterprises',
    sellerProprietor: 'Prop. Prof. Sachin Gaikwad',
    sellerAddress: 'Opposite State Bank, Lonar, Dist. Buldhana (443302)',
    warranty: 'Warranty & Support',
    clearFilters: 'Clear Filters',
    noProductsFound: 'No products match your search or filter criteria.',
    filterByCategory: 'Filter by Category',
    proceedToEnquiry: 'Proceed to Quotation Form',
    emptyCartTitle: 'Your Enquiry Cart is Empty',
    emptyCartMessage: 'Browse our institutional catalog to select and enquire about products.',
    exploreCatalogue: 'Explore Catalogue',
    enquiryFormTitle: 'Institutional Purchase Enquiry Form',
    enquiryFormSubtitle: 'Fill the official details below to receive an official quote.',
    institutionName: 'Gram Panchayat / Institution Name',
    institutionType: 'Institution Type',
    contactPerson: 'Contact Person / Authorized Representative',
    designation: 'Designation (e.g. Sarpanch / Gramsevak / Principal)',
    mobileNumber: '10-digit Mobile Number',
    village: 'Village / Town',
    taluka: 'Taluka',
    district: 'District',
    notes: 'Special Requirements / Notes (Optional)',
    submitEnquiry: 'Submit Purchase Enquiry',
    enquirySuccessTitle: 'Purchase Enquiry Submitted Successfully!',
    enquirySuccessSubtitle: 'Your enquiry is saved locally. Our team will contact you with the official quotation.',
    whatsappQuote: 'Send Quote via WhatsApp',
    newEnquiry: 'Start New Enquiry',
    disclaimerText: 'Jaanta Raja Enterprises is an independent GeM-registered commercial supplier. This is not an official Government of India portal.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isMarathi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return getStorageItem<Language>(STORAGE_KEYS.LANGUAGE, 'mr');
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    setStorageItem(STORAGE_KEYS.LANGUAGE, newLang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'mr' ? 'en' : 'mr';
    setLanguage(nextLang);
  };

  useEffect(() => {
    // Keep html lang attribute in sync for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    t: TRANSLATIONS[language],
    isMarathi: language === 'mr',
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

