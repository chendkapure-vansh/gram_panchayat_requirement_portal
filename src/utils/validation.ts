/**
 * Validate standard 10-digit Indian mobile number.
 * Must be 10 digits and start with 6, 7, 8, or 9.
 */
export function isValidIndianMobile(mobile: string): boolean {
  if (!mobile) return false;
  const cleaned = mobile.trim().replace(/[\s-]/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateEnquiryForm(data: {
  institutionName: string;
  contactPerson: string;
  mobile: string;
  village: string;
  taluka: string;
  district: string;
  hasItems: boolean;
  isMarathi?: boolean;
}): FormValidationResult {
  const errors: Record<string, string> = {};
  const isMr = data.isMarathi ?? true;

  if (!data.institutionName.trim()) {
    errors.institutionName = isMr
      ? 'कृपया ग्रामपंचायत / संस्थेचे नाव प्रविष्ट करा'
      : 'Please enter institution / Gram Panchayat name';
  }

  if (!data.contactPerson.trim()) {
    errors.contactPerson = isMr
      ? 'कृपया संपर्क व्यक्तीचे नाव प्रविष्ट करा'
      : 'Please enter contact person name';
  }

  if (!data.mobile.trim()) {
    errors.mobile = isMr
      ? 'कृपया १०-अंकी मोबाईल नंबर प्रविष्ट करा'
      : 'Please enter 10-digit mobile number';
  } else if (!isValidIndianMobile(data.mobile)) {
    errors.mobile = isMr
      ? 'कृपया वैध १०-अंकी भारतीय मोबाईल नंबर प्रविष्ट करा'
      : 'Please enter a valid 10-digit mobile number (starts with 6-9)';
  }

  if (!data.village.trim()) {
    errors.village = isMr ? 'कृपया गावाचे नाव प्रविष्ट करा' : 'Please enter village name';
  }

  if (!data.taluka.trim()) {
    errors.taluka = isMr ? 'कृपया तालुका प्रविष्ट करा' : 'Please enter taluka';
  }

  if (!data.district.trim()) {
    errors.district = isMr ? 'कृपया जिल्हा प्रविष्ट करा' : 'Please enter district';
  }

  if (!data.hasItems) {
    errors.items = isMr
      ? 'कोटेशन चौकशीसाठी कार्टमध्ये किमान १ वस्तू असणे आवश्यक आहे'
      : 'At least 1 product must be added to enquiry cart';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
