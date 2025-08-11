'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Star, Clock, Leaf, ShoppingCart, ArrowRight, Camera, Brain, Award } from 'lucide-react';
import Container from './Container';
import Card from './Card';
import Button from './Button';
import { addToCart } from '@/lib/cart';

interface AnalysisResults {
  hairType: string;
  scalpCondition: string;
  confidenceScore: number;
  concerns: string[];
  recommendations: ProductRecommendation[];
  traditionalRemedies: TraditionalRemedy[];
  timeline: Timeline[];
}

interface ProductRecommendation {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  confidence: number;
  reasoning: string;
  usage: string;
  ingredients: string[];
  rating: number;
  reviews: number;
}

interface TraditionalRemedy {
  name: string;
  ingredients: string[];
  preparation: string;
  usage: string;
  culturalContext: string;
}

interface Timeline {
  weeks: string;
  expected: string;
  description: string;
}

export default function HairAnalysisResults() {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get analysis data from localStorage or URL params
    const analysisData = localStorage.getItem('hair_analysis_results');
    
    if (!analysisData) {
      // If no results, redirect to analysis form
      router.push('/hair-analysis');
      return;
    }

    // Simulate loading for better UX
    setTimeout(() => {
      setResults(JSON.parse(analysisData));
      setLoading(false);
    }, 1500);
  }, [router]);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <Container>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Brain className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Analyzing Your Hair...
            </h1>
            <p className="text-gray-600 mb-8">
              Our AI is processing your photos and questionnaire responses using traditional Ghanaian wisdom.
            </p>
            <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto">
              <div className="h-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Hair Analysis Results
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on AI analysis and traditional Ghanaian wisdom, here's your personalized hair care plan.
          </p>
        </div>

        {/* Analysis Summary */}
        <Card variant="elevated" padding="lg" className="mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">{results.hairType}</div>
              <div className="text-gray-600">Hair Type</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-600 mb-2">{results.scalpCondition}</div>
              <div className="text-gray-600">Scalp Condition</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">{results.confidenceScore}%</div>
              <div className="text-gray-600">Confidence Score</div>
            </div>
          </div>
        </Card>

        {/* Recommended Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Recommended Products for You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.recommendations.map((product, index) => (
              <Card key={index} variant="product" padding="none" hover>
                <div className="relative">
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Leaf className="w-8 h-8 text-primary-600" />
                      </div>
                      <p className="text-sm text-gray-600">Product Image</p>
                    </div>
                  </div>
                  
                  {/* Confidence Badge */}
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.confidence}% Match
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Reasoning */}
                  <p className="text-sm text-gray-600 mb-4">{product.reasoning}</p>

                  {/* Ingredients */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.ingredients.slice(0, 2).map((ingredient, idx) => (
                      <span key={idx} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                        {ingredient}
                      </span>
                    ))}
                    {product.ingredients.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{product.ingredients.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Usage Instructions */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="text-xs font-semibold text-blue-900 mb-1">Usage:</div>
                    <div className="text-xs text-blue-700">{product.usage}</div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="text-sm font-semibold text-green-600">
                        Save ${product.originalPrice - product.price}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        ingredients: product.ingredients
                      });
                      alert(`✅ ${product.name} added to your cart!`);
                    }}
                    className="group"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Traditional Remedies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Traditional Ghanaian Remedies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {results.traditionalRemedies.map((remedy, index) => (
              <Card key={index} variant="default" padding="lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{remedy.name}</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Ingredients:</span>
                        <span className="text-gray-600 ml-2">{remedy.ingredients.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Preparation:</span>
                        <span className="text-gray-600 ml-2">{remedy.preparation}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Usage:</span>
                        <span className="text-gray-600 ml-2">{remedy.usage}</span>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3">
                        <span className="font-semibold text-amber-800">Cultural Context:</span>
                        <span className="text-amber-700 ml-2">{remedy.culturalContext}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Expected Timeline */}
        <Card variant="default" padding="lg" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Your Hair Journey Timeline
          </h2>
          <div className="space-y-6">
            {results.timeline.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="font-bold text-primary-600 mb-1">{milestone.weeks}</div>
                  <div className="font-semibold text-gray-900 mb-2">{milestone.expected}</div>
                  <div className="text-gray-600">{milestone.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Hair Journey?</h2>
            <p className="text-lg mb-6 opacity-90">
              Get your personalized products and start seeing results in just 2-3 weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="white" size="lg" href="/cart">
                View Cart & Checkout
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary-600"
                href="/products"
              >
                Browse All Products
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}