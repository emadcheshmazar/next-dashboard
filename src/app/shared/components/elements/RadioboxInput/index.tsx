import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { setElementValue } from "@/app/shared/core";
import { ElementTypes, RadioBoxInputProps } from "../models";
import useInitElement from "../hooks/useElementState";

const RadioBoxInput = (props: RadioBoxInputProps) => {
  const { config, optionsSx, isPersist = false } = props;
  const { formName, name, caption, value, options, disable, tabIndex, isRow } =
    useInitElement<ElementTypes.Radiobox>({ config, isPersist });

  const handleChange = (newValue: string | number) => {
    const stringValue = String(newValue);
    setElementValue({
      formName,
      name,
      value: stringValue,
      isPersist,
    });
  };

  // Convert current value to string for consistent comparison
  const currentValue = value !== undefined ? String(value) : "";

  return (
    <FormControl
      disabled={disable}
      sx={{
        width: "100%",
        "& .MuiButtonBase-root": {
          padding: "0",
        },
      }}
    >
      {caption && (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400 }}
          color={disable ? "GrayText" : "black"}
        >
          {caption}
        </Typography>
      )}
      <RadioGroup
        row={isRow}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
        sx={optionsSx}
      >
        {options?.map((opt) => (
          <FormControlLabel
            sx={{
              ml: 0,
              mr: 0,
              gap: "10px",
            }}
            key={opt.id}
            value={String(opt.value)}
            control={<Radio inputProps={{ tabIndex }} />}
            label={
              <Typography sx={{ fontSize: "16px", fontWeight: 400 }}>
                {opt.label}
              </Typography>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioBoxInput;
