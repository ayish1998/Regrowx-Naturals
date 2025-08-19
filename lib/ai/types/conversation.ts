// Conversation AI Types
export interface ConversationAI {
  conversationMemory: ConversationMemory
  contextManager: ContextManager
  culturalAdvisor: CulturalAdvisor
  
  processMessage(message: string, context: ConversationContext): Promise<AIResponse>
  maintainContext(conversationId: string): Promise<void>
  generatePersonalizedContent(topic: string, userProfile: EnhancedUserProfile): Promise<string>
  escalateToHuman(reason: EscalationReason): Promise<EscalationResult>
}

export interface ConversationMemory {
  shortTerm: RecentInteraction[]
  longTerm: UserJourney
  preferences: ConversationPreferences
  culturalContext: CulturalMemory
}

export interface ConversationContext {
  userId: string
  conversationId: string
  sessionId: string
  userProfile: EnhancedUserProfile
  currentTopic?: string
  messageHistory: Message[]
  culturalSensitivity: boolean
}

export interface AIResponse {
  message: string
  suggestions: QuickReply[]
  recommendations?: PersonalizedRecommendation[]
  educationalContent?: EducationalSnippet
  followUpQuestions?: string[]
  culturalInsight?: CulturalInsight
  shouldEscalate?: boolean
  confidence: number
}

export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type: MessageType
  metadata?: MessageMetadata
}

export type MessageType = 'text' | 'quick-reply' | 'product-card' | 'educational' | 'cultural-insight'