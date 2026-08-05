import api from "@/utils/api/axiosInstance";
import { loadSession } from "@/redux/slices/authSlice";
import type { AppDispatch } from "@/redux/store";
import type { FormInstance } from "antd";
import type { useRouter } from "next/navigation";

const ROLE_REDIRECT: Record<string, string> = {
  super_admin: "/dashboard",
  // tenant_admin: "/dashboard",

  tenant_admin: "/portal/dashboard",
  supervisor: "/tenant-admin/dashboard",
  staff: "/tenant-admin/dashboard",
  waiter: "/tenant-admin/dashboard",
  stock_handler: "/tenant-admin/dashboard",
};

interface AcceptInviteValues {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface AcceptInviteDeps {
  inviteId: string | null;
  token: string | null;
  dispatch: AppDispatch;
  router: ReturnType<typeof useRouter>;
  form: FormInstance;
  setLoading: (loading: boolean) => void;
  setServerError: (message: string) => void;
  setSuccess: (success: boolean) => void;
}

const FIELD_NAME_MAP: Record<string, string> = {
  first_name: "firstName",
  last_name: "lastName",
  confirm_password: "confirmPassword",
};

export function createAcceptInviteHandler(deps: AcceptInviteDeps) {
  const {
    inviteId,
    token,
    dispatch,
    router,
    form,
    setLoading,
    setServerError,
    setSuccess,
  } = deps;

  return async function handleAcceptInvite(values: AcceptInviteValues) {
    setServerError("");

    if (!inviteId || !token) {
      setServerError(
        "Missing invite reference. Please use the link from your invite email.",
      );
      return;
    }

    setLoading(true);

    try {
      await api.post("users/auth/invites/accept/", {
        invite_id: inviteId,
        token,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password,
        confirm_password: values.confirmPassword,
      });

      setSuccess(true);

      // Cookies are already set by the response — populate Redux auth
      // state from them, then route to the correct dashboard.
      const sessionResult = await dispatch(loadSession());

      if (loadSession.fulfilled.match(sessionResult)) {
        const role = (sessionResult.payload as { role?: string })?.role;
        router.replace(role && ROLE_REDIRECT[role] ? ROLE_REDIRECT[role] : "/");
      } else {
        // Fallback: account was created, but session population failed for
        // some reason — send them to login rather than leave them stuck.
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err: any) {
      const data = err.response?.data;

      if (data && typeof data === "object") {
        const fieldErrors = Object.entries(data)
          .filter(([key]) =>
            [
              "first_name",
              "last_name",
              "password",
              "confirm_password",
            ].includes(key),
          )
          .map(([key, val]) => ({
            name: FIELD_NAME_MAP[key] ?? key,
            errors: Array.isArray(val) ? val : [val],
          }));

        if (fieldErrors.length) {
          form.setFields(fieldErrors);
        }

        const globalMsg = data.detail || data.non_field_errors || data.message;
        if (globalMsg) {
          setServerError(Array.isArray(globalMsg) ? globalMsg[0] : globalMsg);
        }
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
}
