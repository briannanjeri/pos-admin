"use client";

import { Table, Tag,Dropdown } from "antd";
import { ChevronDown } from "lucide-react";

const formatPermissionLabel = (perm) =>
  perm.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
const columns = [
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Phone", dataIndex: "phone_number", key: "phone_number" },
  { title: "Email", dataIndex: "email", key: "email", render: (v) => v || "—" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    title: "Permissions",
    dataIndex: "custom_permissions",
    key: "custom_permissions",
    render: (permissions) => {
      const list = permissions || [];
      if (list.length === 0) return "—";

      const items = list.map((perm) => ({
        key: perm,
        label: formatPermissionLabel(perm),
      }));

      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
            {list.length} permission{list.length > 1 ? "s" : ""}
            <ChevronDown className="w-3 h-3" />
          </button>
        </Dropdown>
      );
    },
  },
  {
    title: "Created By",
    dataIndex: "created_by",
    key: "created_by",
    render: (v) => v || "—",
  },
];

const StaffTable = ({ staff }) => {
  return (
    <Table
      columns={columns}
      dataSource={staff}
      rowKey={(r) => r.id || r.username}
      rowClassName={(_, index) => (index % 2 === 0 ? "" : "!bg-slate-50/60")}
      className="
    [&_.ant-table-thead>tr>th]:!bg-indigo-50
    [&_.ant-table-thead>tr>th]:!text-indigo-700
    [&_.ant-table-thead>tr>th]:!font-medium
    [&_.ant-table-thead>tr>th]:!border-b
    [&_.ant-table-thead>tr>th]:!border-indigo-100
    [&_.ant-table-tbody>tr:hover>td]:!bg-indigo-50
  "
    />
  );
};

export default StaffTable;
