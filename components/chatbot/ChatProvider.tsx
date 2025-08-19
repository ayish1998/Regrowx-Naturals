'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type: 'text' | 'quick-reply' | 'product-card'
  metadata?: {
    productId?: string
    remedyId?: string
    escalated?: boolean
  }
}

interface ChatState {
  messages: Message[]
  isOpen: boolean
  isTyping: boolean
  unreadCount: number
  sessionId: string
  userPreferences?: {
    hairType?: string
    concerns?: string[]
    preferredLanguage?: string
  }
}

type ChatAction =
  | { type: 'TOGGLE_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_UNREAD_COUNT'; payload: number }
  | { type: 'LOAD_CHAT_HISTORY'; payload: Message[] }
  | { type: 'CLEAR_CHAT' }
  | { type: 'SET_USER_PREFERENCES'; payload: ChatState['userPreferences'] }

const initialState: ChatState = {
  messages: [],
  isOpen: false,
  isTyping: false,
  unreadCount: 0,
  sessionId: '',
  userPreferences: undefined
}

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      return {
        ...state,
        isOpen: !state.isOpen,
        unreadCount: !state.isOpen ? 0 : state.unreadCount
      }
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        unreadCount: action.payload.sender === 'bot' && !state.isOpen 
          ? state.unreadCount + 1 
          : state.unreadCount
      }
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload
      }
    case 'SET_UNREAD_COUNT':
      return {
        ...state,
        unreadCount: action.payload
      }
    case 'LOAD_CHAT_HISTORY':
      return {
        ...state,
        messages: action.payload
      }
    case 'CLEAR_CHAT':
      return {
        ...state,
        messages: []
      }
    case 'SET_USER_PREFERENCES':
      return {
        ...state,
        userPreferences: action.payload
      }
    default:
      return state
  }
}

interface ChatContextType {
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
  sendMessage: (content: string) => Promise<void>
  toggleChat: () => void
  clearChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}

interface ChatProviderProps {
  children: React.ReactNode
  initialMessage?: string
}

export default function ChatProvider({ children, initialMessage }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, {
    ...initialState,
    sessionId: Date.now().toString(),
    messages: initialMessage ? [{
      id: '1',
      content: initialMessage,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }] : []
  })

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('regrowx-chat-history')
    if (savedMessages) {
      try {
        const messages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        dispatch({ type: 'LOAD_CHAT_HISTORY', payload: messages })
      } catch (error) {
        console.error('Failed to load chat history:', error)
      }
    }
  }, [])

  // Save chat history to localStorage when messages change
  useEffect(() => {
    if (state.messages.length > 0) {
      localStorage.setItem('regrowx-chat-history', JSON.stringify(state.messages))
    }
  }, [state.messages])

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    // Enhanced responses with more personality and Regrowx branding
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Welcome to Regrowx! 🌿 I'm here to help you discover the power of traditional Ghanaian hair care wisdom. Whether you need product recommendations, hair care advice, or order support, I'm here for you!"
    }
    
    if (input.includes('hair loss') || input.includes('thinning') || input.includes('balding')) {
      return "Hair loss can be concerning, but traditional Ghanaian remedies offer hope! 🌿 Our ancestors used shea butter with black soap and rosemary oil to strengthen hair roots. Our Hair Growth Elixir contains these time-tested ingredients plus modern enhancements. Would you like to try our AI hair analysis to get personalized recommendations?"
    }
    
    if (input.includes('dry hair') || input.includes('moisture') || input.includes('brittle')) {
      return "Dry, brittle hair needs deep nourishment! 💧 Traditional Ghanaian women have used coconut oil with aloe vera for centuries. Our Moisture Revival Cream combines these ancestral ingredients with modern hydration technology. Have you tried our hair analysis tool to determine your specific hair type?"
    }
    
    if (input.includes('analysis') || input.includes('ai') || input.includes('scan')) {
      return "Our AI hair analysis is amazing! 🤖✨ It combines traditional knowledge with modern technology to give you personalized recommendations in just 2 minutes. The analysis is 85% accurate and considers your hair type, concerns, and lifestyle. Would you like me to guide you to the hair analysis tool?"
    }
    
    if (input.includes('traditional') || input.includes('ghanaian') || input.includes('african') || input.includes('culture')) {
      return "Traditional Ghanaian hair care is incredibly rich! 🇬🇭 Our grandmothers knew the secrets of shea butter, black soap, and indigenous herbs long before modern science proved their effectiveness. We honor this wisdom by working with traditional knowledge keepers and supporting local communities. Every product tells a story of cultural heritage!"
    }
    
    if (input.includes('product') || input.includes('buy') || input.includes('shop')) {
      return "I'd love to help you find the perfect products! 🛒 Our catalog features traditional Ghanaian remedies in modern formulations. We have solutions for hair growth, moisture, scalp health, and styling. What specific hair concerns would you like to address? I can also recommend our AI hair analysis for personalized suggestions!"
    }
    
    if (input.includes('order') || input.includes('track') || input.includes('shipping')) {
      return "I can help you with your order! 📦 Please provide your order number, and I'll check the status for you. We typically ship within 2-3 business days, and you can track your order in the 'My Account' section. Is there a specific order you'd like me to help you with?"
    }
    
    return "Thank you for reaching out! 🌿 I'm your Regrowx assistant, here to help with hair care advice, product recommendations, and order support. Our solutions beautifully blend traditional Ghanaian wisdom with modern science. What would you like to explore today?"
  }

  const sendMessage = async (content: string): Promise<void> => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }
    
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage })
    dispatch({ type: 'SET_TYPING', payload: true })

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      
      dispatch({ type: 'ADD_MESSAGE', payload: botResponse })
      dispatch({ type: 'SET_TYPING', payload: false })
    }, 1500)
  }

  const toggleChat = () => {
    dispatch({ type: 'TOGGLE_CHAT' })
  }

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' })
    localStorage.removeItem('regrowx-chat-history')
  }

  const contextValue: ChatContextType = {
    state,
    dispatch,
    sendMessage,
    toggleChat,
    clearChat
  }

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  )
}