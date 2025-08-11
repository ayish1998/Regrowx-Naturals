import { supabase } from '../supabase';
import type { Database } from '@/types/database';

type HairAnalysis = Database['public']['Tables']['hair_analyses']['Row'];
type HairAnalysisInsert = Database['public']['Tables']['hair_analyses']['Insert'];

export interface AnalysisInput {
  photos: string[];
  questionnaire: {
    age: string;
    hair_length: string;
    hair_texture: string;
    scalp_sensitivity: string;
    concerns: string[];
    lifestyle: {
      diet: string;
      stress_level: string;
      exercise_frequency: string;
    };
  };
}

export interface AnalysisResults {
  hair_type: string;
  scalp_condition: string;
  recommendations: ProductRecommendation[];
  traditional_remedies: TraditionalRemedy[];
  care_routine: CareRoutine;
  follow_up_date?: string;
}

export interface ProductRecommendation {
  product_id: string;
  product_name: string;
  confidence: number;
  reasoning: string;
  usage_instructions: string;
}

export interface TraditionalRemedy {
  name: string;
  ingredients: string[];
  preparation: string;
  usage: string;
  cultural_context: string;
  attribution: string;
}

export interface CareRoutine {
  daily: string[];
  weekly: string[];
  monthly: string[];
  tips: string[];
}

// Create a new hair analysis
export const createHairAnalysis = async (
  userId: string,
  inputData: AnalysisInput
): Promise<HairAnalysis> => {
  // Simulate AI analysis (in production, this would call your AI service)
  const analysisResults = await simulateAIAnalysis(inputData);

  const { data, error } = await supabase
    .from('hair_analyses')
    .insert({
      user_id: userId,
      input_data: inputData,
      results: analysisResults,
      confidence_score: analysisResults.confidence_score,
      follow_up_scheduled: analysisResults.follow_up_date ? new Date(analysisResults.follow_up_date).toISOString() : null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user's hair analyses
export const getUserAnalyses = async (userId: string): Promise<HairAnalysis[]> => {
  const { data, error } = await supabase
    .from('hair_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get a specific analysis
export const getAnalysis = async (analysisId: string, userId: string): Promise<HairAnalysis | null> => {
  const { data, error } = await supabase
    .from('hair_analyses')
    .select('*')
    .eq('id', analysisId)
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }

  return data;
};

// Get latest analysis for user
export const getLatestAnalysis = async (userId: string): Promise<HairAnalysis | null> => {
  const { data, error } = await supabase
    .from('hair_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }

  return data;
};

// Simulate AI analysis (replace with actual AI service)
const simulateAIAnalysis = async (inputData: AnalysisInput): Promise<AnalysisResults & { confidence_score: number }> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { questionnaire } = inputData;
  
  // Simple rule-based analysis simulation
  let hairType = 'Normal';
  let scalpCondition = 'Healthy';
  let confidenceScore = 0.85;

  // Determine hair type based on texture
  switch (questionnaire.hair_texture) {
    case 'straight':
      hairType = 'Type 1 - Straight';
      break;
    case 'wavy':
      hairType = 'Type 2 - Wavy';
      break;
    case 'curly':
      hairType = 'Type 3 - Curly';
      break;
    case 'coily':
      hairType = 'Type 4 - Coily';
      break;
  }

  // Determine scalp condition based on concerns
  if (questionnaire.concerns.includes('Dry Scalp')) {
    scalpCondition = 'Dry';
  } else if (questionnaire.concerns.includes('Oily Scalp')) {
    scalpCondition = 'Oily';
  } else if (questionnaire.concerns.includes('Dandruff')) {
    scalpCondition = 'Dandruff-prone';
  }

  // Generate recommendations based on analysis
  const recommendations: ProductRecommendation[] = [
    {
      product_id: 'product-1',
      product_name: 'Neem & Shea Hair Growth Serum',
      confidence: 0.9,
      reasoning: 'Perfect for your hair type and addresses growth concerns',
      usage_instructions: 'Apply to scalp 3 times per week, massage gently'
    },
    {
      product_id: 'product-2',
      product_name: 'Baobab Scalp Treatment Oil',
      confidence: 0.8,
      reasoning: 'Excellent for scalp health and moisture balance',
      usage_instructions: 'Use as pre-shampoo treatment once weekly'
    }
  ];

  const traditionalRemedies: TraditionalRemedy[] = [
    {
      name: 'Neem Leaf Hair Rinse',
      ingredients: ['Fresh neem leaves', 'Water'],
      preparation: 'Boil neem leaves in water for 15 minutes, strain and cool',
      usage: 'Use as final rinse after shampooing',
      cultural_context: 'Traditional Ghanaian hair care practice',
      attribution: 'Ashanti Women\'s Collective'
    }
  ];

  const careRoutine: CareRoutine = {
    daily: ['Gentle scalp massage', 'Protective styling'],
    weekly: ['Deep conditioning treatment', 'Scalp oil massage'],
    monthly: ['Trim split ends', 'Protein treatment'],
    tips: [
      'Sleep on silk or satin pillowcase',
      'Avoid heat styling when possible',
      'Stay hydrated and eat nutrient-rich foods'
    ]
  };

  return {
    hair_type: hairType,
    scalp_condition: scalpCondition,
    recommendations,
    traditional_remedies: traditionalRemedies,
    care_routine: careRoutine,
    follow_up_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    confidence_score: confidenceScore
  };
};