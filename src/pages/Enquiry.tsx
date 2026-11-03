import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useEnquiry } from '../context/EnquiryContext';
import { EnquiryFormData, SavedEnquiry } from '../types';
import { validateEnquiryForm } from '../utils/validation';
import {
  FileText,
  CheckCircle2,
  Building2,
  User,
  Phone,
  MapPin,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface EnquiryPageProps {
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export const EnquiryPage: React.FC<EnquiryPageProps> = ({
  onNavigateHome,
  onNavigateProducts,
}) => {
  const { t, isMarathi } = useLanguage();
  const { detailedItems, cartCount, clearCart } = useCart();
  const { submitEnquiry, getWhatsAppEnquiryUrl } = useEnquiry();

  const [formData, setFormData] = useState<EnquiryFormData>({
    institutionName: '',
    institutionType: 'Gram Panchayat',
    contactPerson: '',
    designation: '',
    mobile: '',
    village: '',
    taluka: '',
    district: isMarathi ? 'बुलढाणा' : 'Buldhana',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<SavedEnquiry | null>(null);

  const institutionTypes = [
    { value: 'Gram Panchayat', label: isMarathi ? 'ग्रामपंचायत कार्यालय' : 'Gram Panchayat Office' },
    { value: 'Panchayat Samiti', label: isMarathi ? 'पंचायत समिती' : 'Panchayat Samiti' },
    { value: 'Zilla Parishad', label: isMarathi ? 'जिल्हा परिषद' : 'Zilla Parishad' },
    { value: 'School / College', label: isMarathi ? 'शाळा / महाविद्यालय' : 'School / College' },
    { value: 'Hospital / PHC', label: isMarathi ? 'प्राथमिक आरोग्य केंद्र / रुग्णालय' : 'Hospital / PHC' },
    { value: 'Other Public Body', label: isMarathi ? 'इतर सार्वजनिक संस्था' : 'Other Public Body' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEnquiryForm({
      institutionName: formData.institutionName,
      contactPerson: formData.contactPerson,
      mobile: formData.mobile,
      village: formData.village,
      taluka: formData.taluka,
      district: formData.district,
      hasItems: detailedItems.length > 0,
      isMarathi,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const savedRecord = submitEnquiry(formData, detailedItems);
    setSubmittedEnquiry(savedRecord);
    clearCart();
  };

  const handleReset = () => {
    setSubmittedEnquiry(null);
    setFormData({
      institutionName: '',
      institutionType: 'Gram Panchayat',
      contactPerson: '',
      designation: '',
      mobile: '',
      village: '',
      taluka: '',
      district: isMarathi ? 'बुलढाणा' : 'Buldhana',
      notes: '',
    });
    setFormErrors({});
  };

  if (submittedEnquiry) {
    const whatsappUrl = getWhatsAppEnquiryUrl(submittedEnquiry);

    return (
      <div className="max-w-3xl mx-auto py-4 sm:py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-emerald-700 text-white p-6 sm:p-8 text-center relative">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">
              {t.enquirySuccessTitle}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg mx-auto">
              {t.enquirySuccessSubtitle}
            </p>
            <div className="mt-3 inline-block bg-emerald-800/80 px-3 py-1 rounded text-xs text-emerald-200 font-mono">
              {isMarathi ? 'नोंदणी क्र:' : 'Ref ID:'} <strong>{submittedEnquiry.id}</strong> • {new Date(submittedEnquiry.createdAt).toLocaleDateString(isMarathi ? 'mr-IN' : 'en-IN')}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base border-b border-slate-200 pb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gem-navy" />
                <span>{isMarathi ? 'संस्था व संपर्क तपशील' : 'Institution & Contact Details'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div>
                  <span className="text-slate-500 block">{isMarathi ? 'संस्था / ग्रामपंचायत:' : 'Institution / Gram Panchayat:'}</span>
                  <strong className="text-slate-900">{submittedEnquiry.institutionName}</strong> ({submittedEnquiry.institutionType})
                </div>
                <div>
                  <span className="text-slate-500 block">{isMarathi ? 'संपर्क व्यक्ती:' : 'Contact Person:'}</span>
                  <strong className="text-slate-900">{submittedEnquiry.contactPerson}</strong>
                  {submittedEnquiry.designation && ` (${submittedEnquiry.designation})`}
                </div>
                <div>
                  <span className="text-slate-500 block">{isMarathi ? 'मोबाईल क्रमांक:' : 'Mobile Number:'}</span>
                  <strong className="text-slate-900">{submittedEnquiry.mobile}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{isMarathi ? 'पत्ता:' : 'Address:'}</span>
                  <strong className="text-slate-900">
                    {submittedEnquiry.village}, {isMarathi ? `ता. ${submittedEnquiry.taluka}, जि. ${submittedEnquiry.district}` : `Tal. ${submittedEnquiry.taluka}, Dist. ${submittedEnquiry.district}`}
                  </strong>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-gem-navy" />
                <span>{isMarathi ? 'मागणी केलेली उत्पादने' : 'Requested Quotation Items'}</span>
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">{isMarathi ? 'अ.क्र.' : 'Sr.'}</th>
                      <th className="py-2.5 px-4">{isMarathi ? 'उत्पादनाचे नाव' : 'Product Name'}</th>
                      <th className="py-2.5 px-4 text-right">{isMarathi ? 'मागणी संख्या' : 'Quantity'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {submittedEnquiry.items.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 text-slate-500 font-mono">{index + 1}</td>
                        <td className="py-2.5 px-4 font-semibold text-slate-900">
                          {isMarathi ? item.productName : (item.productNameEn || item.productName)}
                          <span className="text-xs text-slate-500 block font-normal">{item.categoryName}</span>
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-gem-navy">
                          {item.quantity} {isMarathi ? 'नग' : 'units'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.whatsappQuote}</span>
              </a>

              <button
                onClick={handleReset}
                className="tap-target px-5 py-3.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.newEnquiry}</span>
              </button>

              <button
                onClick={onNavigateHome}
                className="tap-target px-5 py-3.5 bg-gem-navy hover:bg-gem-navyLight text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5"
              >
                <span>{t.home}</span>
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>{isMarathi ? 'स्थानिक जतन नोंद (Demo):' : 'Local Demo Confirmation:'}</strong>{' '}
                {isMarathi
                  ? 'ही खरेदी मागणी आपल्या ब्राऊझरमध्ये स्थानिक पातळीवर सुरक्षित जतन केली आहे. अधिकृत कोटेशन लवकरच पुरवले जाईल.'
                  : 'This purchase enquiry is saved locally in your browser storage. An official quotation will be generated.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
          {t.enquiryFormTitle}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          {t.enquiryFormSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          {formErrors.items && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formErrors.items}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                {t.institutionName} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? 'उदा. ग्रामपंचायत कार्यालय, लोणार' : 'e.g. Gram Panchayat Office, Lonar'}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm sm:text-base border rounded-xl outline-none transition-all ${
                    formErrors.institutionName
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                  }`}
                />
              </div>
              {formErrors.institutionName && (
                <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.institutionName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                {t.institutionType}
              </label>
              <select
                name="institutionType"
                value={formData.institutionType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-sm sm:text-base border border-slate-300 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-white"
              >
                {institutionTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  {t.contactPerson} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder={isMarathi ? 'उदा. सचिन गायकवाड' : 'e.g. Ramesh Patil'}
                    className={`w-full pl-10 pr-4 py-2.5 text-sm sm:text-base border rounded-xl outline-none transition-all ${
                      formErrors.contactPerson
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {formErrors.contactPerson && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.contactPerson}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  {t.designation}
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? 'उदा. सरपंच / ग्रामसेवक' : 'e.g. Sarpanch / Gramsevak'}
                  className="w-full px-4 py-2.5 text-sm sm:text-base border border-slate-300 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                {t.mobileNumber} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="tel"
                  name="mobile"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? '९८XXXXXXXX / १०-अंकी नंबर' : '98XXXXXXXX / 10-digit number'}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm sm:text-base border rounded-xl outline-none font-mono transition-all ${
                    formErrors.mobile
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                  }`}
                />
              </div>
              {formErrors.mobile ? (
                <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.mobile}</p>
              ) : (
                <p className="text-[11px] text-slate-500 mt-1">
                  {isMarathi ? 'कोटेशन व संपर्क करण्यासाठी अचूक १० अंकी नंबर आवश्यक आहे.' : 'A valid 10-digit mobile number is required for official quotation.'}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.village} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    placeholder={isMarathi ? 'गाव / शहर' : 'Village / Town'}
                    className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm border rounded-lg outline-none ${
                      formErrors.village ? 'border-red-400' : 'border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.taluka} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? 'तालुका' : 'Taluka'}
                  className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg outline-none ${
                    formErrors.taluka ? 'border-red-400' : 'border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.district} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? 'जिल्हा' : 'District'}
                  className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-lg outline-none ${
                    formErrors.district ? 'border-red-400' : 'border-slate-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                {t.notes}
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                placeholder={isMarathi ? 'उदा. साहित्य पोहोचवण्याची अंतिम तारीख, विशेष साईझ किंवा इतर आवश्यकता...' : 'e.g. Delivery timeline, special sizes, specifications...'}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="tap-target w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors text-sm sm:text-base"
              >
                <FileText className="w-5 h-5" />
                <span>{t.submitEnquiry} ({cartCount} {isMarathi ? 'नग' : 'items'})</span>
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>{isMarathi ? 'निवडलेले साहित्य' : 'Selected Products'}</span>
            </h3>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              {cartCount} {isMarathi ? 'नग' : 'items'}
            </span>
          </div>

          {detailedItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <p className="mb-3">{isMarathi ? 'सध्या कार्टमध्ये कोणतीही वस्तू नाही.' : 'No items currently in enquiry cart.'}</p>
              <button
                onClick={onNavigateProducts}
                className="text-gem-navyLight font-bold underline tap-target"
              >
                {t.exploreCatalogue}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <ul className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {detailedItems.map(({ product, quantity }) => (
                  <li key={product.id} className="py-2 flex items-center justify-between text-xs">
                    <div className="pr-2">
                      <span className="font-semibold text-slate-800 block line-clamp-1">
                        {isMarathi ? product.title : product.titleEn}
                      </span>
                      <span className="text-[11px] text-slate-500">{product.modelCode}</span>
                    </div>
                    <span className="font-bold text-gem-navy shrink-0">{quantity} {isMarathi ? 'नग' : 'units'}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t text-[11px] text-slate-600 space-y-1">
                <p>{isMarathi ? '• सर्व वस्तूंचे अधिकृत शासकीय कोटेशन तयार केले जाईल.' : '• Official government quotation will be prepared.'}</p>
                <p>{isMarathi ? '• GeM पोर्टलद्वारे किंवा शासकीय नियमांनुसार खरेदी प्रक्रिया होईल.' : '• Purchase proceeds through GeM or government guidelines.'}</p>
              </div>

              <button
                onClick={onNavigateProducts}
                className="w-full text-xs text-gem-navy font-bold hover:underline flex items-center justify-center gap-1 pt-1 tap-target"
              >
                <span>{isMarathi ? 'आणखी उत्पादने निवडा' : 'Select More Products'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1">
            <div className="font-bold text-slate-900">{t.sellerName}</div>
            <div className="text-slate-600 text-[11px]">{t.sellerAddress}</div>
            <div className="text-emerald-700 font-bold text-[11px]">
              {isMarathi ? 'मोबाईल:' : 'Mobile:'} 7059587711 / 9371301001
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
