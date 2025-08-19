'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EducationPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new blog page
    router.replace('/blog');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Redirecting...</h1>
        <p className="text-gray-600">You're being redirected to our Blog page.</p>
      </div>
    </div>
  );
}