"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, change, trend, icon: Icon }) => (
        <div
          key={label}
          className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">{label}</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Icon className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold text-slate-900">
              {value}
            </span>
            {trend !== "neutral" ? (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  trend === "up" ? "text-emerald-600" : "text-red-500",
                )}
              >
                {trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {change}
              </span>
            ) : (
              <span className="text-xs font-medium text-amber-600">
                {change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
