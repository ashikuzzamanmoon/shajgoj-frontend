// types/index.ts

export interface BaseVariant {
  id: number;
  name: string;
  originalPrice: number;
  price: number;
  discount: number;
}

export interface ColorVariant extends BaseVariant {
  hexCode: string;
}

export type SizeVariant = BaseVariant;

export type Variant = SizeVariant | ColorVariant;

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

export interface ProductWithSizeVariants extends BaseProduct {
  variantType: "size";
  variants: SizeVariant[];
}

export interface ProductWithColorVariants extends BaseProduct {
  variantType: "color";
  variants: ColorVariant[];
}

export type Product = ProductWithSizeVariants | ProductWithColorVariants;

export interface ContentBlock {
  type: "image" | "paragraph" | "subheading" | "productCarousel";
  text?: string;
  src?: string;
  productIds?: number[];
}
