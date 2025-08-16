"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { LogFilters } from "../models";

interface LogsFilterProps {
  onFilterChange: (filters: LogFilters) => void;
  onClearFilters: () => void;
}

const LogsFilter: React.FC<LogsFilterProps> = ({
  onFilterChange,
  onClearFilters,
}) => {
  const [filters, setFilters] = useState<LogFilters>({});

  const handleFilterChange = (
    key: keyof LogFilters,
    value: string | undefined
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ""
  );

  return (
    <Box sx={{ p: 2, mb: 3 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <FilterIcon color="primary" />
          <Typography variant="h6" fontWeight="medium">
            فیلتر لاگ‌ها
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          {hasActiveFilters && (
            <Tooltip title="پاک کردن فیلترها">
              <IconButton onClick={handleClearFilters} color="error">
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <TextField
            fullWidth
            label="شناسه کاربر"
            value={filters.userEmail || ""}
            onChange={(e) =>
              handleFilterChange("userEmail", e.target.value || undefined)
            }
            size="small"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>نوع فعالیت</InputLabel>
            <Select
              value={filters.type || ""}
              label="نوع فعالیت"
              onChange={(e) =>
                handleFilterChange("type", e.target.value || undefined)
              }
            >
              <MenuItem value="">همه</MenuItem>
              <MenuItem value="LOGIN">ورود</MenuItem>
              <MenuItem value="LOGOUT">خروج</MenuItem>
              <MenuItem value="USERS_VIEW">مشاهده صفحه کاربران</MenuItem>
              <MenuItem value="USER_DETAIL_VIEW">
                شاهده صفحه جزئیات کاربر
              </MenuItem>
              <MenuItem value="LOGS_VIEW">مشاهده صفحه لاگ‌ها</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogsFilter;
