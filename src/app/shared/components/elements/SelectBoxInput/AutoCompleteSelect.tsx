import * as React from "react";
import {
  Autocomplete,
  TextField,
  SxProps,
  Theme,
  Typography,
  Box,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { autoCompleteStyles } from "./SelectBoxInput.styles";
import { itemOption } from "../models";

interface AutoCompleteBoxProps {
  config: {
    sx?: SxProps<Theme>;
    caption?: string;
    value: string | number | undefined;
    filteredOptions: itemOption[];
    onSelect: (value: string | number | undefined) => void;
    noOptionsText?: string;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
  };
}

const AutoCompleteBox: React.FC<AutoCompleteBoxProps> = ({ config }) => {
  const {
    sx,
    caption,
    value,
    filteredOptions,
    onSelect,
    noOptionsText,
    helperText,
    error,
    placeholder,
  } = config;

  const flattenOptions = (options: itemOption[]) => {
    return options.flatMap(
      (parent, parentIndex) =>
        parent.children?.map((child, childIndex) => ({
          ...child,
          parentLabel: parent.label,
          id: child.id || `${parentIndex}-${childIndex}`,
        })) || [
          { ...parent, parentLabel: "", id: parent.id || `${parentIndex}-0` },
        ]
    );
  };

  const allOptions = flattenOptions(filteredOptions);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        mb: !!helperText ? "15px" : 0,
      }}
    >
      {caption && (
        <Typography sx={{ mb: "8px", fontSize: "14px", fontWeight: 400 }}>
          {caption}
        </Typography>
      )}

      <Autocomplete
        size="small"
        disablePortal
        clearOnEscape
        popupIcon={<KeyboardArrowDownRoundedIcon />}
        sx={{ ...autoCompleteStyles({ error }), ...sx }}
        options={allOptions}
        getOptionLabel={(option) => option.label}
        value={allOptions.find((opt) => opt.value === value) || null}
        onChange={(_, newValue) => onSelect(newValue?.value)}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        groupBy={(option) => option.parentLabel}
        noOptionsText={
          <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
            {noOptionsText || ".پیدا نشد"}
          </Typography>
        }
        renderOption={(props, option) => {
          const { key, ...otherProps } = props; // key رو جدا می‌کنیم
          return (
            <Box
              component="li"
              key={key} // key مستقیم روی Box
              {...otherProps} // بقیه props رو spread می‌کنیم
              sx={(theme) => ({
                "&:hover": {
                  backgroundColor: theme.palette.primary.light + " !important",
                },
                "&.Mui-focused": {
                  backgroundColor: theme.palette.primary.light + " !important",
                },
              })}
            >
              {option.icon && <span>{option.icon}</span>}
              <Typography>{option.label}</Typography>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} variant="outlined" />
        )}
      />

      {helperText && (
        <Typography
          sx={{
            position: "absolute",
            left: "5px",
            top: "35px",
            color: error ? "#E05655" : "#E0E0E0",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default AutoCompleteBox;
