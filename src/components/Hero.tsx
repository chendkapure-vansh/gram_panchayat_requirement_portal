import React from 'react';
import { Search, ArrowRight, ShieldCheck, FileCheck2, Building2 } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExploreProducts: () => void;
  onQuickCategory: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  searchQuery,
  onSearchChange,
  onExploreProducts,
  onQuickCategory,
}) => {
  const isMr = language === 'mr';

  const quickBadges = [
    { slug: 'water-systems', labelMr: 'पाणीपुरवठा व RO', labelEn: 'Water & RO' },
    { slug: 'street-lighting', labelMr: 'सोलर व LED पथदिवे', labelEn: 'Solar & LED Lights' },
    { slug: 'cleaning-sanitation', labelMr: 'स्वच्छता व डस्टबिन', labelEn: 'Sanitation & Bins' },
    { slug: 'cctv-security', labelMr: 'CCTV व बायोमेट्रिक', labelEn: 'CCTV & Biometrics' },
    { slug: 'playground-gym', labelMr: 'ओपन जिम व क्रीडांगण', labelEn: 'Open Gym' },
  ];

  return (
    <div className="relative bg-gradient-to-b from-[#0B2545] to-[#081B33] text-white py-10 sm:py-14 px-4 overflow-hidden">
      {/* Background Subtle Institutional Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 shadow-sm">
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>
            {isMr
              ? 'ग्रामपंचायत व शासकीय संस्था खरेदी कॅटलॉग'
              : 'Official Procurement Catalogue for Local Bodies'}
          </span>
        </div>

        {/* Headline strictly following PDF Section 5 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          {isMr
            ? 'ग्रामपंचायत व संस्थात्मक गरजांसाठी उत्पादने'
            : 'Products for Gram Panchayat & Institutional Needs'}
        </h1>

        {/* Supporting sentence from PDF Section 1 & 4 */}
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
          {isMr
            ? 'ग्रामपंचायती, पंचायत समित्या, शाळा व सार्वजनिक संस्थांच्या विकासासाठी लागणारे सर्व साहित्य — एकाच ठिकाणी अधिकृत कॅटलॉग, तपशील आणि कोटेशन मागणी.'
            : 'A dependable procurement catalogue to discover required items, review verified details, and submit purchase quotation enquiries.'}
        </p>

        {/* Prominent Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                isMr
                  ? 'उत्पादनाचे नाव शोधा... (उदा. RO प्लांट, स्ट्रीट लाईट, डस्टबिन, कपाट)'
                  : 'Search required products... (e.g. RO Plant, Street Light, Dustbin)'
              }
              className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-white text-slate-900 rounded-xl text-base shadow-lg border border-slate-200 focus:outline-none focus:ring-4 focus:ring-amber-500/30"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-24 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded"
              >
                {isMr ? 'साफ करा' : 'Clear'}
              </button>
            )}
            <button
              onClick={onExploreProducts}
              className="absolute right-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow transition-colors"
            >
              {isMr ? 'शोधा' : 'Search'}
            </button>
          </div>
        </div>

        {/* Quick Category Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs text-slate-400 font-medium">
            {isMr ? 'जलद वर्गवारी:' : 'Quick shortcuts:'}
          </span>
          {quickBadges.map((badge) => (
            <button
              key={badge.slug}
              onClick={() => onQuickCategory(badge.slug)}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
            >
              {isMr ? badge.labelMr : badge.labelEn}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-base shadow-lg transition-transform active:scale-95"
          >
            <span>{isMr ? 'सर्व उत्पादने पहा' : 'Explore Products'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> {isMr ? 'प्रमाणित साहित्य' : 'Verified Products'}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <FileCheck2 className="w-4 h-4 text-amber-400" /> {isMr ? 'शासकीय कोटेशन' : 'Official Quotation'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
