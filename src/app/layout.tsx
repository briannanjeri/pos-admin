
import AppProvider from "../providers/ReduxProvider";
import ReduxProvider from "../providers/ReduxProvider";
import { QueryProvider } from "../providers/ReduxProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lounge Admin",
  description: "Lounge Management System",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
