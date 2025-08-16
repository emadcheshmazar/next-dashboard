import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./shared/redux/provider";
import ThemeProvider from "@/theme/ThemeProvider";
import QueryProvider from "./shared/providers/QueryProvider";
import Toast from "./shared/components/composite/Toast";

export const metadata: Metadata = {
  title: "next dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <ReduxProvider>
          <QueryProvider>
            <ThemeProvider>
              {children}
              <Toast />
            </ThemeProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
