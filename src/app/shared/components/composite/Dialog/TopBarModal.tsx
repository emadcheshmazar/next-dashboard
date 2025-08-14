"use client"
import React from "react"
import { IconButton, Box, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { TopBarModalProps } from "./models"

const TopBarModal: React.FC<TopBarModalProps> = ({
  title,
  closeable,
  buttons,
  onClose,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pb: "8px",
        borderBottom: "1px solid #ddd",
        width: "100%",
      }}
    >
      {title && <Typography>{title}</Typography>}
      <Box display='flex' alignItems='center'>
        {buttons}
        {closeable && (
          <IconButton aria-label='close' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default TopBarModal
