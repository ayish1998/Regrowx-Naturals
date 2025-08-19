// Health Integration Types
export interface HealthIntegration {
  healthDataConnector: HealthDataConnector
  weatherService: WeatherService
  calendarIntegration: CalendarIntegration
  
  syncHealthData(userId: string): Promise<HealthData>
  getWeatherRecommendations(location: string): Promise<WeatherRecommendation[]>
  scheduleReminders(userId: string, routine: HairCareRoutine): Promise<void>
  analyzeHolisticHealth(userId: string): Promise<HolisticAnalysis>
}

export interface HealthData {
  nutrition: NutritionData
  stressLevels: StressData
  sleepPatterns: SleepData
  exerciseActivity: ExerciseData
  hydration: HydrationData
  lastUpdated: Date
}

export interface WeatherRecommendation {
  condition: string
  humidity: number
  temperature: number
  recommendations: string[]
  productAdjustments: ProductAdjustment[]
  culturalPractices: string[]
}

export interface HairCareRoutine {
  id: string
  name: string
  steps: RoutineStep[]
  frequency: string
  duration: number
  culturalElements: CulturalElement[]
  personalizations: Personalization[]
}

export interface HolisticAnalysis {
  overallWellness: WellnessScore
  hairHealthCorrelation: HealthCorrelation[]
  recommendations: HolisticRecommendation[]
  culturalWisdom: string[]
  nextCheckIn: Date
}

export interface HealthCorrelation {
  factor: string
  impact: 'positive' | 'negative' | 'neutral'
  strength: number
  explanation: string
  culturalContext?: string
}