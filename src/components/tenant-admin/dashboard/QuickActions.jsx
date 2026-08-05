"use client";

import Link from "next/link";

const QuickActions = ({ actions }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        Quick actions
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 py-4 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Icon className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
