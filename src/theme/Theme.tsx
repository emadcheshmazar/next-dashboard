import { ThemeOptions } from "@mui/material/styles";
import { kalameh } from "./fonts";

declare module "@mui/material/styles" {
  interface TypeBackground {
    customBg?: string;
  }
  interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
    negative: string;
  }
}

const lightPalette: ThemeOptions["palette"] = {
  mode: "light",
};

const darkPalette: ThemeOptions["palette"] = {
  mode: "dark",
};

const commonTheme: Omit<ThemeOptions, "palette"> = {
  typography: {
    fontFamily: kalameh.style.fontFamily,
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {},
};

export const getTheme = (mode: "light" | "dark"): ThemeOptions => ({
  ...commonTheme,
  palette: mode === "light" ? lightPalette : darkPalette,
});
