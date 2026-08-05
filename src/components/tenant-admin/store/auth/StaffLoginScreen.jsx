"use client";

import { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { getPublicStaffList,staffLogin } from "@/utils/api/store/staffApi";
import { useRouter } from "next/navigation";

const StaffLoginScreen = ({ tenantId }) => {
  const [staffList, setStaffList] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 useEffect(() => {
   if (!tenantId) return;
   getPublicStaffList(tenantId).then((data) => {
     setStaffList(Array.isArray(data) ? data : []);
   });
 }, [tenantId]);
console.log("selectedUsername", selectedUsername);


 const handleLogin = async () => {
   setLoading(true);
   try {
     const data = await staffLogin({ username: selectedUsername, password });
     message.success(`Welcome, ${data.username}`);
     router.push("/store/pos");
   } catch (err) {
     const serverMessage =
       err?.response?.data?.detail ||
       err?.response?.data?.non_field_errors?.[0] ||
       "Login failed. Please try again.";
     message.error(serverMessage);
     console.error("Staff login error:", err?.response?.data);
   } finally {
     setLoading(false);
   }
 };

  if (!selectedUsername) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Who's clocking in?
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {staffList.map(({ username }) => (
            <button
              key={username}
              onClick={() => setSelectedUsername(username)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                {username.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {username}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-lg font-semibold text-slate-900">
        {selectedUsername}
      </h2>
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onPressEnter={handleLogin}
        className="w-64 text-center text-lg"
        autoFocus
      />
      <Button
        type="primary"
        size="large"
        onClick={handleLogin}
        loading={loading}
      >
        Log In
      </Button>
      <button
        onClick={() => setSelectedUsername(null)}
        className="text-xs text-slate-400 hover:text-slate-600"
      >
        Not you? Go back
      </button>
    </div>
  );
};

export default StaffLoginScreen;
