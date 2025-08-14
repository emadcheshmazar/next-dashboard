import React from "react"
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  LinearProgress,
} from "@mui/material"
import { ToastInterface } from "../models"
import { motion } from "framer-motion"
import IconBtn from "../../../atomic/IconBtn"
import Image from "next/image"

interface CustomToastProps {
  toast: ToastInterface
  onClose: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  progress: number
  isVisible: boolean
  index: number
}

const CustomToast: React.FC<CustomToastProps> = ({
  toast,
  onClose,
  onMouseEnter,
  onMouseLeave,
  progress,
  isVisible,
  index,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const getVariantColor = (variant: ToastInterface["variant"]) => {
    switch (variant) {
      case "success":
        return "#E1EFE3"
      case "error":
        return "#FFEBEB"
      case "warning":
        return "#FFE8CF"
      case "info":
        return "#DAE3F4"
      default:
        return "#E0E0E0"
    }
  }

  const getProgressColor = (variant: ToastInterface["variant"]) => {
    switch (variant) {
      case "success":
        return "success"
      case "error":
        return "error"
      case "warning":
        return "warning"
      case "info":
        return "info"
      default:
        return "primary"
    }
  }

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        ...(isMobile ? { y: -100 } : { y: 100 }),
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        ...(isMobile ? { y: 100 } : { y: -100 }),
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        layout: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      }}
    >
      <Box
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
          position: "relative",
          minWidth: isMobile ? "90vw" : "300px",
          maxWidth: isMobile ? "90vw" : "400px",
          width: isMobile ? "90vw" : "400px",
          backgroundColor: getVariantColor(toast.variant),
          margin: "0 !important",
          padding: "0 !important",
          borderRadius: "16px",
          overflow: "hidden",
          mb: "16px",
          height: "60px",
          p: "8px 12px 8px 8px !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {toast.showDefaultIcon &&
            !toast.customIcon &&
            ["warning", "success", "error"].includes(toast.variant) && (
              <Image
                src={`/icons/toast/${toast.variant}.svg`}
                width={32}
                height={32}
                alt={`${toast.variant} icon`}
                style={{ marginLeft: "16px" }}
              />
            )}
          {toast.customIcon && (
            <Box
              sx={{
                marginRight: "12px",
              }}
            >
              {toast.customIcon}
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {toast.title && (
              <Typography
                sx={{
                  flex: 1,
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#363636",
                }}
              >
                {toast.title}
              </Typography>
            )}
            {toast.subtitle && (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#5F5F5F",
                  maxWidth: isMobile ? "200px" : "300px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {toast.subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        {toast.closable && (
          <IconBtn
            onClick={onClose}
            variant='text'
            size='small'
            icon={
              <Image
                src='/icons/close.svg'
                width={24}
                height={24}
                alt='close icon'
              />
            }
          />
        )}
        {toast.actions && toast.actions.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              padding: "8px 16px",
              borderTop: "1px solid #eee",
            }}
          >
            {toast.actions.map((action, index) => (
              <Box
                key={index}
                onClick={action.onClick}
                sx={{
                  cursor: "pointer",
                  fontSize: "13px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {action.content}
              </Box>
            ))}
          </Box>
        )}

        {toast.showProgress && (
          <LinearProgress
            variant='determinate'
            sx={{
              position: "absolute",
              width: "100%",
              bottom: 0,
              right: 0,
              borderRadius: "0 0 6px 6px",
            }}
            value={Math.ceil(progress)}
            color={getProgressColor(toast.variant)}
          />
        )}
      </Box>
    </motion.div>
  )
}

export default CustomToast
