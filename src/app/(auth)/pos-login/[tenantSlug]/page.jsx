"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StaffLoginScreen from "@/components/tenant-admin/store/auth/StaffLoginScreen";
import { getTenantBySlug } from "@/utils/api/tenants/tenants";

export default function PosLoginPage() {
  const { tenantSlug } = useParams();
  const [tenantId, setTenantId] = useState(null);
  const [notFound, setNotFound] = useState(false);
console.log('tenantslug', tenantSlug)
  useEffect(() => {
    if (!tenantSlug) return;
    getTenantBySlug(tenantSlug)
      .then((data) => setTenantId(data.id))
      .catch(() => setNotFound(true));
  }, [tenantSlug]);

  if (notFound) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-500">
        Store not found.
      </div>
    );
  }
console.log('tenantid', tenantId)
  if (!tenantId) return null; // could swap for a spinner

  return <StaffLoginScreen tenantId={tenantId} />;
}
