'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Leaf } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function TestChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm here to help with your hair care journey using traditional Ghanaian wisdom. How can I assist you today? 🌿",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const messageContent = inputValue
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(messageContent),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Interface */}
      {isOpen && (
        <div className="mb-4 h-96 w-80 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">Regrowx Support</h3>
                <p className="text-xs opacity-90">Traditional wisdom meets modern care</p>
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
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-2 ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`flex flex-col ${message.sender === 'bot' ? 'items-start' : 'items-end'} max-w-xs`}>
                  <div
                    className={`
                      px-4 py-2 rounded-lg text-sm
                      ${message.sender === 'bot' 
                        ? 'bg-gray-100 text-gray-800 rounded-bl-none' 
                        : 'bg-green-500 text-white rounded-br-none'
                      }
                    `}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
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
                    <span className="text-white text-sm">U</span>
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
                    <span className="text-sm text-gray-600">Regrowx is typing</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        aria-label={isOpen ? 'Close chat' : 'Open chat support'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
      )}
    </div>
  )
}