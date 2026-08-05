import {
  LayoutDashboard,
  Building2,
  Users,
  Receipt,
  BarChart3,
  Activity,
  Settings,
  UserCog,
  Package,
} from "lucide-react";

export const superAdminNav = {
  roleLabel: "Super Admin",
  brandSubtitle: "Super admin",
  sections: [
    {
      section: "Overview",
      items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
    },
    {
      section: "Management",
      items: [
        { label: "Tenants", href: "/tenants", icon: Building2 },
        { label: "Users", href: "/users", icon: Users },
      ],
    },
    {
      section: "Data",
      items: [
        { label: "Orders", href: "/orders", icon: Receipt },
        { label: "Reports", href: "/reports", icon: BarChart3 },
      ],
    },
    {
      section: "System",
      items: [
        { label: "Activity logs", href: "/activity-logs", icon: Activity },
        { label: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ],
};

export const tenantAdminNav = {
  roleLabel: "Tenant Admin",
  brandSubtitle: "Store admin",
  sections: [
    {
      section: "Overview",
      items: [{ label: "Dashboard", href: "/store/dashboard", icon: LayoutDashboard }],
    },
    {
      section: "Management",
      items: [
        { label: "Staff", href: "/store/staff", icon: UserCog },
        { label: "Inventory", href: "/store/inventory", icon: Package },
      ],
    },
    {
      section: "Data",
      items: [{ label: "Sales", href: "/store/sales", icon: Receipt }],
    },
    {
      section: "Account",
      items: [{ label: "Settings", href: "/store/settings", icon: Settings }],
    },
  ],
};

// Flattened lookup for TopBar breadcrumb/title — derived, not hand-duplicated
export const buildRouteMeta = (navConfig) => {
  const meta = {};
  navConfig.sections.forEach(({ section, items }) => {
    items.forEach(({ href, label }) => {
      meta[href] = { title: label, section };
    });
  });
  return meta;
};