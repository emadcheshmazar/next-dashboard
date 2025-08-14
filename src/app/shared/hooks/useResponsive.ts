"use client"
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material"

function useResponsive(size?: Breakpoint) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(size ?? "md"))
  return isMobile
}

export default useResponsive
