"use client";

import React from "react";
import { Container, Typography, Box } from "@mui/material";
import UsersList from "@/app/shared/modules/Users/components/UsersList";
import { getLocalData } from "@/app/shared/services/storage";
import { storageKeys } from "@/app/shared/services/storage/storageKeys";
import { User } from "@/app/shared/modules/Users/models";

const UsersPage: React.FC = () => {

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
