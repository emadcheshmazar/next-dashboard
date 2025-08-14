import { useState, useRef, useEffect } from "react"
import { ToastInterface } from "../models"
import { hideToast } from "../../../../core"

export const useToast = (toast: ToastInterface) => {
  const [percentage, setPercentage] = useState(100)
  const [isVisible, setIsVisible] = useState(true)
  const [isProgressComplete, setIsProgressComplete] = useState(false)
  const totalDuration = useRef(toast.duration || 5000)
  const startTime = useRef(Date.now())
  const isPaused = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updatePercentage = () => {
    if (isPaused.current) return

    const elapsed = Date.now() - startTime.current
    const remaining = Math.max(totalDuration.current - elapsed, 0)
    const newPercentage = (remaining / totalDuration.current) * 100

    setPercentage(newPercentage)

    if (remaining > 0) {
      animationFrameRef.current = requestAnimationFrame(updatePercentage)
    } else {
      setIsProgressComplete(true)
    }
  }

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
  }

  useEffect(() => {
    if (!toast.closable || (toast.closable && toast.autoClose !== false)) {
      animationFrameRef.current = requestAnimationFrame(updatePercentage)
    }

    return cleanup
  }, [toast.id])

  useEffect(() => {
    if (isProgressComplete) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
        closeTimeoutRef.current = setTimeout(() => {
          hideToast(toast.id)
        }, 300)
      }, 100)
      return () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
        }
      }
    }
  }, [isProgressComplete, toast.id])

  const handlePause = () => {
    isPaused.current = true
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }

  const handleResume = () => {
    isPaused.current = false
    const elapsedPercentage = (100 - percentage) / 100
    const elapsedTime = elapsedPercentage * totalDuration.current
    startTime.current = Date.now() - elapsedTime
    animationFrameRef.current = requestAnimationFrame(updatePercentage)
  }

  const handleClose = () => {
    cleanup()
    setIsVisible(false)
    closeTimeoutRef.current = setTimeout(() => {
      hideToast(toast.id)
    }, 300)
  }

  return {
    percentage,
    isVisible,
    handlePause,
    handleResume,
    handleClose,
  }
}
