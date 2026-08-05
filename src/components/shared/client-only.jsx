"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * ClientOnly component ensures children only render on the client side
 * Prevents SSR issues with browser-dependent code
 */
const ClientOnly = ({ children, fallback = null, showLoader = true }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    if (fallback) {
      return fallback;
    }

    if (showLoader) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading Dashboard...</p>
        </div>
      );
    }

    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
