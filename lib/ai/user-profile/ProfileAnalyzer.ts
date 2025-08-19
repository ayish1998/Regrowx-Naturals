import { EnhancedUserProfile, HairProfile, CulturalProfile } from '../types'

export class ProfileAnalyzer {
  
  async analyzeHairNeeds(profile: EnhancedUserProfile): Promise<HairNeedsAnalysis> {
    const { hairProfile, lifestyle, culturalProfile } = profile
    
    const analysis: HairNeedsAnalysis = {
      primaryConcerns: this.identifyPrimaryConcerns(hairProfile),
      secondaryConcerns: this.identifySecondaryConcerns(hairProfile, lifestyle),
      culturalConsiderations: this.analyzeCulturalFactors(culturalProfile),
      lifestyleImpacts: this.analyzeLifestyleImpacts(lifestyle),
      recommendationPriority: this.calculateRecommendationPriority(hairProfile),
      confidenceScore: this.calculateAnalysisConfidence(profile)
    }

    return analysis
  }

  private identifyPrimaryConcerns(hairProfile: HairProfile): HairConcern[] {
    const concerns: HairConcern[] = []
    
    // Analyze current condition scores
    if (hairProfile.currentCondition.moisture < 0.6) {
      concerns.push({
        type: 'moisture',
        severity: this.calculateSeverity(hairProfile.currentCondition.moisture),
        description: 'Hair needs increased moisture and hydration',
        culturalSolution: 'Traditional shea butter treatments'
      })
    }

    if (hairProfile.currentCondition.strength < 0.6) {
      concerns.push({
        type: 'strength',
        severity: this.calculateSeverity(hairProfile.currentCondition.strength),
        description: 'Hair structure needs strengthening',
        culturalSolution: 'Coconut oil and protein treatments'
      })
    }

    if (hairProfile.currentCondition.growth < 0.5) {
      concerns.push({
        type: 'growth',
        severity: this.calculateSeverity(hairProfile.currentCondition.growth),
        description: 'Hair growth could be improved',
        culturalSolution: 'Neem oil scalp treatments'
      })
    }

    return concerns.sort((a, b) => b.severity - a.severity)
  }

  private identifySecondaryConcerns(hairProfile: HairProfile, lifestyle: any): HairConcern[] {
    const concerns: HairConcern[] = []

    // Environmental factors
    if (lifestyle.climate.humidity < 0.4) {
      concerns.push({
        type: 'environmental',
        severity: 0.6,
        description: 'Low humidity environment may cause dryness',
        culturalSolution: 'Increase oil treatments and protective styling'
      })
    }

    // Stress impact
    if (lifestyle.stressLevel === 'high') {
      concerns.push({
        type: 'stress',
        severity: 0.7,
        description: 'High stress levels can affect hair health',
        culturalSolution: 'Relaxing scalp massages with traditional oils'
      })
    }

    return concerns
  }

  private analyzeCulturalFactors(culturalProfile: CulturalProfile): CulturalConsideration[] {
    const considerations: CulturalConsideration[] = []

    // Traditional practice preferences
    if (culturalProfile.respectLevel === 'high') {
      considerations.push({
        factor: 'traditional_respect',
        importance: 0.9,
        description: 'High respect for traditional practices',
        recommendation: 'Prioritize authentic Ghanaian remedies with proper attribution'
      })
    }

    // Cultural background considerations
    if (culturalProfile.background === 'ghanaian' || culturalProfile.background === 'west_african') {
      considerations.push({
        factor: 'cultural_authenticity',
        importance: 0.8,
        description: 'Strong cultural connection to traditional practices',
        recommendation: 'Focus on ancestral wisdom and community practices'
      })
    }

    return considerations
  }

  private analyzeLifestyleImpacts(lifestyle: any): LifestyleImpact[] {
    const impacts: LifestyleImpact[] = []

    // Diet impact
    if (lifestyle.diet === 'vegan' || lifestyle.diet === 'vegetarian') {
      impacts.push({
        factor: 'diet',
        impact: 'positive',
        strength: 0.7,
        description: 'Plant-based diet supports hair health',
        adjustment: 'Ensure adequate protein and iron intake'
      })
    }

    // Exercise impact
    if (lifestyle.exerciseFrequency === 'high') {
      impacts.push({
        factor: 'exercise',
        impact: 'mixed',
        strength: 0.6,
        description: 'High exercise increases circulation but may require more frequent washing',
        adjustment: 'Use gentle, natural cleansers more frequently'
      })
    }

    // Sleep impact
    if (lifestyle.sleepPattern.quality === 'poor') {
      impacts.push({
        factor: 'sleep',
        impact: 'negative',
        strength: 0.8,
        description: 'Poor sleep quality affects hair growth and health',
        adjustment: 'Focus on stress-reducing hair care rituals'
      })
    }

    return impacts
  }

  private calculateRecommendationPriority(hairProfile: HairProfile): RecommendationPriority {
    const priorities: RecommendationPriority = {
      immediate: [],
      shortTerm: [],
      longTerm: []
    }

    // Immediate priorities (critical issues)
    if (hairProfile.currentCondition.health < 0.4) {
      priorities.immediate.push('Emergency hair health restoration')
    }

    // Short-term priorities (2-4 weeks)
    if (hairProfile.currentCondition.moisture < 0.6) {
      priorities.shortTerm.push('Moisture restoration routine')
    }

    // Long-term priorities (1-3 months)
    if (hairProfile.goals.includes('length_retention')) {
      priorities.longTerm.push('Growth optimization program')
    }

    return priorities
  }

  private calculateAnalysisConfidence(profile: EnhancedUserProfile): number {
    let confidence = 0.5 // Base confidence

    // Increase confidence based on data completeness
    if (profile.hairProfile.type !== 'unknown') confidence += 0.1
    if (profile.hairProfile.texture !== 'unknown') confidence += 0.1
    if (profile.hairProfile.concerns.length > 0) confidence += 0.1
    if (profile.culturalProfile.background !== 'not_specified') confidence += 0.1
    if (profile.aiProfile.interactionHistory.length > 5) confidence += 0.2

    return Math.min(confidence, 1.0)
  }

  private calculateSeverity(score: number): number {
    // Convert condition score to severity (inverted)
    return 1 - score
  }

  async generatePersonalizedInsights(profile: EnhancedUserProfile): Promise<PersonalizedInsights> {
    const analysis = await this.analyzeHairNeeds(profile)
    
    return {
      keyInsights: this.generateKeyInsights(profile, analysis),
      culturalWisdom: this.generateCulturalWisdom(profile.culturalProfile),
      progressPrediction: this.predictProgress(profile, analysis),
      seasonalAdjustments: this.generateSeasonalAdjustments(profile),
      motivationalMessage: this.generateMotivationalMessage(profile, analysis)
    }
  }

  private generateKeyInsights(profile: EnhancedUserProfile, analysis: HairNeedsAnalysis): string[] {
    const insights = []

    if (analysis.primaryConcerns.length > 0) {
      const topConcern = analysis.primaryConcerns[0]
      insights.push(`Your hair's primary need is ${topConcern.type} improvement. ${topConcern.culturalSolution} can help address this naturally.`)
    }

    if (analysis.culturalConsiderations.length > 0) {
      insights.push(`Your cultural background suggests traditional ${profile.culturalProfile.background} practices would be most effective for your hair type.`)
    }

    if (profile.aiProfile.personalizationLevel > 0.8) {
      insights.push(`Based on your interaction history, you respond best to consistent, gentle treatments rather than intensive interventions.`)
    }

    return insights
  }

  private generateCulturalWisdom(culturalProfile: CulturalProfile): string[] {
    const wisdom = []

    if (culturalProfile.respectLevel === 'high') {
      wisdom.push('Traditional Ghanaian hair care emphasizes patience and consistency over quick fixes.')
      wisdom.push('Our ancestors understood that healthy hair reflects overall wellness and spiritual balance.')
    }

    wisdom.push('In Akan tradition, hair care is a communal activity that strengthens bonds between generations.')
    
    return wisdom
  }

  private predictProgress(profile: EnhancedUserProfile, analysis: HairNeedsAnalysis): ProgressPrediction {
    const timeToImprovement = this.calculateTimeToImprovement(analysis)
    
    return {
      expectedTimeframe: timeToImprovement,
      milestones: this.generateMilestones(analysis),
      successProbability: this.calculateSuccessProbability(profile, analysis),
      keyFactors: this.identifySuccessFactors(profile)
    }
  }

  private calculateTimeToImprovement(analysis: HairNeedsAnalysis): string {
    const avgSeverity = analysis.primaryConcerns.reduce((sum, c) => sum + c.severity, 0) / analysis.primaryConcerns.length
    
    if (avgSeverity > 0.8) return '6-8 weeks'
    if (avgSeverity > 0.6) return '4-6 weeks'
    return '2-4 weeks'
  }

  private generateMilestones(analysis: HairNeedsAnalysis): Milestone[] {
    return [
      { week: 1, expected: 'Initial improvement in hair feel and manageability' },
      { week: 3, expected: 'Noticeable improvement in primary concerns' },
      { week: 6, expected: 'Significant overall hair health improvement' },
      { week: 12, expected: 'Optimal hair condition achieved' }
    ]
  }

  private calculateSuccessProbability(profile: EnhancedUserProfile, analysis: HairNeedsAnalysis): number {
    let probability = 0.7 // Base probability

    // Adjust based on personalization level
    probability += profile.aiProfile.personalizationLevel * 0.2

    // Adjust based on cultural alignment
    if (profile.culturalProfile.respectLevel === 'high') probability += 0.1

    // Adjust based on analysis confidence
    probability += analysis.confidenceScore * 0.1

    return Math.min(probability, 0.95)
  }

  private identifySuccessFactors(profile: EnhancedUserProfile): string[] {
    const factors = []

    if (profile.aiProfile.personalizationLevel > 0.7) {
      factors.push('High engagement with personalized recommendations')
    }

    if (profile.culturalProfile.respectLevel === 'high') {
      factors.push('Strong alignment with traditional practices')
    }

    if (profile.lifestyle.stressLevel === 'low') {
      factors.push('Low stress levels support hair health')
    }

    return factors
  }

  private generateSeasonalAdjustments(profile: EnhancedUserProfile): SeasonalAdjustment[] {
    // Generate seasonal care adjustments based on profile
    return [
      {
        season: 'winter',
        adjustment: 'Increase moisture treatments due to dry air',
        culturalPractice: 'Traditional shea butter applications'
      },
      {
        season: 'summer',
        adjustment: 'Add UV protection and increase hydration',
        culturalPractice: 'Coconut oil for natural sun protection'
      }
    ]
  }

  private generateMotivationalMessage(profile: EnhancedUserProfile, analysis: HairNeedsAnalysis): string {
    const messages = [
      `Your hair journey is unique and beautiful. With ${analysis.confidenceScore * 100}% confidence, we believe you'll see amazing results!`,
      `Traditional wisdom combined with your dedication will transform your hair. Stay consistent and trust the process.`,
      `Every strand tells a story of your heritage. Let's honor that story with the care your hair deserves.`
    ]

    return messages[Math.floor(Math.random() * messages.length)]
  }
}

// Type definitions for analysis results
interface HairNeedsAnalysis {
  primaryConcerns: HairConcern[]
  secondaryConcerns: HairConcern[]
  culturalConsiderations: CulturalConsideration[]
  lifestyleImpacts: LifestyleImpact[]
  recommendationPriority: RecommendationPriority
  confidenceScore: number
}

interface HairConcern {
  type: string
  severity: number
  description: string
  culturalSolution: string
}

interface CulturalConsideration {
  factor: string
  importance: number
  description: string
  recommendation: string
}

interface LifestyleImpact {
  factor: string
  impact: 'positive' | 'negative' | 'mixed'
  strength: number
  description: string
  adjustment: string
}

interface RecommendationPriority {
  immediate: string[]
  shortTerm: string[]
  longTerm: string[]
}

interface PersonalizedInsights {
  keyInsights: string[]
  culturalWisdom: string[]
  progressPrediction: ProgressPrediction
  seasonalAdjustments: SeasonalAdjustment[]
  motivationalMessage: string
}

interface ProgressPrediction {
  expectedTimeframe: string
  milestones: Milestone[]
  successProbability: number
  keyFactors: string[]
}

interface Milestone {
  week: number
  expected: string
}

interface SeasonalAdjustment {
  season: string
  adjustment: string
  culturalPractice: string
}