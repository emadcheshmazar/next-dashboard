"use client";
import React, { useEffect } from "react";
import LogsModule from "@/app/shared/modules/logs";
import { logLogsPageView } from "@/app/shared/core/logs.helpers";

function LogsPage() {
  useEffect(() => {
    logLogsPageView();
  }, []);

  return <LogsModule />;
}

export default LogsPage;
