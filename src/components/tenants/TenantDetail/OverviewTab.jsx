import { Card, Descriptions, Statistic, Row, Col, Tag } from "antd";

export default function OverviewTab({ tenant }) {
  const {
    detail,
    active_member_count,
    inactive_member_count,
    pending_invite_count,
  } = tenant;

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{tenant.name}</h2>
            <span className="text-muted-foreground text-sm">{tenant.slug}</span>
          </div>
          <Tag color={tenant.is_active ? "success" : "default"}>
            {tenant.is_active ? "Active" : "Inactive"}
          </Tag>
        </div>

        {detail && (
          <Descriptions column={2} size="small">
            <Descriptions.Item label="Business email">
              {detail.business_email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">{detail.phone}</Descriptions.Item>
            <Descriptions.Item label="Type">
              {detail.business_type}
            </Descriptions.Item>
            <Descriptions.Item label="Plan">
              <Tag color="blue">{detail.plan}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
              {detail.address}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Active members" value={active_member_count} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Inactive members" value={inactive_member_count} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending invites" value={pending_invite_count} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
