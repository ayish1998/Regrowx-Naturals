'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Minimize2 } from 'lucide-react'
import ChatInterface from './ChatInterface'
import { useChatContext } from './ChatProvider'

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left'
  theme?: 'light' | 'dark' | 'regrowx'
}

export default function ChatWidget({ 
  position = 'bottom-right', 
  theme = 'regrowx'
}: ChatWidgetProps) {
  const { state, toggleChat } = useChatContext()
  const [isMinimized, setIsMinimized] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const maximizeChat = () => {
    setIsMinimized(false)
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Chat Interface */}
      {state.isOpen && (
        <div className={`mb-4 ${isMinimized ? 'h-16' : 'h-96 md:h-[500px]'} w-80 md:w-96 transition-all duration-300 ease-in-out`}>
          <ChatInterface
            isMinimized={isMinimized}
            onMinimize={minimizeChat}
            onMaximize={maximizeChat}
            onClose={toggleChat}
          />
        </div>
      )}

      {/* Chat Widget Button */}
      <button
        onClick={toggleChat}
        className={`
          relative flex items-center justify-center w-14 h-14 
          bg-gradient-to-r from-green-500 to-green-600 
          hover:from-green-600 hover:to-green-700
          text-white rounded-full shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          transform hover:scale-105 active:scale-95
          ${state.isOpen ? 'rotate-0' : 'rotate-0'}
        `}
        aria-label={state.isOpen ? 'Close chat' : 'Open chat support'}
      >
        {state.isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {state.unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {state.unreadCount > 9 ? '9+' : state.unreadCount}
              </span>
            )}
          </>
        )}
      </button>

      {/* Pulse animation when closed */}
      {!state.isOpen && (
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
      )}
    </div>
  )
}