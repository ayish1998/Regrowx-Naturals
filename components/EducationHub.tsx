'use client';

import { Search, BookOpen, Users, Award } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Traditional Neem Benefits for Hair Growth',
    excerpt: 'Discover how Ghanaian grandmothers have used neem for centuries to promote healthy hair growth.',
    category: 'Traditional Remedies',
    readTime: '5 min read',
    author: 'Akosua Mensah, Traditional Herbalist'
  },
  {
    id: 2,
    title: 'Understanding Your Hair Type with AI',
    excerpt: 'Learn how modern technology can help identify your unique hair characteristics.',
    category: 'Hair Science',
    readTime: '7 min read',
    author: 'Dr. Sarah Johnson'
  },
  {
    id: 3,
    title: 'Shea Butter: The Gold of Ghana',
    excerpt: 'Explore the rich history and benefits of shea butter in African hair care traditions.',
    category: 'Ingredients',
    readTime: '6 min read',
    author: 'Fatima Osei, Cooperative Leader'
  }
];

export default function EducationHub() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Hair Care <span className="text-gradient">Education</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from traditional Ghanaian wisdom and modern hair science to transform your hair care journey.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, ingredients, or hair concerns..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Featured Articles */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article) => (
            <div key={article.id} className="card p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="mb-4">
                <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{article.readTime}</span>
                <span>{article.author}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Traditional Remedies</h3>
            <p className="text-gray-600">
              Ancient Ghanaian wisdom passed down through generations
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Community Stories</h3>
            <p className="text-gray-600">
              Real experiences from our farming cooperatives and customers
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-accent-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hair Science</h3>
            <p className="text-gray-600">
              Modern research backing traditional practices
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}