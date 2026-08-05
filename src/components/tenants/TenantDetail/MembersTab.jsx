import { Card, Table, Empty, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const STATUS_TAG = {
  active: { color: "success", icon: <CheckCircleOutlined />, label: "Active" },
  pending: { color: "warning", icon: <ClockCircleOutlined />, label: "Pending" },
  expired: { color: "error", icon: <CloseCircleOutlined />, label: "Expired" },
};

const memberColumns = [
  {
    title: "Name",
    key: "name",
    render: (_, record) =>
      record.status === "active" ? (
        `${record.first_name} ${record.last_name}`
      ) : (
        <span className="text-muted-foreground italic">Not yet registered</span>
      ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role) => <Tag>{role.replace(/_/g, " ")}</Tag>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const meta = STATUS_TAG[status] ?? STATUS_TAG.active;
      return (
        <Tag color={meta.color} icon={meta.icon}>
          {meta.label}
        </Tag>
      );
    },
  },
  {
    title: "Invited by",
    dataIndex: "invited_by_name",
    key: "invited_by_name",
    render: (name) => name || <span className="text-muted-foreground">—</span>,
  },
  {
    title: "Invited on",
    dataIndex: "invited_at",
    key: "invited_at",
    render: (date) => (date ? new Date(date).toLocaleDateString() : "—"),
  },
];

export default function MembersTab({ members }) {
  return (
    <Card>
      {members && members.length > 0 ? (
        <Table
          columns={memberColumns}
          dataSource={members}
          rowKey={(record) => `${record.status}-${record.id}`}
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <Empty description="No members yet" />
      )}
    </Card>
  );
}