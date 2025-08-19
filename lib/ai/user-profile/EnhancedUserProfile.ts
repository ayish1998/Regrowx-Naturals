import { EnhancedUserProfile, HairProfile, CulturalProfile, LifestyleFactors, AIProfile } from '../types'

export class UserProfileManager {
  private profiles = new Map<string, EnhancedUserProfile>()

  async createProfile(userId: string, initialData: Partial<EnhancedUserProfile>): Promise<EnhancedUserProfile> {
    const profile: EnhancedUserProfile = {
      id: userId,
      demographics: {
        ageRange: initialData.demographics?.ageRange || '',
        location: initialData.demographics?.location,
        timezone: initialData.demographics?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      createdAt: new Date(),
      lastActive: new Date(),
      hairProfile: this.initializeHairProfile(initialData.hairProfile),
      culturalProfile: this.initializeCulturalProfile(initialData.culturalProfile),
      lifestyle: this.initializeLifestyle(initialData.lifestyle),
      aiProfile: this.initializeAIProfile()
    }

    this.profiles.set(userId, profile)
    return profile
  }

  private initializeHairProfile(data?: Partial<HairProfile>): HairProfile {
    return {
      type: data?.type || 'unknown',
      texture: data?.texture || 'unknown',
      porosity: data?.porosity || 'unknown',
      density: data?.density || 'unknown',
      length: data?.length || 'unknown',
      concerns: data?.concerns || [],
      goals: data?.goals || [],
      currentCondition: data?.currentCondition || {
        health: 0.5,
        moisture: 0.5,
        strength: 0.5,
        growth: 0.5,
        lastAssessed: new Date()
      }
    }
  }

  private initializeCulturalProfile(data?: Partial<CulturalProfile>): CulturalProfile {
    return {
      background: data?.background || 'not_specified',
      traditionalPractices: data?.traditionalPractices || [],
      culturalPreferences: data?.culturalPreferences || [],
      languagePreference: data?.languagePreference || 'en',
      respectLevel: data?.respectLevel || 'high'
    }
  }

  private initializeLifestyle(data?: Partial<LifestyleFactors>): LifestyleFactors {
    return {
      climate: data?.climate || { region: 'unknown', humidity: 0.5, temperature: 20 },
      stressLevel: data?.stressLevel || 'medium',
      diet: data?.diet || 'balanced',
      exerciseFrequency: data?.exerciseFrequency || 'moderate',
      sleepPattern: data?.sleepPattern || { hours: 7, quality: 'good' },
      workEnvironment: data?.workEnvironment || 'office'
    }
  }

  private initializeAIProfile(): AIProfile {
    return {
      learningPreferences: [],
      interactionHistory: [],
      feedbackPatterns: [],
      progressMetrics: [],
      personalizationLevel: 0.5
    }
  }

  async updateProfile(userId: string, updates: Partial<EnhancedUserProfile>): Promise<EnhancedUserProfile | null> {
    const profile = this.profiles.get(userId)
    if (!profile) return null

    const updatedProfile = {
      ...profile,
      ...updates,
      lastActive: new Date()
    }

    this.profiles.set(userId, updatedProfile)
    return updatedProfile
  }

  async analyzeHairCharacteristics(userId: string, analysisData: any): Promise<HairProfile> {
    const profile = this.profiles.get(userId)
    if (!profile) throw new Error('Profile not found')

    // AI analysis of hair characteristics
    const analyzedProfile: HairProfile = {
      ...profile.hairProfile,
      type: this.determineHairType(analysisData),
      texture: this.determineHairTexture(analysisData),
      porosity: this.determineHairPorosity(analysisData),
      density: this.determineHairDensity(analysisData),
      currentCondition: {
        health: analysisData.healthScore || 0.5,
        moisture: analysisData.moistureLevel || 0.5,
        strength: analysisData.strengthLevel || 0.5,
        growth: analysisData.growthRate || 0.5,
        lastAssessed: new Date()
      }
    }

    // Update profile with analyzed data
    await this.updateProfile(userId, { hairProfile: analyzedProfile })
    return analyzedProfile
  }

  private determineHairType(data: any): string {
    // AI logic to determine hair type from analysis data
    if (data.curlPattern) {
      if (data.curlPattern < 0.2) return 'straight'
      if (data.curlPattern < 0.5) return 'wavy'
      if (data.curlPattern < 0.8) return 'curly'
      return 'coily'
    }
    return 'unknown'
  }

  private determineHairTexture(data: any): string {
    // AI logic to determine hair texture
    if (data.strandThickness) {
      if (data.strandThickness < 0.3) return 'fine'
      if (data.strandThickness < 0.7) return 'medium'
      return 'coarse'
    }
    return 'unknown'
  }

  private determineHairPorosity(data: any): string {
    // AI logic to determine hair porosity
    if (data.absorptionRate) {
      if (data.absorptionRate < 0.3) return 'low'
      if (data.absorptionRate < 0.7) return 'normal'
      return 'high'
    }
    return 'unknown'
  }

  private determineHairDensity(data: any): string {
    // AI logic to determine hair density
    if (data.follicleCount) {
      if (data.follicleCount < 0.4) return 'low'
      if (data.follicleCount < 0.7) return 'medium'
      return 'high'
    }
    return 'unknown'
  }

  async integrateCulturalBackground(userId: string, culturalData: any): Promise<CulturalProfile> {
    const profile = this.profiles.get(userId)
    if (!profile) throw new Error('Profile not found')

    const culturalProfile: CulturalProfile = {
      ...profile.culturalProfile,
      background: culturalData.background || profile.culturalProfile.background,
      traditionalPractices: this.identifyTraditionalPractices(culturalData),
      culturalPreferences: this.determineCulturalPreferences(culturalData),
      respectLevel: culturalData.respectLevel || 'high'
    }

    await this.updateProfile(userId, { culturalProfile })
    return culturalProfile
  }

  private identifyTraditionalPractices(data: any): any[] {
    const practices = []
    
    if (data.usesShea) {
      practices.push({
        name: 'Shea Butter Treatment',
        frequency: data.sheaFrequency || 'weekly',
        culturalSignificance: 'Traditional Ghanaian moisturizing practice'
      })
    }

    if (data.usesCoconut) {
      practices.push({
        name: 'Coconut Oil Application',
        frequency: data.coconutFrequency || 'bi-weekly',
        culturalSignificance: 'West African hair strengthening tradition'
      })
    }

    return practices
  }

  private determineCulturalPreferences(data: any): any[] {
    const preferences = []

    if (data.prefersNatural) {
      preferences.push({
        category: 'ingredients',
        preference: 'natural_only',
        strength: data.naturalPreferenceStrength || 0.8
      })
    }

    if (data.valuesTraditional) {
      preferences.push({
        category: 'practices',
        preference: 'traditional_methods',
        strength: data.traditionalPreferenceStrength || 0.9
      })
    }

    return preferences
  }

  async getProfile(userId: string): Promise<EnhancedUserProfile | null> {
    return this.profiles.get(userId) || null
  }

  async getAllProfiles(): Promise<EnhancedUserProfile[]> {
    return Array.from(this.profiles.values())
  }

  async deleteProfile(userId: string): Promise<boolean> {
    return this.profiles.delete(userId)
  }

  // AI Learning Methods
  async updateAILearning(userId: string, interaction: any): Promise<void> {
    const profile = this.profiles.get(userId)
    if (!profile) return

    // Update AI learning from user interactions
    profile.aiProfile.interactionHistory.push({
      timestamp: new Date(),
      type: interaction.type,
      outcome: interaction.outcome,
      satisfaction: interaction.satisfaction
    })

    // Update personalization level based on interactions
    profile.aiProfile.personalizationLevel = this.calculatePersonalizationLevel(profile.aiProfile)

    this.profiles.set(userId, profile)
  }

  private calculatePersonalizationLevel(aiProfile: AIProfile): number {
    const interactions = aiProfile.interactionHistory.length
    const positiveInteractions = aiProfile.interactionHistory.filter(i => i.satisfaction > 0.7).length
    
    if (interactions === 0) return 0.5
    
    const satisfactionRate = positiveInteractions / interactions
    const experienceBonus = Math.min(interactions / 50, 0.3) // Max 30% bonus for experience
    
    return Math.min(satisfactionRate + experienceBonus, 1.0)
  }
}