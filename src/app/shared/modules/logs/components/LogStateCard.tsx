"use client";
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

function LogStateCard({
  color,
  icon,
  title,
  value,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              variant="h4"
              component="div"
              fontWeight="bold"
              color={color}
            >
              {value.toLocaleString("fa-IR")}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              color: `${color}.main`,
              backgroundColor: `${color}.light`,
              borderRadius: "50%",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LogStateCard;
