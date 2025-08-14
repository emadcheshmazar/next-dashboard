"use client";
import React from "react";

import TopBarModal from "./TopBarModal";
import { Box, Dialog, DialogContent } from "@mui/material";
import { ModalProps } from "./models";
import { useModalState } from "@/app/shared/redux/hooks/useModalState";

const DialogBox: React.FC<ModalProps> = ({ config, children }) => {
  const { onClose, hideBackdrop, topbar, name } = config;
  const modalState = useModalState({ name });
  const topbarProps = { ...topbar, onClose };

  return (
    <Dialog
      open={Boolean(modalState?.open)}
      keepMounted
      onClose={onClose}
      hideBackdrop={hideBackdrop}
      PaperProps={{
        sx: {
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          margin: 0,
        },
      }}
    >
      <DialogContent
        sx={{
          p: "16px",
          width: {
            xs: "calc(100vw - 64px)",
            sm: "60vw",
            md: "40vw",
            lg: "30vw",
          },
        }}
      >
        {topbar && <TopBarModal {...topbarProps} />}
        <Box sx={{ width: "100%" }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
