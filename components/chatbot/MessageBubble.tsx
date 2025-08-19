'use client'

import React from 'react'
import { User, Leaf } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type: 'text' | 'quick-reply' | 'product-card'
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.sender === 'bot'
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  return (
    <div className={`flex items-start space-x-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Leaf className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-xs`}>
        <div
          className={`
            px-4 py-2 rounded-lg text-sm
            ${isBot 
              ? 'bg-gray-100 text-gray-800 rounded-bl-none' 
              : 'bg-green-500 text-white rounded-br-none'
            }
          `}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        
        <span className="text-xs text-gray-500 mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  )
}