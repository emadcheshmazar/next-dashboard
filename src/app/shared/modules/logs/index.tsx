"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Alert, Button } from "@mui/material";
import { DeleteSweep as ClearIcon } from "@mui/icons-material";
import LogsStats from "./components/LogsStates";
import LogsFilter from "./components/LogsFilter";
import LogsTable from "./components/LogsTable";
import { LogFilters } from "./models";
import { deleteAllLogs, filterLogs, getLogs } from "../../core/logs.helpers";
import { useLogsStates } from "../../redux/hooks/useGlobalState";
import Btn from "../../components/atomic/Btn";

const LogsModule: React.FC = () => {
  const logs = useLogsStates();
  const [filteredLogs, setFilteredLogs] = useState(getLogs());

  useEffect(() => {
    setFilteredLogs(filterLogs({}));
  }, [logs]);

  const handleFilterChange = (filters: LogFilters) => {
    setFilteredLogs(filterLogs(filters));
  };

  const handleClearFilters = () => {
    setFilteredLogs(getLogs());
  };

  const handleClearLogs = () => {
    if (window.confirm("آیا از پاک کردن تمام لاگ‌ها اطمینان دارید؟")) {
      deleteAllLogs();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          لاگ‌های سیستم
        </Typography>

        <Btn
          label="پاک کردن همه لاگ‌ها"
          variant="outlined"
          endIcon={<ClearIcon />}
          onClick={handleClearLogs}
          disabled={logs.length === 0}
          color="secondary"
          sx={{ width: "fit-content" }}
        />
      </Box>

      {logs.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          هیچ لاگی برای نمایش وجود ندارد. فعالیت‌های کاربران در اینجا ثبت خواهد
          شد.
        </Alert>
      ) : (
        <LogsStats />
      )}

      <LogsFilter
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <LogsTable logs={filteredLogs} loading={false} />
    </Box>
  );
};

export default LogsModule;
