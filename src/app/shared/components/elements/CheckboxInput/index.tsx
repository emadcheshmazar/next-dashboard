import React from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { setElementValue } from "@/app/shared/core";
import { CheckBoxInputProps, ElementTypes } from "../models";
import useInitElement from "../hooks/useElementState";

const CheckboxInput = (props: CheckBoxInputProps) => {
  const { config, isPersist = false } = props;

  const {
    formName,
    caption,
    name,
    indeterminate,
    value,
    defaultValue,
    disable,
  } = useInitElement<ElementTypes.Checkbox>({ config, isPersist });

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
        "& .MuiCheckbox-root": {
          p: "0",
          ml: "8px",
        },
      }}
      control={
        <Checkbox
          checked={value}
          defaultChecked={defaultValue}
          indeterminate={indeterminate}
          disabled={disable}
          onChange={(e) => handleChange(e.target.checked)}
        />
      }
      label={
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400 }}
          color={disable ? "GrayText" : "black"}
        >
          {caption}
        </Typography>
      }
    />
  );
};

export default CheckboxInput;
