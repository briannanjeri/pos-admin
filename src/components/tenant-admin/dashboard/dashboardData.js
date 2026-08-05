import {
  DollarSign,
  Users,
  PackageX,
  Mail,
  UserPlus,
  PackagePlus,
  FileBarChart,
  Settings,
} from "lucide-react";

export const STATS = [
  { label: "Sales Today", value: "$2,480", change: "+12.4%", trend: "up", icon: DollarSign },
  { label: "Active Staff", value: "14", change: "+2", trend: "up", icon: Users },
  { label: "Low Stock Items", value: "6", change: "-3", trend: "down", icon: PackageX },
  { label: "Open Invites", value: "3", change: "Pending", trend: "neutral", icon: Mail },
];

export const QUICK_ACTIONS = [
{ label: "Add Staff", href: "/store/staff?addStaff=1", icon: UserPlus },
  { label: "Add Product", href: "/store/inventory?new=1", icon: PackagePlus },
  { label: "View Reports", href: "/store/reports", icon: FileBarChart },
  { label: "Store Settings", href: "/store/settings", icon: Settings },
];

export const RECENT_ORDERS = [
  { id: "ORD-1042", customer: "Walk-in", amount: "$34.50", status: "Completed", time: "10 min ago" },
  { id: "ORD-1041", customer: "J. Mwangi", amount: "$128.00", status: "Completed", time: "42 min ago" },
  { id: "ORD-1040", customer: "Walk-in", amount: "$12.00", status: "Refunded", time: "1 hr ago" },
  { id: "ORD-1039", customer: "A. Otieno", amount: "$76.25", status: "Completed", time: "2 hr ago" },
];

export const LOW_STOCK = [
  { name: "Coca-Cola 500ml", qty: 4, threshold: 20 },
  { name: "White Bread Loaf", qty: 2, threshold: 15 },
  { name: "Cooking Oil 1L", qty: 5, threshold: 10 },
];

export const STATUS_STYLES = {
  Completed: "bg-emerald-50 text-emerald-700",
  Refunded: "bg-red-50 text-red-600",
  Pending: "bg-amber-50 text-amber-700",
};