"use client";

import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  SxProps,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  sx?: SxProps;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  disabled = false,
  sx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getVisiblePages = () => {
    const delta = isMobile ? 1 : 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 0.5 : 1,
        py: isMobile ? 2 : 3,
        px: isMobile ? 1 : 2,
        flexDirection: isMobile ? "column" : "row",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 1 : 2,
          mb: isMobile ? 1 : 0,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: isMobile ? "12px" : "14px",
            textAlign: "center",
          }}
        >
          {`تعداد کل: ${totalItems}`}
        </Typography>
      </Box>

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 0.25 : 0.5,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {(!isMobile || totalPages <= 10) && (
            <IconButton
              onClick={() => onPageChange(1)}
              disabled={disabled || currentPage === 1}
              size={isMobile ? "small" : "small"}
              sx={{
                color: theme.palette.text.secondary,
                minWidth: isMobile ? 32 : 36,
                height: isMobile ? 32 : 36,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                "&.Mui-disabled": {
                  color: theme.palette.action.disabled,
                },
              }}
            >
              <LastPageIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
            </IconButton>
          )}

          <IconButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={disabled || currentPage === 1}
            size={isMobile ? "small" : "small"}
            sx={{
              color: theme.palette.text.secondary,
              minWidth: isMobile ? 32 : 36,
              height: isMobile ? 32 : 36,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "&.Mui-disabled": {
                color: theme.palette.action.disabled,
              },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
          </IconButton>

          {visiblePages.map((page, index) => (
            <Box key={index}>
              {page === "..." ? (
                <Typography
                  variant="body2"
                  sx={{
                    px: isMobile ? 0.5 : 1,
                    py: isMobile ? 0.25 : 0.5,
                    color: theme.palette.text.secondary,
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  ...
                </Typography>
              ) : (
                <IconButton
                  onClick={() => onPageChange(page as number)}
                  disabled={disabled}
                  size={isMobile ? "small" : "small"}
                  sx={{
                    minWidth: isMobile ? 28 : 36,
                    height: isMobile ? 28 : 36,
                    mx: isMobile ? 0.125 : 0.25,
                    color:
                      currentPage === page
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    backgroundColor:
                      currentPage === page
                        ? theme.palette.primary.light + "20"
                        : "transparent",
                    border:
                      currentPage === page
                        ? `1px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      backgroundColor:
                        currentPage === page
                          ? theme.palette.primary.light + "30"
                          : theme.palette.action.hover,
                    },
                    "&.Mui-disabled": {
                      color: theme.palette.action.disabled,
                      borderColor: theme.palette.action.disabled,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={currentPage === page ? 600 : 400}
                    sx={{ fontSize: isMobile ? "11px" : "14px" }}
                  >
                    {page}
                  </Typography>
                </IconButton>
              )}
            </Box>
          ))}

          <IconButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
            size={isMobile ? "small" : "small"}
            sx={{
              color: theme.palette.text.secondary,
              minWidth: isMobile ? 32 : 36,
              height: isMobile ? 32 : 36,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "&.Mui-disabled": {
                color: theme.palette.action.disabled,
              },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
          </IconButton>

          {(!isMobile || totalPages <= 10) && (
            <IconButton
              onClick={() => onPageChange(totalPages)}
              disabled={disabled || currentPage === totalPages}
              size={isMobile ? "small" : "small"}
              sx={{
                color: theme.palette.text.secondary,
                minWidth: isMobile ? 32 : 36,
                height: isMobile ? 32 : 36,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                "&.Mui-disabled": {
                  color: theme.palette.action.disabled,
                },
              }}
            >
              <FirstPageIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Pagination;
