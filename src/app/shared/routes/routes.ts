export type PageNode = {
  key: string;
  title: string;
  path?: string;
  icon?: string;
  children?: PageNode[];
};

export const pagesTree: PageNode[] = [
  {
    key: "AUTH",
    title: "ورود / ثبت‌نام",
    children: [
      { key: "REGISTER", title: "ثبت‌نام", path: "/register" },
      { key: "LOGIN", title: "ورود", path: "/login" },
    ],
  },
  {
    key: "DASHBOARD",
    title: "داشبورد",
    children: [
      { key: "USERS", title: "کاربران", path: "/dashboard/users" },
      { key: "LOGS", title: "لاگ‌ها", path: "/dashboard/logs" },
    ],
  },
];

export const appTree: PageNode[] = [
  {
    key: "DASHBOARD",
    title: "داشبورد",
    children: [
      { key: "USERS", title: "کاربران", path: "/users" },
      { key: "LOGS", title: "لاگ‌ها", path: "/logs" },
    ],
  },
];
