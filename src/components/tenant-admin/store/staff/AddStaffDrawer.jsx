"use client";

import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  message,
  Checkbox,
  Divider,
} from "antd";
import { useState, useEffect } from "react";
import { registerStaff, getStaffRoles } from "@/utils/api/auth/authApi";
const { Option } = Select;

// Turns "view_products" into "View products" for display
const formatPermissionLabel = (perm) =>
  perm.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

const AddStaffDrawer = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fetchRoles = async () => {
      setRolesLoading(true);
      try {
        const data = await getStaffRoles();
        setRoles(data.roles);
        setAllPermissions(data.permissions);
      } catch {
        message.error("Failed to load roles");
      } finally {
        setRolesLoading(false);
      }
    };
    fetchRoles();
  }, [open]);

  const handleRoleChange = (roleValue) => {
    const selectedRole = roles.find((r) => r.value === roleValue);
    // Pre-check the role's default permissions — admin can still adjust
    form.setFieldValue("permissions", selectedRole?.permissions || []);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const data = await registerStaff(values);
      message.success("Staff account created");
      form.resetFields();
      onSuccess?.(data);
      onClose();
    } catch (err) {
      if (err?.errorFields) return;
      message.error(
        err?.response?.data?.detail || "Failed to create staff account",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Add Staff"
      open={open}
      onClose={onClose}
      width={440}
      extra={
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Create Account
        </Button>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter a username" }]}
        >
          <Input placeholder="e.g. jane.waiter" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input placeholder="e.g. 0712345678" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="e.g. jane@example.com" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select
            placeholder="Select role"
            loading={rolesLoading}
            onChange={handleRoleChange}
          >
            {roles.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Divider className="!my-3" />

        <Form.Item
          name="permissions"
          label="Permissions"
          extra="Pre-filled based on role — adjust if this staff member needs more or less access."
          rules={[
            { required: true, message: "Select at least one permission" },
          ]}
        >
          <Checkbox.Group className="flex flex-col gap-2">
            {allPermissions.map((perm) => (
              <Checkbox key={perm} value={perm}>
                {formatPermissionLabel(perm)}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="password"
          label="Temporary Password"
          rules={[{ required: true, min: 6, message: "Minimum 6 characters" }]}
          extra="Staff can change this after their first login."
        >
          <Input.Password placeholder="Set a temporary password" />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm the password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Re-enter the password" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddStaffDrawer;
