"use client";
// src/app/(main)/layout.jsx
import NavShell from "../../../../components/nav-shell/nav-shell";
import { superAdminNav } from "@/components/config/navConfig";

export default function MainLayout({ children }) {
  return <NavShell navConfig={superAdminNav}>{children}</NavShell>;
}
