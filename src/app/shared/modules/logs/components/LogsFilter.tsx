"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { LogFilters, LogType } from "../models";
import { ElementTypes } from "@/app/shared/components/elements/models";
import { removeElementHelperText } from "@/app/shared/core/elements.helpers";
import { useElementValue } from "@/app/shared/redux/hooks/useElementValue";
import SelectBoxInput from "@/app/shared/components/elements/SelectBoxInput";
import TextBoxInput from "@/app/shared/components/elements/TextBoxInput";

interface LogsFilterProps {
  onFilterChange: (filters: LogFilters) => void;
  onClearFilters: () => void;
}

const LogsFilter: React.FC<LogsFilterProps> = ({
  onFilterChange,
  onClearFilters,
}) => {
  const formName = "logsFilterForm";
  const typeValue = useElementValue({
    formName,
    name: "type",
  }) as string;
  const userEmailValue = useElementValue({
    formName,
    name: "userEmail",
  }) as string;

  useEffect(() => {
    const filters: LogFilters = {
      userEmail: userEmailValue,
      type: typeValue === "all" ? undefined : (typeValue as LogType),
    };
    onFilterChange(filters);
  }, [typeValue, userEmailValue]);

  const handleClear = () => {
    ["userEmail", "type", "startDate", "endDate"].forEach((name) =>
      removeElementHelperText({ formName, name })
    );
    onClearFilters();
  };

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
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SelectBoxInput
            config={{
              formName,
              name: "type",
              caption: "نوع فعالیت",
              type: ElementTypes.Select,
              options: [
                { id: "all", label: "همه", value: "all" },
                { id: "LOGIN", label: "ورود", value: "LOGIN" },
                { id: "LOGOUT", label: "خروج", value: "LOGOUT" },
                {
                  id: "USERS_VIEW",
                  label: "مشاهده صفحه کاربران",
                  value: "USERS_VIEW",
                },
                {
                  id: "USER_DETAIL_VIEW",
                  label: "مشاهده جزئیات کاربر",
                  value: "USER_DETAIL_VIEW",
                },
                {
                  id: "LOGS_VIEW",
                  label: "مشاهده صفحه لاگ‌ها",
                  value: "LOGS_VIEW",
                },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <TextBoxInput
            config={{
              formName,
              name: "userEmail",
              type: ElementTypes.Text,
              caption: "شناسه کاربر",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogsFilter;
