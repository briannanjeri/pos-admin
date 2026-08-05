"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
  selectTenantAdminStaffResults,
  selectTenantAdminLoading,
} from "@/redux/selectors/tenantAdminSelectors";

import StaffPageHeader from "@/components/tenant-admin/store/headers/StaffPageHeader";
import StaffTable from "@/components/tenant-admin/store/tables/StaffTable";
import AddStaffDrawer from "@/components/tenant-admin/store/staff/AddStaffDrawer";
import { useAutoOpenAddStaff } from "@/components/tenant-admin/store/staff/useAutoOpenAddStaff";
import { fetchStaffList } from "@/redux/slices/tenantAdminSlice";

export default function StaffPage() {
  const dispatch = useDispatch();
const staffResults = useSelector(selectTenantAdminStaffResults);
const loading = useSelector(selectTenantAdminLoading);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useAutoOpenAddStaff(setDrawerOpen);

  useEffect(() => {
    dispatch(fetchStaffList(1));
  }, [dispatch]);

  const handleStaffCreated = useCallback(() => {
    message.success("Staff account created");
    dispatch(fetchStaffList(1)); // refetch after creation
  }, [dispatch]);

  return (
    <div className="p-6 space-y-4">
      <StaffPageHeader onAddStaff={() => setDrawerOpen(true)} />
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
        <StaffTable staff={staffResults} loading={loading} />
      </div>
      <AddStaffDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={handleStaffCreated}
      />
    </div>
  );
}
