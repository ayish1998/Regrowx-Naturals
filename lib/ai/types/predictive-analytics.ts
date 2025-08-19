// Predictive Analytics Types
export interface PredictiveAnalytics {
  customerBehaviorModel: BehaviorModel
  productPerformanceModel: PerformanceModel
  seasonalTrendsModel: TrendsModel
  
  predictCustomerNeeds(customerId: string): Promise<PredictedNeeds>
  forecastProductDemand(timeframe: string): Promise<DemandForecast>
  identifyTrends(dataSet: AnalyticsData): Promise<TrendInsights>
  generateBusinessInsights(): Promise<BusinessInsights>
}

export interface BusinessInsights {
  customerTrends: CustomerTrend[]
  productPerformance: ProductMetrics[]
  seasonalPatterns: SeasonalPattern[]
  recommendations: BusinessRecommendation[]
  alerts: BusinessAlert[]
  culturalInsights: CulturalTrend[]
}

export interface PredictedNeeds {
  products: ProductPrediction[]
  services: ServicePrediction[]
  timeline: PredictionTimeline
  confidence: number
  reasoning: string[]
}

export interface DemandForecast {
  product: string
  predictedDemand: number
  confidence: number
  seasonalFactors: SeasonalFactor[]
  culturalEvents: CulturalEvent[]
  recommendations: InventoryRecommendation[]
}

export interface TrendInsights {
  emergingTrends: Trend[]
  decliningTrends: Trend[]
  culturalShifts: CulturalShift[]
  marketOpportunities: MarketOpportunity[]
  riskFactors: RiskFactor[]
}

export interface CustomerTrend {
  segment: string
  behavior: string
  growth: number
  culturalFactors: string[]
  recommendations: string[]
}