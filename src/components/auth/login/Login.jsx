// src/components/auth/Login.jsx
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/slices/authSlice";
import {
  selectIsAuthenticated,
  selectRole,
  selectAuthLoading,
  selectError,
} from "@/redux/selectors/authSelectors";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ROLE_REDIRECT = {
  super_admin: "/dashboard",

  tenant_admin: "/store/dashboard",
  tenant_manager: "/store/dashboard",
  supervisor: "/tenant-admin/dashboard",
  staff: "/tenant-admin/dashboard",
  waiter: "/tenant-admin/dashboard",
  stock_handler: "/tenant-admin/dashboard",
};

function extractFieldError(serverError, field) {
  if (!serverError) return null;
  const val = serverError[field];
  if (!val) return null;
  return Array.isArray(val) ? val[0] : val;
}

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const isLoading = useSelector(selectAuthLoading);
  const serverError = useSelector(selectError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && role) {
      const pathname = window.location.pathname;
      const isActivationFlow =
        pathname.includes("/activate-account") ||
        pathname.includes("/setup-account");

      if (!isActivationFlow) {
        router.replace(ROLE_REDIRECT[role] ?? "/");
      }
    }
  }, [isAuthenticated, role, router]);

  const emailError = touched.email
    ? extractFieldError(serverError, "email")
    : null;
  const passError = touched.password
    ? extractFieldError(serverError, "password")
    : null;
  const globalError = extractFieldError(serverError, "non_field_errors");

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      const userRole = result.payload.user.role;
      router.replace(ROLE_REDIRECT[userRole] ?? "/");
    }
  }

  const handleActivateAccount = () => {
    router.push("/activate-account");
  };

  const handleNoAccount = () => {
    router.push("/request-invite"); // or wherever your "don't have account" flow goes
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px] shadow-green-500/60" />
          <span className="text-xs font-bold tracking-widest uppercase text-foreground">
            POS
          </span>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Global error */}
        {globalError && (
          <Alert variant="destructive" className="mb-5">
            <AlertDescription>{globalError}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className={
                emailError
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {emailError && (
              <p className="text-xs text-destructive">{emailError}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className={`pr-10 ${passError ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {passError && (
              <p className="text-xs text-destructive">{passError}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        {/* Account Options */}
        <div className="mt-8 space-y-4 text-center text-sm">
          <div>
            <button
              onClick={handleActivateAccount}
              className="text-primary hover:underline font-medium"
            >
              Activate your account
            </button>
            <p className="text-xs text-muted-foreground mt-1">
              Already received an invitation?
            </p>
          </div>

          <div className="text-muted-foreground">or</div>

          <button
            onClick={handleNoAccount}
            className="text-primary hover:underline font-medium"
          >
            I don&apos;t have an account
          </button>
        </div>

        {/* Optional: Forgot Password */}
        {/* <p className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot your password?
          </Link>
        </p> */}
      </div>
    </div>
  );
}
