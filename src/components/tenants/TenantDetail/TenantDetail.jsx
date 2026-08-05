"use client";

import { Tabs, Tag, Avatar } from "antd";
import {
  InfoCircleOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import OverviewTab from "./OverviewTab";
import MembersTab from "./MembersTab";

export default function TenantDetail({ tenant }) {
  if (!tenant) return null;

  const items = [
    {
      key: "overview",
      label: (
        <span className="flex items-center gap-2">
          <InfoCircleOutlined />
          Overview
        </span>
      ),
      children: <OverviewTab tenant={tenant} />,
    },
    {
      key: "members",
      label: (
        <span className="flex items-center gap-2">
          <TeamOutlined />
          Members
          <Tag className="!ml-1 !mr-0" bordered={false} color="default">
            {tenant.members?.length ?? 0}
          </Tag>
        </span>
      ),
      children: <MembersTab members={tenant.members} />,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 pb-1">
        <Avatar
          size={56}
          shape="square"
          icon={<ShopOutlined />}
          style={{
            backgroundColor: tenant.is_active ? "#e6f4ff" : "#f5f5f5",
            color: tenant.is_active ? "#1677ff" : "#8c8c8c",
          }}
        />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold leading-tight">
              {tenant.name}
            </h1>
            <Tag color={tenant.is_active ? "success" : "default"}>
              {tenant.is_active ? "Active" : "Inactive"}
            </Tag>
          </div>
          <span className="text-muted-foreground text-sm">{tenant.slug}</span>
        </div>
      </div>

      <Tabs
        defaultActiveKey="overview"
        items={items}
        size="large"
        className="tenant-detail-tabs"
      />
    </div>
  );
}
