// src/components/dashboard/pages/DashboardHome.jsx
"use client";

import { Loader2 } from "lucide-react";
import useDashboardData from "./hooks/useDashboardData";
import StatsGrid from "./widgets/StatsGrid";
import QuickActions from "./widgets/QuickActions";
import RecentTransactions from "./widgets/RecentTransactions";
import RecentActivities from "./widgets/RecentActivities";
import RecentUpdates from "./widgets/RecentUpdates";

const DashboardHome = () => {
  const { stats, transactions, activities, updates, loading } =
    useDashboardData();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Welcome back. Here's what's happening on your platform.
        </p>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Quick actions */}
      <QuickActions />

      {/* Widgets row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentTransactions transactions={transactions} />
        <RecentActivities activities={activities} />
        <RecentUpdates updates={updates} />
      </div>
    </div>
  );
};

export default DashboardHome;
