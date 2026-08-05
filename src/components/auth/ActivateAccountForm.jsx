"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Form, Input, Button, Alert, Typography, Result, Spin } from "antd";
import api from "@/utils/api/axiosInstance";

const { Title, Text } = Typography;

export default function ActivateAccountForm({ token }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [invite, setInvite] = useState(null);
  const [error, setError] = useState("");
  const [isExistingAccount, setIsExistingAccount] = useState(false);
  const [step, setStep] = useState(token ? "checking" : "search");

  const tokenFromUrl = token || params.token || searchParams.get("token");

  useEffect(() => {
    if (!tokenFromUrl) {
      setStep("search");
      return;
    }

    let cancelled = false;

    const validateByToken = async () => {
      setStep("checking");
      setError("");
      setIsExistingAccount(false);

      try {
        const res = await api.get(
          `users/auth/invites/validate/?${new URLSearchParams({
            token: tokenFromUrl,
          }).toString()}`,
        );

        if (cancelled) return;

        if (res.data.invite) {
          setInvite(res.data.invite);
          setStep("found");
        } else {
          setError(res.data.message || "This invite link is invalid.");
          setStep("invalid");
        }
      } catch (err) {
        if (cancelled) return;
        const message =
          err.response?.data?.message ||
          "This invite link has expired or is invalid.";
        setError(message);
        setStep("invalid");
      }
    };

    validateByToken();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenFromUrl]);
      console.log("invite", invite);

  const handleSearch = async (values) => {
    setLoading(true);
    setError("");
    setIsExistingAccount(false);

    try {
      const paramsObj = new URLSearchParams({ email: values.email });
      if (tokenFromUrl) paramsObj.append("token", tokenFromUrl);

      const res = await api.get(
        `users/auth/invites/validate/?${paramsObj.toString()}`,
      );

      if (res.data.invite) {
        setInvite(res.data.invite);
        setStep("found");
      } else {
        setError(res.data.message || "No matching invite found.");
      }
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(message);

      // 409 = existing account conflict, per the invite-creation validation
      if (status === 409) {
        setIsExistingAccount(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = () => {
    if (invite) {
      console.log('invite',invite)
      router.push(
        `/setup-account?inviteId=${invite.invite_id}${tokenFromUrl ? `&token=${tokenFromUrl}` : ""}`,
      );
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <Title level={3} style={{ marginBottom: 4 }}>
          Activate Account
        </Title>
        <Text type="secondary">
          {step === "checking"
            ? "Checking your invite..."
            : "Find your invite to get started"}
        </Text>
      </div>

      {step === "checking" && (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      )}

      {step === "invalid" && (
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <Result
            status="error"
            title="Invite Link Not Valid"
            subTitle={error}
          />
          <Button
            type="primary"
            size="large"
            block
            onClick={() => setStep("search")}
          >
            Find My Invite by Email
          </Button>
        </div>
      )}

      {step === "search" && (
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          {error && (
            <Alert
              type="error"
              message={error}
              showIcon
              style={{ marginBottom: 20 }}
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSearch}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email address" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input size="large" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                Find My Invite
              </Button>
            </Form.Item>
          </Form>

          {isExistingAccount && (
            <div className="text-center mt-4">
              <Button
                type="link"
                onClick={() => router.push("/login")}
                style={{ padding: 0 }}
              >
                Go to login
              </Button>
            </div>
          )}
        </div>
      )}

      {step === "found" && invite && (
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <Result
            status="success"
            title="Invite Found"
            subTitle={
              <>
                You've been invited to join{" "}
                <strong>{invite.tenant_name}</strong> as a{" "}
                <strong>{invite.role}</strong>
              </>
            }
          />
          <Button type="primary" size="large" block onClick={handleActivate}>
            Activate My Account
          </Button>
        </div>
      )}
    </div>
  );
}
