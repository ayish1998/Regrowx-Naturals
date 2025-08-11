'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'product';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({ 
  children, 
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  onClick
}: CardProps) {
  const variantClasses = {
    default: 'bg-white rounded-2xl shadow-lg border border-gray-100',
    elevated: 'bg-white rounded-2xl shadow-xl border border-gray-100',
    bordered: 'bg-white rounded-2xl border-2 border-gray-200',
    product: 'bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : 'transition-shadow duration-300';

  return (
    <div 
      className={clsx(
        variantClasses[variant],
        paddingClasses[padding],
        hoverClasses,
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}