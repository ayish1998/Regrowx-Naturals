'use client';

import { useState } from 'react';
import { Mail, Gift, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };
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
            {isSubscribed ? (
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-2 text-green-300">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">Successfully subscribed!</span>
                </div>
                <p className="text-white/80 text-sm mt-2">
                  Welcome to the Regrowx community! Check your email for a special welcome offer.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="btn-white whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                  </button>
                </div>
              </form>
            )}
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