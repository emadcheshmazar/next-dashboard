import * as React from "react"
import {
  Autocomplete,
  TextField,
  SxProps,
  Theme,
  Typography,
  Box,
} from "@mui/material"
import { autoCompleteStyles } from "./SelectBoxInput.styles"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import { itemOption } from "../models"

interface AutoCompleteBoxProps {
  config: {
    sx?: SxProps<Theme>
    caption?: string
    value: string | number | undefined
    filteredOptions: itemOption[]
    onSelect: (value: string | number | undefined) => void
    noOptionsText?: string
    error?: boolean
    helperText?: string
    placeholder?: string
  }
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
  } = config

  const flattenOptions = (options: itemOption[]) => {
    return options.flatMap(
      (parent) =>
        parent.children?.map((child) => ({
          ...child,
          parentLabel: parent.label,
        })) || [{ ...parent, parentLabel: "" }],
    )
  }

  const allOptions = flattenOptions(filteredOptions)

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        marginBottom: !!config.helperText ? "15px" : 0,
      }}
    >
      {caption && (
        <Typography sx={{ mb: "8px", fontSize: "14px", fontWeight: 400 }}>
          {caption}
        </Typography>
      )}
      <Autocomplete
        noOptionsText={
          <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
            {noOptionsText || ".پیدا نشد"}
          </Typography>
        }
        size='small'
        sx={{
          ...autoCompleteStyles({
            error: config.error,
          }),
          ...sx,
        }}
        disablePortal
        clearOnEscape
        popupIcon={<KeyboardArrowDownRoundedIcon />}
        options={allOptions}
        getOptionLabel={(option) => option.label}
        value={allOptions.find((option) => option.value === value) || null}
        onChange={(_, newValue) => onSelect(newValue?.value)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        groupBy={(option) => option.parentLabel}
        renderOption={(props, option) => (
          <Box
            component='li'
            {...props}
            key={option.id}
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
        )}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} variant='outlined' />
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
    </div>
  )
}

export default AutoCompleteBox
