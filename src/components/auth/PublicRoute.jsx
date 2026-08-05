"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectRole,
} from "@/redux/selectors/authSelectors";

export default function PublicRoute({ children }) {
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace("/dashboard"); // or appropriate dashboard
    }
  }, [isAuthenticated, role, router]);

  return <>{children}</>;
}
