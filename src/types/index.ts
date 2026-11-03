export type Language = 'mr' | 'en';

export interface ProductSpecification {
  label: string;
  value: string;
  labelEn?: string;
  valueEn?: string;
}

export interface Product {
  id: string;
  title: string;
  titleEn: string;
  category: string; // matches Category slug
  categoryName: string;
  categoryNameEn: string;
  image: string;
  gallery?: string[];
  shortDescription: string;
  shortDescriptionEn: string;
  description: string;
  descriptionEn: string;
  price: number | null;
  priceLabel: string;
  priceLabelEn: string;
  specifications: ProductSpecification[];
  featured: boolean;
  modelCode?: string;
  makeInIndia?: boolean;
  warranty?: string;
  warrantyEn?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  itemCount: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface EnquiryItem {
  productId: string;
  productName: string;
  productNameEn: string;
  quantity: number;
  categoryName: string;
}

export interface EnquiryFormData {
  institutionName: string;
  institutionType: string;
  contactPerson: string;
  designation?: string;
  mobile: string;
  village: string;
  taluka: string;
  district: string;
  notes?: string;
}

export interface SavedEnquiry extends EnquiryFormData {
  id: string;
  createdAt: string;
  items: EnquiryItem[];
  status: 'SUBMITTED' | 'ACKNOWLEDGED';
}

