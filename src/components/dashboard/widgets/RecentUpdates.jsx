// src/components/dashboard/widgets/RecentUpdates.jsx
import { Bell } from "lucide-react";

const RecentUpdates = ({ updates }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-slate-700">Recent updates</h2>
      <div className="space-y-4">
        {updates.map(({ id, title, detail, time }) => (
          <div key={id} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800">{title}</p>
              <p className="text-xs text-slate-400 truncate">{detail}</p>
              <p className="text-[11px] text-slate-300 mt-0.5">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUpdates;
