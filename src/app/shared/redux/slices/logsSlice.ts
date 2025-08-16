import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../services/auth";
import { LogType, SystemLog } from "../../modules/logs/models";

interface LogState {
  logs: SystemLog[];
}

const initialState: LogState = {
  logs: [],
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    addLog: (
      state,
      action: PayloadAction<{
        type: LogType;
        description: string;
        pageUrl?: string;
      }>
    ) => {
      const currentUser = getCurrentUser();

      const newLog: SystemLog = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        type: action.payload.type,
        userEmail: currentUser?.email ?? "unknown",
        description: action.payload.description,
        pageUrl: action.payload.pageUrl || window.location.pathname,
      };

      state.logs.unshift(newLog);
    },
    clearLogs: (state) => {
      state.logs = [];
    },
    removeLogById: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter((log) => log.id !== action.payload);
    },
  },
});

export const { addLog, clearLogs, removeLogById } = logSlice.actions;
export default logSlice.reducer;
