// src/components/dashboard/widgets/RecentTransactions.jsx
import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  completed: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-600",
};

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-slate-700">
        Recent transactions
      </h2>
      <div className="space-y-3">
        {transactions.map(({ id, tenant, amount, status, time }) => (
          <div key={id} className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {tenant}
              </p>
              <p className="text-xs text-slate-400">{time}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
              <span className="text-sm font-medium text-slate-900">
                KES {amount.toLocaleString()}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full",
                  STATUS_STYLES[status],
                )}
              >
                {status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
