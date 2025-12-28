import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface Product {
  id: number;
  title: string;
  type: 'ebook' | 'course' | 'software';
  price: number;
  file_url?: string;
  license_required: boolean;
  description?: string;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount_percent: number;
  active_status: boolean;
  max_uses?: number;
  uses_count: number;
  expires_at?: string;
}

export interface Order {
  id: number;
  product_id: number;
  customer_email: string;
  license_key?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_id?: string;
  payment_method?: 'stripe' | 'paypal' | 'simulation';
  purchase_date: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Products
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Blog
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await api.get('/blog');
  return response.data;
};

export const getBlogPost = async (id: number): Promise<BlogPost> => {
  const response = await api.get(`/blog/${id}`);
  return response.data;
};

// Coupons
export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await api.get('/coupons');
  return response.data;
};

// Payment & Checkout
export const createPaymentIntent = async (productId: number, couponCode?: string) => {
  const response = await api.post('/create-payment-intent', {
    product_id: productId,
    coupon_code: couponCode
  });
  return response.data;
};

export const createPayPalOrder = async (productId: number, couponCode?: string) => {
  const response = await api.post('/create-paypal-order', {
    product_id: productId,
    coupon_code: couponCode
  });
  return response.data;
};

export const simulatePurchase = async (productId: number, customerEmail: string, paymentMethod: string, couponCode?: string) => {
  const response = await api.post('/simulate-purchase', {
    product_id: productId,
    customer_email: customerEmail,
    payment_method: paymentMethod,
    coupon_code: couponCode
  });
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};