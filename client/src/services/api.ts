import axios from 'axios';
import type { ApiResponse, InquiryConfirmation } from '../types';
import type { FullInquiryData } from '../schemas/inquiry.schema';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor - do not expose raw errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection and try again.'));
    } else {
      return Promise.reject(new Error('An unexpected error occurred.'));
    }
  }
);

export async function submitInquiry(
  data: FullInquiryData
): Promise<ApiResponse<InquiryConfirmation>> {
  const response = await apiClient.post<ApiResponse<InquiryConfirmation>>('/inquiries', data);
  return response.data;
}

export async function getInquiryByReference(
  referenceCode: string
): Promise<ApiResponse<InquiryConfirmation>> {
  const response = await apiClient.get<ApiResponse<InquiryConfirmation>>(
    `/inquiries/${referenceCode}`
  );
  return response.data;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await apiClient.get('/health');
    return response.data?.status === 'ok';
  } catch {
    return false;
  }
}
