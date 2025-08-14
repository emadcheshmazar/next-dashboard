import React from "react";
import { FormControlLabel, Switch, Typography, styled } from "@mui/material";
import { setElementValue } from "@/app/shared/core";
import useInitElement from "../hooks/useElementState";
import { ToggleBoxInputProps, ElementTypes } from "../models";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  marginTop: "4px",
  overflow: "visible",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    transitionDuration: "300ms",
    boxShadow: "none",
    transform: "translate(1px, 1px)",
    "&.Mui-checked": {
      transform: "translate(17px, 1px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#172D76",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible": {
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      boxShadow: "none",
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 14,
    height: 14,
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const ToggleBoxInput = (props: ToggleBoxInputProps) => {
  const { config, isPersist = false } = props;

  const {
    formName,
    caption,
    name,
    value,
    defaultValue,
    disable,
    tabIndex,
    captionPosition = "right",
    subCaption,
  } = useInitElement<ElementTypes.ToggleBox>({ config, isPersist });

  const handleChange = (newValue: boolean) => {
    setElementValue({
      formName,
      name,
      value: newValue,
      isPersist,
    });
  };

  return (
    <FormControlLabel
      sx={{
        m: 0,
        "& .MuiFormControlLabel-label": {
          fontSize: "14px",
          fontWeight: 400,
          color: disable ? "GrayText" : "black",
        },
        flexDirection: captionPosition === "left" ? "row" : "row-reverse",
        gap: "8px",
        width: "fit-content",
        alignItems: "flex-start",
      }}
      control={
        <StyledSwitch
          inputProps={{ tabIndex }}
          checked={value}
          defaultChecked={defaultValue}
          disabled={disable}
          onChange={(e) => handleChange(e.target.checked)}
        />
      }
      label={
        <div>
          <Typography>{caption}</Typography>
          {subCaption && (
            <Typography
              sx={{ fontSize: "12px", color: "#6B6B6B", fontWeight: 400 }}
            >
              {subCaption}
            </Typography>
          )}
        </div>
      }
    />
  );
};

export default ToggleBoxInput;
