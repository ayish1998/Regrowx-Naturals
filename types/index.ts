// Core data models for Regrowx platform

export interface User {
  id: string;
  email: string;
  profile: {
    name: string;
    hairType?: string;
    scalpCondition?: string;
    preferences: UserPreferences;
  };
  analysisHistory: AnalysisRecord[];
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  language: string;
  notifications: boolean;
  marketingEmails: boolean;
  dataSharing: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  ingredients: Ingredient[];
  categories: string[];
  images: ProductImage[];
  inventory: {
    quantity: number;
    lowStockThreshold: number;
  };
  sourcing: {
    farmers: FarmerInfo[];
    region: string;
    harvestSeason: string;
  };
  traditionalUse: {
    description: string;
    culturalContext: string;
    attribution: string;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  scientificName: string;
  traditionalName: string;
  benefits: string[];
  origin: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface FarmerInfo {
  id: string;
  name: string;
  cooperative: string;
  region: string;
  story: string;
  profileImage?: string;
}

export interface AnalysisRecord {
  id: string;
  userId: string;
  timestamp: Date;
  inputData: {
    images: string[];
    questionnaire: QuestionnaireResponse;
  };
  results: {
    hairType: string;
    scalpCondition: string;
    recommendations: ProductRecommendation[];
    confidenceScore: number;
  };
  followUpScheduled?: Date;
}

export interface QuestionnaireResponse {
  age: number;
  hairLength: string;
  hairTexture: string;
  scalpSensitivity: string;
  currentProducts: string[];
  concerns: string[];
  lifestyle: {
    diet: string;
    stressLevel: string;
    exerciseFrequency: string;
  };
}

export interface ProductRecommendation {
  productId: string;
  confidence: number;
  reasoning: string;
  usage: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: OrderStatus;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export interface ShippingInfo {
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  method: string;
  trackingNumber?: string;
}

export interface PaymentInfo {
  method: string;
  status: string;
  transactionId: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  beforeAfterPhotos: string[];
  timeframe: string;
  results: string;
  verified: boolean;
  productUsed: string[];
  rating: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  traditionalKnowledge: {
    source: string;
    attribution: string;
  };
  relatedProducts: string[];
  tags: string[];
  publishedAt: Date;
}