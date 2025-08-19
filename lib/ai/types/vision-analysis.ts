// Vision Analysis Types
export interface VisionAnalysis {
  hairDetectionModel: HairDetectionModel
  progressTracker: ProgressTracker
  realTimeAnalyzer: RealTimeAnalyzer
  
  analyzeHairRealTime(imageStream: MediaStream): Promise<RealTimeAnalysis>
  trackProgress(currentImage: ImageData, baseline: ImageData): Promise<ProgressReport>
  detectHairHealth(image: ImageData): Promise<HealthAssessment>
  provideFeedback(analysis: HairAnalysis): Promise<InstantFeedback>
}

export interface RealTimeAnalysis {
  hairHealth: HealthScore
  growthProgress: GrowthMetrics
  conditionAssessment: ConditionReport
  immediateRecommendations: InstantRecommendation[]
  celebrateProgress?: ProgressCelebration
  imageQuality: ImageQualityScore
}

export interface ProgressReport {
  timeframe: string
  improvements: Improvement[]
  concerns: Concern[]
  nextSteps: ActionItem[]
  motivationalMessage: string
  confidenceScore: number
}

export interface HairAnalysis {
  hairType: string
  condition: string
  healthScore: number
  growthRate: number
  density: number
  concerns: string[]
  strengths: string[]
}

export interface InstantFeedback {
  message: string
  actionItems: string[]
  encouragement: string
  nextAnalysisRecommendation: string
  culturalWisdom?: string
}

export interface ImageQualityScore {
  lighting: number
  focus: number
  angle: number
  overall: number
  suggestions: string[]
}