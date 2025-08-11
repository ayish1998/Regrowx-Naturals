import { supabase } from '../supabase';
import type { Database } from '@/types/database';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];
type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update'];

// Get all published testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .eq('is_verified', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get featured testimonials
export const getFeaturedTestimonials = async (limit: number = 3): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .eq('is_verified', true)
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

// Get testimonials by rating
export const getTestimonialsByRating = async (rating: number): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .eq('is_verified', true)
    .eq('rating', rating)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Create a new testimonial
export const createTestimonial = async (testimonial: TestimonialInsert): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert({
      ...testimonial,
      is_verified: false, // Requires admin verification
      is_published: false // Requires admin approval
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user's testimonials
export const getUserTestimonials = async (userId: string): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Update testimonial
export const updateTestimonial = async (id: string, updates: TestimonialUpdate): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get testimonial statistics
export const getTestimonialStats = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('rating, is_published, is_verified');

  if (error) throw error;

  const stats = {
    total: data?.length || 0,
    published: data?.filter(t => t.is_published).length || 0,
    verified: data?.filter(t => t.is_verified).length || 0,
    average_rating: data?.length ? 
      data.reduce((sum, t) => sum + t.rating, 0) / data.length : 0,
    rating_distribution: {
      5: data?.filter(t => t.rating === 5).length || 0,
      4: data?.filter(t => t.rating === 4).length || 0,
      3: data?.filter(t => t.rating === 3).length || 0,
      2: data?.filter(t => t.rating === 2).length || 0,
      1: data?.filter(t => t.rating === 1).length || 0,
    }
  };

  return stats;
};

// Admin functions
export const getPendingTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', false)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const verifyTestimonial = async (id: string): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ is_verified: true })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const publishTestimonial = async (id: string): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ is_published: true })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const unpublishTestimonial = async (id: string): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ is_published: false })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};