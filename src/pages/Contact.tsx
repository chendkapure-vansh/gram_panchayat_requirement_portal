import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck,
  Building2,
  FileText,
} from 'lucide-react';

interface ContactPageProps {
  onGoToEnquiry: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onGoToEnquiry }) => {
  const { isMarathi } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
          {isMarathi ? 'संपर्क व कार्यालयीन माहिती' : 'Contact & Office Information'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isMarathi
            ? 'शासकीय खरेदी, कोटेशन व निविदा चौकशीसाठी थेट संपर्क साधा.'
            : 'Get in touch for institutional procurement quotes and GeM inquiries.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Contact Card 1: Official Phone & Address */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow">
                R
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  जाणता राजा एंटरप्राइजेस
                </h2>
                <p className="text-xs text-amber-600 font-bold">
                  GeM Authorised Seller
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">कार्यालय पत्ता:</span>
                  <span>स्टेट बँक समोर, लोणार, जि. बुलढाणा - ४४३३०२</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gem-navy shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">संचालक:</span>
                  <span>प्रो. प्रा. सचिन गायकवाड</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">संपर्क क्रमांक:</span>
                  <div className="flex flex-col gap-1 mt-1 font-mono">
                    <a
                      href="tel:7059587711"
                      className="text-emerald-700 hover:text-emerald-800 font-bold text-base inline-flex items-center gap-1"
                    >
                      📞 7059587711
                    </a>
                    <a
                      href="tel:9371301001"
                      className="text-emerald-700 hover:text-emerald-800 font-bold text-base inline-flex items-center gap-1"
                    >
                      📞 9371301001
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">कामाची वेळ:</span>
                  <span>सोमवार ते शनिवार, सकाळी ९:०० ते संध्याकाळी ७:००</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Button */}
          <div className="pt-4 border-t border-slate-100">
            <a
              href="https://wa.me/917059587711?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0%2C%20%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%AA%E0%A4%82%E0%A4%9a%E0%A4%BE%E0%A4%AF%E0%A4%A4%20%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF%20%E0%A4%96%E0%A4%B0%E0%A5%87%E0%A4%A6%E0%A5%80%20%E0%A4%9A%E0%A5%8C%E0%A4%95%E0%A4%B8%E0%A5%80%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%95%20%E0%A4%95%E0%A5%87%E0%A4%B2%E0%A4%BE%20%E0%A4%86%E0%A4%B9%E0%A5%87."
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp वर मेसेज करा</span>
            </a>
          </div>
        </div>

        {/* Contact Card 2: Quick Institutional Quote Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-gem-navy text-amber-300 text-xs px-3 py-1 rounded-full font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>शासकीय खरेदी मदत केंद्र</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              ग्रामपंचायत किंवा संस्थेसाठी अधिकृत कोटेशन हवे आहे?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              आपल्या ग्रामपंचायतीच्या किंवा शाळेच्या मासिक सभेत मंजुरीसाठी लागणारे अधिकृत दरपत्रक (Quotation) मिळवण्यासाठी आमच्या ऑनलाइन अर्जाचा वापर करा किंवा थेट फोनवर संपर्क साधा.
            </p>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900">कोटेशन प्रक्रियेचे टप्पे:</div>
              <p>१. आवश्यक उत्पादने कार्टमध्ये जोडून अर्ज सबमिट करा.</p>
              <p>२. आमच्या कार्यालयाकडून २४ तासांत दरपत्रक प्राप्त होईल.</p>
              <p>३. GeM किंवा शासकीय पद्धतीनुसार बिलिंग व थेट पुरवठा.</p>
            </div>
          </div>

          <button
            onClick={onGoToEnquiry}
            className="tap-target w-full bg-gem-navy hover:bg-gem-navyLight text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors text-sm"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>कोटेशन अर्ज भरा</span>
          </button>
        </div>
      </div>
    </div>
  );
};

