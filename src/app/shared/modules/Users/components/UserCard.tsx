// components/UserCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Skeleton,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import { User } from "../models";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

interface UserCardProps {
  user?: User;
  isLoading?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, isLoading }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: 240,
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: 3 },
        p: 2,
      }}
    >
      <CardContent>
        {isLoading ? (
          <Stack gap={1}>
            <Skeleton variant="circular" width={56} height={56} />
            <Skeleton variant="text" width="60%" height={28} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="70%" height={20} />
            <Skeleton variant="text" width="50%" height={20} />
          </Stack>
        ) : user ? (
          <Stack gap={1}>
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                {user.name[0]}
              </Avatar>
            </Stack>
            <Typography variant="h6">{user.name}</Typography>

            <Stack direction="row" gap={1} alignItems="center">
              <EmailOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Stack>

            {user.company?.name && (
              <Stack direction="row" gap={1} alignItems="center">
                <BusinessOutlinedIcon fontSize="small" color="action" />
                <Chip
                  label={user.company.name}
                  color="secondary"
                  size="small"
                />
              </Stack>
            )}

            {user.address?.city && (
              <Stack direction="row" gap={1} alignItems="center">
                <LocationOnOutlinedIcon fontSize="small" color="action" />
                <Chip label={user.address.city} color="info" size="small" />
              </Stack>
            )}
          </Stack>
        ) : (
          <Typography color="text.secondary">کاربری یافت نشد</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
