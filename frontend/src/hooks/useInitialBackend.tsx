import { useEffect, useState } from 'react';

export default function useInitialBackend() {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
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

  return { isBackendReady };
}
