'use client';

import { useState } from 'react';
import { Users, MapPin, Heart, Sprout, Mail, Phone } from 'lucide-react';

const cooperatives = [
  {
    name: 'Ashanti Women\'s Shea Collective',
    location: 'Kumasi, Ghana',
    members: 45,
    specialty: 'Shea Butter Production',
    story: 'Leading shea butter producers supporting 3 generations of women'
  },
  {
    name: 'Northern Neem Farmers Union',
    location: 'Tamale, Ghana',
    members: 32,
    specialty: 'Neem Extract',
    story: 'Sustainable neem cultivation preserving traditional methods'
  },
  {
    name: 'Volta Moringa Cooperative',
    location: 'Ho, Ghana',
    members: 28,
    specialty: 'Moringa Processing',
    story: 'Innovative processing techniques for premium moringa products'
  }
];

export default function CommunitySection() {
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', organization: '', location: '', message: '' });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setShowPartnerForm(false);
      }, 3000);
    }, 1500);
  };
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the incredible farming cooperatives and community partners who make 
            Regrowx possible through their dedication to sustainable agriculture and traditional knowledge.
          </p>
        </div>

        {/* Partnership Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fair Trade</h3>
            <p className="text-gray-600 text-sm">
              Direct partnerships ensuring fair compensation for farmers
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-secondary-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Sustainable</h3>
            <p className="text-gray-600 text-sm">
              Environmentally responsible farming practices
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Women-Led</h3>
            <p className="text-gray-600 text-sm">
              Supporting women entrepreneurs and leaders
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Local Impact</h3>
            <p className="text-gray-600 text-sm">
              Creating economic opportunities in rural communities
            </p>
          </div>
        </div>

        {/* Featured Cooperatives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured <span className="text-gradient">Cooperatives</span>
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {cooperatives.map((coop, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{coop.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {coop.location}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Members:</span>
                    <span className="font-semibold text-primary-600">{coop.members}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Specialty:</span>
                    <span className="font-semibold text-secondary-600">{coop.specialty}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">
                  {coop.story}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Are you a farmer, herbalist, or cooperative interested in partnering with Regrowx? 
            We'd love to hear from you and explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowPartnerForm(true)}
              className="btn-white"
            >
              Become a Partner
            </button>
            <button 
              onClick={() => window.open('mailto:partnerships@regrowx.com', '_blank')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-xl transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">15</div>
            <div className="text-gray-600">Active Cooperatives</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">300+</div>
            <div className="text-gray-600">Farmers Supported</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">5</div>
            <div className="text-gray-600">Regions Covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">$50K+</div>
            <div className="text-gray-600">Direct Farmer Income</div>
          </div>
        </div>
      </div>

      {/* Partner Form Modal */}
      {showPartnerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Become a Partner</h3>
                <button 
                  onClick={() => setShowPartnerForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                  <p className="text-gray-600">
                    We've received your partnership inquiry. Our team will contact you within 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization/Cooperative Name
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your interest in partnering
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="What products do you specialize in? How many members are in your cooperative? What are your goals for partnership?"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowPartnerForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}