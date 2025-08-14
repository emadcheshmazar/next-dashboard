import { fontScale } from "@/app/shared/utils/fontScale"
import { SxProps, Theme } from "@mui/material"

export function numberBoxInputStyles(arg?: {
  haveHelper?: boolean
  error?: boolean
  textAlign?: "left" | "right" | "center"
  disable?: boolean
  isArea?: boolean
}): SxProps<Theme> {
  return {
    width: "100%",
    height: `${arg?.isArea ? "132px" : "42px"}!important`,
    mb: arg?.haveHelper ? "4px" : 0,
    transition: "all 0.2s ease",
    "& .MuiOutlinedInput-notchedOutline": {
      height: `${arg?.isArea ? "132px" : "42px"}!important`,
      borderRadius: "12px",
      p: "17.5px",
      border: `1px solid ${arg?.error ? "#E05655" : "#E0E0E0"} !important`,
    },
    "& .MuiFormControl-root": {
      height: `${arg?.isArea ? "132px" : "42px"}!important`,
    },
    "& .MuiInputBase-input": {
      ...fontScale(12),
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      pt: "13px",
      color: arg?.error ? "#A80027 !important" : "#5D5D5D !important",
      height: "18px",
      textAlign: arg?.textAlign || "right",
    },
  }
}
