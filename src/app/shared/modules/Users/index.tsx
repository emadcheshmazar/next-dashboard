"use client";

import UsersList from "./components/UsersList";
import { Container, Typography, Box } from "@mui/material";

const UsersModule: React.FC = () => {
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

export default UsersModule;
