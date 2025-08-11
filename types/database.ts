export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          hair_type: string | null;
          scalp_condition: string | null;
          preferences: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          hair_type?: string | null;
          scalp_condition?: string | null;
          preferences?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          hair_type?: string | null;
          scalp_condition?: string | null;
          preferences?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          original_price: number | null;
          currency: string;
          images: Json;
          ingredients: Json;
          categories: Json;
          inventory_quantity: number;
          low_stock_threshold: number;
          traditional_use: Json;
          sourcing_info: Json;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          original_price?: number | null;
          currency?: string;
          images?: Json;
          ingredients?: Json;
          categories?: Json;
          inventory_quantity?: number;
          low_stock_threshold?: number;
          traditional_use?: Json;
          sourcing_info?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          original_price?: number | null;
          currency?: string;
          images?: Json;
          ingredients?: Json;
          categories?: Json;
          inventory_quantity?: number;
          low_stock_threshold?: number;
          traditional_use?: Json;
          sourcing_info?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          total_amount: number;
          currency: string;
          shipping_info: Json;
          payment_info: Json;
          items: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: string;
          total_amount: number;
          currency?: string;
          shipping_info?: Json;
          payment_info?: Json;
          items?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: string;
          total_amount?: number;
          currency?: string;
          shipping_info?: Json;
          payment_info?: Json;
          items?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      hair_analyses: {
        Row: {
          id: string;
          user_id: string;
          input_data: Json;
          results: Json;
          confidence_score: number;
          follow_up_scheduled: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          input_data: Json;
          results: Json;
          confidence_score: number;
          follow_up_scheduled?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          input_data?: Json;
          results?: Json;
          confidence_score?: number;
          follow_up_scheduled?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          content: string;
          rating: number;
          before_after_photos: Json | null;
          timeframe: string;
          results: string;
          products_used: Json;
          is_verified: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          customer_name: string;
          content: string;
          rating: number;
          before_after_photos?: Json | null;
          timeframe: string;
          results: string;
          products_used?: Json;
          is_verified?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          customer_name?: string;
          content?: string;
          rating?: number;
          before_after_photos?: Json | null;
          timeframe?: string;
          results?: string;
          products_used?: Json;
          is_verified?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          category: string;
          tags: Json;
          traditional_knowledge: Json;
          related_products: Json;
          author: string;
          read_time: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt: string;
          category: string;
          tags?: Json;
          traditional_knowledge?: Json;
          related_products?: Json;
          author: string;
          read_time: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string;
          category?: string;
          tags?: Json;
          traditional_knowledge?: Json;
          related_products?: Json;
          author?: string;
          read_time?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];