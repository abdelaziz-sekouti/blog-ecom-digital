import axios from 'axios';
import { Product, BlogPost, Order } from './api';

export interface AdminStats {
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
  topProducts: Array<{
    product_id: number;
    title: string;
    sales: number;
    revenue: number;
  }>;
  monthlySales: Array<{
    month: string;
    sales: number;
    revenue: number;
  }>;
}

export interface AdminProduct extends Product {
  file?: File;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Auth endpoints
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/admin/refresh`, { refresh_token: refreshToken });
  return response.data;
};

// Create authenticated axios instance
export const createAuthenticatedAxios = (token: string) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    timeout: 10000,
  });
};

// Admin Products Management
export const createProduct = async (token: string, productData: FormData) => {
  const authAxios = createAuthenticatedAxios(token);
  const response = await authAxios.post('/admin/products', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (token: string, id: number, productData: FormData) => {
  const authAxios = createAuthenticatedAxios(token);
  const response = await authAxios.put(`/admin/products/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProduct = async (token: string, id: number) => {
  const authAxios = createAuthenticatedAxios(token);
  const response = await authAxios.delete(`/admin/products/${id}`);
  return response.data;
};

// Admin Blog Management
export const createBlogPost = async (token: string, postData: { title: string; content: string; author: string }) => {
  const authAxios = createAuthenticatedAxios(token);
  const response = await authAxios.post('/admin/blog', postData);
  return response.data;
};

export const updateBlogPost = async (token: string, id: number, postData: { title: string; content: string; author: string }) => {
  const authAxios = createAuthenticatedAxios(token);
  const response = await authAxios.put(`/admin/blog/${id}`, postData);
  return response.data;
};

export const deleteBlogPost = async (token: string, id: number) => {
  const authAxios = createAuthenticatedAxios(token);
  const response = await authAxios.delete(`/admin/blog/${id}`);
  return response.data;
};

// Admin Analytics
export const getAnalytics = async (token: string): Promise<AdminStats> => {
  const authAxios = createAuthenticatedAxios(token);
  const response = await authAxios.get('/admin/analytics');
  return response.data;
};

export const getOrders = async (token: string): Promise<Order[]> => {
  const authAxios = createAuthenticatedAxios(token);
  const response = await authAxios.get('/admin/orders');
  return response.data;
};