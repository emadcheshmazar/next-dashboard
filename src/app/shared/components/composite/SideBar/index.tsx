"use client";
import { toggleSidebar } from "@/app/shared/core";
import { Box, Button, Drawer, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSideBar } from "./hook/useSideBar";
import IconBtn from "../../atomic/IconBtn";
import Image from "next/image";
import AccordionMenu from "./components/AccordionMenu";
import { appTree } from "@/app/shared/routes/routes";
// import { findPageByPath, findParentKey } from "@/app/shared/routes/utils";
import { usePathname } from "next/navigation";
import MenuItem from "./components/MenuItem";
import { findPageByPath, findParentKey } from "@/app/shared/routes/utils";
import { getCurrentUser, logoutUser } from "@/app/shared/services/auth";
import Logo from "../../atomic/Logo";
// import { logout } from "@/app/shared/Api/tokenManager";
// import { useAuthUser } from "@/app/shared/hooks/useAuthUser";

function SideBar() {
  const { isSideBarOpen } = useSideBar();
  const pathname = usePathname();
  const activePage = findPageByPath(appTree, pathname);
  const parentKey = activePage
    ? findParentKey(appTree, activePage.key)
    : undefined;

  const user = getCurrentUser();
  console.log(user, "user");

  return (
    <Drawer
      anchor="right"
      open={isSideBarOpen}
      onClose={() => toggleSidebar(false)}
      variant="temporary"
      PaperProps={{
        sx: {
          width: 280,
          borderRadius: "24px 0px 0px 24px",
          padding: "16px 12px 24px 16px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          height: "24px",
        }}
      >
        <IconBtn
          variant="text"
          icon={
            <Image
              src="/icons/close-circle.svg"
              alt="close"
              width={24}
              height={24}
            />
          }
          size="small"
          onClick={() => toggleSidebar(false)}
        />
      </Box>
      <Logo />
      <Typography sx={{ m: "4px 0 8px" }} color="info">
        {user?.email}
      </Typography>
      <AccordionMenu
        data={appTree}
        onItemClick={() => toggleSidebar(false)}
        activeKey={parentKey}
      />
      <Box
        sx={{
          m: "auto 0 0 auto",
          width: "fit-content",
          direction: "rtl",
        }}
        onClick={logoutUser}
        component={Button}
      >
        <MenuItem
          title="خروج از حساب"
          isLogout
          icon={
            <Image
              src={"/icons/logout.svg"}
              alt="logout icon"
              width={18}
              height={18}
            />
          }
        />
      </Box>
    </Drawer>
  );
}

export default SideBar;
