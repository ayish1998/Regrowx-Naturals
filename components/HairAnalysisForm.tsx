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
          <div className="space-y-8">
            {/* Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 to-green-600 p-8 text-white">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">
                  AI-Powered Hair Analysis
                </h2>
                <p className="text-green-100 text-lg mb-6">
                  Upload clear photos of your hair for personalized recommendations based on traditional Ghanaian wisdom and modern AI technology
                </p>
                <div className="flex items-center space-x-6 text-green-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>85% Accuracy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>2-Minute Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>100% Free</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
                <div className="w-full h-full bg-white rounded-full transform translate-x-20 -translate-y-20"></div>
              </div>
            </div>

            {/* Photo Upload Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Front View Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50"></div>
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      Required
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Front View Photo
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Take a clear photo facing forward showing your hairline and overall hair texture
                  </p>

                  {/* Example Image */}
                  <div className="relative h-32 bg-gray-100 rounded-xl mb-6 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=200&fit=crop&crop=face"
                      alt="Front view example"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Example Photo</span>
                    </div>
                  </div>

                  <ImageUpload
                    id="front-photo"
                    title=""
                    description=""
                    onImageUpload={(file, preview) => handleImageUpload(file, preview, 'front')}
                  />
                </div>
              </div>

              {/* Top View Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      Optional
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Top View Photo
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Take a photo from above showing your crown area and hair density
                  </p>

                  {/* Example Image */}
                  <div className="relative h-32 bg-gray-100 rounded-xl mb-6 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop&crop=top"
                      alt="Top view example"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Example Photo</span>
                    </div>
                  </div>

                  <ImageUpload
                    id="top-photo"
                    title=""
                    description=""
                    onImageUpload={(file, preview) => handleImageUpload(file, preview, 'top')}
                  />
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <h4 className="font-bold text-amber-900 mb-3 flex items-center">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-sm">💡</span>
                </div>
                Photo Tips for Best Results
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-amber-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Use natural lighting or bright indoor light</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Keep hair clean and styled naturally</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Avoid filters or heavy editing</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setStep(2)}
                className="btn-primary text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue to Questionnaire
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Basic Information */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Header Card */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧬</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tell Us About Your Hair
              </h2>
              <p className="text-gray-600 text-lg">
                Help our AI understand your unique hair characteristics for personalized recommendations
              </p>
            </div>

            {/* Hair Characteristics Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Age Range Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">👤</span>
                  </div>
                  <label className="text-lg font-semibold text-gray-900">
                    Age Range
                  </label>
                </div>
                <select 
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="">Select your age range</option>
                  <option value="18-25">18-25 years</option>
                  <option value="26-35">26-35 years</option>
                  <option value="36-45">36-45 years</option>
                  <option value="46-55">46-55 years</option>
                  <option value="55+">55+ years</option>
                </select>
              </div>

              {/* Hair Length Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-green-600 text-lg">📏</span>
                  </div>
                  <label className="text-lg font-semibold text-gray-900">
                    Hair Length
                  </label>
                </div>
                <select 
                  value={formData.hairLength}
                  onChange={(e) => setFormData(prev => ({ ...prev, hairLength: e.target.value }))}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                >
                  <option value="">Select hair length</option>
                  <option value="short">Short (above shoulders)</option>
                  <option value="medium">Medium (shoulder length)</option>
                  <option value="long">Long (below shoulders)</option>
                </select>
              </div>

              {/* Hair Texture Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-lg">🌊</span>
                  </div>
                  <label className="text-lg font-semibold text-gray-900">
                    Hair Texture
                  </label>
                </div>
                <select 
                  value={formData.hairTexture}
                  onChange={(e) => setFormData(prev => ({ ...prev, hairTexture: e.target.value }))}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                >
                  <option value="">Select hair texture</option>
                  <option value="straight">Straight (Type 1)</option>
                  <option value="wavy">Wavy (Type 2)</option>
                  <option value="curly">Curly (Type 3)</option>
                  <option value="coily">Coily (Type 4)</option>
                </select>
              </div>

              {/* Scalp Sensitivity Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-orange-600 text-lg">🎯</span>
                  </div>
                  <label className="text-lg font-semibold text-gray-900">
                    Scalp Sensitivity
                  </label>
                </div>
                <select 
                  value={formData.scalpSensitivity}
                  onChange={(e) => setFormData(prev => ({ ...prev, scalpSensitivity: e.target.value }))}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                >
                  <option value="">Select sensitivity level</option>
                  <option value="low">Low - No sensitivity issues</option>
                  <option value="medium">Medium - Occasional sensitivity</option>
                  <option value="high">High - Very sensitive scalp</option>
                </select>
              </div>
            </div>

            {/* Hair Concerns Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-red-600 text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Hair Concerns</h3>
                  <p className="text-gray-600">Select all that apply to get targeted recommendations</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {concerns.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => handleConcernToggle(concern)}
                    className={`p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      formData.concerns.includes(concern)
                        ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    <div className="text-lg mb-1">
                      {concern === 'Hair Loss' ? '🔻' : 
                       concern === 'Dry Scalp' ? '🏜️' :
                       concern === 'Dandruff' ? '❄️' :
                       concern === 'Slow Growth' ? '🐌' :
                       concern === 'Breakage' ? '💔' :
                       concern === 'Thinning' ? '📉' :
                       concern === 'Oily Scalp' ? '💧' : '🔥'}
                    </div>
                    {concern}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button 
                onClick={() => setStep(1)}
                className="btn-outline px-6 py-3 rounded-xl"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="btn-primary px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue to Lifestyle
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Lifestyle & Results */}
        {step === 3 && (
          <div className="space-y-8">
            {/* Header Card */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Lifestyle & Final Analysis
              </h2>
              <p className="text-gray-600 text-lg">
                Complete your profile for the most accurate personalized recommendations
              </p>
            </div>

            {/* Lifestyle Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Diet Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-green-600 text-lg">🥗</span>
                  </div>
                  <label className="text-lg font-semibold text-gray-900">
                    Diet Type
                  </label>
                </div>
                <select 
                  value={formData.lifestyle.diet}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, diet: e.target.value }
                  }))}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                >
                  <option value="">Select diet type</option>
                  <option value="balanced">Balanced Diet</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="high-protein">High Protein</option>
                </select>
              </div>

              {/* Stress Level Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-yellow-600 text-lg">😌</span>
                  </div>
                  <label className="text-lg font-semibold text-gray-900">
                    Stress Level
                  </label>
                </div>
                <select 
                  value={formData.lifestyle.stressLevel}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, stressLevel: e.target.value }
                  }))}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                >
                  <option value="">Select stress level</option>
                  <option value="low">Low - Very relaxed</option>
                  <option value="medium">Medium - Manageable</option>
                  <option value="high">High - Often stressed</option>
                </select>
              </div>

              {/* Exercise Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">💪</span>
                  </div>
                  <label className="text-lg font-semibold text-gray-900">
                    Exercise Frequency
                  </label>
                </div>
                <select 
                  value={formData.lifestyle.exerciseFrequency}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, exerciseFrequency: e.target.value }
                  }))}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="">Select frequency</option>
                  <option value="rarely">Rarely exercise</option>
                  <option value="1-2-times">1-2 times per week</option>
                  <option value="3-4-times">3-4 times per week</option>
                  <option value="daily">Daily exercise</option>
                </select>
              </div>
            </div>

            {/* AI Analysis Preview Card */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">AI Analysis Ready</h3>
                    <p className="text-purple-100">Get your personalized hair care recommendations</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-purple-100 text-sm">Analysis Accuracy</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">30+</div>
                    <div className="text-purple-100 text-sm">Traditional Remedies</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">2 min</div>
                    <div className="text-purple-100 text-sm">Analysis Time</div>
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
                    className="bg-white text-purple-600 font-bold text-xl px-12 py-4 rounded-2xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
                  >
                    🚀 Get My Hair Analysis Results
                  </button>
                  <p className="text-purple-100 mt-4 text-sm">
                    Analysis takes 30-60 seconds • 100% Free • No spam • Powered by AI + Traditional Wisdom
                  </p>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                <div className="w-full h-full bg-white rounded-full transform translate-x-20 -translate-y-20"></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button 
                onClick={() => setStep(2)}
                className="btn-outline px-6 py-3 rounded-xl"
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