'use client'
import { Button, Typography, useTheme } from "@mui/material"
import Link from "next/link"
import Spinner from "../loader"
import { getBtnStyles, getTypographyStyles } from "./BtnConfig"
import { BtnProps } from "../models/BtnModel"

export default function Btn({
  type = "button",
  variant = "contained",
  startIcon,
  endIcon,
  label,
  sx,
  size = "medium",
  color = "primary",
  disabled,
  loading = false,
  onClick,
  href,
  disableRipple = false,
  underline = false,
}: BtnProps) {
  const theme = useTheme()
  const buttonContent = (
    <Button
      type={type}
      variant={variant}
      color={color}
      disabled={disabled || loading}
      disableRipple={disableRipple}
      sx={getBtnStyles(size, variant, color, loading, theme, sx)}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      onClick={href ? undefined : onClick}
    >
      {loading ? (
        <Spinner variant={variant} size={size} />
      ) : (
        <Typography
          sx={getTypographyStyles(
            size,
            !!startIcon || !!endIcon,
            underline,
            variant,
          )}
        >
          {label}
        </Typography>
      )}
    </Button>
  )

  return href ? (
    <Link href={href} passHref legacyBehavior>
      <a style={{ textDecoration: "none" }}>{buttonContent}</a>
    </Link>
  ) : (
    buttonContent
  )
}
