// src/components/dashboard/hooks/useDashboardData.js
import { useState, useEffect } from "react";

const STUB_STATS = {
  totalTenants: 12,
  totalAdmins: 4,
  totalUsers: 138,
};

const STUB_TRANSACTIONS = [
  { id: 1, tenant: "Zuri Cafe", amount: 4200, status: "completed", time: "2 min ago" },
  { id: 2, tenant: "Artisan Bakes", amount: 1850, status: "completed", time: "14 min ago" },
  { id: 3, tenant: "Green Bowl", amount: 3100, status: "pending", time: "31 min ago" },
  { id: 4, tenant: "Spice Route", amount: 960, status: "failed", time: "1 hr ago" },
  { id: 5, tenant: "The Bistro", amount: 2750, status: "completed", time: "2 hr ago" },
];

const STUB_ACTIVITIES = [
  { id: 1, action: "New tenant registered", detail: "Zuri Cafe onboarded", time: "5 min ago" },
  { id: 2, action: "Admin invited", detail: "john@example.com", time: "22 min ago" },
  { id: 3, action: "Tenant suspended", detail: "Old Spice POS", time: "1 hr ago" },
  { id: 4, action: "Settings updated", detail: "Platform tax config changed", time: "3 hr ago" },
  { id: 5, action: "User role changed", detail: "jane@example.com → supervisor", time: "5 hr ago" },
];

const STUB_UPDATES = [
  { id: 1, title: "Billing module updated", detail: "Invoice generation v2.1 deployed", time: "Today" },
  { id: 2, title: "New permission roles", detail: "Supervisor role added to all tenants", time: "Yesterday" },
  { id: 3, title: "Maintenance window", detail: "Scheduled downtime Jan 20, 2:00 AM", time: "2 days ago" },
];

const useDashboardData = () => {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulates API fetch — replace with real axios calls later
    const timer = setTimeout(() => {
      setStats(STUB_STATS);
      setTransactions(STUB_TRANSACTIONS);
      setActivities(STUB_ACTIVITIES);
      setUpdates(STUB_UPDATES);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { stats, transactions, activities, updates, loading };
};

export default useDashboardData;