'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SimplestChatbot from './SimplestChatbot';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function Layout({ 
  children, 
  className = '', 
  showHeader = true, 
  showFooter = true 
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showHeader && <Header />}
      
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
      
      {/* Customer Support Chatbot - Available on all pages */}
      <SimplestChatbot />
    </div>
  );
}