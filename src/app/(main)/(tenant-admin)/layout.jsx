"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import NavShell from "@/components/nav-shell/nav-shell";
import { tenantAdminNav } from "@/components/config/navConfig";
export default function TenantAdminLayout({ children }) {
  return (
    <AuthGuard allowedRoles={["tenant_admin", "tenant_manager"]}>
      <NavShell navConfig={tenantAdminNav}>{children}</NavShell>
    </AuthGuard>
  );
}
