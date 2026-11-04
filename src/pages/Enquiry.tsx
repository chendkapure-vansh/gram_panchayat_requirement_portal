import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useEnquiry } from '../context/EnquiryContext';
import { EnquiryFormData, SavedEnquiry } from '../types';
import { validateEnquiryForm } from '../utils/validation';
import {
  CheckCircle2,
  MessageSquare,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';

interface EnquiryPageProps {
  onNavigateHome: () => void;
  onNavigateProducts?: () => void;
}

export const EnquiryPage: React.FC<EnquiryPageProps> = ({
  onNavigateHome,
}) => {
  const { t, isMarathi } = useLanguage();
  const { detailedItems, clearCart } = useCart();
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

  // Step 3: Done Screen
  if (submittedEnquiry) {
    const whatsappUrl = getWhatsAppEnquiryUrl(submittedEnquiry);

    return (
      <div className="py-2 space-y-6 max-w-3xl mx-auto">
        {/* Step Header */}
        <div className="bg-white border border-slate-200 rounded p-3 sm:p-4">
          <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[11px] flex items-center justify-center font-bold">
                1
              </span>
              <span>{isMarathi ? '१. चौकशी कार्ट' : '1. Cart'}</span>
            </div>
            <span className="text-slate-300">·······</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[11px] flex items-center justify-center font-bold">
                2
              </span>
              <span>{isMarathi ? '२. संस्था तपशील' : '2. Your Details'}</span>
            </div>
            <span className="text-slate-300">·······</span>
            <div className="flex items-center gap-1.5 text-[#0B2545]">
              <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white text-[11px] flex items-center justify-center font-bold">
                ✓
              </span>
              <span>{isMarathi ? '३. पूर्ण' : '3. Done'}</span>
            </div>
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white border border-slate-200 rounded overflow-hidden">
          <div className="bg-[#0B2545] text-white p-6 text-center space-y-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-[#0B2545]">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.enquirySuccessTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto">
              {t.enquirySuccessSubtitle}
            </p>
            <div className="text-xs text-amber-300 font-mono pt-1">
              {isMarathi ? 'मागणी नोंद क्र:' : 'Reference ID:'} <strong>{submittedEnquiry.id}</strong>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Institution Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-[#0B2545] border-b border-slate-200 pb-1">
                {isMarathi ? 'नोंदवलेली संस्था माहिती' : 'Institution Summary'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-slate-500 block">{t.institutionName}:</span>
                  <strong>{submittedEnquiry.institutionName}</strong> ({submittedEnquiry.institutionType})
                </div>
                <div>
                  <span className="text-slate-500 block">{t.contactPerson}:</span>
                  <strong>{submittedEnquiry.contactPerson}</strong> {submittedEnquiry.designation && `(${submittedEnquiry.designation})`}
                </div>
                <div>
                  <span className="text-slate-500 block">{t.mobileNumber}:</span>
                  <strong className="font-mono">{submittedEnquiry.mobile}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{isMarathi ? 'पत्ता:' : 'Address:'}</span>
                  <strong>{submittedEnquiry.village}, {submittedEnquiry.taluka}, {submittedEnquiry.district}</strong>
                </div>
              </div>
            </div>

            {/* Requested Items Table */}
            <div>
              <div className="font-bold text-sm text-slate-900 mb-2">
                {isMarathi ? 'कोटेशनसाठी निवडलेली उत्पादने' : 'Requested Quotation Items'}
              </div>
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">{isMarathi ? 'उत्पादन' : 'Product'}</th>
                      <th className="py-2 px-3 text-right">{isMarathi ? 'संख्या' : 'Quantity'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {submittedEnquiry.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-3 text-slate-400">{idx + 1}</td>
                        <td className="py-2 px-3 font-medium text-slate-900">
                          {isMarathi ? item.productName : item.productNameEn || item.productName}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-[#0B2545]">
                          {item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.whatsappQuote}</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded text-xs sm:text-sm flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.newEnquiry}</span>
              </button>

              <button
                type="button"
                onClick={onNavigateHome}
                className="bg-[#0B2545] hover:bg-[#133E87] text-white font-medium py-2.5 px-4 rounded text-xs sm:text-sm"
              >
                {t.home}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Form Screen
  return (
    <div className="py-2 space-y-6 max-w-4xl mx-auto">
      {/* Step Header */}
      <div className="bg-white border border-slate-200 rounded p-3 sm:p-4">
        <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[11px] flex items-center justify-center font-bold">
              1
            </span>
            <span>{isMarathi ? '१. चौकशी कार्ट' : '1. Cart'}</span>
          </div>
          <span className="text-slate-300">·······</span>
          <div className="flex items-center gap-1.5 text-[#0B2545]">
            <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white text-[11px] flex items-center justify-center font-bold">
              2
            </span>
            <span>{isMarathi ? '२. संस्था तपशील' : '2. Your Details'}</span>
          </div>
          <span className="text-slate-300">·······</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[11px] flex items-center justify-center font-bold">
              3
            </span>
            <span>{isMarathi ? '३. पूर्ण' : '3. Done'}</span>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B2545]">
          {t.enquiryFormTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {t.enquiryFormSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Column */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded p-4 sm:p-6">
          {formErrors.items && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formErrors.items}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Institution Name */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                {t.institutionName} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleInputChange}
                placeholder={isMarathi ? 'उदा. ग्रामपंचायत कार्यालय लोणार' : 'e.g. Gram Panchayat Lonar'}
                className={`w-full px-3 py-2 border rounded outline-none transition-colors ${
                  formErrors.institutionName ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#0B2545]'
                }`}
              />
              {formErrors.institutionName && (
                <span className="text-[11px] text-red-600 mt-0.5 block">{formErrors.institutionName}</span>
              )}
            </div>

            {/* Institution Type & Contact Person */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {t.institutionType}
                </label>
                <select
                  name="institutionType"
                  value={formData.institutionType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded outline-none bg-white focus:border-[#0B2545]"
                >
                  {institutionTypes.map((it) => (
                    <option key={it.value} value={it.value}>
                      {it.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {t.contactPerson} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? 'उदा. श्री. रमेश पाटील' : 'e.g. Ramesh Patil'}
                  className={`w-full px-3 py-2 border rounded outline-none ${
                    formErrors.contactPerson ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#0B2545]'
                  }`}
                />
                {formErrors.contactPerson && (
                  <span className="text-[11px] text-red-600 mt-0.5 block">{formErrors.contactPerson}</span>
                )}
              </div>
            </div>

            {/* Designation & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {t.designation}
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? 'उदा. सरपंच / ग्रामसेवक' : 'e.g. Sarpanch / Gramsevak'}
                  className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:border-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {t.mobileNumber} <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="98XXXXXXXX"
                  className={`w-full px-3 py-2 border rounded outline-none font-mono ${
                    formErrors.mobile ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#0B2545]'
                  }`}
                />
                {formErrors.mobile && (
                  <span className="text-[11px] text-red-600 mt-0.5 block">{formErrors.mobile}</span>
                )}
              </div>
            </div>

            {/* Village, Taluka, District */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {t.village} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? 'गाव / शहर' : 'Village / Town'}
                  className={`w-full px-3 py-2 border rounded outline-none ${
                    formErrors.village ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#0B2545]'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {t.taluka} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleInputChange}
                  placeholder={isMarathi ? 'उदा. लोणार' : 'e.g. Lonar'}
                  className={`w-full px-3 py-2 border rounded outline-none ${
                    formErrors.taluka ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#0B2545]'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {t.district}
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:border-[#0B2545]"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                {t.notes}
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleInputChange}
                placeholder={isMarathi ? 'काही विशेष सूचना किंवा आवश्यकता असल्यास येथे लिहा...' : 'Special notes or requirements...'}
                className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:border-[#0B2545]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#0B2545] hover:bg-[#133E87] text-white font-semibold py-3 px-4 rounded transition-colors text-sm"
              >
                {t.submitEnquiry}
              </button>
            </div>
          </form>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded p-4 space-y-4">
          <div className="font-bold text-sm text-[#0B2545] border-b border-slate-200 pb-2">
            {isMarathi ? 'निवडलेली उत्पादने' : 'Selected Products'} ({detailedItems.length})
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
            {detailedItems.map(({ product, quantity }) => (
              <div key={product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                <span className="text-slate-800 font-medium truncate">
                  {isMarathi ? product.title : product.titleEn}
                </span>
                <span className="font-bold text-[#0B2545] shrink-0">
                  {quantity} {isMarathi ? 'नग' : 'qty'}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
            <div className="font-medium text-slate-700">
              {t.gemBadge}
            </div>
            <div className="mt-1">लोणार, जि. बुलढाणा</div>
          </div>
        </div>
      </div>
    </div>
  );
};
