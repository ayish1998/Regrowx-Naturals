import { supabase } from '../supabase';
import type { Database } from '@/types/database';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

// Get all active products with optional filters
export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters?.category && filters.category !== 'All') {
    query = query.contains('categories', [filters.category]);
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }

  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  if (filters?.inStock) {
    query = query.gt('inventory_quantity', 0);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

// Get a single product by ID
export const getProduct = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }

  return data;
};

// Get featured products (best sellers, new arrivals, etc.)
export const getFeaturedProducts = async (limit: number = 4): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .contains('categories', [category])
    .order('name');

  if (error) throw error;
  return data || [];
};

// Get related products based on categories or ingredients
export const getRelatedProducts = async (productId: string, limit: number = 4): Promise<Product[]> => {
  // First get the current product to find related ones
  const currentProduct = await getProduct(productId);
  if (!currentProduct) return [];

  const categories = currentProduct.categories as string[] || [];
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .neq('id', productId)
    .or(categories.map(cat => `categories.cs.["${cat}"]`).join(','))
    .limit(limit);

  if (error) throw error;
  return data || [];
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('name');

  if (error) throw error;
  return data || [];
};

// Get product categories
export const getProductCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('categories')
    .eq('is_active', true);

  if (error) throw error;

  // Extract unique categories from all products
  const allCategories = new Set<string>();
  data?.forEach(product => {
    const categories = product.categories as string[] || [];
    categories.forEach(cat => allCategories.add(cat));
  });

  return Array.from(allCategories).sort();
};

// Admin functions (require service role key)
export const createProduct = async (product: ProductInsert): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, updates: ProductUpdate): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('id', id);

  if (error) throw error;
};

// Update inventory
export const updateInventory = async (id: string, quantity: number): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update({ inventory_quantity: quantity })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};