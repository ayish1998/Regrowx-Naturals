'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Leaf, Brain, Heart } from 'lucide-react'
import { ConversationAI } from '../lib/ai/services/ConversationAI'
import { PersonalizationEngine } from '../lib/ai/services/PersonalizationEngine'
import { CulturalKnowledgeBase } from '../lib/ai/services/CulturalKnowledgeBase'
import { EnhancedUserProfile, Message, ConversationContext, AIResponse } from '../lib/ai/types'

interface EnhancedChatbotProps {
  userProfile?: EnhancedUserProfile
  position?: 'bottom-right' | 'bottom-left'
  theme?: 'regrowx' | 'light' | 'dark'
}

export default function EnhancedChatbot({ 
  userProfile, 
  position = 'bottom-right',
  theme = 'regrowx' 
}: EnhancedChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId] = useState(() => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [sessionId] = useState(() => `session_${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // AI Services
  const [conversationAI] = useState(() => new ConversationAI())
  const [personalizationEngine] = useState(() => new PersonalizationEngine())
  const [culturalKnowledgeBase] = useState(() => new CulturalKnowledgeBase())
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    initializeAIServices()
  }, [])

  useEffect(() => {
    if (initialized && messages.length === 0) {
      addInitialMessage()
    }
  }, [initialized])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeAIServices = async () => {
    try {
      await Promise.all([
        conversationAI.initialize(),
        personalizationEngine.initialize(),
        culturalKnowledgeBase.initialize()
      ])
      setInitialized(true)
    } catch (error) {
      console.error('Failed to initialize AI services:', error)
    }
  }

  const addInitialMessage = () => {
    const welcomeMessage = generatePersonalizedWelcome()
    const initialMessage: Message = {
      id: '1',
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      metadata: {
        culturalContext: true,
        personalized: !!userProfile
      }
    }
    setMessages([initialMessage])
  }

  const generatePersonalizedWelcome = (): string => {
    if (!userProfile) {
      return "Akwaaba! Welcome to Regrowx! 🌿 I'm your AI hair care assistant, here to guide you with traditional Ghanaian wisdom and modern science. How can I help you today?"
    }

    const { culturalProfile, hairProfile } = userProfile
    let welcome = "Akwaaba! Welcome back! 🌿 "

    // Personalize based on cultural background
    if (culturalProfile.background === 'ghanaian') {
      welcome += "It's wonderful to connect with someone who shares our beautiful Ghanaian heritage. "
    } else if (culturalProfile.respectLevel === 'high') {
      welcome += "I appreciate your deep respect for traditional practices. "
    }

    // Personalize based on hair journey
    if (hairProfile.concerns.length > 0) {
      const primaryConcern = hairProfile.concerns[0]
      welcome += `I remember you're working on ${primaryConcern} - how has your hair been feeling lately? `
    }

    welcome += "I'm here to continue supporting your hair journey with wisdom from our ancestors and modern insights. What would you like to explore today?"

    return welcome
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !initialized) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    const messageContent = inputValue
    setInputValue('')
    setIsTyping(true)

    try {
      // Create conversation context
      const context: ConversationContext = {
        userId: userProfile?.id || 'anonymous',
        conversationId,
        sessionId,
        userProfile: userProfile || createDefaultProfile(),
        currentTopic: extractTopic(messageContent),
        messageHistory: messages,
        culturalSensitivity: userProfile?.culturalProfile.respectLevel === 'high'
      }

      // Process message with AI
      const aiResponse = await conversationAI.processMessage(messageContent, context)
      
      // Create bot response message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.message,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        metadata: {
          confidence: aiResponse.confidence,
          suggestions: aiResponse.suggestions,
          culturalInsight: aiResponse.culturalInsight,
          recommendations: aiResponse.recommendations
        }
      }

      setMessages(prev => [...prev, botMessage])

      // Add suggestions as quick reply options if available
      if (aiResponse.suggestions && aiResponse.suggestions.length > 0) {
        setTimeout(() => {
          const suggestionsMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: '',
            sender: 'bot',
            timestamp: new Date(),
            type: 'quick-reply',
            metadata: {
              suggestions: aiResponse.suggestions
            }
          }
          setMessages(prev => [...prev, suggestionsMessage])
        }, 500)
      }

      // Add cultural insight if available
      if (aiResponse.culturalInsight) {
        setTimeout(() => {
          const insightMessage: Message = {
            id: (Date.now() + 3).toString(),
            content: `🌿 Cultural Insight: ${aiResponse.culturalInsight.context}`,
            sender: 'bot',
            timestamp: new Date(),
            type: 'cultural-insight',
            metadata: {
              culturalInsight: aiResponse.culturalInsight
            }
          }
          setMessages(prev => [...prev, insightMessage])
        }, 1000)
      }

    } catch (error) {
      console.error('Error processing message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your message right now. Let me connect you with our human support team who can help you immediately.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        metadata: {
          error: true
        }
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickReply = async (suggestion: any) => {
    setInputValue(suggestion.text)
    // Auto-send the quick reply
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const extractTopic = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('hair loss') || lowerMessage.includes('thinning')) return 'hair_loss'
    if (lowerMessage.includes('dry') || lowerMessage.includes('moisture')) return 'moisture'
    if (lowerMessage.includes('traditional') || lowerMessage.includes('cultural')) return 'traditional'
    if (lowerMessage.includes('product') || lowerMessage.includes('recommend')) return 'products'
    if (lowerMessage.includes('routine') || lowerMessage.includes('care')) return 'routine'
    
    return 'general'
  }

  const createDefaultProfile = (): EnhancedUserProfile => {
    return {
      id: 'anonymous',
      demographics: { ageRange: '', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      createdAt: new Date(),
      lastActive: new Date(),
      hairProfile: {
        type: 'unknown',
        texture: 'unknown',
        porosity: 'unknown',
        density: 'unknown',
        length: 'unknown',
        concerns: [],
        goals: [],
        currentCondition: {
          health: 0.5,
          moisture: 0.5,
          strength: 0.5,
          growth: 0.5,
          lastAssessed: new Date()
        }
      },
      culturalProfile: {
        background: 'not_specified',
        traditionalPractices: [],
        culturalPreferences: [],
        languagePreference: 'en',
        respectLevel: 'medium'
      },
      lifestyle: {
        climate: { region: 'unknown', humidity: 0.5, temperature: 20 },
        stressLevel: 'medium',
        diet: 'balanced',
        exerciseFrequency: 'moderate',
        sleepPattern: { hours: 7, quality: 'good' },
        workEnvironment: 'office'
      },
      aiProfile: {
        learningPreferences: [],
        interactionHistory: [],
        feedbackPatterns: [],
        progressMetrics: [],
        personalizationLevel: 0.5
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderMessage = (message: Message) => {
    if (message.type === 'quick-reply') {
      return (
        <div className="flex flex-wrap gap-2 max-w-xs">
          {message.metadata?.suggestions?.map((suggestion: any, index: number) => (
            <button
              key={index}
              onClick={() => handleQuickReply(suggestion)}
              className="px-3 py-2 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors border border-green-200"
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      )
    }

    if (message.type === 'cultural-insight') {
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-xs">
          <div className="flex items-start space-x-2">
            <Heart className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              {message.content}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
        message.sender === 'bot' 
          ? 'bg-gray-100 text-gray-800 rounded-bl-none' 
          : 'bg-green-500 text-white rounded-br-none'
      }`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.metadata?.confidence && message.sender === 'bot' && (
          <div className="text-xs opacity-70 mt-1">
            Confidence: {Math.round(message.metadata.confidence * 100)}%
          </div>
        )}
      </div>
    )
  }

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Chat Interface */}
      {isOpen && (
        <div className="mb-4 h-96 w-80 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Leaf className="w-5 h-5" />
                {initialized && (
                  <Brain className="w-3 h-3 absolute -top-1 -right-1 text-green-200" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">Regrowx AI Assistant</h3>
                <p className="text-xs opacity-90">
                  {userProfile ? 'Personalized for you' : 'Traditional wisdom meets modern care'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!initialized && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Brain className="w-8 h-8 text-green-500 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm text-gray-600">Initializing AI services...</p>
                </div>
              </div>
            )}

            {initialized && messages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-2 ${
                message.sender === 'bot' ? 'justify-start' : 'justify-end'
              }`}>
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`flex flex-col ${
                  message.sender === 'bot' ? 'items-start' : 'items-end'
                }`}>
                  {renderMessage(message)}
                  
                  <span className="text-xs text-gray-500 mt-1 px-1">
                    {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    })}
                  </span>
                </div>

                {message.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">
                      {userProfile?.demographics.ageRange ? userProfile.demographics.ageRange[0].toUpperCase() : 'U'}
                    </span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-2 justify-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none max-w-xs">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">AI is thinking</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={initialized ? "Ask about hair care, traditional remedies..." : "Initializing..."}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isTyping || !initialized}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || !initialized}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {userProfile && (
              <div className="mt-2 text-xs text-gray-500 text-center">
                Personalized for {userProfile.culturalProfile.background === 'ghanaian' ? 'Ghanaian' : 'your'} hair care needs
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 relative"
        aria-label={isOpen ? 'Close chat' : 'Open AI chat support'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            {initialized && (
              <Brain className="w-3 h-3 absolute -top-1 -right-1 text-green-200" />
            )}
          </div>
        )}
      </button>

      {/* Enhanced Pulse animation when closed */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
      )}
    </div>
  )
}