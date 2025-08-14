export type ToastVariant = "info" | "warning" | "error" | "success" | "normal"

export interface ToastAction {
  content: React.ReactNode
  onClick?: () => void
}

export interface ToastInterface {
  id: string
  title: string
  subtitle?: string
  variant: ToastVariant
  showDefaultIcon?: boolean
  customIcon?: React.ReactNode
  duration?: number
  actions?: ToastAction[]
  closable?: boolean
  showProgress?: boolean
  autoClose?: boolean
}

export interface ToastState {
  toasts: ToastInterface[]
}

