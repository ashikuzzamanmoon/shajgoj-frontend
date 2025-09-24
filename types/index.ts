// types/index.ts

// সব ভ্যারিয়েন্টের জন্য বেস টাইপ
export interface BaseVariant {
  id: number;
  name: string;
  originalPrice: number;
  price: number;
  discount: number;
}
// কালার ভ্যারিয়েন্টের জন্য টাইপ, যেখানে hexCode আবশ্যক
export interface ColorVariant extends BaseVariant {
  hexCode: string;
}
// সাইজ ভ্যারিয়েন্টের জন্য টাইপ
export type SizeVariant = BaseVariant;

export type Variant = SizeVariant | ColorVariant;

// প্রোডাক্টের জন্য টাইপ
export interface BaseProduct {
  id: number;
  brand: string;
  name: string;
  type: string;
  image: string;
  gallery?: string[];
  description?: string;
  isFavourite?: boolean;
  isNewArrival?: boolean;
  isSale?: boolean;
  categories?: string[];
  rating?: number;
  reviewCount?: number;
  badges?: string[];
  tags?: string[];
}
// সাইজ ভ্যারিয়েন্টসহ প্রোডাক্ট
export interface ProductWithSizeVariants extends BaseProduct {
  variantType: "size";
  variants: SizeVariant[];
}
// কালার ভ্যারিয়েন্টসহ প্রোডাক্ট
export interface ProductWithColorVariants extends BaseProduct {
  variantType: "color";
  variants: ColorVariant[];
}
// সব ধরনের প্রোডাক্টের জন্য একটি Union Type
export type Product = ProductWithSizeVariants | ProductWithColorVariants;

export interface ContentBlock {
  type: "image" | "paragraph" | "subheading" | "productCarousel";
  text?: string;
  src?: string;
  productIds?: number[];
}
