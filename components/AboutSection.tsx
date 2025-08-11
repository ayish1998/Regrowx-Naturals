'use client';

import { Heart, Users, Leaf, Award } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Story</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Regrowx emerged from a profound connection to African heritage and a vision to solve a real problem. 
            In Ghana, traditional herbal remedies for hair care have been passed down through generations, 
            but this ancestral wisdom is being lost as commercial products dominate the market.
          </p>
        </div>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Bridging Ancient Wisdom with Modern Technology
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our founder witnessed firsthand how family members struggled with hair loss and scalp issues 
              despite trying countless chemical-laden products. The solution was growing in their backyard 
              all along - natural herbs that Ghanaian grandmothers had used for centuries.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Regrowx was born to bridge this gap between ancient wisdom and modern technology, preserving 
              cultural heritage while empowering people with personalized, effective hair care solutions.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To become the first African tech-powered hair wellness ecosystem that reconnects 
              people with their roots while growing toward a healthier future.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our <span className="text-gradient">Values</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Heritage Preservation</h3>
              <p className="text-gray-600">
                We document and preserve traditional Ghanaian herbal knowledge with proper 
                attribution to knowledge keepers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Empowerment</h3>
              <p className="text-gray-600">
                We create economic opportunities for local farming cooperatives and 
                support women-led agricultural initiatives.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scientific Innovation</h3>
              <p className="text-gray-600">
                We combine traditional wisdom with cutting-edge AI technology to deliver 
                personalized, effective solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact So Far</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-white/90">Traditional Remedies Documented</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-white/90">Women-Led Cooperatives Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-white/90">Customers Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-white/90">AI Analysis Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}