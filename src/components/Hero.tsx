import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Truck, Clock, Award, ArrowRight, FileText } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onRequestQuote }) => {
  const { isMarathi, t } = useLanguage();

  const trustPoints = [
    {
      icon: Award,
      title: isMarathi ? 'GeM नोंदणीकृत' : 'GeM Registered',
      subtitle: isMarathi ? 'अधिकृत शासकीय पुरवठादार' : 'Authorized Public Seller',
    },
    {
      icon: ShieldCheck,
      title: isMarathi ? 'दर्जेदार उत्पादने' : 'Certified Quality',
      subtitle: isMarathi ? 'मानक गुणवत्तेची खात्री' : 'Institutional Standards',
    },
    {
      icon: Clock,
      title: isMarathi ? 'वेळेत पुरवठा' : 'Timely Delivery',
      subtitle: isMarathi ? 'गावपातळीवर थेट सेवा' : 'Direct Village Logistics',
    },
    {
      icon: Truck,
      title: isMarathi ? 'स्पर्धात्मक दर' : 'Competitive Rates',
      subtitle: isMarathi ? 'पारदर्शक शासकीय कोटेशन' : 'Transparent Govt Quotations',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gem-navy to-slate-900 text-white relative overflow-hidden rounded-2xl shadow-lg border border-slate-800 mb-8 sm:mb-12">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative px-6 py-10 sm:py-16 sm:px-12 max-w-5xl">
        {/* GeM Seller Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>{isMarathi ? 'GeM नोंदणीकृत विक्रेता • शासकीय खरेदीसाठी विश्वासू भागीदार' : 'GeM Registered Seller • Trusted Institutional Partner'}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          {isMarathi
            ? 'ग्रामपंचायत व शासकीय संस्थांच्या गरजांसाठी दर्जेदार उत्पादने'
            : 'Quality Equipment & Supplies for Gram Panchayats & Public Institutions'}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-xl font-normal leading-relaxed max-w-3xl mb-8">
          {isMarathi
            ? 'स्वच्छता, पथदिवे, पाणीपुरवठा RO, संगणक, सुरक्षा कॅमेरे, आणि ओपन जिम साहित्याची अधिकृत खरेदी व तात्काळ कोटेशन मिळवा.'
            : 'Explore public procurement solutions for sanitation, street lighting, RO water plants, IT, CCTV, and village infrastructure.'}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
          <button
            onClick={onExplore}
            className="tap-target bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-sm sm:text-base group"
          >
            <span>{isMarathi ? 'सर्व उत्पादने पहा' : 'Explore Products'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onRequestQuote}
            className="tap-target bg-slate-800/90 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{t.requestQuote}</span>
          </button>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-slate-800/80">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-amber-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {point.title}
                  </div>
                  <div className="text-[11px] text-slate-400 hidden sm:block">
                    {point.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
