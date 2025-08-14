"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import UserDetail from "@/app/shared/modules/Users/components/UserDetail";

const UserDetailPage = () => {
  const params = useParams();
  const userId = params.userId;
  if (!userId) {
    return null;
  }
  return <UserDetail userId={Number(userId)} />;
};

export default UserDetailPage;
