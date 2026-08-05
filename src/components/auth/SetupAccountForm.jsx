"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Alert, Typography, Result } from "antd";
import { createAcceptInviteHandler } from "@/utils/api//auth/handleAcceptInvite";

const { Title, Text } = Typography;

export default function SetupAccountForm({ inviteId, token }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = createAcceptInviteHandler({
    inviteId,
    token,
    dispatch,
    router,
    form,
    setLoading,
    setServerError,
    setSuccess,
  });

  if (success) {
    return (
      <div className="w-full max-w-md">
        <Result
          status="success"
          title="Account Activated"
          subTitle="Setting up your account, please wait..."
        />
      </div>
    );
  }

   return (
     <div className="w-full max-w-md bg-white p-8 rounded-2xl border shadow-sm">
       <div className="text-center mb-6">
         <Title level={3} style={{ marginBottom: 4 }}>
           Set Up Your Account
         </Title>
         <Text type="secondary">
           Create a password to finish activating your account
         </Text>
       </div>

       {serverError && (
         <Alert
           type="error"
           message={serverError}
           showIcon
           style={{ marginBottom: 20 }}
         />
       )}

       <Form
         form={form}
         layout="vertical"
         onFinish={handleSubmit}
         requiredMark={false}
       >
         <div style={{ display: "flex", gap: 12 }}>
           <Form.Item
             name="firstName"
             label="First name"
             style={{ flex: 1 }}
             rules={[{ required: true, message: "First name is required" }]}
           >
             <Input size="large" />
           </Form.Item>

           <Form.Item
             name="lastName"
             label="Last name"
             style={{ flex: 1 }}
             rules={[{ required: true, message: "Last name is required" }]}
           >
             <Input size="large" />
           </Form.Item>
         </div>

         <Form.Item
           name="password"
           label="Password"
           rules={[
             { required: true, message: "Password is required" },
             { min: 8, message: "Password must be at least 8 characters" },
           ]}
           hasFeedback
         >
           <Input.Password size="large" />
         </Form.Item>

         <Form.Item
           name="confirmPassword"
           label="Confirm password"
           dependencies={["password"]}
           hasFeedback
           rules={[
             { required: true, message: "Please confirm your password" },
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
           <Input.Password size="large" />
         </Form.Item>

         <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
           <Button
             type="primary"
             htmlType="submit"
             size="large"
             block
             loading={loading}
           >
             Activate Account
           </Button>
         </Form.Item>
       </Form>
     </div>
   );

}
