"use client";
import { Box, Badge, SxProps, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

interface MenuItemProps {
  title: string;
  icon?: React.ReactNode | string;
  isActive?: boolean;
  isSelected?: boolean;
  isSub?: boolean;
  notifCount?: number;
  onClick?: () => void;
  sx?: SxProps;
  isLogout?: boolean;
}

function MenuItem({
  title,
  icon,
  isActive = false,
  isSelected = false,
  notifCount,
  sx,
  isSub = false,
  onClick,
  isLogout,
}: MenuItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        height: isSub ? "36px" : "24px",
        display: "flex",
        alignItems: "center",
        padding: isSub ? "0px 8px 0px 10px" : 0,
        borderRadius: "8px",
        backgroundColor: isSelected ? "#EAF0FB" : "transparent",
        // cursor: onClick ? "pointer" : "default",
        cursor: "pointer",
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "18px",
            height: "18px",
            ml: "8px",
            color: isSelected ? "#2269D5" : isActive ? "#000000" : "#B5B5B5",
          }}
        >
          {typeof icon === "string" ? (
            <Image
              src={icon}
              alt={title}
              width={18}
              height={18}
              style={{
                filter: isSelected
                  ? "brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1200%) hue-rotate(195deg) brightness(90%) contrast(90%)"
                  : isActive
                    ? "brightness(0)"
                    : "brightness(0) saturate(100%) invert(76%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
              }}
            />
          ) : (
            icon
          )}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <Box
          sx={{
            fontSize: "14px",
            fontWeight: isSelected ? 400 : 500,
            color: isLogout
              ? "#F3484F"
              : isSelected
                ? "#2269D5"
                : isActive
                  ? "#000000"
                  : "#B5B5B5",
            ml: "20px",
          }}
        >
          <Typography>{title}</Typography>
        </Box>
        {notifCount !== undefined && (
          <Badge
            badgeContent={notifCount}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#2269D5",
                color: "#FFFFFF",
                fontSize: "12px",
                height: "18px",
                minWidth: "18px",
                padding: "2px 0 0",
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default MenuItem;
