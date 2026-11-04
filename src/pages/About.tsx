import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Truck, Users } from 'lucide-react';

interface AboutPageProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreProducts,
  onContactClick,
}) => {
  const { isMarathi, t } = useLanguage();

  const services = [
    {
      icon: ShieldCheck,
      title: isMarathi ? 'GeM नोंदणीकृत विक्रेता' : 'GeM Registered Seller',
      desc: isMarathi ? 'GeM नोंदणीकृत विक्रेता (व्यवसाय-प्रदान माहिती).' : 'GeM registered seller (business-provided information).',
    },
    {
      icon: Truck,
      title: isMarathi ? 'गावपातळीवर पुरवठा' : 'Village-Level Delivery',
      desc: isMarathi ? 'ग्रामपंचायत कार्यालये व शाळांपर्यंत थेट साहित्याची वाहतूक.' : 'Direct transport of equipment to village offices and schools.',
    },
    {
      icon: Users,
      title: isMarathi ? 'कोटेशन व खरेदी मार्गदर्शन' : 'Quotation Guidance',
      desc: isMarathi ? 'ग्रामपंचायत गरजांनुसार साहित्य निवड व कोटेशन उपलब्ध करणे.' : 'Assisting local institutions with equipment lists and formal quotations.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-6">
      {/* Clean Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-5 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded font-medium">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t.gemBadge}</span>
        </div>

        <h1 className="text-xl sm:text-3xl font-bold text-[#0B2545]">
          {isMarathi ? 'जाणता राजा एंटरप्राइजेस' : 'Jaanta Raja Enterprises'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          {isMarathi ? 'लोणार, जि. बुलढाणा' : 'Lonar, Dist. Buldhana'} • {t.sellerProprietor}
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
          {isMarathi
            ? 'ग्रामपंचायती, शाळा व स्थानिक संस्थांसाठी लागणारे पाणीपुरवठा साहित्य, खेळ व ओपन जिम, नागरी सुविधा, पॉवर व सोलर साहित्य पुरवठादार.'
            : 'Supplier of water supply systems, playground & open gym equipment, civic infrastructure, and power/solar systems for Gram Panchayats and public institutions.'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded p-4 space-y-2">
              <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[#0B2545]">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Office & Contact Box */}
      <div className="bg-white border border-slate-200 rounded p-5 space-y-3">
        <h2 className="font-bold text-base text-[#0B2545] border-b border-slate-200 pb-2">
          {t.sellerDetails}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
          <div>
            <div className="text-slate-500">{isMarathi ? 'प्रतिष्ठान नाव:' : 'Firm Name:'}</div>
            <div className="font-semibold text-slate-900">{t.sellerName}</div>
            <div className="text-slate-500 mt-2">{isMarathi ? 'संचालक:' : 'Proprietor:'}</div>
            <div className="font-semibold text-slate-900">{t.sellerProprietor}</div>
          </div>

          <div>
            <div className="text-slate-500">{isMarathi ? 'पत्ता:' : 'Address:'}</div>
            <div className="font-semibold text-slate-900">{t.sellerAddress}</div>
            <div className="text-slate-500 mt-2">{isMarathi ? 'मोबाईल संपर्क:' : 'Contact Numbers:'}</div>
            <div className="font-mono font-semibold text-slate-900">7059587711 / 9371301001</div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={onExploreProducts}
            className="bg-[#0B2545] hover:bg-[#133E87] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded transition-colors"
          >
            {t.exploreCatalogue}
          </button>

          <button
            type="button"
            onClick={onContactClick}
            className="border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded transition-colors"
          >
            {t.contact}
          </button>
        </div>
      </div>
    </div>
  );
};
