// src/components/auth/AuthGuard.jsx
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  selectIsAuthenticated,
  selectRole,
} from "@/redux/selectors/authSelectors";
import { isPublicPath } from "@/utils/publicPaths";

const AuthGuard = ({ children, allowedRoles }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (isPublicPath(pathname)) {
      return; // Allow access without authentication
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.replace("/login");
    }
  }, [pathname, isAuthenticated, role, allowedRoles, router]);

  // Loading state while checking auth
  if (!isAuthenticated && !isPublicPath(pathname)) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
