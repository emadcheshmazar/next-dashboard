"use client";

import React, { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Chip } from "@mui/material";
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  Visibility as ViewIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import DataTable from "../../../components/composite/DataTable";
import { SystemLog, LogType } from "../models";
import Link from "next/link";

interface LogsTableProps {
  logs: SystemLog[];
  loading?: boolean;
}

const getLogTypeIcon = (type: LogType) => {
  switch (type) {
    case "LOGIN":
      return <LoginIcon color="success" />;
    case "LOGOUT":
      return <LogoutIcon color="error" />;
    case "USERS_VIEW":
    case "USER_DETAIL_VIEW":
    case "LOGS_VIEW":
      return <ViewIcon color="info" />;
    default:
      return <InfoIcon color="inherit" />;
  }
};

const getLogTypeColor = (type: LogType) => {
  switch (type) {
    case "LOGIN":
      return "success";
    case "LOGOUT":
      return "error";
    case "USERS_VIEW":
    case "USER_DETAIL_VIEW":
    case "LOGS_VIEW":
      return "info";
    default:
      return "default";
  }
};

const getLogTypeLabel = (type: LogType) => {
  switch (type) {
    case "LOGIN":
      return "ورود";
    case "LOGOUT":
      return "خروج";
    case "USERS_VIEW":
      return "صفحه مشاهده کاربران";
    case "USER_DETAIL_VIEW":
      return "صفحه جزئیات کاربر";
    case "LOGS_VIEW":
      return "صفحه لاگ‌ها";
    default:
      return type;
  }
};

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

const LogsTable: React.FC<LogsTableProps> = ({ logs, loading = false }) => {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "timestamp",
        headerName: "زمان",
        width: 300,
        renderCell: (params) => (
          <Typography variant="body2" textAlign={"center"} paddingRight={10}>
            {formatDateTime(params.value)}
          </Typography>
        ),
      },
      {
        field: "type",
        headerName: "نوع فعالیت",
        width: 200,
        renderCell: (params) => (
          <Box display="flex" alignItems="center" gap={1}>
            {getLogTypeIcon(params.value)}
            <Chip
              label={getLogTypeLabel(params.value)}
              color={getLogTypeColor(params.value)}
              size="small"
              variant="outlined"
            />
          </Box>
        ),
      },
      {
        field: "userEmail",
        headerName: "نام کاربر",
        width: 150,
        renderCell: (params) => (
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        ),
      },
      {
        field: "description",
        headerName: "توضیحات",
        width: 350,
        renderCell: (params) => (
          <Typography variant="body2" color="text.secondary">
            {params.value}
          </Typography>
        ),
      },
      {
        field: "pageUrl",
        headerName: "صفحه",
        width: 200,
        renderCell: (params) => (
          <Link href={params.value || "#"}>
            <Typography variant="body2" color="text.secondary" noWrap>
              {params.value || "نامشخص"}
            </Typography>
          </Link>
        ),
      },
    ],
    []
  );

  const rows = useMemo(() => {
    return logs.map((log) => ({
      id: log.id,
      timestamp: log.timestamp,
      type: log.type,
      userEmail: log.userEmail,
      description: log.description,
      pageUrl: log.pageUrl,
    }));
  }, [logs]);

  return (
    <Box sx={{ width: "100%", height: "600px" }}>
      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        title="لاگ‌های سیستم"
      />
    </Box>
  );
};

export default LogsTable;
