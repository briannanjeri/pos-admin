"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const LowStockPanel = ({ items }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Low stock</h3>
        <Link
          href="/inventory"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
        >
          Manage <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {items.map(({ name, qty, threshold }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-700 truncate">
                {name}
              </span>
              <span className="text-xs text-slate-400">
                {qty}/{threshold}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-red-400 rounded-full"
                style={{ width: `${Math.min((qty / threshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockPanel;
