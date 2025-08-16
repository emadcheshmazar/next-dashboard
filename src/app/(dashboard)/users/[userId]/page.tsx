"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import UserDetail from "@/app/shared/modules/Users/components/UserDetail";
import { logUserDetailPageView } from "@/app/shared/core/logs.helpers";

const UserDetailPage = () => {
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    if (userId) {
      logUserDetailPageView(String(userId));
    }
  }, [userId]);

  if (!userId) {
    return null;
  }
  return <UserDetail userId={Number(userId)} />;
};

export default UserDetailPage;
