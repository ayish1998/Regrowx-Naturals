'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, Award, Heart } from 'lucide-react';
import Card from './Card';
import Button from './Button';

interface StoryChapter {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  stats?: {
    label: string;
    value: string;
    icon: React.ComponentType<any>;
  }[];
  cta?: {
    text: string;
    action: () => void;
  };
}

export default function InteractiveStory() {
  const [currentChapter, setCurrentChapter] = useState(0);

  const storyChapters: StoryChapter[] = [
    {
      id: 1,
      title: "The Heritage Crisis",
      subtitle: "When Tradition Meets Modernity",
      content: "In the bustling markets of Accra, Akosua noticed something troubling. The traditional hair care wisdom passed down through generations was disappearing. Young women were abandoning ancestral remedies for chemical-laden products, losing connection to their cultural heritage.",
      image: "🏪",
      stats: [
        { label: "Traditional Remedies at Risk", value: "80%", icon: Heart },
        { label: "Cultural Knowledge Lost", value: "60%", icon: Users },
        { label: "Chemical Product Dominance", value: "90%", icon: Award }
      ]
    },
    {
      id: 2,
      title: "The Personal Struggle",
      subtitle: "A Family's Hair Loss Journey",
      content: "Akosua's own family wasn't immune. Despite trying countless expensive products, her relatives struggled with hair loss and scalp issues. The irony was painful - the solutions their grandmothers had used for centuries were growing right in their backyard.",
      image: "👨‍👩‍👧‍👦",
      stats: [
        { label: "Family Members Affected", value: "8", icon: Users },
        { label: "Products Tried", value: "25+", icon: Award },
        { label: "Money Spent", value: "$2,000", icon: Heart }
      ]
    },
    {
      id: 3,
      title: "The Eureka Moment",
      subtitle: "Rediscovering Ancient Wisdom",
      content: "The breakthrough came during a visit to her grandmother's village. Watching elderly women prepare traditional hair treatments with neem, shea butter, and hibiscus, Akosua realized the power of combining this ancient knowledge with modern technology.",
      image: "💡",
      stats: [
        { label: "Traditional Herbs Identified", value: "30+", icon: Heart },
        { label: "Generations of Knowledge", value: "5", icon: Users },
        { label: "Success Rate", value: "95%", icon: Award }
      ]
    },
    {
      id: 4,
      title: "Building the Technology",
      subtitle: "AI Meets Traditional Knowledge",
      content: "Regrowx was born from the vision of preserving cultural heritage while leveraging cutting-edge AI. We developed ScalpScan™ technology that analyzes hair conditions with 85% accuracy, then recommends personalized traditional remedies backed by science.",
      image: "🤖",
      stats: [
        { label: "AI Accuracy", value: "85%", icon: Award },
        { label: "Analysis Time", value: "2 min", icon: Heart },
        { label: "Traditional Remedies", value: "30+", icon: Users }
      ]
    },
    {
      id: 5,
      title: "Empowering Communities",
      subtitle: "Creating Economic Opportunities",
      content: "We partnered with 15 women-led farming cooperatives across Ghana, creating sustainable economic opportunities while ensuring authentic, ethically-sourced ingredients. Every purchase supports local communities and preserves traditional knowledge.",
      image: "🌾",
      stats: [
        { label: "Cooperatives Supported", value: "15", icon: Users },
        { label: "Women Empowered", value: "300+", icon: Heart },
        { label: "Direct Income Generated", value: "$50K+", icon: Award }
      ]
    },
    {
      id: 6,
      title: "Transforming Lives",
      subtitle: "Real Results, Real People",
      content: "Today, over 10,000 customers have transformed their hair health with Regrowx. We've documented 30+ traditional remedies, sold out 100 products in just 3 weeks, and most importantly, reconnected people with their cultural roots.",
      image: "🎉",
      stats: [
        { label: "Happy Customers", value: "10,000+", icon: Users },
        { label: "Success Stories", value: "500+", icon: Heart },
        { label: "Cultural Impact", value: "Immeasurable", icon: Award }
      ]
    }
  ];

  const nextChapter = () => {
    setCurrentChapter((prev) => (prev + 1) % storyChapters.length);
  };

  const prevChapter = () => {
    setCurrentChapter((prev) => (prev - 1 + storyChapters.length) % storyChapters.length);
  };

  const currentStory = storyChapters[currentChapter];

  return (
    <div className="max-w-4xl mx-auto">
      <Card variant="elevated" padding="none" className="overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Play className="w-6 h-6" />
              <span className="font-semibold">The Regrowx Story</span>
            </div>
            <div className="text-sm opacity-90">
              Chapter {currentChapter + 1} of {storyChapters.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentChapter + 1) / storyChapters.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Story Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentStory.title}
                </h2>
                <p className="text-lg text-primary-600 font-medium">
                  {currentStory.subtitle}
                </p>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentStory.content}
              </p>

              {/* Stats */}
              {currentStory.stats && (
                <div className="grid grid-cols-1 gap-4">
                  {currentStory.stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-bold text-2xl text-primary-600">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Visual Element */}
            <div className="text-center">
              <div className="text-8xl mb-6 animate-pulse">
                {currentStory.image}
              </div>
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Chapter {currentChapter + 1}
                </h3>
                <p className="text-gray-600">
                  {currentStory.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-8 bg-gray-50 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={prevChapter}
            disabled={currentChapter === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {/* Chapter Indicators */}
          <div className="flex items-center space-x-2">
            {storyChapters.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentChapter(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentChapter 
                    ? 'bg-primary-600 scale-125' 
                    : index < currentChapter 
                      ? 'bg-primary-300' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="primary"
            onClick={nextChapter}
            disabled={currentChapter === storyChapters.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Final CTA */}
        {currentChapter === storyChapters.length - 1 && (
          <div className="p-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Hair Journey?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of people who have transformed their hair with traditional wisdom and modern technology.
            </p>
            <Button variant="white" size="lg" href="/hair-analysis">
              Start Free Hair Analysis
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}