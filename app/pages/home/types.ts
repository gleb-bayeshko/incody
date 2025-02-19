export interface Category {
  id: number;
  name?: string;
}

export interface Product {
  id: number;
  short_name?: string;
  title?: string;
  image?: string;
  category_id?: number;
  price_text?: string;
}
export interface About {
  description?: string;
}

export interface Contacts {
    email?: string;
    telegram?: string;
    phone?: string;
    support_button?: string;
}

export interface InitialData {
  categories?: Category[];
  products?: Product[];
  about?: About;
  contacts?: Contacts;
}
