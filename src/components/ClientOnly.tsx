"use client";

import { useEffect, useState, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component is used to prevent hydration mismatch errors
 * by only rendering the children on the client side.
 */
export default function ClientOnly({
  children,
  fallback = null,
}: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  // Only run once after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // On first render, don't render the children
  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
