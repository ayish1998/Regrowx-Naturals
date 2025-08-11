'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';

interface ImageUploadProps {
  id: string;
  title: string;
  description: string;
  onImageUpload: (file: File, preview: string) => void;
}

export default function ImageUpload({ id, title, description, onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        setIsUploaded(true);
        onImageUpload(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setIsUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      {!preview ? (
        // Upload State
        <div 
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer"
          onClick={triggerFileInput}
        >
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="btn-outline inline-flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </div>
        </div>
      ) : (
        // Preview State
        <div className="relative rounded-xl overflow-hidden border-2 border-primary-400">
          <img 
            src={preview} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex space-x-2">
              <button
                onClick={triggerFileInput}
                className="bg-white text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Change
              </button>
              <button
                onClick={removeImage}
                className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
          {/* Success Indicator */}
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <Check className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        id={id}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Status */}
      {isUploaded && (
        <div className="mt-2 text-center">
          <span className="text-sm text-green-600 font-medium">
            ✓ Photo uploaded successfully
          </span>
        </div>
      )}
    </div>
  );
}