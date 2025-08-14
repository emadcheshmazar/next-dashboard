import { SxProps, Theme } from "@mui/material"

export interface BtnSizeConfig {
  height: string
  padding: string
  fontSize: string
}

export const btnSizeConfigs: Record<string, BtnSizeConfig> = {
  small: {
    height: "36px",
    padding: "5px 8px",
    fontSize: "12px",
  },
  medium: {
    height: "42px",
    padding: "10px 12px",
    fontSize: "14px",
  },
  large: {
    height: "48px",
    padding: "10px 12px",
    fontSize: "16px",
  },
}

export const getBtnStyles = (
  size: "small" | "medium" | "large",
  variant: "contained" | "outlined" | "text",
  color: "primary" | "secondary",
  loading: boolean,
  theme: Theme,
  sx?: SxProps<Theme>,
): SxProps<Theme> => ({
  alignItems: "center",
  height: btnSizeConfigs[size].height,
  padding: btnSizeConfigs[size].padding,
  fontSize: btnSizeConfigs[size].fontSize,
  display: "flex",
  width: "100%",
  textTransform: "none",
  "&:hover": {
    backgroundColor: variant === "text" ? "transparent" : undefined,
    textDecoration: variant === "text" ? "underline" : "none",
  },
  ...sx,
})

export const getTypographyStyles = (
  size: "small" | "medium" | "large",
  icon: boolean,
  underline: boolean,
  variant: "contained" | "outlined" | "text",
): SxProps<Theme> => ({
  textDecoration: underline ? "underline" : "none",
  // pt: icon ? "5px" : "0px",
  fontSize: size === "large" ? "16px" : size === "medium" ? "14px" : "12px",
})
