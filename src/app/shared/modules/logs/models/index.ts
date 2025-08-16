export type LogType =
  | "LOGIN"
  | "LOGOUT"
  | "USERS_VIEW"
  | "USER_DETAIL_VIEW"
  | "LOGS_VIEW";

export interface SystemLog {
  id: string;
  timestamp: string;
  type: LogType;
  userEmail: string;
  description: string;
  pageUrl?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface LogFilters {
  userEmail?: string;
  type?: LogType;
  startDate?: string;
  endDate?: string;
}

export interface LogStats {
  totalLogs: number;
  loginCount: number;
  logoutCount: number;
  userViewCount: number;
  userDetailViewCount: number;
  uniqueUsers: number;
}
