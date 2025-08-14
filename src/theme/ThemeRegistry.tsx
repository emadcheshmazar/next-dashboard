"use client";
import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import { ReactNode } from "react";
import { getTheme } from "./Theme";

type ThemeRegistryProps = {
  children: ReactNode;
  themeOptions?: ThemeOptions;
};

export default function ThemeRegistry({
  children,
  themeOptions,
}: ThemeRegistryProps) {
  const theme = createTheme({
    ...getTheme("light"),
    ...themeOptions,
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
