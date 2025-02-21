import axios, { type AxiosInstance } from "axios";

const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

export default apiInstance;

export interface ResponseWithMessage {
  message: string;
}
