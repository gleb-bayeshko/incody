import type { Product } from "~/pages/home/types";
import apiInstance, { type ResponseWithMessage } from ".";
import type { ProductReview } from "~/pages/product/types";

interface ProductApiInstance {
  getProductsMore(): Promise<Product[]>;
  getProductsByCategoryId(categoryId: number): Promise<Product[]>;
  getProductsBySearchQuery(query: string): Promise<Product[]>;
  getProductsReviews(shortName: string): Promise<ProductReview[]>;
  postProductReview(
    shortName: string,
    rating: number,
    name: string,
    text: string
  ): Promise<ResponseWithMessage>;
  postProductTransaction(email: string, offerId: number): Promise<void>;
}

class ProductApi implements ProductApiInstance {
  async getProductsMore(): Promise<Product[]> {
    const { data } = await apiInstance.get(`/products`);
    return data as Product[];
  }

  async getProductsByCategoryId(
    categoryId: number | string
  ): Promise<Product[]> {
    const { data } = await apiInstance.get(`/category/${categoryId}`);
    return data as Product[];
  }

  async getProductsBySearchQuery(query: string): Promise<Product[]> {
    const { data } = await apiInstance.post(`/search`, { search: query });
    return data as Product[];
  }

  async getProductsReviews(shortName: string): Promise<ProductReview[]> {
    const { data } = await apiInstance.get(`/reviews?short_name=${shortName}`);
    return data as ProductReview[];
  }

  async postProductReview(
    shortName: string,
    rating: number,
    name: string,
    text: string
  ): Promise<ResponseWithMessage> {
    const { data } = await apiInstance.post(`/review`, {
      short_name: shortName,
      rating,
      name,
      text,
    });
    return data as ResponseWithMessage;
  }

  async postProductTransaction(email: string, offerId: number): Promise<void> {
    const { data } = await apiInstance.post(`/transaction`, {
      email,
      offer_id: offerId,
    });
    return;
  }
}

const productApi = new ProductApi();

export default productApi;
