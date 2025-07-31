/**
 * API Service
 * Handles communication with the backend API with Redis caching awareness
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle token refresh if needed
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Refresh token logic would go here
        // const refreshToken = localStorage.getItem('refresh_token');
        // const response = await axios.post('/auth/refresh', { refreshToken });
        // localStorage.setItem('auth_token', response.data.token);
        // return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Generic API request function with types
export async function apiRequest<T>(
  method: string,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await api.request({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      // Handle specific error cases
      if (axiosError.response) {
        // Server responded with error status
        const status = axiosError.response.status;
        const errorData = axiosError.response.data as any;
        
        // Handle rate limiting (from NGINX/Redis)
        if (status === 429) {
          console.error('Rate limit exceeded. Please try again later.');
        }
        
        throw {
          status,
          message: errorData.message || 'An error occurred',
          data: errorData,
        };
      } else if (axiosError.request) {
        // Request made but no response received
        console.error('No response received from server');
        throw {
          status: 0,
          message: 'No response from server. Please check your connection.',
        };
      }
    }
    
    // Generic error
    throw {
      status: 500,
      message: 'An unexpected error occurred',
    };
  }
}

// API service with typed methods
const apiService = {
  // Exams
  getExams: () => apiRequest<any[]>('GET', '/exams'),
  getExamById: (id: string) => apiRequest<any>('GET', `/exams/${id}`),
  getOpenExams: () => apiRequest<any[]>('GET', '/exams/status/open'),
  getExamResults: (id: string) => apiRequest<any>('GET', `/exams/${id}/results`),
  submitApplication: (id: string, data: any) => apiRequest<any>('POST', `/exams/${id}/apply`, data),
  
  // Admin endpoints
  createExam: (data: any) => apiRequest<any>('POST', '/exams', data),
  updateExam: (id: string, data: any) => apiRequest<any>('PUT', `/exams/${id}`, data),
  deleteExam: (id: string) => apiRequest<any>('DELETE', `/exams/${id}`),
  
  // Health check
  checkHealth: () => apiRequest<{status: string}>('GET', '/health'),
};

export default apiService;