// Recommendation System Types
export interface PersonalizedRecommendation {
  id: string
  type: RecommendationType
  confidence: number
  reasoning: string
  culturalContext: string
  alternatives: Alternative[]
  expectedOutcome: string
  timeline: string
  priority: Priority
  seasonalAdjustment?: SeasonalAdjustment
}

export type RecommendationType = 'product' | 'routine' | 'remedy' | 'education' | 'lifestyle'
export type Priority = 'high' | 'medium' | 'low'

export interface Alternative {
  id: string
  name: string
  confidence: number
  reasoning: string
  culturalRelevance: number
}

export interface RecommendationContext {
  userProfile: EnhancedUserProfile
  currentSeason: Season
  weatherConditions?: WeatherData
  recentInteractions: Interaction[]
  availableBudget?: number
  timeConstraints?: TimeConstraints
}

export interface SeasonalAdjustment {
  season: Season
  adjustmentReason: string
  modifiedInstructions: string
  alternativeProducts?: string[]
}

export interface RecommendationEngine {
  generateRecommendations(context: RecommendationContext): Promise<PersonalizedRecommendation[]>
  updateUserProfile(userId: string, newData: Partial<EnhancedUserProfile>): Promise<void>
  trackProgress(userId: string, progressData: ProgressMetrics): Promise<void>
  adaptToFeedback(userId: string, feedback: UserFeedback): Promise<void>
  getRecommendationHistory(userId: string): Promise<RecommendationHistory[]>
}