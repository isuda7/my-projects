// 맨 위에 타입 선언 추가
// import i18n from "i18next";

import i18n from "@/utils/i18n/i18n.ts";

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    showLoading?: boolean;
  }
}
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import createBaseUri from "@/utils/createBaseUri";
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type";
import { setAuth } from "@/store/modules/userStore.ts";
import { setLoading } from "@/store/modules/commonStore";
import store from "@/store"; // 리덕스 스토어 직접 가져오기
import qs from 'qs';
import { persistor } from '@/store'

interface CustomRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
}
// const language = localStorage.getItem("language") || "en";  // 기본값 영어
// axios.defaults.headers.common["Accept-Language"] = language;
// API 기본 설정

const apiConfig: AxiosRequestConfig = {
  timeout: 5000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Accept-Language": i18n.language,
  },
  withCredentials: false,
  responseType: "json"
};

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create(apiConfig);

// 리프레시 시도 횟수 추적
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

// 새로고침 시점에서 모든 요청 취소 설정
window.addEventListener('beforeunload', () => {
  store.dispatch(setLoading(false));
});

// 토큰 설정
const setToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  try {
    const auth = store.getState().userStore.auth;
    const accessToken = auth?.accessToken;
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Accept-Language"] = i18n.language;
    }
    return config;
  } 
  catch (error) {
    throw new Error("Something went wrong");
  }
};

// 요청 인터셉터
//apiClient.interceptors.request.use(setToken, (error) => Promise.reject(error));
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if(config.showLoading !== false) {
      store.dispatch(setLoading(true));
    } 

    config.headers = config.headers || {};

    return setToken(config);
  },
  (error) => {
    store.dispatch(setLoading(false));
    // 요청 에러 시 처리
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    if (response.config.showLoading !== false) {
      store.dispatch(setLoading(false));
    }

    // blob 타입 응답 처리
    if (response.data instanceof Blob) {
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'download';
      if (contentDisposition) filename = contentDisposition.split('filename=')[1];
      filename = decodeURIComponent(filename);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      return response;
    }
    return response;
  },
  async (error) => {
    
    if (error.config.showLoading !== false) {
      store.dispatch(setLoading(false));
    }
    
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      window.localStorage.clear();
      persistor.purge().then(() => window.location.href = '/');
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      originalRequest._retry = true;
      refreshAttempts += 1;
      
      try {
        const auth = store.getState().userStore.auth;

        const baseUri = createBaseUri("v1/auth");
        const response: any = await api.post(`${baseUri}/refresh`, {
          refreshToken: auth?.refreshToken,
        }, { showLoading: false});
        const data = response.data.data;
        const newAuth = { 
          ...auth,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiration: data.expiration,
        };
        store.dispatch(setAuth(newAuth));
        
        //originalRequest.headers.Authorization = `Bearer ${newAuth.accessToken}`;
        refreshAttempts = 0; // 성공 시 시도 횟수 초기화

        return await apiClient(originalRequest);
      } 
      catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);

// API 호출 함수들
const api = {
  get: <T>(url: string, params?: any, config?: CustomRequestConfig): Promise<AxiosResponse<ResponseDataType<T>>> => 
    apiClient.get(
      url, 
      { 
        ...config, 
        params,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
      }
    ),
  
  post: <T>(url: string, data?: any, config?: CustomRequestConfig): Promise<AxiosResponse<ResponseDataType<T>>> => 
    apiClient.post(url, data, config),
  
  put: <T>(url: string, data?: any, config?: CustomRequestConfig): Promise<AxiosResponse<ResponseDataType<T>>> => 
    apiClient.put(url, data, config),
  
  delete: <T>(url: string, data?: any, config?: CustomRequestConfig): Promise<AxiosResponse<ResponseDataType<T>>> => 
    apiClient.delete(url, { ...config, data }),

  // 파일 다운로드를 위한 메서드
  download: (url: string, params?: any, config?: CustomRequestConfig): Promise<AxiosResponse<Blob>> =>
    apiClient.get(url, {
      ...config,
      params,
      responseType: 'blob',
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    }),
};

export default api;