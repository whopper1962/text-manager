import Axios, {
  AxiosError,
  type AxiosResponse,
  type AxiosInstance,
} from "axios";
import type { ApiGroupPath } from "@/configs/api.config";
import { onRequest } from "@/services/interceptors/onRequest";
import { onResponse } from "@/services/interceptors/onResponse";
import { onErrorResponse } from "@/services/interceptors/onErrorResponse";

export const ErrorStatusCode = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export function isApiClientError(error: unknown): error is AxiosError {
  return Axios.isAxiosError(error);
}

export class ApiService {
  private axios: AxiosInstance;

  constructor(path?: ApiGroupPath) {
    this.axios = Axios.create({
      baseURL: `${import.meta.env.VITE_API_BASE_URL}${path ? path : ""}`,
      withCredentials: true,
      responseType: "json" as const,
      headers: {},
      timeout: 30000,
    });
    this.axios.interceptors.request.use(onRequest);
    this.axios.interceptors.response.use(onResponse, onErrorResponse);
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
  ): Promise<TResponse> {
    try {
      const response = await this.axios.post<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload: TRequest,
  ): Promise<TResponse> {
    try {
      const response = await this.axios.patch<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async get<TResponse>(
    path: string,
    params?: Record<string, any>,
  ): Promise<TResponse> {
    try {
      let response: AxiosResponse<TResponse>;
      if (params) {
        response = await this.axios.get<TResponse>(path, {
          params,
        });
      } else {
        response = await this.axios.get<TResponse>(path);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.axios.delete<TResponse>(path);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
