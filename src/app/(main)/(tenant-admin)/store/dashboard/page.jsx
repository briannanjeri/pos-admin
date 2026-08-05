"use client";

import StatsGrid from "@/components/tenant-admin/dashboard/StatsGrid";
import QuickActions from "@/components/tenant-admin/dashboard/QuickActions";
import RecentOrders from "@/components/tenant-admin/dashboard/RecentOrders";
import LowStockPanel from "@/components/tenant-admin/dashboard/LowStockPanel";
import {
  STATS,
  QUICK_ACTIONS,
  RECENT_ORDERS,
  LOW_STOCK,
} from "@/components/tenant-admin/dashboard/dashboardData";

export default function TenantDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
        <p className="text-sm text-slate-400">
          Here's what's happening in your store today.
        </p>
      </div>

      <StatsGrid stats={STATS} />
      <QuickActions actions={QUICK_ACTIONS} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentOrders orders={RECENT_ORDERS} />
        <LowStockPanel items={LOW_STOCK} />
      </div>
    </div>
  );
}
