import { Box, Typography } from "@mui/material"
import React from "react"

interface EmptyStateProps {
  text: string
  imageSrc?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  text,
  imageSrc = "/images/empty.png",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        p: "24px",
      }}
    >
      <Box
        sx={{
          width: "124px",
          height: "128px",
          background: `url(${imageSrc}) no-repeat center center`,
          backgroundSize: "contain",
        }}
      />
      <Typography variant='body1' color='textSecondary'>
        {text}
      </Typography>
    </Box>
  )
}

export default EmptyState
