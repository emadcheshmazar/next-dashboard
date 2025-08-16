import AppReduxStore from "../redux/store";
import { addLog, clearLogs, removeLogById } from "../redux/slices/logsSlice";
import { LogType, SystemLog } from "../modules/logs/models";

export const getLogs = () => {
  return AppReduxStore.getState().withPersist.logsData.logs;
};

export const createLog = (args: {
  type: LogType;
  description: string;
  pageUrl?: string;
}) => {
  AppReduxStore.dispatch(addLog(args));
};

export const deleteLog = (id: string) => {
  AppReduxStore.dispatch(removeLogById(id));
};

export const deleteAllLogs = () => {
  AppReduxStore.dispatch(clearLogs());
};

export const filterLogs = (filters: {
  userEmail?: string;
  type?: LogType;
}): SystemLog[] => {
  const logs = getLogs();

  return logs.filter((log) => {
    if (filters.userEmail && !log.userEmail.includes(filters.userEmail))
      return false;
    if (filters.type && log.type !== filters.type) return false;

    return true;
  });
};

export const getLogStates = () => {
  const logs = getLogs();

  const stats = {
    totalLogs: logs.length,
    loginCount: logs.filter((l) => l.type === "LOGIN").length,
    logoutCount: logs.filter((l) => l.type === "LOGOUT").length,
    usersViewCount: logs.filter((l) => l.type === "USERS_VIEW").length,
    userDetailViewCount: logs.filter((l) => l.type === "USER_DETAIL_VIEW")
      .length,
    logsViewCount: logs.filter((l) => l.type === "LOGS_VIEW").length,
    uniqueUsers: new Set(logs.map((l) => l.userEmail)).size,
  };

  return stats;
};

export const logLogin = () => {
  createLog({
    type: "LOGIN",
    description: "کاربر وارد سیستم شد",
  });
};

export const logLogout = () => {
  createLog({
    type: "LOGOUT",
    description: "کاربر از سیستم خارج شد",
  });
};

export const logUserPageView = () => {
  createLog({
    type: "USERS_VIEW",
    description: "کاربر صفحه کاربران را مشاهده کرد",
  });
};

export const logUserDetailPageView = (targetUserName: string) => {
  createLog({
    type: "USER_DETAIL_VIEW",
    description: `کاربر جزئیات کاربر ${targetUserName} را مشاهده کرد`,
  });
};

export const logLogsPageView = () => {
  createLog({
    type: "LOGS_VIEW",
    description: "کاربر صفحه لاگ‌ها را مشاهده کرد",
  });
};
