"use client";

import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import UsersList from "@/app/shared/modules/Users/components/UsersList";

import { logUserPageView } from "@/app/shared/core/logs.helpers";

const UsersPage: React.FC = () => {
  useEffect(() => {
    logUserPageView();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          لیست کاربران
        </Typography>

        <UsersList />
      </Box>
    </Container>
  );
};

export default UsersPage;
