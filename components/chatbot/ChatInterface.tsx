'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Minimize2, Maximize2, X, Send, Leaf } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import QuickActions from './QuickActions'
import { useChatContext } from './ChatProvider'

interface ChatInterfaceProps {
  isMinimized: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
}

export default function ChatInterface({
  isMinimized,
  onMinimize,
  onMaximize,
  onClose
}: ChatInterfaceProps) {
  const { state, sendMessage } = useChatContext()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [state.messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return
    
    const messageContent = inputValue
    setInputValue('')
    await sendMessage(messageContent)
  }



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
    inputRef.current?.focus()
  }

  if (isMinimized) {
    return (
      <div className="bg-white rounded-t-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5" />
            <span className="font-semibold">Regrowx Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onMaximize}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Maximize chat"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Leaf className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Regrowx Support</h3>
            <p className="text-xs opacity-90">Traditional wisdom meets modern care</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
        {state.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {state.isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {state.messages.length === 1 && (
        <QuickActions onActionClick={handleQuickAction} />
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={state.isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || state.isTyping}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}