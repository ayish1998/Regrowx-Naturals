'use client';

import Link from 'next/link';
import { Camera, Brain, Leaf, ShoppingBag } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: 'Upload Your Photo',
    description: 'Take a quick photo of your hair and scalp using our mobile-optimized camera tool.',
    step: '01'
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes your hair type, scalp condition, and specific needs with 85% accuracy.',
    step: '02'
  },
  {
    icon: Leaf,
    title: 'Traditional Wisdom',
    description: 'Get personalized recommendations based on centuries-old Ghanaian herbal knowledge.',
    step: '03'
  },
  {
    icon: ShoppingBag,
    title: 'Custom Products',
    description: 'Receive ethically-sourced, natural products tailored specifically for your hair journey.',
    step: '04'
  }
];

export default function HowItWorks() {
  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-gradient">Regrowx</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ancient wisdom to modern science - discover how we combine traditional 
            Ghanaian herbal knowledge with cutting-edge AI technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 z-0" 
                       style={{ width: 'calc(100% - 2rem)' }} />
                )}
                
                <div className="card p-8 text-center relative z-10 hover:scale-105 transition-transform duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/hair-analysis" className="btn-primary">
            Start Your Hair Journey Today
          </Link>
          <p className="text-gray-500 mt-4">
            Free analysis • No credit card required • Results in 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
}