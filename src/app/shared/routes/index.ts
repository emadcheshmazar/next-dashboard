const ROUTES = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
  },

  DASHBOARD: {
    ROOT: "/dashboard",

    USERS: {
      ROOT: "/dashboard/users",
      DETAIL: (id: string) => `/dashboard/users/${id}`, 
    },

    LOGS: {
      ROOT: "/dashboard/logs",
    },
  },
} as const;

type RoutesType = typeof ROUTES;

type ExtractRoute<T> = T extends string
  ? string
  : T extends (...args: unknown[]) => string
    ? ReturnType<T>
    : { [K in keyof T]: ExtractRoute<T[K]> };

export type AppRoutes = ExtractRoute<RoutesType>;

export default ROUTES;
