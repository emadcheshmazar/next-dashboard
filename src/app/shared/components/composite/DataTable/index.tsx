"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface DataTableProps {
  rows: unknown[];
  columns: GridColDef[];
  loading?: boolean;
  title?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  loading = false,
  title,
}) => {
  const simplifiedColumns = columns.map((col) => ({
    ...col,
    sortable: false,
    resizable: false,
    filterable: true,
    hideable: true,
    disableColumnMenu: true,
  }));

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        rows={rows}
        columns={simplifiedColumns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        label={title}
        disableRowSelectionOnClick
        sx={{
          "& .MuiIconButton-root": {
            transform: "scaleX(-1)",
          },
          "& .MuiDataGrid-cell": {
            direction: "rtl",
            textAlign: "right",
          },
          "& .MuiDataGrid-columnHeader": {
            direction: "rtl",
          },
          "& .MuiDataGrid-toolbarContainer": {
            direction: "rtl",
            justifyContent: "flex-start",
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
