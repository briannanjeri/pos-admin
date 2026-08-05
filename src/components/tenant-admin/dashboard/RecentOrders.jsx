"use client";

import Link from "next/link";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_STYLES } from "./dashboardData";

const RecentOrders = ({ orders }) => {
  return (
    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Recent orders</h3>
        <Link
          href="/orders"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
        >
          View all <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        {orders.map(({ id, customer, amount, status, time }) => (
          <div key={id} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{id}</p>
                <p className="text-xs text-slate-400">
                  {customer} · {time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full",
                  STATUS_STYLES[status],
                )}
              >
                {status}
              </span>
              <span className="text-sm font-medium text-slate-900 w-16 text-right">
                {amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
