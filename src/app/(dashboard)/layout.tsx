"use client";

import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import SideBar from "../shared/components/composite/SideBar";
import ROUTES from "../shared/routes";
import LoadingPage from "../shared/components/composite/LoadingPage";
import { useRouter, usePathname } from "next/navigation";
import IconBtn from "../shared/components/atomic/IconBtn";
import Image from "next/image";
import { getSidebarStatus, toggleSidebar } from "../shared/core";
import { useIsLogin } from "../shared/services/auth/useIsLogin";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, loading } = useIsLogin();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [loading, isLoggedIn, router]);

  if (loading) return <LoadingPage />;
  if (!isLoggedIn) return null;

  const onMenuClick = () => {
    const isSideBarOpen = getSidebarStatus();
    toggleSidebar(!isSideBarOpen);
  };

  const onBackClick = () => {
    router.push(ROUTES.DASHBOARD.USERS.ROOT);
  };

  const showBackButton = /^\/users\/[^/]+$/.test(pathname);
  return (
    <Grid container direction="column" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          width: "100%",
          height: "59px",
          padding: "16px",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "rgb(246, 245, 245)",
          zIndex: 1000,
          "@media (color-gamut: p3)": {
            bgcolor: "color(display-p3 0.963 0.9608 0.9608)",
          },
        }}
      >
        <IconBtn
          icon={
            <Image
              src="/icons/menuIcon.svg"
              alt="menu"
              width={24}
              height={24}
            />
          }
          onClick={onMenuClick}
          size="medium"
          variant="text"
        />

        {showBackButton && (
          <IconBtn
            icon={
              <Image
                src="/icons/arrowLeftIcon.svg"
                alt="back"
                width={24}
                height={24}
              />
            }
            onClick={onBackClick}
            size="medium"
            variant="text"
          />
        )}
      </Box>

      <Box sx={{ mt: "59px" }}>{children}</Box>
      <SideBar />
    </Grid>
  );
}
