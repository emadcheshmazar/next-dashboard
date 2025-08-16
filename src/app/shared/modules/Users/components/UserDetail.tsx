"use client";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Chip,
  Divider,
  Link,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import useGetUserByIdApi from "../hooks/useGetUserByIdApi";
import UserDetailLoading from "./UserDetailLoading";

const UserDetail = ({ userId }: { userId: number }) => {
  const { user, isLoading, error } = useGetUserByIdApi({ userId });

  if (isLoading) return <UserDetailLoading />;
  if (error)
    return (
      <Typography color="error" textAlign="center">
        خطا: {error.message}
      </Typography>
    );
  if (!user) return null;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: "auto" }}>
      <Stack gap={4}>
        <Stack direction="row" gap={3} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 100,
              height: 100,
              fontSize: 36,
            }}
          >
            {user.name[0]}
          </Avatar>
          <Stack gap={0.5}>
            <Typography variant="h4" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              نام کاربری: @{user.username}
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack gap={2}>
          <Stack direction="row" gap={1.5} alignItems="center">
            <EmailOutlinedIcon color="primary" />
            <Typography>ایمیل: {user.email}</Typography>
          </Stack>
          <Stack direction="row" gap={1.5} alignItems="center">
            <PhoneOutlinedIcon color="primary" />
            <Typography>تلفن: {user.phone}</Typography>
          </Stack>
          <Stack direction="row" gap={1.5} alignItems="center">
            <LanguageOutlinedIcon color="primary" />
            <Link
              href={`https://${user.website}`}
              target="_blank"
              underline="hover"
              sx={{
                fontWeight: 500,
                "&:hover": { color: "primary.dark" },
              }}
            >
              وب‌سایت: {user.website}
            </Link>
          </Stack>
        </Stack>

        <Divider />

        <Stack gap={1}>
          <Stack direction="row" gap={1.5} alignItems="center">
            <LocationOnOutlinedIcon color="secondary" />
            <Typography>
              آدرس: {user.address.suite}, {user.address.street},{" "}
              {user.address.city}, {user.address.zipcode}
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            مختصات: {user.address.geo.lat}, {user.address.geo.lng}
          </Typography>
        </Stack>

        <Divider />

        <Stack gap={1}>
          <Stack direction="row" gap={1.5} alignItems="center">
            <BusinessOutlinedIcon color="secondary" />
            <Chip
              label={user.company.name}
              color="secondary"
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: "secondary.light",
                "&:hover": { bgcolor: "secondary.main", color: "#fff" },
              }}
            />
          </Stack>
          <Typography variant="body1" fontWeight={500}>
            شعار شرکت: {user.company.catchPhrase}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            حوزه فعالیت: {user.company.bs}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserDetail;
