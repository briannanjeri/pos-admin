"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const useAutoOpenAddStaff = (setDrawerOpen) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("addStaff") === "1") {
      setDrawerOpen(true);
      router.replace("/store/staff");
    }
  }, [searchParams, router, setDrawerOpen]);
};