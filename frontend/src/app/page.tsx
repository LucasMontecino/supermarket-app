'use client';

import Landing from '@/components/Landing';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    // Function to check backend readiness
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (res.ok) {
          setIsBackendReady(true);
        } else {
          setTimeout(checkBackend, 1000); // Retry after 1s
        }
      } catch {
        setTimeout(checkBackend, 1000); // Retry after 1s
      }
    };
    checkBackend();
  }, []);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/landing-bg.png"
          alt="Landing background"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      {/* Loading overlay */}
      {!isBackendReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40">
            <Image
              src="/pointer.gif"
              alt="Loading..."
              className="w-fit h-fit object-contain rounded-lg"
              width={100}
              height={100}
            />
        </div>
      )}
      {/* Main content */}
      {isBackendReady && <Landing />}
    </div>
  );
}
