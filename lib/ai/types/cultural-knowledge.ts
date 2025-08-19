// Cultural Knowledge Types
export interface CulturalKnowledgeBase {
  traditionalPractices: Map<string, TraditionalPractice>
  culturalWisdom: CulturalWisdom
  respectFramework: RespectFramework
  
  getTraditionalPractice(name: string): Promise<TraditionalPractice | null>
  searchPractices(query: string): Promise<TraditionalPractice[]>
  validateCulturalSensitivity(content: string): Promise<SensitivityResult>
  getAttribution(practiceId: string): Promise<Attribution>
}

export interface TraditionalPractice {
  id: string
  name: string
  description: string
  ingredients: Ingredient[]
  preparation: PreparationMethod
  usage: UsageInstructions
  culturalSignificance: string
  historicalContext: string
  attribution: Attribution
  modernScience: ScientificValidation
  respectLevel: 'sacred' | 'traditional' | 'common'
}

export interface CulturalWisdom {
  proverbs: CulturalProverb[]
  stories: TraditionalStory[]
  ceremonies: HairCeremony[]
  symbolism: HairSymbolism[]
}

export interface Attribution {
  source: string
  community: string
  elders: string[]
  permissions: Permission[]
  benefitSharing: BenefitSharingAgreement
}

export interface RespectFramework {
  attributionGuidelines: AttributionRule[]
  culturalSensitivity: SensitivityRule[]
  appropriationPrevention: PreventionRule[]
  communityFeedback: FeedbackProtocol[]
}

export interface SensitivityResult {
  isAppropriate: boolean
  concerns: string[]
  suggestions: string[]
  culturalContext: string
}