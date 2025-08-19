import { CulturalKnowledgeBase } from '../services/CulturalKnowledgeBase'
import { EnhancedUserProfile, CulturalProfile } from '../types'

export class CulturalAdvisor {
  private knowledgeBase: CulturalKnowledgeBase

  constructor(knowledgeBase: CulturalKnowledgeBase) {
    this.knowledgeBase = knowledgeBase
  }

  async provideCulturalGuidance(
    userProfile: EnhancedUserProfile, 
    context: string
  ): Promise<CulturalGuidance> {
    const { culturalProfile } = userProfile
    
    return {
      recommendations: await this.getCulturalRecommendations(culturalProfile, context),
      wisdom: await this.getRelevantWisdom(context),
      respectConsiderations: await this.getRespectConsiderations(culturalProfile),
      attribution: await this.getRequiredAttribution(context),
      culturalContext: await this.generateCulturalContext(culturalProfile, context)
    }
  }

  private async getCulturalRecommendations(
    profile: CulturalProfile, 
    context: string
  ): Promise<CulturalRecommendation[]> {
    const recommendations: CulturalRecommendation[] = []

    // High cultural respect users get traditional-first recommendations
    if (profile.respectLevel === 'high') {
      recommendations.push({
        type: 'traditional-first',
        message: 'Based on your high respect for traditional practices, we recommend starting with ancestral methods',
        practices: await this.knowledgeBase.searchPractices(context),
        culturalSignificance: 'Honoring traditional knowledge demonstrates respect for ancestral wisdom'
      })
    }

    // Users with Ghanaian background get culturally specific recommendations
    if (profile.background === 'ghanaian' || profile.background === 'west_african') {
      const culturalPractices = await this.knowledgeBase.searchPractices('ghanaian')
      recommendations.push({
        type: 'cultural-heritage',
        message: 'These practices connect you to your cultural heritage',
        practices: culturalPractices,
        culturalSignificance: 'Maintaining connection to ancestral practices preserves cultural identity'
      })
    }

    return recommendations
  }

  private async getRelevantWisdom(context: string): Promise<CulturalWisdom> {
    const proverb = await this.knowledgeBase.getCulturalProverb(context)
    const story = await this.knowledgeBase.getCulturalStory(context)
    
    return {
      proverb: proverb || await this.knowledgeBase.getCulturalProverb(),
      story: story,
      application: this.generateWisdomApplication(proverb, context)
    }
  }

  private generateWisdomApplication(proverb: any, context: string): string {
    if (!proverb) return ''
    
    const applications = {
      'hair care': `This wisdom reminds us that ${context} requires patience and consistent care, just as our ancestors taught.`,
      'beauty': `Traditional beauty wisdom teaches us that true beauty comes from honoring our natural selves and cultural heritage.`,
      'health': `Our ancestors understood that hair health reflects overall wellness - this proverb guides us to take a holistic approach.`
    }
    
    return applications[context] || `This traditional wisdom applies to ${context} by emphasizing the importance of respect and consistency.`
  }

  private async getRespectConsiderations(profile: CulturalProfile): Promise<RespectConsideration[]> {
    const considerations: RespectConsideration[] = []

    if (profile.respectLevel === 'high') {
      considerations.push({
        level: 'critical',
        message: 'Sacred practices require special reverence and proper permissions',
        guidelines: [
          'Always acknowledge the spiritual significance',
          'Use practices with gratitude and respect',
          'Share knowledge responsibly with proper attribution'
        ]
      })
    }

    considerations.push({
      level: 'important',
      message: 'Traditional knowledge represents generations of wisdom',
      guidelines: [
        'Honor the communities that preserved this knowledge',
        'Support benefit-sharing initiatives when possible',
        'Teach others about the cultural significance'
      ]
    })

    return considerations
  }

  private async getRequiredAttribution(context: string): Promise<AttributionRequirement[]> {
    const requirements: AttributionRequirement[] = []
    
    // Search for practices related to context
    const practices = await this.knowledgeBase.searchPractices(context)
    
    for (const practice of practices) {
      const attribution = await this.knowledgeBase.getAttribution(practice.id)
      requirements.push({
        practiceId: practice.id,
        practiceName: practice.name,
        requiredAttribution: await this.knowledgeBase.generateProperAttribution(practice.id),
        benefitSharing: attribution.benefitSharing,
        permissions: attribution.permissions
      })
    }

    return requirements
  }

  private async generateCulturalContext(
    profile: CulturalProfile, 
    context: string
  ): Promise<string> {
    let culturalContext = ''

    if (profile.background === 'ghanaian') {
      culturalContext += 'As someone with Ghanaian heritage, these practices connect you directly to your ancestral traditions. '
    } else {
      culturalContext += 'While these practices originate from Ghanaian culture, they are shared with respect and proper attribution. '
    }

    culturalContext += `The wisdom behind ${context} reflects the holistic approach of traditional African hair care, `
    culturalContext += 'where beauty, health, and spiritual well-being are interconnected.'

    return culturalContext
  }

  async validateCulturalAppropriateness(
    content: string, 
    userProfile: EnhancedUserProfile
  ): Promise<CulturalValidationResult> {
    const sensitivityResult = await this.knowledgeBase.validateCulturalSensitivity(content)
    
    return {
      isAppropriate: sensitivityResult.isAppropriate,
      concerns: sensitivityResult.concerns,
      suggestions: sensitivityResult.suggestions,
      culturalContext: sensitivityResult.culturalContext,
      userGuidance: this.generateUserGuidance(userProfile.culturalProfile, sensitivityResult)
    }
  }

  private generateUserGuidance(
    profile: CulturalProfile, 
    sensitivityResult: any
  ): string {
    if (sensitivityResult.isAppropriate) {
      return 'This content appropriately honors traditional knowledge and cultural practices.'
    }

    let guidance = 'To better honor traditional knowledge: '
    
    if (profile.respectLevel === 'high') {
      guidance += 'As someone who values traditional practices highly, consider how this content reflects your respect for ancestral wisdom. '
    }

    guidance += sensitivityResult.suggestions.join(' ')
    
    return guidance
  }

  async getCulturalEducation(topic: string, userLevel: 'beginner' | 'intermediate' | 'advanced'): Promise<CulturalEducation> {
    const practices = await this.knowledgeBase.searchPractices(topic)
    const wisdom = await this.getRelevantWisdom(topic)
    
    return {
      topic,
      level: userLevel,
      introduction: this.generateEducationIntroduction(topic, userLevel),
      practices: practices.slice(0, userLevel === 'beginner' ? 2 : userLevel === 'intermediate' ? 4 : 6),
      culturalWisdom: wisdom,
      practicalApplication: this.generatePracticalApplication(topic, userLevel),
      respectGuidelines: await this.getRespectGuidelines(topic),
      furtherLearning: this.generateFurtherLearning(topic, userLevel)
    }
  }

  private generateEducationIntroduction(topic: string, level: string): string {
    const introductions = {
      beginner: `Welcome to the beautiful world of traditional ${topic}! These practices have been refined over centuries by wise women who understood the deep connection between hair care and overall wellness.`,
      intermediate: `Building on your foundation in traditional ${topic}, let's explore the deeper cultural significance and advanced techniques that make these practices so effective.`,
      advanced: `As an advanced practitioner of traditional ${topic}, you're ready to understand the most nuanced aspects of these practices and their place in the broader context of African cultural wisdom.`
    }
    
    return introductions[level] || introductions.beginner
  }

  private generatePracticalApplication(topic: string, level: string): PracticalApplication {
    return {
      dailyPractices: this.getDailyPractices(topic, level),
      weeklyRituals: this.getWeeklyRituals(topic, level),
      seasonalAdjustments: this.getSeasonalAdjustments(topic),
      troubleshooting: this.getTroubleshooting(topic, level)
    }
  }

  private getDailyPractices(topic: string, level: string): string[] {
    const practices = {
      beginner: [
        'Start each day with gratitude for your hair',
        'Use gentle, natural products',
        'Protect your hair while sleeping'
      ],
      intermediate: [
        'Morning scalp massage with traditional oils',
        'Mindful hair care as meditation',
        'Evening protection rituals'
      ],
      advanced: [
        'Seasonal oil blending based on lunar cycles',
        'Advanced protective styling techniques',
        'Integration of hair care with spiritual practices'
      ]
    }
    
    return practices[level] || practices.beginner
  }

  private getWeeklyRituals(topic: string, level: string): string[] {
    const rituals = {
      beginner: [
        'Weekly deep conditioning with natural ingredients',
        'Gentle cleansing with traditional methods'
      ],
      intermediate: [
        'Ceremonial hair washing with herbs',
        'Community hair care sessions',
        'Weekly intention setting for hair goals'
      ],
      advanced: [
        'Full moon hair blessing ceremonies',
        'Seasonal hair health assessments',
        'Advanced herbal preparation techniques'
      ]
    }
    
    return rituals[level] || rituals.beginner
  }

  private getSeasonalAdjustments(topic: string): SeasonalAdjustment[] {
    return [
      {
        season: 'Harmattan (Dry Season)',
        adjustments: [
          'Increase oil treatments frequency',
          'Use heavier protective styling',
          'Add humidity to environment when possible'
        ],
        culturalNote: 'Traditional time for intensive hair nourishment'
      },
      {
        season: 'Rainy Season',
        adjustments: [
          'Focus on scalp health and cleanliness',
          'Use lighter oils to prevent buildup',
          'Protect hair from excess moisture'
        ],
        culturalNote: 'Time for growth and renewal in traditional calendar'
      }
    ]
  }

  private getTroubleshooting(topic: string, level: string): TroubleshootingGuide[] {
    return [
      {
        issue: 'Practice not working as expected',
        culturalWisdom: 'Patience is key - traditional practices work with your body\'s natural rhythms',
        solutions: [
          'Ensure you\'re using authentic ingredients',
          'Check if you\'re following traditional timing',
          'Consider consulting with cultural knowledge keepers'
        ]
      },
      {
        issue: 'Feeling disconnected from cultural practices',
        culturalWisdom: 'Connection grows through consistent practice and learning',
        solutions: [
          'Learn more about the cultural history',
          'Connect with others practicing traditional methods',
          'Approach practices with reverence and gratitude'
        ]
      }
    ]
  }

  private async getRespectGuidelines(topic: string): Promise<RespectGuideline[]> {
    return [
      {
        principle: 'Attribution',
        guideline: 'Always acknowledge the cultural origins of practices',
        importance: 'critical'
      },
      {
        principle: 'Reverence',
        guideline: 'Approach traditional practices with respect and humility',
        importance: 'high'
      },
      {
        principle: 'Benefit Sharing',
        guideline: 'Support communities that preserve traditional knowledge',
        importance: 'high'
      },
      {
        principle: 'Accuracy',
        guideline: 'Learn and share practices correctly to preserve their integrity',
        importance: 'medium'
      }
    ]
  }

  private generateFurtherLearning(topic: string, level: string): FurtherLearning {
    return {
      recommendedReading: [
        'Traditional African Hair Care Practices by Dr. Aisha Blackwood',
        'The Sacred Art of Hair: West African Traditions by Nana Akosua Manu'
      ],
      culturalConnections: [
        'Connect with local African cultural centers',
        'Attend traditional hair care workshops',
        'Learn from elder women in the community'
      ],
      practiceDeepening: [
        'Study the spiritual aspects of hair care',
        'Learn about medicinal properties of traditional ingredients',
        'Explore the connection between hair care and overall wellness'
      ]
    }
  }
}

// Type definitions for cultural guidance
interface CulturalGuidance {
  recommendations: CulturalRecommendation[]
  wisdom: CulturalWisdom
  respectConsiderations: RespectConsideration[]
  attribution: AttributionRequirement[]
  culturalContext: string
}

interface CulturalRecommendation {
  type: string
  message: string
  practices: any[]
  culturalSignificance: string
}

interface CulturalWisdom {
  proverb: any
  story: any
  application: string
}

interface RespectConsideration {
  level: 'critical' | 'important' | 'moderate'
  message: string
  guidelines: string[]
}

interface AttributionRequirement {
  practiceId: string
  practiceName: string
  requiredAttribution: string
  benefitSharing: any
  permissions: any[]
}

interface CulturalValidationResult {
  isAppropriate: boolean
  concerns: string[]
  suggestions: string[]
  culturalContext: string
  userGuidance: string
}

interface CulturalEducation {
  topic: string
  level: string
  introduction: string
  practices: any[]
  culturalWisdom: CulturalWisdom
  practicalApplication: PracticalApplication
  respectGuidelines: RespectGuideline[]
  furtherLearning: FurtherLearning
}

interface PracticalApplication {
  dailyPractices: string[]
  weeklyRituals: string[]
  seasonalAdjustments: SeasonalAdjustment[]
  troubleshooting: TroubleshootingGuide[]
}

interface SeasonalAdjustment {
  season: string
  adjustments: string[]
  culturalNote: string
}

interface TroubleshootingGuide {
  issue: string
  culturalWisdom: string
  solutions: string[]
}

interface RespectGuideline {
  principle: string
  guideline: string
  importance: 'critical' | 'high' | 'medium' | 'low'
}

interface FurtherLearning {
  recommendedReading: string[]
  culturalConnections: string[]
  practiceDeepening: string[]
}