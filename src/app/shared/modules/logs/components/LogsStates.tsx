"use client";

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  Timeline as TimelineIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Visibility as ViewIcon,
  Person,
} from "@mui/icons-material";
import LogStateCard from "./LogStateCard";
import { getLogStates } from "@/app/shared/core/logs.helpers";

const LogsStates = () => {
  const stats = getLogStates();
  return (
    <Box mb={3}>
      <Typography variant="h6" mb={2} fontWeight="medium">
        آمار کلی لاگ‌ها
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <LogStateCard
            title="تعداد کل لاگ‌ها"
            value={stats.totalLogs}
            icon={<TimelineIcon />}
            color="primary"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <LogStateCard
            title="تعداد کل ورودها"
            value={stats.loginCount}
            icon={<LoginIcon />}
            color="success"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <LogStateCard
            title="تعداد کل خروج‌ها"
            value={stats.logoutCount}
            icon={<LogoutIcon />}
            color="error"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <LogStateCard
            title="تعداد کل مشاهده صفحه‌ی کاربران"
            value={stats.usersViewCount}
            icon={<ViewIcon />}
            color="info"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <LogStateCard
            title="تعداد کل مشاهده صفحه‌ی جزئیات کاربر"
            value={stats.userDetailViewCount}
            icon={<ViewIcon />}
            color="secondary"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <LogStateCard
            title="تعداد کاربران منحصر به فرد:"
            value={stats.uniqueUsers}
            icon={<Person />}
            color="info"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogsStates;
