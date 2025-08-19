'use client'

import React from 'react'
import { Leaf } from 'lucide-react'

export default function TypingIndicator() {
  return (
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
  )
}