'use client';

import { useState } from 'react';
import Container from './Container';
import Section from './Section';
import InteractiveStory from './InteractiveStory';
import StoryVideoModal from './StoryVideoModal';
import Button from './Button';
import { Play, Heart, Users, Award, Lightbulb, Globe, Sprout } from 'lucide-react';

export default function StoryPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const milestones = [
    {
      year: '2023',
      title: 'The Inspiration',
      description: 'Witnessing the loss of traditional Ghanaian hair care wisdom in modern society.',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      year: '2023',
      title: 'Research & Development',
      description: 'Collaborating with traditional herbalists and developing AI technology.',
      icon: Users,
      color: 'from-blue-400 to-purple-500'
    },
    {
      year: '2024',
      title: 'Community Partnerships',
      description: 'Partnering with 15 women-led farming cooperatives across Ghana.',
      icon: Heart,
      color: 'from-pink-400 to-red-500'
    },
    {
      year: '2024',
      title: 'Product Launch',
      description: 'Launching our first products and selling out 100 units in 3 weeks.',
      icon: Award,
      color: 'from-green-400 to-emerald-500'
    },
    {
      year: '2024',
      title: 'Global Impact',
      description: 'Serving 10,000+ customers and preserving 30+ traditional remedies.',
      icon: Globe,
      color: 'from-indigo-400 to-blue-500'
    },
    {
      year: 'Future',
      title: 'Expanding Horizons',
      description: 'Building the first African tech-powered hair wellness ecosystem.',
      icon: Sprout,
      color: 'from-teal-400 to-green-500'
    }
  ];

  const values = [
    {
      title: 'Heritage Preservation',
      description: 'We document and preserve traditional knowledge with proper attribution to cultural keepers.',
      icon: '🏛️',
      stats: '30+ Traditional Remedies Documented'
    },
    {
      title: 'Community Empowerment',
      description: 'We create economic opportunities for local farming cooperatives and women entrepreneurs.',
      icon: '💪',
      stats: '300+ Women Empowered'
    },
    {
      title: 'Scientific Innovation',
      description: 'We combine ancestral wisdom with cutting-edge AI technology for personalized solutions.',
      icon: '🔬',
      stats: '85% AI Analysis Accuracy'
    },
    {
      title: 'Sustainable Impact',
      description: 'We ensure our practices benefit both people and the environment for generations to come.',
      icon: '🌱',
      stats: '$50K+ Direct Farmer Income'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            The <span className="text-gradient">Regrowx</span> Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a grandmother's wisdom to AI-powered innovation - discover how we're bridging 
            traditional African hair care knowledge with modern technology to transform lives 
            and preserve cultural heritage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setIsVideoModalOpen(true)}
              className="group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </Button>
            <Button variant="outline" size="lg" href="/about">
              Learn More About Us
            </Button>
          </div>
        </div>
      </Section>

      {/* Interactive Story */}
      <Section padding="xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our Journey in <span className="text-gradient">6 Chapters</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Navigate through our story and discover how traditional wisdom meets modern innovation.
          </p>
        </div>
        <InteractiveStory />
      </Section>

      {/* Timeline */}
      <Section background="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Milestones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Key moments that shaped our journey from idea to impact.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-600 to-secondary-600 rounded-full hidden lg:block" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:space-x-8`}>
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left mb-8 lg:mb-0`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-sm font-semibold text-primary-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-8 lg:mb-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do at Regrowx.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-6">{value.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {value.description}
              </p>
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-sm font-semibold text-primary-600">
                  {value.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section background="gradient" padding="xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Be Part of Our <span className="text-gradient">Story</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of people who are reconnecting with their roots and transforming 
            their hair health with traditional wisdom and modern technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/hair-analysis">
              Start Your Hair Journey
            </Button>
            <Button variant="outline" size="lg" href="/community">
              Join Our Community
            </Button>
          </div>
        </div>
      </Section>

      {/* Story Video Modal */}
      <StoryVideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </>
  );
}