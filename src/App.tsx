import React from 'react';
import { CATEGORIES } from './data/categories';
import { PRODUCTS } from './data/products';
import { ShieldCheck, Phone, CheckCircle2, ShoppingBag } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Notification / Trust Bar */}
      <div className="bg-gem-navyDark text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-medium text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> GeM नोंदणीकृत विक्रेता
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="text-slate-300">शासकीय, ग्रामपंचायत व निमशासकीय संस्था पुरवठादार</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="tel:7059587711" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>7059587711</span>
            </a>
            <span className="text-slate-500">/</span>
            <a href="tel:9371301001" className="hover:text-white transition-colors">
              9371301001
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <header className="bg-gem-navy text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-500 text-slate-950 font-black text-xl sm:text-2xl flex items-center justify-center shadow">
                R
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  जाणता राजा एंटरप्राइजेस
                </h1>
                <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
                  Jaanta Raja Enterprises • लोणार, जि. बुलढाणा
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold">चौकशी कार्ट (0)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-8">
          <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" /> Phase 1 Setup & Foundation Verified
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            ग्रामपंचायत व सार्वजनिक संस्था खरेदी पोर्टल
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            React.js, TypeScript, Tailwind CSS आणि GeM-स्टाईल संस्थात्मक रचनेवर आधारित पोर्टलचा पहिला टप्पा (Phase 1) यशस्वीरित्या तयार झाला आहे.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">वर्गवारी (Categories)</div>
              <div className="text-2xl font-black text-gem-navy">{CATEGORIES.length} कॅटेगरीज</div>
              <p className="text-xs text-slate-600 mt-1">स्वच्छता, पथदिवे, पाणीपुरवठा, क्रीडांगण इ.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">उत्पादने (Products)</div>
              <div className="text-2xl font-black text-gem-navy">{PRODUCTS.length} प्रमाणित वस्तू</div>
              <p className="text-xs text-slate-600 mt-1">GeM स्टाईल संपूर्ण तांत्रिक तपशिलांसह</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">डिझाइन व भाषा</div>
              <div className="text-2xl font-black text-emerald-700">मराठी + English</div>
              <p className="text-xs text-slate-600 mt-1">१६-१८px मोठा व सुवाच्य संस्थात्मक फॉन्ट</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gem-navyDark text-slate-400 py-6 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="text-slate-300 font-semibold">जाणता राजा एंटरप्राइजेस (Jaanta Raja Enterprises)</p>
            <p className="text-xs text-slate-400">पत्ता: स्टेट बँक समोर, लोणार, जि. बुलढाणा | प्रो. प्रा. सचिन गायकवाड</p>
          </div>
          <p className="text-xs text-slate-400">
            ही एक अधिकृत कॅटलॉग व चौकशी सिस्टिम आहे (B2B Institutional Procurement Portal).
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
