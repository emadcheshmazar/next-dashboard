"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { useIsLogin } from "../shared/services/auth/useIsLogin";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const { isLoggedIn, loading } = useIsLogin();

  React.useEffect(() => {
    if (!loading && isLoggedIn) router.replace("/users");
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
