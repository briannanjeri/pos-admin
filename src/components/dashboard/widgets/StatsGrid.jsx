// src/components/dashboard/widgets/StatsGrid.jsx
import { Building2, Users, ShieldCheck } from "lucide-react";

const STAT_CONFIG = [
  {
    key: "totalTenants",
    label: "Total tenants",
    icon: Building2,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    description: "Registered on platform",
  },
  {
    key: "totalAdmins",
    label: "Total admins",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    description: "Platform administrators",
  },
  {
    key: "totalUsers",
    label: "Total users",
    icon: Users,
    color: "text-amber-600",
    bg: "bg-amber-50",
    description: "Across all tenants",
  },
];

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {STAT_CONFIG.map(({ key, label, icon: Icon, color, bg, description }) => (
        <div
          key={key}
          className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4"
        >
          <div className={`${bg} p-2.5 rounded-lg flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              {stats?.[key] ?? "—"}
            </p>
            <p className="text-sm font-medium text-slate-700">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
