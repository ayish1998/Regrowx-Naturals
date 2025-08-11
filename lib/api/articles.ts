import { supabase } from '../supabase';
import type { Database } from '@/types/database';

type Article = Database['public']['Tables']['articles']['Row'];
type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
type ArticleUpdate = Database['public']['Tables']['articles']['Update'];

// Get all published articles
export const getArticles = async (category?: string): Promise<Article[]> => {
  let query = supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

// Get a single article
export const getArticle = async (id: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }

  return data;
};

// Search articles
export const searchArticles = async (query: string): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get featured articles
export const getFeaturedArticles = async (limit: number = 3): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

// Get articles by category
export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get related articles
export const getRelatedArticles = async (articleId: string, category: string, limit: number = 3): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .neq('id', articleId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

// Get article categories
export const getArticleCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('category')
    .eq('is_published', true);

  if (error) throw error;

  // Extract unique categories
  const categories = [...new Set(data?.map(article => article.category) || [])];
  return categories.sort();
};

// Admin functions
export const createArticle = async (article: ArticleInsert): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateArticle = async (id: string, updates: ArticleUpdate): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteArticle = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const publishArticle = async (id: string): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .update({ is_published: true })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const unpublishArticle = async (id: string): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .update({ is_published: false })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};