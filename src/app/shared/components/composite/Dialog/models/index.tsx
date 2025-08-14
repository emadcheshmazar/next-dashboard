export interface TopBarModalProps {
  title?: string;
  closeable?: boolean;
  buttons?: React.ReactNode;
  onClose?: () => void;
}

export interface ModalProps {
  children: React.ReactNode;
  config: {
    name: string;
    formName?: string;
    onClose: () => void;
    hideBackdrop?: boolean;
    topbar?: TopBarModalProps;
  };
}

export interface ModalConfig {
  open: boolean;
  modalProps: Record<string, unknown> | null;
}

export type ModalState = Record<string, ModalConfig>;
