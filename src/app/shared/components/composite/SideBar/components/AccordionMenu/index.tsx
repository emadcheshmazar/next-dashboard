"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SxProps,
} from "@mui/material";
import { PageNode } from "@/app/shared/routes/routes";
import MenuItem from "../MenuItem";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface AccordionMenuProps {
  data: PageNode[];
  onItemClick?: () => void;
  sx?: SxProps;
  activeKey?: string;
}

function AccordionMenu({
  data,
  onItemClick,
  sx,
  activeKey,
}: AccordionMenuProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    if (activeKey) {
      setExpanded(activeKey);
    }
  }, [activeKey]);

  const handleChange = (panel: string) => {
    setExpanded((prev) => (prev === panel ? false : panel));
  };

  const renderMenuItem = (item: PageNode, isSub = false) => {
    const isActive = pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded === item.key;

    if (!hasChildren && item.path) {
      return (
        <Link href={item.path} style={{ textDecoration: "none" }}>
          <MenuItem
            key={item.key}
            title={item.title}
            isActive={isActive}
            isSub={isSub}
            isSelected={isActive}
            onClick={onItemClick}
          />
        </Link>
      );
    }

    return (
      <Accordion
        key={item.key}
        expanded={isExpanded}
        onChange={() => handleChange(item.key)}
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-root": {
            height: "24px !important",
            minHeight: "24px !important",
            maring: "0 !important",
          },
          "& .MuiAccordion-root": {
            maring: "0 !important",
            height: "24px !important",
            minHeight: "24px !important",
          },
          "& .Mui-expanded": {
            maring: "0 !important",
            height: "24px !important",
            minHeight: "24px !important",
          },
          backgroundColor: "transparent",
          margin: "0 !important",
          ...(isSub && {
            margin: "0 !important",
          }),
        }}
      >
        <AccordionSummary
          sx={{
            padding: 0,
            minHeight: isSub ? "36px" : "24px",
            margin: 0,
            "& .MuiAccordionSummary-content": {
              margin: "0 !important",
              height: "24px !important",
              minHeight: "24px !important",
            },
            "& .Mui-expanded": {
              margin: "0 !important",
              height: "24px !important",
              minHeight: "24px !important",
            },
            "& .mui-15maiay-MuiPaper-root-MuiAccordion-root": {
              margin: "0 !important",
              height: "24px !important",
              minHeight: "24px !important",
            },
          }}
        >
          <MenuItem
            title={item.title}
            isActive={expanded === item.key}
            isSub={isSub}
            isSelected={isActive}
          />
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 0,
            margin: "4px 0 0 0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "8px 12px 10px 0px",
              borderRight: "2px solid #E9F0FC",
            }}
          >
            {item.children?.map((child) => renderMenuItem(child, true))}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", ...sx }}>
      {data.map((item) => renderMenuItem(item))}
    </Box>
  );
}

export default AccordionMenu;
