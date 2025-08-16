import { SxProps, Theme } from "@mui/material"

export const ICON_BTN_SIZES = {
  small: {
    height: "32px",
    width: "32px",
    padding: "8px",
    fontSize: "20px",
    iconSize: "18px",
  },
  medium: {
    height: "42px",
    width: "42px",
    padding: "12px",
    fontSize: "24px",
    iconSize: "24px",
  },
  large: {
    height: "48px",
    width: "48px",
    padding: "12px",
    fontSize: "28px",
    iconSize: "32px",
  },
}

export const ICON_BTN_COLORS = {
  primary: {
    main: "#3768CE",
    hover: "#3058B2",
    text: "#fff",
  },
  secondary: {
    main: "#D15D72",
    hover: "#B94C60",
    text: "#fff",
  },
}

export const getIconBtnStyles = (
  variant: "contained" | "outlined" | "text",
  size: "small" | "medium" | "large",
  color: "primary" | "secondary",
  loading?: boolean,
  theme?: Theme,
  sx?: SxProps<Theme>,
): SxProps<Theme> => {
  const sizeConfig = ICON_BTN_SIZES[size]
  const colorConfig = ICON_BTN_COLORS[color]

  const baseStyles: SxProps<Theme> = {
    height: sizeConfig.height,
    width: sizeConfig.width,
    padding: loading ? (size === "small" ? "6px" : "8px") : sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    flexShrink: 0,
    "& .MuiSvgIcon-root": {
      fontSize: sizeConfig.iconSize,
    },
  }

  if (variant === "contained") {
    return {
      ...baseStyles,
      backgroundColor: colorConfig.main,
      color: colorConfig.text,
      "&:hover": {
        backgroundColor: colorConfig.hover,
      },
      ":disabled": {
        background: "#E0E0E0",
        "& .MuiSvgIcon-root": {
          color: "#fff",
        },
      },
    }
  }

  if (variant === "outlined") {
    return {
      ...baseStyles,
      border: `1px solid ${colorConfig.main}`,
      color: colorConfig.main,
      "&:hover": {
        backgroundColor: color === "primary" ? "#F3F5F9" : "#EBD0D1",
      },
      ":disabled": {
        background: "none" ,
        borderColor: "#E0E0E0",
        "& .MuiSvgIcon-root": {
          color: "#E0E0E0",
        },
      },
    }
  }

  return {
    ...baseStyles,
    ...sx,
  }
}
