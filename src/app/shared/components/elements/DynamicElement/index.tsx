import { ReactNode } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import useInitElement from "../hooks/useElementState";
import { DynamicElement, ElementTypes } from "../models";

interface DynamicElementInputProps {
  config: DynamicElement;
  children?: ReactNode;
  sx?: SxProps<Theme>;
  withoutLegend?: boolean;
}

const DynamicElementInput = (props: DynamicElementInputProps) => {
  const { config, children, sx, withoutLegend } = props;
  const { hidden, caption, helperText, error } =
    useInitElement<ElementTypes.DynamicElement>({ config });

  if (hidden) return null;

  return (
    <Box sx={{ width: "100%", ...sx }}>
      {!withoutLegend && caption && (
        <div style={{ marginBottom: "4px" }}>{caption}</div>
      )}
      {children}
      {helperText && (
        <div
          style={{
            color: error ? "error" : "inherit",
            fontSize: "0.75rem",
            marginTop: "4px",
          }}
        >
          {helperText}
        </div>
      )}
    </Box>
  );
};

export default DynamicElementInput;
