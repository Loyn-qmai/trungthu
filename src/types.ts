export type OccasionId = 'all' | 'bieu-tang' | 'gia-dinh' | 'tre-em' | 'an-kieng' | 'doanh-nghiep';

export type MooncakeCategory = 'all' | 'huong-vi-truyen-thong' | 'huong-vi-hien-dai' | 'banh-truyen-thong' | 'banh-deo' | 'hop-qua-bieu' | 'banh-hien-dai' | 'banh-chay' | 'combo-tu-chon';
export type FlowerCategory = MooncakeCategory;

export interface MooncakeItem {
  id: string;
  name: string;
  category: MooncakeCategory;
  categoryName: string;
  occasion?: OccasionId[];
  occasionNames?: string[];
  price: number; // in VND
  originalPrice?: number;
  unitQuantity: string; // e.g. "Hộp 4 bánh (150g)", "1 bánh 180g"
  rating?: number;
  reviewsCount?: number;
  imageUrl: string;
  description: string;
  meaning?: string;
  flavor?: string;
  filling?: string;
  weight?: string;
  ingredients?: string[];
  originNames?: string[];
  flowersIncluded?: string[]; // for backwards compatibility
  tags?: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockCount?: number;
  createdAt?: number;
}

export type FlowerItem = MooncakeItem;

export type BouquetSize = 'standard' | 'medium' | 'premium';

export interface CartItem {
  id: string; // unique cart item id
  flower: MooncakeItem; // keeps compatibility with existing component prop names
  size: BouquetSize;
  sizeLabel: string;
  unitPrice: number;
  quantity: number;
  greetingCardText?: string;
  ribbonColor?: string;
  isCustomBouquet?: boolean;
  customDetails?: {
    mainFlowers: string[];
    secondaryFlowers: string[];
    wrapperColor: string;
    ribbonColor: string;
  };
}

export interface CustomBouquetConfig {
  mainFlower: string;
  mainFlowerQty: number;
  secondaryFlowers: string[];
  wrapperColor: string;
  ribbonColor: string;
  greetingCard: string;
  specialNote: string;
}

export interface FilterState {
  searchQuery: string;
  category: MooncakeCategory;
  occasion: OccasionId;
  priceRange: [number, number];
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating';
  onlyDiscount: boolean;
  onlyBestSeller: boolean;
}

