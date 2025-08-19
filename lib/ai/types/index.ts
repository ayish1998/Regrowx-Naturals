// Core AI Types and Interfaces
export * from './user-profile'
export * from './recommendations'
export * from './conversation'
export * from './vision-analysis'
export * from './cultural-knowledge'
export * from './predictive-analytics'
export * from './health-integration'

// Base AI Service Interface
export interface AIService {
  initialize(): Promise<void>
  isHealthy(): Promise<boolean>
  getMetrics(): Promise<ServiceMetrics>
}

export interface ServiceMetrics {
  responseTime: number
  accuracy: number
  uptime: number
  requestCount: number
}

// Common AI Response Structure
export interface AIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  confidence?: number
  culturalContext?: string
  timestamp: Date
}

// AI Configuration
export interface AIConfig {
  models: ModelConfig[]
  culturalSafeguards: boolean
  performanceMode: 'accuracy' | 'speed' | 'balanced'
  fallbackEnabled: boolean
}

export interface ModelConfig {
  name: string
  version: string
  endpoint?: string
  apiKey?: string
  maxTokens?: number
}