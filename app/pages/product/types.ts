export interface ProductData {
  product?: Product;
  offers?: Offer[];
  support_button?: string;
}

export interface Offer {
  id: number;
  name?: string;
  price?: number;
  currency?: string;
  bage_text?: string;
  bage_text_color?: string;
  bage_color?: string;
}

export interface Product {
  id: number;
  short_name?: string;
  title?: string;
  image?: string;
  description?: string;
  rating?: number;
  rating_amount?: number;
  category_id?: number;
  price_text?: string;
  instruction?: string;
  sort?: number;
}

export interface ProductReview {
  id: number;
  product_id: number;
  rating: number;
  name?: string;
  text?: string;
  created_at?: Date;
}
