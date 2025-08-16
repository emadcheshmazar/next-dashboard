"use client";
import React from "react";
import {
  Box,
  Typography,
  SxProps,
  Theme,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { textBoxInputStyles } from "./TextBox.styles";
import {
  addElementHelperText,
  removeElementHelperText,
  setElementError,
  setElementValue,
} from "@/app/shared/core";
import { ElementTypes, TextBoxInputProps } from "../models";
import useInitElement from "../hooks/useElementState";
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
    isEmail,
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
      disable,
      isArea,
    }),
    ...sx,
  };

  const [showPassword, setShowPassword] = React.useState(false);

  if (hidden) return null;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const val = ev.target.value;
    setElementError({ formName, name, error: false, isPersist });
    removeElementHelperText({ formName, name, isPersist });

    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (val && !emailRegex.test(val)) {
        setElementError({ formName, name, error: true, isPersist });
        addElementHelperText({
          formName,
          name,
          helperText: "فرمت ایمیل معتبر نیست",
          isPersist,
        });
      }
    }

    setElementValue({ formName, name, value: val, isPersist });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          direction: "rtl",
        }}
      >
        {caption && (
          <Typography fontSize={14} fontWeight={400} color="#363636">
            {caption}
          </Typography>
        )}
        {helperText2 && (
          <Typography fontSize={10} fontWeight={400} color="#5D5D5D">
            {helperText2}
          </Typography>
        )}
      </Box>

      <TextField
        size="small"
        fullWidth
        disabled={disable}
        value={value || ""}
        defaultValue={defaultValue}
        multiline={isArea}
        minRows={isArea ? 4 : undefined}
        placeholder={placeholder}
        onChange={handleChange}
        sx={styles}
        type={isPassword && !showPassword ? "password" : "text"}
        InputProps={{
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
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
          ) : undefined,
        }}
      />

      {helperText && (
        <Typography
          sx={{ mt: 0.5 }}
          fontSize={10}
          fontWeight={400}
          textAlign="right"
          color={error ? "#E05655" : "#5D5D5D"}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default TextBoxInput;
