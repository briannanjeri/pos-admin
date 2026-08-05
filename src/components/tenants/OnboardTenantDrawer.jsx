// src/components/tenants/components/OnboardTenantDrawer.jsx
"use client";

import { useState } from "react";
import { Form, Input, Select, Button, Steps, message } from "antd";
import Drawer from "@/components/shared/Drawer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOnboardingMeta,onboardTenant } from "@/utils/api/tenants/tenants";
import { INITIAL_TENANT_FORM } from "@/types/tenant";

const OnboardTenantDrawer = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const queryClient = useQueryClient();

  // Fetch dynamic metadata (business types & plans)
  const { data: meta, isLoading: metaLoading } = useQuery({
    queryKey: ["onboardingMeta"],
    queryFn: getOnboardingMeta,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: open,
  });

  // Mutation for creating tenant
  const mutation = useMutation({
    mutationFn: onboardTenant,
    onSuccess: () => {
      message.success("Tenant created successfully!");
      form.resetFields();
      setCurrentStep(0);
      onClose();
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
    onError: (error) => {
      const errorMsg =
        error?.response?.data?.slug?.[0] ||
        error?.response?.data?.admin_email?.[0] ||
        error?.response?.data?.message ||
        error?.response?.data?.non_field_errors?.[0] ||
        error?.message ||
        "Failed to create tenant";

      message.error(errorMsg);
      console.log("Full error object:", error);
    },
  });

  const handleClose = () => {
    if (mutation.isPending) return;
    form.resetFields();
    setCurrentStep(0);
    onClose();
  };

  const handleBusinessNameChange = (e) => {
    const name = e.target.value.trim();
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    form.setFieldsValue({ slug });
  };

  const nextStep = async () => {
    try {
      // Validate only the fields in the current step
      const fieldsToValidate =
        currentStep === 0
          ? [
              "businessName",
              "business_email",
              "phone",
              "business_type",
              "slug",
              "plan",
              "address",
            ]
          : ["admin_name", "admin_email"];

      await form.validateFields(fieldsToValidate);

      // Move to next step
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      // Ant Design will show the validation errors automatically
      console.error("Validation failed on step", currentStep);
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      // Step 1: Validate only the current (last) step
      await form.validateFields(["admin_name", "admin_email"]);

      // Step 2: Get ALL values from the form (including hidden/unmounted fields)
      const allValues = form.getFieldsValue(true); // `true` = include hidden fields

      // Optional: Extra safety - manually validate critical fields
      if (!allValues.businessName || !allValues.slug || !allValues.plan) {
        message.error("Please complete the Business Details step");
        setCurrentStep(0);
        return;
      }

      mutation.mutate(allValues);
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Please fix the errors before submitting");
    }
  };

  const businessTypes = meta?.business_types || [];
  const plans = meta?.plans || [];

  const steps = [
    {
      title: "Business details",
      content: (
        <div className="space-y-6">
          <Form.Item
            name="businessName"
            label="Business name *"
            rules={[{ required: true, message: "Business name is required" }]}
          >
            <Input
              placeholder="Pizza Palace"
              onChange={handleBusinessNameChange}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item
              name="business_email"
              label="Business email *"
              rules={[
                { required: true, message: "Required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input type="email" placeholder="hello@pizzapalace.com" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone number *"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="+254 700 000000" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item
              name="business_type"
              label="Business type *"
              rules={[{ required: true, message: "Select a business type" }]}
            >
              <Select placeholder="Select type" loading={metaLoading}>
                {businessTypes.map(({ value, label }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="plan" label="Plan *">
              <Select placeholder="Select plan" loading={metaLoading}>
                {plans.map(({ value, label }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="slug"
            label="Slug *"
            rules={[
              { required: true, message: "Slug is required" },
              {
                pattern: /^[a-z0-9-]+$/,
                message: "Only lowercase letters, numbers and hyphens",
              },
            ]}
            extra={
              <span className="text-blue-600 font-mono">
                /tenant-admin/{form.getFieldValue("slug") || "pizza-palace"}
              </span>
            }
          >
            <Input placeholder="pizza-palace" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input placeholder="123 Main St, Nairobi" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Admin account",
      content: (
        <div className="space-y-6 pt-4">
          <p className="text-sm text-slate-500">
            This person will manage the tenant and receive an invite email.
          </p>

          <Form.Item
            name="admin_name"
            label="Full name *"
            rules={[{ required: true, message: "Admin name is required" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="admin_email"
            label="Email address *"
            rules={[
              { required: true, message: "Required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input type="email" placeholder="admin@pizzapalace.com" />
          </Form.Item>
        </div>
      ),
    },
  ];

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title="Register new tenant"
      subtitle="Set up a business and its first admin"
      width={640}
      footer={
        <div className="flex items-center justify-between w-full">
          <Button onClick={handleClose} disabled={mutation.isPending}>
            Cancel
          </Button>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button onClick={prevStep} disabled={mutation.isPending}>
                Previous
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button type="primary" onClick={nextStep} loading={metaLoading}>
                Next — Admin account →
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={mutation.isPending}
              >
                Create tenant
              </Button>
            )}
          </div>
        </div>
      }
    >
      <Steps
        current={currentStep}
        items={steps.map((s) => ({ title: s.title }))}
        className="mb-8"
      />

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={INITIAL_TENANT_FORM}
      >
        {steps[currentStep].content}
      </Form>
    </Drawer>
  );
};

export default OnboardTenantDrawer;
