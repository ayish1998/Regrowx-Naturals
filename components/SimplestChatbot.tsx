'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function SimplestChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm here to help with your hair care journey using traditional Ghanaian wisdom. How can I assist you today? 🌿",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
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
    
    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('good morning') || input.includes('good afternoon')) {
      return "Hello! Welcome to Regrowx! 🌿 I'm here to help you discover the power of traditional Ghanaian hair care wisdom. Whether you need product recommendations, hair care advice, or order support, I'm here for you!"
    }
    
    // Hair loss and thinning
    if (input.includes('hair loss') || input.includes('thinning') || input.includes('balding') || input.includes('falling out') || input.includes('losing hair')) {
      return "Hair loss can be concerning, but traditional Ghanaian remedies offer hope! 🌿 Our ancestors used shea butter with black soap and rosemary oil to strengthen hair roots. Our Hair Growth Elixir contains these time-tested ingredients plus modern enhancements. Would you like to try our AI hair analysis to get personalized recommendations?"
    }
    
    // Dry hair and moisture
    if (input.includes('dry hair') || input.includes('moisture') || input.includes('brittle') || input.includes('damaged') || input.includes('frizzy')) {
      return "Dry, brittle hair needs deep nourishment! 💧 Traditional Ghanaian women have used coconut oil with aloe vera for centuries. Our Moisture Revival Cream combines these ancestral ingredients with modern hydration technology. Have you tried our hair analysis tool to determine your specific hair type?"
    }
    
    // Scalp issues
    if (input.includes('dandruff') || input.includes('itchy') || input.includes('scalp') || input.includes('flakes') || input.includes('irritated')) {
      return "Scalp issues are common, but we have traditional solutions! 🌿 Neem leaves and tea tree oil have been used in Ghana for generations to soothe irritated scalps. Our Scalp Healing Serum contains these powerful ingredients. Would you like me to recommend products for scalp health?"
    }
    
    // Natural and organic
    if (input.includes('natural') || input.includes('organic') || input.includes('chemical-free') || input.includes('ingredients')) {
      return "You're in the right place for natural hair care! 🌱 All our products are rooted in traditional Ghanaian remedies using organic ingredients like shea butter, black soap, and indigenous herbs. We believe in chemical-free solutions that have been trusted for generations. What natural ingredients are you most interested in?"
    }
    
    // AI Hair Analysis
    if (input.includes('analysis') || input.includes('ai') || input.includes('scan') || input.includes('test') || input.includes('analyze')) {
      return "Our AI hair analysis is amazing! 🤖✨ It combines traditional knowledge with modern technology to give you personalized recommendations in just 2 minutes. The analysis is 85% accurate and considers your hair type, concerns, and lifestyle. Would you like me to guide you to the hair analysis tool?"
    }
    
    // Traditional and cultural
    if (input.includes('traditional') || input.includes('ghanaian') || input.includes('african') || input.includes('culture') || input.includes('heritage')) {
      return "Traditional Ghanaian hair care is incredibly rich! 🇬🇭 Our grandmothers knew the secrets of shea butter, black soap, and indigenous herbs long before modern science proved their effectiveness. We honor this wisdom by working with traditional knowledge keepers and supporting local communities. Every product tells a story of cultural heritage!"
    }
    
    // Products and shopping
    if (input.includes('product') || input.includes('buy') || input.includes('shop') || input.includes('purchase') || input.includes('catalog')) {
      return "I'd love to help you find the perfect products! 🛒 Our catalog features traditional Ghanaian remedies in modern formulations. We have solutions for hair growth, moisture, scalp health, and styling. What specific hair concerns would you like to address? I can also recommend our AI hair analysis for personalized suggestions!"
    }
    
    // Pricing
    if (input.includes('price') || input.includes('cost') || input.includes('expensive') || input.includes('cheap') || input.includes('affordable')) {
      return "Our products are competitively priced because we work directly with Ghanaian farming cooperatives! 💰 This ensures fair prices while supporting local communities. Most products range from $15-45, and we often have bundle deals. Plus, you're investing in centuries of traditional wisdom! Would you like to see our current offers?"
    }
    
    // Orders and shipping
    if (input.includes('order') || input.includes('track') || input.includes('shipping') || input.includes('delivery') || input.includes('status')) {
      return "I can help you with your order! 📦 Please provide your order number, and I'll check the status for you. We typically ship within 2-3 business days, and you can track your order in the 'My Account' section. Is there a specific order you'd like me to help you with?"
    }
    
    // Returns and refunds
    if (input.includes('return') || input.includes('refund') || input.includes('exchange') || input.includes('money back') || input.includes('not satisfied')) {
      return "We want you to love your Regrowx products! 💚 We offer a 30-day satisfaction guarantee. If you're not completely happy, you can return products for a full refund or exchange. Our return process is simple - just contact us with your order number. Would you like me to help you start a return?"
    }
    
    // Community impact
    if (input.includes('community') || input.includes('farmers') || input.includes('cooperative') || input.includes('impact') || input.includes('support')) {
      return "Community impact is at our heart! 👥💚 We partner with 15 women-led farming cooperatives in Ghana, directly supporting 300+ farmers. We've generated over $50K in direct income for these communities while preserving traditional knowledge. When you buy from Regrowx, you're empowering African women and preserving cultural heritage!"
    }
    
    // Specific ingredients
    if (input.includes('shea butter') || input.includes('black soap') || input.includes('coconut oil') || input.includes('aloe vera')) {
      return "Great question about ingredients! 🌿 Shea butter is our star ingredient - it's been called 'women's gold' in Ghana for its incredible moisturizing properties. Black soap gently cleanses while nourishing, and we use herbs like neem, moringa, and baobab. All ingredients are ethically sourced from our partner cooperatives. What specific ingredient interests you?"
    }
    
    // Contact and human support
    if (input.includes('contact') || input.includes('human') || input.includes('speak to someone') || input.includes('representative') || input.includes('agent')) {
      return "I'd be happy to connect you with our human support team! 👥 You can reach us at hello@regrowx.com or through our contact form. Our hair care specialists are available Monday-Friday, 9 AM - 6 PM GMT. They're experts in both traditional remedies and modern hair science. Would you like me to help you with anything else first?"
    }
    
    // Thank you responses
    if (input.includes('thank') || input.includes('thanks') || input.includes('appreciate')) {
      return "You're very welcome! 🌿 I'm so happy I could help. Remember, at Regrowx we're always here to support your hair care journey with traditional wisdom and modern innovation. Is there anything else you'd like to know about our products or services?"
    }
    
    // Goodbye responses
    if (input.includes('bye') || input.includes('goodbye') || input.includes('see you') || input.includes('later')) {
      return "Thank you for chatting with Regrowx! 🌿 Take care of your beautiful hair, and remember - we're always here when you need us. Have a wonderful day! ✨"
    }
    
    // Default response with more personality
    return "Thank you for reaching out! 🌿 I'm your Regrowx assistant, here to help with hair care advice, product recommendations, and order support. Our solutions beautifully blend traditional Ghanaian wisdom with modern science. What would you like to explore today? Hair care tips, product recommendations, or maybe our AI hair analysis?"
  }

  const handleSend = () => {
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

    // Simulate realistic typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(messageContent),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1200)
  }

  const quickActions = [
    "Tell me about traditional Ghanaian hair care remedies",
    "I want to try the AI hair analysis",
    "I need product recommendations for my hair type",
    "I want to track my order"
  ]

  const handleQuickAction = (action: string) => {
    setInputValue(action)
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {isOpen && (
        <div style={{ 
          marginBottom: '16px', 
          width: '320px', 
          height: '500px', 
          backgroundColor: 'white', 
          border: '1px solid #e5e7eb', 
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '16px', 
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', 
            color: 'white', 
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '20px' }}>🌿</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Regrowx Support</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Traditional wisdom meets modern care</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                borderRadius: '4px',
                padding: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ✕
            </button>
          </div>
          
          {/* Messages */}
          <div style={{ 
            flex: 1, 
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: 'flex',
                justifyContent: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                {msg.sender === 'bot' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#22c55e',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    🌿
                  </div>
                )}
                
                <div style={{
                  maxWidth: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'bot' ? 'flex-start' : 'flex-end'
                }}>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '18px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    backgroundColor: msg.sender === 'bot' ? '#f3f4f6' : '#22c55e',
                    color: msg.sender === 'bot' ? '#374151' : 'white',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '18px',
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : '18px'
                  }}>
                    {msg.content}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    marginTop: '4px',
                    paddingLeft: '4px',
                    paddingRight: '4px'
                  }}>
                    {msg.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    })}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#6b7280',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    U
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  🌿
                </div>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  borderBottomLeftRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Regrowx is typing</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out 0.16s'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out 0.32s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div style={{
              padding: '16px',
              borderTop: '1px solid #f3f4f6',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', textAlign: 'center' }}>
                How can I help you today?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      padding: '8px 10px',
                      fontSize: '11px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#374151',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0fdf4'
                      e.currentTarget.style.borderColor = '#22c55e'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }}
                  >
                    {action.length > 35 ? action.substring(0, 35) + '...' : action}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              disabled={isTyping}
              style={{
                flex: 1,
                padding: '10px 14px',
                border: '1px solid #d1d5db',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: isTyping ? '#f9fafb' : 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#22c55e'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              style={{
                padding: '10px 12px',
                backgroundColor: (!inputValue.trim() || isTyping) ? '#d1d5db' : '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: (!inputValue.trim() || isTyping) ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                transition: 'all 0.2s'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(34, 197, 94, 0.5)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.4)'
        }}
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            background: 'rgba(34, 197, 94, 0.3)',
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}></div>
        )}
      </button>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          } 40% {
            transform: scale(1);
          }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}