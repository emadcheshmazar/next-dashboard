"use client"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { ToastInterface } from "./models"
import CustomToast from "./components/CustomToast"
import { useToast } from "./hooks/useToast"
import useResponsive from "../../../hooks/useResponsive"
import { AnimatePresence } from "framer-motion"

const Toast: React.FC = () => {
  const toasts = useSelector(
    (state: RootState) => state.withoutPersist.toast.toasts,
  )
  const isMobile = useResponsive()

  return (
    <div
      style={{
        position: "fixed",
        right: isMobile ? "5vw" : "16px",
        bottom: isMobile ? "auto" : "16px",
        top: isMobile ? "4vw" : "auto",
        zIndex: 9999,
        display: "flex",
        flexDirection: isMobile ? "column-reverse" : "column",
        gap: "8px",
      }}
    >
      <AnimatePresence mode='popLayout'>
        {toasts.map((toast, index) => (
          <ToastItem key={toast.id} toast={toast} index={index} />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface ToastItemProps {
  toast: ToastInterface
  index: number
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, index }) => {
  const { percentage, isVisible, handlePause, handleResume, handleClose } =
    useToast(toast)

  return (
    <CustomToast
      toast={toast}
      onClose={handleClose}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      progress={percentage}
      isVisible={isVisible}
      index={index}
    />
  )
}

export default Toast
