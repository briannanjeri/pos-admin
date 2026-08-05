"use client";

import SetupAccountForm from "@/components/auth/SetupAccountForm";
import PublicRoute from "@/components/auth/PublicRoute";
import { useSearchParams } from "next/navigation";

export default function SetupAccountPage() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("inviteId");
  const token = searchParams.get("token");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <PublicRoute>
        <SetupAccountForm inviteId={inviteId} token={token} />
      </PublicRoute>
    </div>
  );
}
