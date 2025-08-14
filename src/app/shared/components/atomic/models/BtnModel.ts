import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export interface BtnProps {
  type?: "button" | "submit" | "reset";
  variant?: "contained" | "outlined" | "text";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label: string;
  sx?: SxProps<Theme>;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: (arg?: unknown) => void;
  href?: string;
  loading?: boolean;
  disableRipple?: boolean;
  underline?: boolean;
}
