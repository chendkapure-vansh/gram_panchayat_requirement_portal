import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowRight, FileText, Phone, Award } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onRequestQuote: () => void;
  onSearch?: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onRequestQuote }) => {
  const { isMarathi, t } = useLanguage();

  return (
    <div className="space-y-4">
      {/* 1. Official Enterprise & Person Branding Header Banner */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
        <img
          src="/images/products/hero-section.png"
          alt="जाणता राजा एंटरप्राइजेस - GeM नोंदणीकृत अधिकृत विक्रेता (Jaanta Raja Enterprises)"
          className="w-full h-auto object-contain block mx-auto bg-white max-h-52 sm:max-h-64"
        />
      </div>

      {/* 2. E-Commerce Hero Procurement Strip */}
      <div className="bg-white border border-slate-200 rounded p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text & Actions */}
          <div className="lg:col-span-7 space-y-4">
            {/* Seller & Personal Branding Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.gemBadge}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#0B2545] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded font-semibold">
                <Award className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
                <span>{isMarathi ? 'प्रो. प्रा. सचिन गायकवाड (लोणार)' : 'Prop. Prof. Sachin Gaikwad (Lonar)'}</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2545] tracking-tight leading-tight">
              {isMarathi
                ? 'ग्रामपंचायत व शासकीय संस्था खरेदी कॅटलॉग'
                : 'Gram Panchayat & Institutional Procurement Catalogue'}
            </h1>

            {/* Plain, specific copy from catalogue */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {isMarathi
                ? 'व्यावसायिक RO वॉटर प्लांट, वॉटर कुलर, सोलर उत्पादने, ओपन जिम व खेळ साहित्य, सूचना व दिशादर्शक फलक, मॅनहोल कव्हर, सायलेंट जनरेटर व संस्थात्मक साहित्य.'
                : 'Commercial RO water plants, water coolers, solar equipment, open gym & playground equipment, official notice boards, manhole covers, silent generators and institutional supplies.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={onExplore}
                className="bg-[#0B2545] hover:bg-[#133E87] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>{isMarathi ? 'सर्व उत्पादने पहा' : 'Browse Catalogue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onRequestQuote}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-3 rounded transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-600" />
                <span>{isMarathi ? 'कोटेशन मागणी' : 'Request Quote'}</span>
              </button>

              <a
                href="tel:7059587711"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B2545] border border-slate-200 px-3.5 py-3 rounded bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>7059587711</span>
              </a>
            </div>
          </div>

          {/* Right: Institutional Services & Catalogue Overview (8 Sectors) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full bg-white border border-slate-200 rounded p-1 shadow-sm hover:border-slate-300 transition-colors">
              <img
                src="/images/products/services-overview.jpg"
                alt="जाणता राजा एंटरप्राइजेस - प्रमुख सेवा व उत्पादने"
                className="w-full h-auto object-contain rounded block"
              />
            </div>
            <div className="text-[11px] text-slate-500 mt-2 text-center font-medium">
              {isMarathi
                ? 'शासकीय व निमशासकीय संस्थांसाठी प्रमुख खरेदी पुरवठा'
                : 'Core Institutional Procurement Sectors for Local Bodies'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Verified Facts Stats Strip */}
      <div className="bg-white border border-slate-200 rounded p-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-center">
        <div className="py-2 sm:py-0 sm:px-4">
          <div className="text-xl sm:text-2xl font-bold text-[#0B2545]">
            {isMarathi ? '४' : '4'}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {isMarathi ? 'कॅटलॉग वर्गवारी विभाग' : 'Core Product Categories'}
          </div>
        </div>

        <div className="py-2 sm:py-0 sm:px-4">
          <div className="text-xl sm:text-2xl font-bold text-[#0B2545]">
            {isMarathi ? '२३' : '23'}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {isMarathi ? 'खरे ब्रोशर उत्पादने' : 'Verified Catalogue Products'}
          </div>
        </div>

        <div className="py-2 sm:py-0 sm:px-4">
          <div className="text-xl sm:text-2xl font-bold text-[#0B2545]">GeM</div>
          <div className="text-xs text-slate-500 font-medium">
            {isMarathi ? 'नोंदणीकृत अधिकृत विक्रेता (लोणार)' : 'Registered Seller (Lonar, Buldhana)'}
          </div>
        </div>
      </div>
    </div>
  );
};
