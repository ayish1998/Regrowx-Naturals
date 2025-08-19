// AI Services Export
export { PersonalizationEngine } from './PersonalizationEngine'
export { ConversationAI } from './ConversationAI'
export { VisionAnalysis } from './VisionAnalysis'
export { PredictiveAnalytics } from './PredictiveAnalytics'
export { CulturalKnowledgeBase } from './CulturalKnowledgeBase'
export { HealthIntegration } from './HealthIntegration'

// AI Service Manager
import { AIService, AIConfig, ServiceMetrics } from '../types'
import { PersonalizationEngine } from './PersonalizationEngine'
import { ConversationAI } from './ConversationAI'
import { VisionAnalysis } from './VisionAnalysis'

export class AIServiceManager {
  private services = new Map<string, AIService>()
  private config: AIConfig
  private initialized = false

  constructor(config: AIConfig) {
    this.config = config
  }

  async initialize(): Promise<void> {
    console.log('Initializing AI Service Manager...')
    
    // Initialize core services
    const personalizationEngine = new PersonalizationEngine()
    const conversationAI = new ConversationAI()
    const visionAnalysis = new VisionAnalysis()

    // Register services
    this.services.set('personalization', personalizationEngine)
    this.services.set('conversation', conversationAI)
    this.services.set('vision', visionAnalysis)

    // Initialize all services
    for (const [name, service] of this.services) {
      try {
        await service.initialize()
        console.log(`✅ ${name} service initialized`)
      } catch (error) {
        console.error(`❌ Failed to initialize ${name} service:`, error)
      }
    }

    this.initialized = true
    console.log('🚀 AI Service Manager ready!')
  }

  getService<T extends AIService>(name: string): T | null {
    return (this.services.get(name) as T) || null
  }

  async getHealthStatus(): Promise<Record<string, boolean>> {
    const status: Record<string, boolean> = {}
    
    for (const [name, service] of this.services) {
      status[name] = await service.isHealthy()
    }
    
    return status
  }

  async getMetrics(): Promise<Record<string, ServiceMetrics>> {
    const metrics: Record<string, ServiceMetrics> = {}
    
    for (const [name, service] of this.services) {
      metrics[name] = await service.getMetrics()
    }
    
    return metrics
  }

  isInitialized(): boolean {
    return this.initialized
  }
}