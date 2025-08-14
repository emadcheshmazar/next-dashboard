const ROUTES = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
  },

  DASHBOARD: {
    USERS: {
      ROOT: "/users",
      DETAIL: (id: string) => `/users/${id}`,
    },

    LOGS: {
      ROOT: "/logs",
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
