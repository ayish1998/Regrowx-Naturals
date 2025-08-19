'use client'

import React from 'react'
import { Leaf, Brain, HelpCircle, Package } from 'lucide-react'

interface QuickActionsProps {
  onActionClick: (action: string) => void
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const quickActions = [
    {
      icon: Leaf,
      text: "Traditional remedies",
      message: "Tell me about traditional Ghanaian hair care remedies"
    },
    {
      icon: Brain,
      text: "AI Hair Analysis",
      message: "I want to try the AI hair analysis"
    },
    {
      icon: Package,
      text: "Track my order",
      message: "I want to track my order"
    },
    {
      icon: HelpCircle,
      text: "Product recommendations",
      message: "I need product recommendations for my hair type"
    }
  ]

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <p className="text-sm text-gray-600 mb-3 text-center">
        How can I help you today?
      </p>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <button
              key={index}
              onClick={() => onActionClick(action.message)}
              className="flex items-center space-x-2 p-2 text-left text-sm bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
            >
              <IconComponent className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{action.text}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}