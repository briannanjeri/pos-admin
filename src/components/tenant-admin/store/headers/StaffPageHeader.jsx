"use client";

import { Button } from "antd";
import { UserPlus } from "lucide-react";

const StaffPageHeader = ({ onAddStaff }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Staff</h2>
        <p className="text-sm text-slate-400">
          Manage store staff accounts and permissions.
        </p>
      </div>
      <Button
        type="primary"
        icon={<UserPlus className="w-4 h-4" />}
        onClick={onAddStaff}
      >
        Add Staff
      </Button>
    </div>
  );
};

export default StaffPageHeader;
