'use client';

import { Mail, Gift } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="section-padding hero-gradient text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Get Hair Care Tips & Exclusive Offers
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community and receive traditional hair care wisdom, product updates, 
            and special discounts delivered to your inbox.
          </p>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button className="btn-white whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-6 text-white/90">
            <div className="flex items-center justify-center space-x-2">
              <Gift className="w-5 h-5 text-yellow-300" />
              <span className="text-sm">Exclusive Discounts</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5 text-yellow-300" />
              <span className="text-sm">Weekly Hair Tips</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-900 font-bold">!</span>
              </div>
              <span className="text-sm">New Product Alerts</span>
            </div>
          </div>

          <p className="text-white/70 text-sm mt-6">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}