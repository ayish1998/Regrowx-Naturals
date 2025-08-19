// Enhanced User Profile Types
export interface EnhancedUserProfile {
  id: string
  demographics: Demographics
  createdAt: Date
  lastActive: Date
  hairProfile: HairProfile
  culturalProfile: CulturalProfile
  lifestyle: LifestyleFactors
  aiProfile: AIProfile
}

export interface Demographics {
  ageRange: string
  location?: string
  timezone?: string
}

export interface HairProfile {
  type: HairType
  texture: HairTexture
  porosity: Porosity
  density: Density
  length: Length
  concerns: HairConcern[]
  goals: HairGoal[]
  currentCondition: HairCondition
}

export interface CulturalProfile {
  background: CulturalBackground
  traditionalPractices: TraditionalPractice[]
  culturalPreferences: CulturalPreference[]
  languagePreference: string
  respectLevel: 'high' | 'medium' | 'low'
}

export interface LifestyleFactors {
  climate: ClimateData
  stressLevel: StressLevel
  diet: DietType
  exerciseFrequency: ExerciseFrequency
  sleepPattern: SleepPattern
  workEnvironment: WorkEnvironment
}

export interface AIProfile {
  learningPreferences: LearningPreference[]
  interactionHistory: InteractionSummary[]
  feedbackPatterns: FeedbackPattern[]
  progressMetrics: ProgressMetric[]
  personalizationLevel: number
}