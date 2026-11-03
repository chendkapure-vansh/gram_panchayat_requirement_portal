import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { EnquiryFormData, SavedEnquiry, EnquiryItem } from '../types';
import { DetailedCartItem } from './CartContext';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../utils/storage';

interface EnquiryContextType {
  enquiries: SavedEnquiry[];
  submitEnquiry: (data: EnquiryFormData, items: DetailedCartItem[]) => SavedEnquiry;
  getEnquiryById: (id: string) => SavedEnquiry | undefined;
  getWhatsAppEnquiryUrl: (enquiry: SavedEnquiry) => string;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enquiries, setEnquiries] = useState<SavedEnquiry[]>(() => {
    return getStorageItem<SavedEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ENQUIRIES, enquiries);
  }, [enquiries]);

  const submitEnquiry = useCallback((data: EnquiryFormData, items: DetailedCartItem[]): SavedEnquiry => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `JR-ENQ-${new Date().getFullYear()}-${randomSuffix}`;

    const formattedItems: EnquiryItem[] = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.title,
      productNameEn: item.product.titleEn,
      quantity: item.quantity,
      categoryName: item.product.categoryName,
    }));

    const newRecord: SavedEnquiry = {
      ...data,
      id: generatedId,
      createdAt: new Date(timestamp).toISOString(),
      items: formattedItems,
      status: 'SUBMITTED',
    };

    setEnquiries((prev) => [newRecord, ...prev]);
    return newRecord;
  }, []);

  const getEnquiryById = useCallback(
    (id: string): SavedEnquiry | undefined => {
      return enquiries.find((enq) => enq.id === id);
    },
    [enquiries]
  );

  const getWhatsAppEnquiryUrl = useCallback((enquiry: SavedEnquiry): string => {
    const phone = '917059587711';
    const lines = [
      `*नमस्कार, जाणता राजा एंटरप्राइजेस*`,
      `*नवीन खरेदी चौकशी मागणी (Procurement Enquiry)*`,
      `---------------------------------`,
      `*नोंदणी क्रमांक:* ${enquiry.id}`,
      `*संस्था/ग्रामपंचायत:* ${enquiry.institutionName}`,
      `*संपर्क प्रतिनिधी:* ${enquiry.contactPerson}${enquiry.designation ? ` (${enquiry.designation})` : ''}`,
      `*मोबाईल:* ${enquiry.mobile}`,
      `*गाव/पत्ता:* ${enquiry.village}, ता. ${enquiry.taluka}, जि. ${enquiry.district}`,
      `---------------------------------`,
      `*मागणी केलेली उत्पादने (Required Products):*`,
      ...enquiry.items.map((item, idx) => `${idx + 1}. ${item.productName} - *${item.quantity} नग*`),
      enquiry.notes ? `*विशेष नोंद:* ${enquiry.notes}` : '',
      `---------------------------------`,
      `कृपया या मागणीचे अधिकृत शासकीय कोटेशन द्यावे ही विनंती.`,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${phone}?text=${message}`;
  }, []);

  const value = useMemo(
    () => ({
      enquiries,
      submitEnquiry,
      getEnquiryById,
      getWhatsAppEnquiryUrl,
    }),
    [enquiries, submitEnquiry, getEnquiryById, getWhatsAppEnquiryUrl]
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
};

export function useEnquiry(): EnquiryContextType {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}
