import axios, { AxiosRequestConfig } from "axios";

export interface FetchApiDataResponse<T> {
  results: T;
  next?: string;
}

export interface ApiClient {
  getAll: <T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) => Promise<FetchApiDataResponse<T>>;

  get: <T>(endpoint: string, config?: AxiosRequestConfig) => Promise<T>;
}

export class DefaultApiClient implements ApiClient {
  private axiosInstance = axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
      // TODO: implement security best practice
      key: "42080ec1cbf94f4d8a782aefd59a20e8",
    },
  });

  get<T>(endpoint: string, config?: AxiosRequestConfig<any>) {
    return this.axiosInstance.get<T>(endpoint, config).then((res) => res.data);
  }

  getAll<T>(endpoint: string, config?: AxiosRequestConfig<any>) {
    return this.axiosInstance
      .get<FetchApiDataResponse<T>>(endpoint, config)
      .then((res) => res.data);
  }
}

const apiClient: ApiClient = new DefaultApiClient();

export default apiClient;
