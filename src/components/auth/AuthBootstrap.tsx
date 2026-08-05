"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { loadSession } from "@/redux/slices/authSlice";
import { isPublicPath } from "@/utils/publicPaths";
export default function AuthBootstrap() {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  useEffect(() => {
    if (isPublicPath(pathname)) return;

    dispatch(loadSession());
  }, [dispatch]);

  return null;
}