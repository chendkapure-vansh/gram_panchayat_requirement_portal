import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, Truck, Users, CheckCircle2, MapPin, Phone } from 'lucide-react';

interface AboutPageProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreProducts,
  onContactClick,
}) => {
  const { isMarathi } = useLanguage();

  const strengths = [
    {
      icon: Award,
      title: isMarathi ? 'GeM नोंदणीकृत विक्रेता' : 'GeM Registered Seller',
      desc: isMarathi ? 'शासकीय e-Marketplace द्वारे सुरक्षित व प्रमाणित खरेदी प्रक्रिया.' : 'Official Government e-Marketplace procurement compliance.',
    },
    {
      icon: ShieldCheck,
      title: isMarathi ? 'प्रमाणित उच्च दर्जा' : 'Certified Quality Standards',
      desc: isMarathi ? 'ISI, ISO व मेक इन इंडिया निकषांनुसार दर्जेदार साहित्याची हमी.' : 'Rigid quality inspection aligned with public institutional norms.',
    },
    {
      icon: Truck,
      title: isMarathi ? 'वेळेत गावपातळीवर पुरवठा' : 'Timely Village Delivery',
      desc: isMarathi ? 'महाराष्ट्रातील खेड्यापाड्यांत व शासकीय कार्यालयांत सुरक्षित वाहतूक.' : 'Safe and on-time transport directly to village offices.',
    },
    {
      icon: Users,
      title: isMarathi ? 'संस्थात्मक मार्गदर्शन' : 'Institutional Support',
      desc: isMarathi ? 'ग्रामपंचायत, शाळा व संस्थांच्या बजेटनुसार अचूक कोटेशन व सल्ला.' : 'Dedicated procurement guidance and formal estimates.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gem-navy to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-800">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold mb-4">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>GeM Authorised Seller</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-3">
          {isMarathi ? 'जाणता राजा एंटरप्राइजेस' : 'Jaanta Raja Enterprises'}
        </h1>
        <p className="text-amber-300/90 text-sm sm:text-base font-medium">
          {isMarathi ? 'Jaanta Raja Enterprises • लोणार, जि. बुलढाणा' : 'Jaanta Raja Enterprises • Lonar, Dist. Buldhana'}
        </p>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl">
          {isMarathi
            ? 'ग्रामपंचायती, पंचायत समित्या, जिल्हा परिषदा, शाळा, महाविद्यालये व शासकीय रुग्णालयांसाठी उच्च दर्जाचे साहित्य पुरवणारी विश्वासार्ह पुरवठादार संस्था.'
            : 'A dependable institutional supplier providing certified infrastructure, IT, and sanitation products to public bodies across Maharashtra.'}
        </p>
      </div>

      {/* Mission & Slogan Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-amber-950 mb-2">
          {isMarathi ? 'आमचे ध्येय व ब्रीदवाक्य' : 'Our Mission & Motto'}
        </h2>
        <blockquote className="text-base sm:text-lg font-bold text-gem-navy italic border-l-4 border-amber-500 pl-4 py-1 my-3">
          {isMarathi
            ? '"गुणवत्ता आमची ओळख... सेवा आमची प्रतिज्ञा... समाधान तुमचे आमचे ध्येय !"'
            : '"Quality is our identity... Service is our commitment... Your satisfaction is our mission!"'}
        </blockquote>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {isMarathi
            ? 'शासकीय संस्थांना वेळेवर, पारदर्शक व्यवहाराने आणि वाजवी स्पर्धात्मक दरात साहित्य उपलब्ध करून देणे हेच आमचे प्रथम कर्तव्य आहे.'
            : 'To provide transparent, top-grade, and competitively priced equipment to public local bodies with unwavering post-sale support.'}
        </p>
      </div>

      {/* Strengths Grid */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          {isMarathi ? 'आमची प्रमुख वैशिष्ट्ये' : 'Our Service Strengths'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Audience Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
          {isMarathi ? 'आम्ही कोणासाठी सेवा देतो?' : 'Who We Serve'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isMarathi ? 'ग्रामपंचायती (सरपंच, ग्रामसेवक व सदस्य)' : 'Gram Panchayats (Sarpanch, Gramsevak & Members)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isMarathi ? 'पंचायत समिती व जिल्हा परिषद कार्यालये' : 'Panchayat Samiti & Zilla Parishad Offices'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isMarathi ? 'शाळा, आश्रमशाळा व महाविद्यालये' : 'Schools, Hostels & Colleges'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isMarathi ? 'प्राथमिक आरोग्य केंद्र व ग्रामीण रुग्णालये' : 'Primary Health Centers & Public Hospitals'}</span>
          </div>
        </div>
      </div>

      {/* Office & CTA Card */}
      <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            {isMarathi ? 'प्रो. प्रा. सचिन गायकवाड (संचालक)' : 'Prof. Sachin Gaikwad (Proprietor)'}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {isMarathi ? 'स्टेट बँक समोर, लोणार, जि. बुलढाणा - ४४३३०२' : 'Opposite State Bank, Lonar, Dist. Buldhana - 443302'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-1 font-mono">
            <Phone className="w-3.5 h-3.5" />
            <span>7059587711 / 9371301001</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onExploreProducts}
            className="tap-target flex-1 sm:flex-none bg-gem-navy hover:bg-gem-navyLight text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow"
          >
            {isMarathi ? 'उत्पादने पहा' : 'Explore Products'}
          </button>
          <button
            onClick={onContactClick}
            className="tap-target flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold"
          >
            {isMarathi ? 'संपर्क करा' : 'Contact Us'}
          </button>
        </div>
      </div>
    </div>
  );
};

