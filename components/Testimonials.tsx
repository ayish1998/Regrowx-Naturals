'use client';

import Link from 'next/link';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Akosua Mensah',
    location: 'Accra, Ghana',
    rating: 5,
    text: 'After struggling with hair loss for years, Regrowx\'s AI analysis recommended the perfect combination of traditional herbs. My hair has never been healthier!',
    timeframe: '8 weeks',
    results: 'Reduced hair loss by 70%',
    image: '/api/placeholder/80/80',
    verified: true
  },
  {
    id: 2,
    name: 'Fatima Osei',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'The ScalpScan technology is incredible! I can actually see my progress week by week. The traditional remedies really work when combined with modern science.',
    timeframe: '12 weeks',
    results: 'New hair growth visible',
    image: '/api/placeholder/80/80',
    verified: true
  },
  {
    id: 3,
    name: 'Amara Diallo',
    location: 'Dakar, Senegal',
    rating: 5,
    text: 'I love that Regrowx preserves our ancestral knowledge while making it accessible. The products smell amazing and my scalp feels so much healthier.',
    timeframe: '6 weeks',
    results: 'Scalp irritation eliminated',
    image: '/api/placeholder/80/80',
    verified: true
  }
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Real Results from <span className="text-gradient">Real People</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their hair 
            health with our AI-powered traditional remedies.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-8 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < testimonial.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Results */}
              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-600">Timeframe:</span>
                    <span className="font-semibold text-primary-700 ml-1">
                      {testimonial.timeframe}
                    </span>
                  </div>
                  {testimonial.verified && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-gray-600 text-sm">Results:</span>
                  <span className="font-semibold text-primary-700 ml-1 text-sm">
                    {testimonial.results}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-primary-700">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">85%</div>
            <div className="text-gray-600">See Results in 8 Weeks</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">30+</div>
            <div className="text-gray-600">Traditional Remedies</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/hair-analysis" className="btn-primary">
            Join Our Success Stories
          </Link>
          <p className="text-gray-500 mt-4">
            Start your transformation today with a free hair analysis
          </p>
        </div>
      </div>
    </section>
  );
}