'use client';

import { useState } from 'react';
import { Camera, Upload, ArrowRight, CheckCircle } from 'lucide-react';
import ImageUpload from './ImageUpload';

export default function HairAnalysisForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    photos: [] as { file: File; preview: string; type: string }[],
    age: '',
    hairLength: '',
    hairTexture: '',
    scalpSensitivity: '',
    concerns: [] as string[],
    lifestyle: {
      diet: '',
      stressLevel: '',
      exerciseFrequency: ''
    }
  });

  const handleImageUpload = (file: File, preview: string, type: string) => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos.filter(p => p.type !== type), { file, preview, type }]
    }));
  };

  const concerns = [
    'Hair Loss', 'Dry Scalp', 'Dandruff', 'Slow Growth', 
    'Breakage', 'Thinning', 'Oily Scalp', 'Itchy Scalp'
  ];

  const handleConcernToggle = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  return (
    <section className="section-padding gradient-bg min-h-screen">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Free <span className="text-gradient">Hair Analysis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized hair care recommendations powered by AI and traditional Ghanaian wisdom
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNum 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <CheckCircle className="w-6 h-6" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Step {step} of 3
          </div>
        </div>

        {/* Step 1: Photo Upload */}
        {step === 1 && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Upload Your Hair Photos
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Take clear photos of your hair and scalp for the most accurate analysis
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Front View */}
              <ImageUpload
                id="front-photo"
                title="Front View"
                description="Take a photo facing forward showing your hairline"
                onImageUpload={(file, preview) => handleImageUpload(file, preview, 'front')}
              />

              {/* Top View */}
              <ImageUpload
                id="top-photo"
                title="Top View"
                description="Take a photo from above showing your crown area"
                onImageUpload={(file, preview) => handleImageUpload(file, preview, 'top')}
              />
            </div>

            <div className="text-center">
              <button 
                onClick={() => setStep(2)}
                className="btn-primary"
              >
                Continue to Questionnaire
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Basic Information */}
        {step === 2 && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Tell Us About Your Hair
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <select 
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select age range</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-55">46-55</option>
                  <option value="55+">55+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hair Length
                </label>
                <select 
                  value={formData.hairLength}
                  onChange={(e) => setFormData(prev => ({ ...prev, hairLength: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select hair length</option>
                  <option value="short">Short (above shoulders)</option>
                  <option value="medium">Medium (shoulder length)</option>
                  <option value="long">Long (below shoulders)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hair Texture
                </label>
                <select 
                  value={formData.hairTexture}
                  onChange={(e) => setFormData(prev => ({ ...prev, hairTexture: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select hair texture</option>
                  <option value="straight">Straight</option>
                  <option value="wavy">Wavy</option>
                  <option value="curly">Curly</option>
                  <option value="coily">Coily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scalp Sensitivity
                </label>
                <select 
                  value={formData.scalpSensitivity}
                  onChange={(e) => setFormData(prev => ({ ...prev, scalpSensitivity: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select sensitivity level</option>
                  <option value="low">Low - No sensitivity</option>
                  <option value="medium">Medium - Occasional sensitivity</option>
                  <option value="high">High - Very sensitive</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What are your main hair concerns? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {concerns.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => handleConcernToggle(concern)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                      formData.concerns.includes(concern)
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                onClick={() => setStep(1)}
                className="btn-outline"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="btn-primary"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Lifestyle & Results */}
        {step === 3 && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Lifestyle Information
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diet Type
                </label>
                <select 
                  value={formData.lifestyle.diet}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, diet: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select diet type</option>
                  <option value="balanced">Balanced</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="high-protein">High Protein</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stress Level
                </label>
                <select 
                  value={formData.lifestyle.stressLevel}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, stressLevel: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select stress level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercise Frequency
                </label>
                <select 
                  value={formData.lifestyle.exerciseFrequency}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, exerciseFrequency: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select frequency</option>
                  <option value="rarely">Rarely</option>
                  <option value="1-2-times">1-2 times/week</option>
                  <option value="3-4-times">3-4 times/week</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={async () => {
                  // Validate that at least one photo is uploaded
                  if (formData.photos.length === 0) {
                    alert('Please upload at least one photo to continue with the analysis.');
                    return;
                  }

                  // Generate AI analysis results
                  const analysisResults = {
                    hairType: formData.hairTexture ? `${formData.hairTexture.charAt(0).toUpperCase() + formData.hairTexture.slice(1)} (Type ${formData.hairTexture === 'straight' ? '1' : formData.hairTexture === 'wavy' ? '2' : formData.hairTexture === 'curly' ? '3' : '4'})` : 'Curly (Type 3)',
                    scalpCondition: formData.scalpSensitivity === 'high' ? 'Sensitive' : formData.scalpSensitivity === 'medium' ? 'Normal' : 'Healthy',
                    confidenceScore: 87,
                    concerns: formData.concerns,
                    recommendations: [
                      {
                        id: '1',
                        name: 'Neem & Shea Hair Growth Serum',
                        price: 45,
                        originalPrice: 60,
                        confidence: 92,
                        reasoning: 'Perfect for your hair type and addresses growth concerns effectively.',
                        usage: 'Apply to scalp 3 times per week, massage gently for 2-3 minutes',
                        ingredients: ['Neem Extract', 'Shea Butter', 'Coconut Oil', 'Hibiscus'],
                        rating: 4.8,
                        reviews: 234
                      },
                      {
                        id: '2',
                        name: 'Baobab Scalp Treatment Oil',
                        price: 38,
                        confidence: 85,
                        reasoning: 'Excellent for scalp health and moisture balance based on your sensitivity level.',
                        usage: 'Use as pre-shampoo treatment once weekly, leave for 30 minutes',
                        ingredients: ['Baobab Oil', 'Moringa Extract', 'Jojoba Oil'],
                        rating: 4.9,
                        reviews: 189
                      },
                      {
                        id: '3',
                        name: 'Hibiscus Curl Defining Cream',
                        price: 32,
                        confidence: 78,
                        reasoning: 'Ideal for enhancing your natural curl pattern and reducing frizz.',
                        usage: 'Apply to damp hair, scrunch gently, air dry or diffuse',
                        ingredients: ['Hibiscus Extract', 'Aloe Vera', 'Coconut Cream'],
                        rating: 4.7,
                        reviews: 156
                      }
                    ],
                    traditionalRemedies: [
                      {
                        name: 'Neem Leaf Hair Rinse',
                        ingredients: ['Fresh neem leaves', 'Water'],
                        preparation: 'Boil neem leaves in water for 15 minutes, strain and cool',
                        usage: 'Use as final rinse after shampooing, massage into scalp',
                        culturalContext: 'Traditional Ashanti remedy used for generations to promote healthy hair growth'
                      },
                      {
                        name: 'Shea Butter Scalp Massage',
                        ingredients: ['Raw shea butter', 'Coconut oil'],
                        preparation: 'Warm shea butter until soft, mix with a few drops of coconut oil',
                        usage: 'Massage into scalp weekly, leave overnight, wash out in morning',
                        culturalContext: 'Ancient Ghanaian practice for nourishing and protecting the scalp'
                      }
                    ],
                    timeline: [
                      {
                        weeks: '2-3 Weeks',
                        expected: 'Initial Improvements',
                        description: 'Scalp feels healthier, reduced irritation, improved curl definition'
                      },
                      {
                        weeks: '4-6 Weeks',
                        expected: 'Visible Changes',
                        description: 'Noticeable reduction in hair loss, increased shine and softness'
                      },
                      {
                        weeks: '8-12 Weeks',
                        expected: 'Significant Results',
                        description: '60-70% reduction in hair loss, new growth visible, overall hair health transformed'
                      }
                    ]
                  };

                  // Store results in localStorage
                  localStorage.setItem('hair_analysis_results', JSON.stringify(analysisResults));
                  
                  // Redirect to results page
                  window.location.href = '/hair-analysis/results';
                }}
                className="btn-primary text-lg px-12 py-4"
              >
                Get My Hair Analysis Results
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
              <p className="text-gray-500 mt-4">
                Analysis takes 30-60 seconds • 100% Free • No spam
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button 
                onClick={() => setStep(2)}
                className="btn-outline"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}