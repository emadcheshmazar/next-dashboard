"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import useGetUsersApi from "../hooks/useGetUsersApi";
import Pagination from "@/app/shared/components/Pagination";

const UsersList: React.FC = () => {
  const { currentPageUsers, paginationInfo, goToPage, isLoading, error } =
    useGetUsersApi({
      initialPage: 1,
      initialLimit: 6,
      onSuccess: (data) => console.log("Users loaded:", data),
      onFail: (error) => console.error("Failed to load users:", error),
      cacheTime: 5 * 60 * 1000,
      staleTime: 3 * 60 * 1000,
    });

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error">خطا در بارگذاری کاربران</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : currentPageUsers && currentPageUsers.length > 0 ? (
          currentPageUsers.map((user) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={user.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.address.city}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="error">کاربری یافت نشد</Typography>
          </Box>
        )}
      </Grid>

      {paginationInfo && (
        <Box sx={{ mt: 4 }}>
          <Pagination
            currentPage={paginationInfo.currentPage}
            totalPages={paginationInfo.totalPages}
            totalItems={paginationInfo.total}
            onPageChange={goToPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default UsersList;
