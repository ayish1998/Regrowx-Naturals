import { supabase } from '../supabase';
import type { Database } from '@/types/database';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderUpdate = Database['public']['Tables']['orders']['Update'];

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ShippingInfo {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone?: string;
}

export interface PaymentInfo {
  method: string;
  status: string;
  transaction_id?: string;
  last_four?: string;
}

// Create a new order
export const createOrder = async (orderData: {
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  shipping_info: ShippingInfo;
  payment_info: PaymentInfo;
  currency?: string;
}): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.user_id,
      items: orderData.items,
      total_amount: orderData.total_amount,
      shipping_info: orderData.shipping_info,
      payment_info: orderData.payment_info,
      currency: orderData.currency || 'USD',
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user's orders
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get a specific order
export const getOrder = async (orderId: string, userId?: string): Promise<Order | null> => {
  let query = supabase
    .from('orders')
    .select('*')
    .eq('id', orderId);

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query.single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }

  return data;
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Cancel order (only if pending)
export const cancelOrder = async (orderId: string, userId: string): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId)
    .eq('user_id', userId)
    .eq('status', 'pending')
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get order statistics (admin)
export const getOrderStats = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('status, total_amount, created_at');

  if (error) throw error;

  const stats = {
    total_orders: data?.length || 0,
    total_revenue: data?.reduce((sum, order) => sum + order.total_amount, 0) || 0,
    pending_orders: data?.filter(order => order.status === 'pending').length || 0,
    completed_orders: data?.filter(order => order.status === 'delivered').length || 0,
  };

  return stats;
};

// Get recent orders (admin)
export const getRecentOrders = async (limit: number = 10): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};