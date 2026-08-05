"use client";

import { useState } from "react";
import SideNav from "./SideNav";
import TopBar from "./TopBar";
import { buildRouteMeta } from "../config/navConfig";
const NavShell = ({ navConfig, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const routeMeta = buildRouteMeta(navConfig);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SideNav
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        sections={navConfig.sections}
        brandSubtitle={navConfig.brandSubtitle}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar routeMeta={routeMeta} roleLabel={navConfig.roleLabel} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default NavShell;
