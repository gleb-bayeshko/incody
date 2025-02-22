import type { Product } from "~/pages/home/types";
import apiInstance, { type ResponseWithMessage } from ".";
import type { ProductData, ProductReview } from "~/pages/product/types";
import type { FailData } from "~/pages/fail/type";
import type { SuccessData } from "~/pages/success/type";

interface ProductApiInstance {
  getProductsMore(): Promise<Product[]>;
  getProductsByCategoryId(categoryId: number): Promise<Product[]>;
  getProductsBySearchQuery(query: string): Promise<Product[]>;
  getProductsReviews(shortName: string): Promise<ProductReview[]>;
  getProductCardData(shortName: string): Promise<ProductData>;
  getTransactionFailInfo(): Promise<FailData>;
  getTransactionSuccessInfo(token: string): Promise<SuccessData>;

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

  async getProductCardData(shortName: string): Promise<ProductData> {
    console.log(shortName);
    const { data } = await apiInstance.get(`/product?short_name=${shortName}`);

    return data as ProductData;
  }

  async getTransactionFailInfo(): Promise<FailData> {
    const { data } = await apiInstance.get(`/pay/fail`);
    return data as FailData;
  }

  async getTransactionSuccessInfo(token: string): Promise<SuccessData> {
    const { data } = await apiInstance.get(`/pay/success?token=${token}`);
    return data as SuccessData;
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
