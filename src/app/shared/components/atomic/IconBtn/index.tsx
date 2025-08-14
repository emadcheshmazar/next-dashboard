import { IconButton, SxProps, Theme, useTheme } from "@mui/material"
import { ReactNode } from "react"
import Link from "next/link"
import Spinner from "../loader"
import { getIconBtnStyles } from "./iconBtn.config"

interface IconBtnProps {
  type?: "button" | "submit" | "reset"
  variant?: "contained" | "outlined" | "text"
  icon: ReactNode
  sx?: SxProps<Theme>
  size?: "small" | "medium" | "large"
  color?: "primary" | "secondary"
  disabled?: boolean
  loading?: boolean
  onClick?: (arg?: unknown) => void
  href?: string
}

export default function IconBtn({
  type = "button",
  variant = "contained",
  icon,
  sx,
  size = "medium",
  color = "primary",
  disabled,
  loading,
  onClick,
  href,
}: IconBtnProps) {
  const theme = useTheme()

  const buttonContent = (
    <IconButton
      type={type}
      color={color}
      disabled={disabled || loading}
      onClick={href ? undefined : onClick}
      sx={{
        ...getIconBtnStyles(variant, size, color, loading, theme, sx),
      }}
    >
      {loading ? <Spinner variant={variant} size={size} /> : icon}
    </IconButton>
  )

  return href ? (
    <Link href={href} passHref legacyBehavior>
      <a style={{ textDecoration: "none" }}>{buttonContent}</a>
    </Link>
  ) : (
    buttonContent
  )
}
