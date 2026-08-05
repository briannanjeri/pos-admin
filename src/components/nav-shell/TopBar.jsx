"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearAuth } from "@/redux/slices/authSlice";
import { selectUser } from "@/redux/selectors/authSelectors";
import { Bell, Settings, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopBar = ({ routeMeta, roleLabel }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const meta = Object.entries(routeMeta).find(([key]) =>
    pathname.startsWith(key),
  )?.[1] || { title: "Dashboard", section: "Overview" };

  const initials =
    user?.username
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "SA";

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push("/login");
    } catch {
      dispatch(clearAuth());
      router.push("/login");
    }
  };

  return (
    <header className="h-14 flex items-center justify-between px-5 bg-white border-b border-slate-200 flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <h1 className="text-sm font-semibold text-slate-900">{meta.title}</h1>
        <span className="text-slate-300">·</span>
        <span className="text-xs text-slate-400">{meta.section}</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-50 transition-colors outline-none">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-xs font-medium text-indigo-700">
                  {initials}
                </span>
              </div>
              <span className="text-xs font-medium text-slate-700">
                {user?.username}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-3 py-1">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-indigo-700">
                    {initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {user?.username}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.email}
                  </p>
                  <span className="inline-block mt-0.5 text-[10px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    {roleLabel}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-400 mr-2" />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-500 focus:text-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
