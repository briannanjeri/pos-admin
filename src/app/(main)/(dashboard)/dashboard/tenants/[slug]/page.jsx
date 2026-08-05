"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert } from "antd";
import {
  loadTenantDetail,
  clearTenantDetail,
} from "@/redux/slices/tenantsSlice";
import {
  selectTenantDetail,
  selectTenantDetailLoading,
  selectTenantDetailError,
} from "@/redux/selectors/tenantSelectors";
import TenantDetail from "@/components/tenants/TenantDetail/TenantDetail";

export default function TenantDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const tenant = useSelector(selectTenantDetail);
  const loading = useSelector(selectTenantDetailLoading);
  const error = useSelector(selectTenantDetailError);

  useEffect(() => {
    dispatch(loadTenantDetail(slug));
    return () => {
      dispatch(clearTenantDetail());
    };
  }, [dispatch, slug]);

  if (loading && !tenant) {
    return (
      <div className="flex justify-center py-24">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert type="error" message={error} showIcon />
      </div>
    );
  }

  return (
    <div className="p-6">
      <TenantDetail tenant={tenant} />
    </div>
  );
}
