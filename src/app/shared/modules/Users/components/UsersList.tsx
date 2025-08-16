"use client";

import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import useGetUsersApi from "../hooks/useGetUsersApi";
import Pagination from "@/app/shared/components/Pagination";
import UserCard from "./UserCard";
import Link from "next/link";
import ROUTES from "@/app/shared/routes";

const UsersList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!searchParams.get("page") || initialPage < 1) {
      router.replace(`?page=1`, { scroll: false });
    }
  }, [initialPage, router, searchParams]);

  const { currentPageUsers, paginationInfo, goToPage, isLoading, error } =
    useGetUsersApi({
      initialPage,
      initialLimit: 6,
      cacheTime: 5 * 60 * 1000,
      staleTime: 3 * 60 * 1000,
    });

  const handlePageChange = (page: number) => {
    goToPage(page);
    router.push(`?page=${page}`, { scroll: false });
  };

  const skeletonArray = Array.from({ length: 6 });

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>خطا در بارگذاری کاربران</Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {isLoading
          ? skeletonArray.map((_, idx) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={idx}>
                <UserCard isLoading />
              </Grid>
            ))
          : currentPageUsers?.map((user) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={user.id}>
                <Link href={ROUTES.DASHBOARD.USERS.DETAIL(String(user.id))}>
                  <UserCard user={user} />
                </Link>
              </Grid>
            ))}
      </Grid>

      {paginationInfo && (
        <Box sx={{ mt: 4 }}>
          <Pagination
            currentPage={paginationInfo.currentPage}
            totalPages={paginationInfo.totalPages}
            totalItems={paginationInfo.total}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default UsersList;
