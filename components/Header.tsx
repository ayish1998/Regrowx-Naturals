'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, User, Search, ChevronDown } from 'lucide-react';
import { getCartItemCount } from '@/lib/cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Update cart count and user status
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };

    const updateUserStatus = () => {
      const userData = localStorage.getItem('regrowx_user');
      setUser(userData ? JSON.parse(userData) : null);
    };

    // Initial load
    updateCartCount();
    updateUserStatus();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('userUpdated', updateUserStatus);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('userUpdated', updateUserStatus);
    };
  }, []);

  const isActiveLink = (href: string) => pathname === href;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-lg border-b border-gray-200 shadow-lg' 
        : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl lg:text-3xl font-bold text-gradient">
              Regrowx
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative group">
              <button 
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  isActiveLink('/products') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-4 transition-all duration-200 ${
                  isProductsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <Link href="/products" className="block px-6 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  All Products
                </Link>
                <Link href="/products?category=Hair Growth" className="block px-6 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  Hair Growth Serums
                </Link>
                <Link href="/products?category=Scalp Care" className="block px-6 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  Scalp Treatments
                </Link>
                <Link href="/products?category=Styling" className="block px-6 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  Styling Products
                </Link>
                <Link href="/products?category=Bundles" className="block px-6 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  Hair Care Bundles
                </Link>
              </div>
            </div>

            <Link href="/hair-analysis" className={`font-medium transition-colors ${
              isActiveLink('/hair-analysis') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
            }`}>
              Hair Analysis
            </Link>
            <Link href="/education" className={`font-medium transition-colors ${
              isActiveLink('/education') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
            }`}>
              Education
            </Link>
            <Link href="/about" className={`font-medium transition-colors ${
              isActiveLink('/about') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
            }`}>
              About
            </Link>
            <Link href="/community" className={`font-medium transition-colors ${
              isActiveLink('/community') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
            }`}>
              Community
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            {user ? (
              <div className="flex items-center space-x-2 p-2 text-gray-600">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            ) : (
              <Link href="/login" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/hair-analysis" className="btn-primary ml-4">
              Start Analysis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
          <div className="container-custom py-6">
            <nav className="space-y-1">
              {/* Products Section */}
              <div className="pb-4 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-900 mb-3">Products</div>
                <div className="space-y-2 pl-4">
                  <Link href="/products" className={`block py-2 font-medium transition-colors ${
                    isActiveLink('/products') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                  }`}>
                    All Products
                  </Link>
                  <Link href="/products?category=Hair Growth" className="block py-2 text-gray-600 hover:text-primary-600 transition-colors">
                    Hair Growth Serums
                  </Link>
                  <Link href="/products?category=Scalp Care" className="block py-2 text-gray-600 hover:text-primary-600 transition-colors">
                    Scalp Treatments
                  </Link>
                  <Link href="/products?category=Styling" className="block py-2 text-gray-600 hover:text-primary-600 transition-colors">
                    Styling Products
                  </Link>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="space-y-1 pt-4">
                <Link href="/hair-analysis" className={`block py-3 font-medium transition-colors ${
                  isActiveLink('/hair-analysis') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}>
                  Hair Analysis
                </Link>
                <Link href="/education" className={`block py-3 font-medium transition-colors ${
                  isActiveLink('/education') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}>
                  Education
                </Link>
                <Link href="/about" className={`block py-3 font-medium transition-colors ${
                  isActiveLink('/about') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}>
                  About
                </Link>
                <Link href="/community" className={`block py-3 font-medium transition-colors ${
                  isActiveLink('/community') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}>
                  Community
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                    <Link href="/login" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                      <User className="w-5 h-5" />
                    </Link>
                    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                      <ShoppingBag className="w-5 h-5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
                <Link href="/hair-analysis" className="btn-primary w-full text-center">
                  Start Free Hair Analysis
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}