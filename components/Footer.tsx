'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Main Footer */}
        <div className="py-16 grid lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-gradient mb-4 inline-block">
              Regrowx
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Bridging traditional Ghanaian herbal wisdom with modern AI technology 
              to revolutionize hair care across Africa and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/regrowx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/regrowx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/regrowx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@regrowx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-bold text-lg mb-6">Products</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">Hair Growth Serums</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Scalp Treatments</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Curl Defining Creams</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Hair Care Bundles</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/story" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">Farmer Partners</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-4 text-gray-400 mb-6">
              <li><Link href="/hair-analysis" className="hover:text-white transition-colors">Hair Analysis</Link></li>
              <li><Link href="/education" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>hello@regrowx.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+233 (0) 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>Accra, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Regrowx. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-gray-400 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center space-x-8 mt-8 pt-8 border-t border-gray-800">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Secure Payments</div>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">VISA</div>
                <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">MC</div>
                <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">PP</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Certified Organic</div>
              <div className="w-12 h-5 bg-green-700 rounded text-xs flex items-center justify-center">✓ ORG</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Fair Trade</div>
              <div className="w-12 h-5 bg-blue-700 rounded text-xs flex items-center justify-center">✓ FT</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}