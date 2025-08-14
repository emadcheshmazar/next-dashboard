"use client"

import React from "react"
import { Box, Typography } from "@mui/material"
import Image from "next/image"
import IconBtn from "../IconBtn"

interface StaticCheckboxProps {
  text: string
  isChecked: boolean
  inProgress?: boolean
  href: string
}

export default function StaticCheckbox({
  text,
  isChecked,
  inProgress = false,
  href,
}: StaticCheckboxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Box
        sx={{
          width: "20px",
          height: "20px",
          border: "1.5px solid #3768CE",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isChecked || inProgress ? "#3768CE" : "transparent",
        }}
      >
        {(isChecked || inProgress) && (
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.6666 3.5L5.24992 9.91667L2.33325 7'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </Box>

      <Typography
        sx={{
          color: "#2269D5",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          textDecorationLine: isChecked ? "line-through" : "none",
        }}
      >
        {text}
      </Typography>

      <IconBtn
        variant='text'
        size='small'
        sx={{ mb: "-4px" }}
        href={href}
        icon={
          <Image
            src='/icons/checkBtnIcon.svg'
            alt='Check button icon'
            width={24}
            height={24}
          />
        }
      />
    </Box>
  )
}
