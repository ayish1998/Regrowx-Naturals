-- Regrowx Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  hair_type TEXT,
  scalp_condition TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  images JSONB DEFAULT '[]',
  ingredients JSONB DEFAULT '[]',
  categories JSONB DEFAULT '[]',
  inventory_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 10,
  traditional_use JSONB DEFAULT '{}',
  sourcing_info JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  shipping_info JSONB DEFAULT '{}',
  payment_info JSONB DEFAULT '{}',
  items JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hair analyses table
CREATE TABLE public.hair_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  input_data JSONB NOT NULL,
  results JSONB NOT NULL,
  confidence_score DECIMAL(3,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
  follow_up_scheduled TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  before_after_photos JSONB DEFAULT '[]',
  timeframe TEXT NOT NULL,
  results TEXT NOT NULL,
  products_used JSONB DEFAULT '[]',
  is_verified BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]',
  traditional_knowledge JSONB DEFAULT '{}',
  related_products JSONB DEFAULT '[]',
  author TEXT NOT NULL,
  read_time INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_products_categories ON public.products USING GIN(categories);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_hair_analyses_user_id ON public.hair_analyses(user_id);
CREATE INDEX idx_testimonials_published ON public.testimonials(is_published);
CREATE INDEX idx_articles_published ON public.articles(is_published);
CREATE INDEX idx_articles_category ON public.articles(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hair_analyses_updated_at BEFORE UPDATE ON public.hair_analyses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hair_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);

-- Orders policies
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pending orders" ON public.orders FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- Hair analyses policies
CREATE POLICY "Users can view own analyses" ON public.hair_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own analyses" ON public.hair_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Testimonials policies
CREATE POLICY "Anyone can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Users can create own testimonials" ON public.testimonials FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own testimonials" ON public.testimonials FOR UPDATE USING (auth.uid() = user_id);

-- Articles policies
CREATE POLICY "Anyone can view published articles" ON public.articles FOR SELECT USING (is_published = true);

-- Insert sample data
INSERT INTO public.products (name, description, price, original_price, images, ingredients, categories, inventory_quantity, traditional_use, sourcing_info) VALUES
('Neem & Shea Hair Growth Serum', 'Traditional Ghanaian neem and shea butter formula for accelerated hair growth.', 45.00, 60.00, 
 '["product1-1.jpg", "product1-2.jpg"]', 
 '["Neem Extract", "Shea Butter", "Coconut Oil", "Hibiscus"]', 
 '["Hair Growth", "Serums"]', 
 100,
 '{"description": "Used by Ghanaian grandmothers for centuries", "cultural_context": "Traditional Ashanti hair care", "attribution": "Ashanti Women\'s Collective"}',
 '{"farmers": [{"name": "Akosua Mensah", "cooperative": "Ashanti Women\'s Shea Collective", "region": "Kumasi"}], "region": "Northern Ghana", "harvest_season": "November-March"}'
),
('Baobab Scalp Treatment Oil', 'Nutrient-rich baobab oil to nourish and heal damaged scalp conditions.', 38.00, NULL,
 '["product2-1.jpg", "product2-2.jpg"]',
 '["Baobab Oil", "Moringa Extract", "Jojoba Oil"]',
 '["Scalp Care", "Oils"]',
 75,
 '{"description": "Sacred baobab tree oil for scalp healing", "cultural_context": "Traditional West African medicine", "attribution": "Northern Neem Farmers Union"}',
 '{"farmers": [{"name": "Fatima Osei", "cooperative": "Northern Neem Farmers Union", "region": "Tamale"}], "region": "Northern Ghana", "harvest_season": "Year-round"}'
),
('Hibiscus Curl Defining Cream', 'Define and moisturize curls with this traditional hibiscus-infused cream.', 32.00, NULL,
 '["product3-1.jpg", "product3-2.jpg"]',
 '["Hibiscus Extract", "Aloe Vera", "Coconut Cream"]',
 '["Styling", "Creams"]',
 120,
 '{"description": "Hibiscus flowers for natural curl enhancement", "cultural_context": "Traditional hair styling methods", "attribution": "Volta Moringa Cooperative"}',
 '{"farmers": [{"name": "Amara Diallo", "cooperative": "Volta Moringa Cooperative", "region": "Ho"}], "region": "Volta Region", "harvest_season": "May-September"}'
);

INSERT INTO public.articles (title, content, excerpt, category, tags, traditional_knowledge, related_products, author, read_time, is_published) VALUES
('Traditional Neem Benefits for Hair Growth', 'Neem has been used in Ghana for centuries...', 'Discover how Ghanaian grandmothers have used neem for centuries to promote healthy hair growth.', 'Traditional Remedies', '["neem", "hair growth", "traditional"]', '{"source": "Ashanti oral tradition", "attribution": "Akosua Mensah, Traditional Herbalist"}', '["product1-id"]', 'Akosua Mensah, Traditional Herbalist', 5, true),
('Understanding Your Hair Type with AI', 'Modern technology can help identify...', 'Learn how modern technology can help identify your unique hair characteristics.', 'Hair Science', '["AI", "hair analysis", "technology"]', '{}', '[]', 'Dr. Sarah Johnson', 7, true),
('Shea Butter: The Gold of Ghana', 'Shea butter has been treasured in Ghana...', 'Explore the rich history and benefits of shea butter in African hair care traditions.', 'Ingredients', '["shea butter", "Ghana", "ingredients"]', '{"source": "Ashanti Women\'s Collective", "attribution": "Fatima Osei, Cooperative Leader"}', '["product1-id"]', 'Fatima Osei, Cooperative Leader', 6, true);

INSERT INTO public.testimonials (customer_name, content, rating, timeframe, results, products_used, is_verified, is_published) VALUES
('Akosua Mensah', 'After struggling with hair loss for years, Regrowx''s AI analysis recommended the perfect combination of traditional herbs. My hair has never been healthier!', 5, '8 weeks', 'Reduced hair loss by 70%', '["Neem & Shea Hair Growth Serum"]', true, true),
('Fatima Osei', 'The ScalpScan technology is incredible! I can actually see my progress week by week. The traditional remedies really work when combined with modern science.', 5, '12 weeks', 'New hair growth visible', '["Baobab Scalp Treatment Oil"]', true, true),
('Amara Diallo', 'I love that Regrowx preserves our ancestral knowledge while making it accessible. The products smell amazing and my scalp feels so much healthier.', 5, '6 weeks', 'Scalp irritation eliminated', '["Hibiscus Curl Defining Cream"]', true, true);