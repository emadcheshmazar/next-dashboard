import { fontScale } from "@/app/shared/utils/fontScale";
import { SxProps, Theme } from "@mui/material";

export const selectBoxStyles: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  height: "42px",
};

export const autoCompleteStyles = (args?: {
  error?: boolean;
  haveHelper?: boolean;
}) => {
  return {
    transition: "all 0.2s ease",
    height: "42px",

    "& .MuiInputBase-input": {
      ...fontScale(12),
      textAlign: "right",
      // m: "0 0 0 20px !important",
    },
    "& .MuiOutlinedInput-root": { p: "6px 12px !important" },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
      position: "absolute",
      left: "6px",
      p: 0,
      m: 0,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      p: "17.5px !important",
      m: 0,
      borderRadius: "12px",
      height: "42px",
      border: `1px solid ${args?.error ? "#E05655" : "#E0E0E0"}`,
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${args?.error ? "#E05655" : "#E0E0E0"}`,
      p: 0,
      m: 0,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${args?.error ? "#E05655" : "#E0E0E0"}`,
      p: 0,
      m: 0,
    },
  };
};
