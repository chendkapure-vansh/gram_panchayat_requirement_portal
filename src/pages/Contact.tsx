import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, MapPin, Building2, MessageSquare, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  onGoToEnquiry: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onGoToEnquiry }) => {
  const { isMarathi, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B2545]">
          {isMarathi ? 'संपर्क व कार्यालयीन माहिती' : 'Contact & Office Information'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {isMarathi
            ? 'ग्रामपंचायत साहित्य खरेदी व कोटेशन चौकशीसाठी संपर्क साधा.'
            : 'Get in touch for institutional procurement quotations.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact Details Card */}
        <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
            <div className="w-9 h-9 rounded bg-[#0B2545] text-white font-bold text-sm flex items-center justify-center">
              JR
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                {t.sellerName}
              </h2>
              <div className="text-xs text-slate-500">
                {t.gemBadge}
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">{isMarathi ? 'पत्ता:' : 'Address:'}</span>
                <span>{t.sellerAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">{isMarathi ? 'संचालक:' : 'Proprietor:'}</span>
                <span>{t.sellerProprietor}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">{isMarathi ? 'फोन क्रमांक:' : 'Phone:'}</span>
                <div className="font-mono pt-0.5 flex gap-2">
                  <a href="tel:7059587711" className="text-[#0B2545] hover:underline font-bold">
                    7059587711
                  </a>
                  <span>/</span>
                  <a href="tel:9371301001" className="text-[#0B2545] hover:underline font-bold">
                    9371301001
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/917059587711?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0%2C%20%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%AA%E0%A4%82%E0%A4%9a%E0%A4%BE%E0%A4%AF%E0%A4%A4%20%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF%20%E0%A4%96%E0%A4%B0%E0%A5%87%E0%A4%A6%E0%A5%80%20%E0%A4%9A%E0%A5%8C%E0%A4%95%E0%A4%B8%E0%A5%80%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%95%20%E0%A4%95%E0%A5%87%E0%A4%B2%E0%A4%BE%20%E0%A4%86%E0%A4%B9%E0%A5%87."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp वर संपर्क साधा</span>
            </a>
          </div>
        </div>

        {/* Online Quotation Box */}
        <div className="bg-white border border-slate-200 rounded p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base border-b border-slate-200 pb-2">
              {isMarathi ? 'थेट कोटेशन विनंती अर्ज' : 'Online Quotation Form'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isMarathi
                ? 'आपल्या ग्रामपंचायत किंवा संस्थेला लागणाऱ्या साहित्याची यादी व आवश्यक संख्या नमूद करून थेट कोटेशन मागणी नोंदवा.'
                : 'Select required products and submit your details to receive an institutional quotation.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onGoToEnquiry}
            className="w-full bg-[#0B2545] hover:bg-[#133E87] text-white font-semibold py-2.5 px-4 rounded flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors"
          >
            <span>{isMarathi ? 'कोटेशन अर्ज भरा' : 'Proceed to Enquiry Form'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
