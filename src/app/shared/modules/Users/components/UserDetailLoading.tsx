// UserDetailLoading.tsx
"use client";
import React from "react";
import { Stack, Skeleton, Box } from "@mui/material";

const UserDetailLoading = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: "auto" }}>
      <Stack gap={2} alignItems="flex-start">
        <Stack direction="row" gap={2} alignItems="center">
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width={200} height={36} />
        </Stack>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={24} />
        <Skeleton variant="text" width="50%" height={24} />
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Stack>
    </Box>
  );
};

export default UserDetailLoading;
