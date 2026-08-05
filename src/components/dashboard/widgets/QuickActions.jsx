// src/components/dashboard/widgets/QuickActions.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, ShieldCheck, ArrowRight } from "lucide-react";
import OnboardTenantDrawer from "@/components/tenants/OnboardTenantDrawer";

const QuickActions = () => {
  const router = useRouter();
  const [tenantDrawerOpen, setTenantDrawerOpen] = useState(false);

  const ACTIONS = [
    {
      label: "Invite administrator",
      description: "Add a new platform-level admin",
      icon: ShieldCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      onClick: () => router.push("/users?action=invite-admin"),
    },
    {
      label: "Onboard tenant",
      description: "Register a new POS tenant",
      icon: Building2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      onClick: () => setTenantDrawerOpen(true),
    },
  ];

  return (
    <>
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Quick actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACTIONS.map(
            ({ label, description, icon: Icon, color, bg, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4
                         hover:border-indigo-200 hover:shadow-sm transition-all text-left group"
              >
                <div className={`${bg} p-2.5 rounded-lg flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
              </button>
            ),
          )}
        </div>
      </div>

      <OnboardTenantDrawer
        open={tenantDrawerOpen}
        onClose={() => setTenantDrawerOpen(false)}
      />
    </>
  );
};

export default QuickActions;
