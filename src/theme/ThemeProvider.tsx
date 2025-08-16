"use client"
import { ReactNode } from "react"
import EmotionCacheProvider from "@/theme/EmotionCacheProvider"
import ThemeRegistry from "./ThemeRegistry"

type Props = {
  children: ReactNode
}

const ThemeProvider = ({ children }: Props) => {
  return (
    <EmotionCacheProvider options={{ key: "mui" }}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </EmotionCacheProvider>
  )
}

export default ThemeProvider
