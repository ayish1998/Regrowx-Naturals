'use client';

import { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface StoryVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryVideoModal({ isOpen, onClose }: StoryVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);

  // Story scenes with AI-generated narrative
  const storyScenes = [
    {
      id: 1,
      title: "The Problem",
      duration: 8000,
      background: "bg-gradient-to-br from-red-100 to-orange-100",
      content: {
        text: "In Ghana, Akosua watched her grandmother's traditional hair remedies fade from memory as chemical products dominated the market.",
        visual: "👵🏿 → 🧴 → 😔",
        narration: "For generations, Ghanaian grandmothers passed down sacred hair care wisdom. But this ancestral knowledge was disappearing..."
      }
    },
    {
      id: 2,
      title: "The Discovery",
      duration: 10000,
      background: "bg-gradient-to-br from-green-100 to-emerald-100",
      content: {
        text: "Family members struggled with hair loss despite trying countless products. The solution was growing in their backyard all along.",
        visual: "🌿 → 💡 → ✨",
        narration: "Traditional neem, shea butter, and hibiscus - the same herbs that had healed hair for centuries - were right there, waiting to be rediscovered."
      }
    },
    {
      id: 3,
      title: "The Vision",
      duration: 9000,
      background: "bg-gradient-to-br from-blue-100 to-purple-100",
      content: {
        text: "What if we could bridge ancient wisdom with modern AI technology? Preserve culture while empowering people with personalized solutions.",
        visual: "🧠 + 🌿 = 🚀",
        narration: "Regrowx was born from a simple but powerful idea: technology should amplify tradition, not replace it."
      }
    },
    {
      id: 4,
      title: "The Innovation",
      duration: 12000,
      background: "bg-gradient-to-br from-primary-100 to-secondary-100",
      content: {
        text: "We developed AI that analyzes hair with 85% accuracy, then recommends traditional remedies with scientific backing.",
        visual: "📱 → 🔬 → 📊",
        narration: "Our ScalpScan™ technology combines computer vision with traditional knowledge, creating personalized hair care like never before."
      }
    },
    {
      id: 5,
      title: "The Community",
      duration: 11000,
      background: "bg-gradient-to-br from-yellow-100 to-orange-100",
      content: {
        text: "We partnered with 15 women-led farming cooperatives, creating economic opportunities while preserving traditional knowledge.",
        visual: "👩🏿‍🌾 + 🤝 + 💰",
        narration: "Every product sold supports local farmers and preserves cultural heritage. This is impact that goes beyond hair care."
      }
    },
    {
      id: 6,
      title: "The Results",
      duration: 10000,
      background: "bg-gradient-to-br from-green-100 to-teal-100",
      content: {
        text: "10,000+ customers transformed their hair health. 30+ traditional remedies documented. 100 products sold out in 3 weeks.",
        visual: "📈 → 😊 → 🎉",
        narration: "Real people, real results. From hair loss to healthy growth, from scalp issues to confidence restored."
      }
    },
    {
      id: 7,
      title: "The Future",
      duration: 8000,
      background: "bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100",
      content: {
        text: "We're building the first African tech-powered hair wellness ecosystem that reconnects people with their roots.",
        visual: "🌍 → 🌱 → 🌳",
        narration: "This is just the beginning. Together, we're growing toward a healthier, more connected future."
      }
    }
  ];

  const totalDuration = storyScenes.reduce((sum, scene) => sum + scene.duration, 0);

  // Auto-play story scenes
  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / totalDuration) * 100;
        
        // Calculate current scene based on progress
        let accumulatedTime = 0;
        let newScene = 0;
        
        for (let i = 0; i < storyScenes.length; i++) {
          accumulatedTime += storyScenes[i].duration;
          if ((newProgress / 100) * totalDuration <= accumulatedTime) {
            newScene = i;
            break;
          }
        }
        
        setCurrentScene(newScene);
        
        if (newProgress >= 100) {
          setIsPlaying(false);
          return 0;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, isOpen, totalDuration, storyScenes]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setCurrentScene(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStory = storyScenes[currentScene];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-gradient">Regrowx Story</div>
            <div className="text-sm text-gray-500">
              Scene {currentScene + 1} of {storyScenes.length}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Story Content */}
        <div className={`${currentStory.background} p-12 min-h-[400px] flex items-center justify-center transition-all duration-1000`}>
          <div className="text-center space-y-8 max-w-3xl">
            {/* Visual Element */}
            <div className="text-6xl mb-8 animate-fade-in">
              {currentStory.content.visual}
            </div>
            
            {/* Scene Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 animate-slide-up">
              {currentStory.title}
            </h2>
            
            {/* Story Text */}
            <p className="text-xl text-gray-700 leading-relaxed animate-fade-in">
              {currentStory.content.text}
            </p>
            
            {/* Narration Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 animate-slide-up">
              <p className="text-lg text-gray-800 italic leading-relaxed">
                "{currentStory.content.narration}"
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-6 bg-gray-50">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            
            <button
              onClick={() => {
                setProgress(0);
                setCurrentScene(0);
                setIsPlaying(true);
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Restart
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {Math.round((progress / 100) * (totalDuration / 1000))}s / {Math.round(totalDuration / 1000)}s
            </span>
          </div>
        </div>

        {/* Scene Navigation */}
        <div className="flex items-center justify-center space-x-2 p-4 bg-gray-50 border-t border-gray-100">
          {storyScenes.map((scene, index) => (
            <button
              key={scene.id}
              onClick={() => {
                setCurrentScene(index);
                const sceneProgress = (storyScenes.slice(0, index).reduce((sum, s) => sum + s.duration, 0) / totalDuration) * 100;
                setProgress(sceneProgress);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentScene 
                  ? 'bg-primary-600 scale-125' 
                  : index < currentScene 
                    ? 'bg-primary-300' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}