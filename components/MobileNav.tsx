'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, User, ShoppingBag, Search } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActiveLink = (href: string) => pathname === href;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link href="/" className="text-2xl font-bold text-gradient">
            Regrowx
          </Link>
          <button 
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-6 space-y-2">
            {/* Products Section */}
            <div>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full py-3 text-left font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                <span>Products</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                isProductsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-4 py-2 space-y-2">
                  <Link 
                    href="/products" 
                    className={`block py-2 transition-colors ${
                      isActiveLink('/products') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    All Products
                  </Link>
                  <Link 
                    href="/products?category=Hair Growth" 
                    className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Hair Growth Serums
                  </Link>
                  <Link 
                    href="/products?category=Scalp Care" 
                    className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Scalp Treatments
                  </Link>
                  <Link 
                    href="/products?category=Styling" 
                    className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Styling Products
                  </Link>
                  <Link 
                    href="/products?category=Bundles" 
                    className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Hair Care Bundles
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <Link 
              href="/hair-analysis" 
              className={`block py-3 font-medium transition-colors ${
                isActiveLink('/hair-analysis') ? 'text-primary-600' : 'text-gray-900 hover:text-primary-600'
              }`}
            >
              Hair Analysis
            </Link>
            <Link 
              href="/education" 
              className={`block py-3 font-medium transition-colors ${
                isActiveLink('/education') ? 'text-primary-600' : 'text-gray-900 hover:text-primary-600'
              }`}
            >
              Education
            </Link>
            <Link 
              href="/about" 
              className={`block py-3 font-medium transition-colors ${
                isActiveLink('/about') ? 'text-primary-600' : 'text-gray-900 hover:text-primary-600'
              }`}
            >
              About
            </Link>
            <Link 
              href="/community" 
              className={`block py-3 font-medium transition-colors ${
                isActiveLink('/community') ? 'text-primary-600' : 'text-gray-900 hover:text-primary-600'
              }`}
            >
              Community
            </Link>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 space-y-4">
          {/* Action Icons */}
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center space-y-1 text-gray-600 hover:text-primary-600 transition-colors">
              <Search className="w-6 h-6" />
              <span className="text-xs">Search</span>
            </button>
            <Link href="/login" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-primary-600 transition-colors">
              <User className="w-6 h-6" />
              <span className="text-xs">Account</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-primary-600 transition-colors relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="text-xs">Cart</span>
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>

          {/* CTA Button */}
          <Link 
            href="/hair-analysis" 
            className="btn-primary w-full text-center"
          >
            Start Free Hair Analysis
          </Link>
        </div>
      </div>
    </>
  );
}