"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Input, Tag, Card, Typography, Alert,Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { loadTenants } from "@/redux/slices/tenantsSlice";
import {
  selectTenantList,
  selectTenantListCount,
  selectTenantListPage,
  selectTenantListLoading,
  selectTenantListError,
} from "@/redux/selectors/tenantSelectors";

const { Title } = Typography;
const PAGE_SIZE = 20;

function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function TenantsList() {
  const dispatch = useDispatch();
  const router = useRouter();

  const tenants = useSelector(selectTenantList);
  const count = useSelector(selectTenantListCount);
  const page = useSelector(selectTenantListPage);
  const loading = useSelector(selectTenantListLoading);
  const error = useSelector(selectTenantListError);

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  useEffect(() => {
    dispatch(loadTenants({ page: 1, search: debouncedSearch }));
  }, [dispatch, debouncedSearch]);

  const handleTableChange = useCallback(
    (pagination) => {
      dispatch(
        loadTenants({ page: pagination.current, search: debouncedSearch }),
      );
    },
    [dispatch, debouncedSearch],
  );

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (name, record) => (
          <a onClick={() => router.push(`/dashboard/tenants/${record.slug}`)}>
            {name}
          </a>
        ),
      },
      {
        title: "Slug",
        dataIndex: "slug",
        key: "slug",
      },
      {
        title: "Business email",
        dataIndex: "business_email",
        key: "business_email",
      },
      {
        title: "Plan",
        dataIndex: "plan",
        key: "plan",
        render: (plan) => <Tag color="blue">{plan}</Tag>,
      },
      {
        title: "Members",
        dataIndex: "member_count",
        key: "member_count",
        align: "center",
      },
      {
        title: "Pending invites",
        dataIndex: "pending_invite_count",
        key: "pending_invite_count",
        align: "center",
        render: (n) => (n > 0 ? <Tag color="warning">{n}</Tag> : n),
      },
      {
        title: "Status",
        dataIndex: "is_active",
        key: "is_active",
        render: (isActive) => (
          <Tag color={isActive ? "success" : "default"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>
        ),
      },
      {
        title: "Created",
        dataIndex: "created_at",
        key: "created_at",
        render: (date) => new Date(date).toLocaleDateString(),
      },
      {
        title: "",
        key: "actions",
        align: "right",
        render: (_, record) => (
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/dashboard/tenants/${record.slug}`)}
          >
            View
          </Button>
        ),
      },
    ],
    [router],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Title level={3} style={{ margin: 0 }}>
          Tenants
        </Title>
      </div>

      <Card>
        <Input
          allowClear
          size="large"
          placeholder="Search by name, slug, or business email"
          prefix={<SearchOutlined />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ maxWidth: 400, marginBottom: 16 }}
        />

        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Table
          columns={columns}
          dataSource={tenants}
          rowKey="id"
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: count,
            showSizeChanger: false,
          }}
        />
      </Card>
    </div>
  );
}
