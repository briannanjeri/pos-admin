"use client";

import ActivateAccountForm from "@/components/auth/ActivateAccountForm";
import PublicRoute from "@/components/auth/PublicRoute";
import { useSearchParams } from "next/navigation";

export default function ActivateAccountPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <PublicRoute>

      <ActivateAccountForm token={token} />
      </PublicRoute>
    </div>
  );
}
