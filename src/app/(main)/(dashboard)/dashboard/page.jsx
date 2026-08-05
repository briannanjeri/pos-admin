// src/app/(main)/(dashboard)/dashboard/page.jsx
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardHome from "@/components/dashboard/DashboardHome";

export default function DashboardPage() {
  return (
    <AuthGuard allowedRoles={["super_admin"]}>
      <DashboardHome />
    </AuthGuard>
  );
}
