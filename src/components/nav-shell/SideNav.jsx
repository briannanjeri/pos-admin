"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useRouter } from "next/navigation"; // keep your existing imports
import { useDispatch as useReduxDispatch, useSelector } from "react-redux";
import { logout, clearAuth } from "@/redux/slices/authSlice";
import { selectUser } from "@/redux/selectors/authSelectors";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";

const SideNav = ({ collapsed, onToggle, sections, brandSubtitle }) => {
  const pathname = usePathname();
  const dispatch = useReduxDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-white border-r border-slate-200 flex-shrink-0",
        "transition-all duration-200 ease-in-out",
        collapsed ? "w-[60px]" : "w-[220px]",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 h-14 px-4 border-b border-slate-200 flex-shrink-0",
          collapsed && "justify-center px-0",
        )}
      >
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <LayoutDashboard className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              POS Admin
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {brandSubtitle}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onToggle}
        className={cn(
          "absolute -right-3 top-[72px] z-10 w-6 h-6 rounded-full",
          "bg-white border border-slate-200 flex items-center justify-center",
          "text-slate-400 hover:text-slate-600 transition-colors",
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {sections.map(({ section, items }) => (
          <div key={section}>
            {!collapsed && (
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {section}
              </p>
            )}
            <div className="space-y-0.5">
              {items.map(({ label, href, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    title={collapsed ? label : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      collapsed && "justify-center px-0 py-2.5",
                      active
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0",
                        active ? "text-indigo-600" : "text-slate-400",
                      )}
                    />
                    {!collapsed && label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SideNav;
