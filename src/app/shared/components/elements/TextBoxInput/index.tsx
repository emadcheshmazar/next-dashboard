import {
  TextField,
  SxProps,
  Theme,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { textBoxInputStyles } from "./TextBox.styles";
import { setElementValue } from "@/app/shared/core";
import { ElementTypes, TextBoxInputProps } from "../models";
import useInitElement from "../hooks/useElementState";
import React from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
interface TextBoxInputPropsWithSx extends TextBoxInputProps {
  sx?: SxProps<Theme>;
}

const TextBoxInput = (props: TextBoxInputPropsWithSx) => {
  const { config, sx, isPersist } = props;
  const {
    formName,
    value,
    disable,
    caption,
    name,
    hidden,
    isPassword,
    helperText,
    helperText2,
    error,
    txtAlign,
    isArea,
    placeholder,
    defaultValue,
  } = useInitElement<ElementTypes.Text>({ config, isPersist });
  const styles = {
    ...textBoxInputStyles({
      haveHelper: !!helperText,
      error,
      textAlign: txtAlign,
      disable: disable,
      isArea: isArea,
    }),
    ...sx,
  };

  const [showPassword, setShowPassword] = React.useState(false);

  if (hidden) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          mb: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          direction: "rtl",
        }}
      >
        {caption && (
          <Typography
            sx={{
              p: 0,
              // m: "0 0 8px",
              color: "#363636",
            }}
            fontSize={14}
            fontWeight={400}
          >
            {caption}
          </Typography>
        )}
        {helperText2 && (
          <Typography
            sx={{
              p: 0,
              m: 0,
              color: "#5D5D5D",
            }}
            fontSize={10}
            fontWeight={400}
          >
            {helperText2}
          </Typography>
        )}
      </Box>

      <TextField
        onChange={(ev) => {
          setElementValue({
            formName,
            name,
            value: ev.target.value,
            isPersist,
          });
        }}
        defaultValue={defaultValue}
        value={value || ""}
        disabled={disable}
        sx={{
          ...styles,
          "& .MuiInputBase-input::placeholder": {
            fontSize: "17px",
            scale: 12 / 17,
            mr: "-50px",
            fontWeight: 500,
          },
        }}
        size="small"
        type={isPassword ? (showPassword ? "text" : "password") : "text"}
        multiline={isArea}
        minRows={isArea ? 4 : undefined}
        placeholder={placeholder}
        InputProps={
          isPassword
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />

      <Box sx={{ width: "100%" }}>
        {helperText && (
          <Typography
            sx={{
              p: 0,
              m: 0,
            }}
            fontSize={10}
            fontWeight={400}
            textAlign="right"
            color={error ? "#E05655" : "#5D5D5D"}
          >
            {helperText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TextBoxInput;
