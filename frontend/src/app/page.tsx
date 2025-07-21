'use client';

import Background from '@/components/Background';
import InitialLoading from '@/components/InitialLoading';
import Landing from '@/components/Landing';
import useInitialBackend from '@/hooks/useInitialBackend';

export default function LandingPage() {
  const { isBackendReady } = useInitialBackend();

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center">
      <Background />
      <InitialLoading isBackendReady={isBackendReady} />
      <Landing isBackendReady={isBackendReady} />
    </div>
  );
}
