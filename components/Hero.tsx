'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Star } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import StoryVideoModal from './StoryVideoModal';

export default function Hero() {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <>
    <section className="relative overflow-hidden hero-gradient text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] sm:min-h-[80vh] py-12 sm:py-16 lg:py-20">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-white/90">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">Trusted by 10,000+ customers</span>
            </div>

            <h1 className="text-responsive-2xl font-bold leading-tight">
              Discover Your Hair's
              <span className="block text-yellow-300">Natural Potential</span>
            </h1>

            <p className="text-responsive-sm text-white/90 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Revolutionary AI-powered hair analysis meets traditional Ghanaian herbal wisdom. 
              Get personalized solutions that actually work for your unique hair needs.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 text-white/90">
              <div>
                <div className="text-2xl font-bold text-yellow-300">85%</div>
                <div className="text-sm">Analysis Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">30+</div>
                <div className="text-sm">Traditional Remedies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">15</div>
                <div className="text-sm">Farmer Cooperatives</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                href="/hair-analysis" 
                variant="white" 
                size="lg"
                className="group"
              >
                Start Free Hair Analysis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <button 
                onClick={() => setIsStoryModalOpen(true)}
                className="flex items-center justify-center space-x-2 text-white hover:text-yellow-300 transition-colors py-4 group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-medium">Watch Our Story</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-4 text-white/80 text-sm">
              <span>As featured in:</span>
              <div className="flex items-center space-x-6">
                <span className="font-semibold">TechCrunch</span>
                <span className="font-semibold">Forbes Africa</span>
                <span className="font-semibold">BBC</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Video */}
          <div className="relative">
            <div className="relative z-10">
              {/* AI Hair Analysis Demo */}
              <Link href="/hair-analysis" className="block">
                <div className="aspect-square bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-white/90 font-medium group-hover:text-yellow-300 transition-colors">
                      See AI Hair Analysis in Action
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>

    {/* Story Video Modal */}
    <StoryVideoModal 
      isOpen={isStoryModalOpen} 
      onClose={() => setIsStoryModalOpen(false)} 
    />
    </>
  );
}