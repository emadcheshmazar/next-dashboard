"use client";
import * as React from "react";
import { SxProps, Theme } from "@mui/material";
import { selectBoxStyles } from "./SelectBoxInput.styles";
import AutoCompleteBox from "./AutoCompleteSelect";
import { ElementTypes, SelectBoxInputProps } from "../models";
import { setElementValue } from "@/app/shared/core";
import useInitElement from "../hooks/useElementState";

interface SelectBoxInputPropsWithSx extends SelectBoxInputProps {
  sx?: SxProps<Theme>;
}

export default function SelectBoxInput({
  config,
  sx,
  isPersist = false,
}: SelectBoxInputPropsWithSx) {
  const {
    caption,
    formName,
    name,
    options = [],
    value,
    noOptionsText,
    error,
    helperText,
    placeholder,
  } = useInitElement<ElementTypes.Select>({ config, isPersist });

  const styles = { ...selectBoxStyles, ...sx };

  const handleSelect = React.useCallback(
    (option: string | number | undefined) => {
      setElementValue({
        formName,
        name,
        value: option,
        isPersist,
      });
    },
    [formName, name]
  );

  return (
    <AutoCompleteBox
      config={{
        sx: { ...styles },
        caption: caption,
        value: value,
        filteredOptions: options,
        onSelect: handleSelect,
        noOptionsText: noOptionsText,
        error: error,
        helperText: helperText,
        placeholder: placeholder,
      }}
    />
  );
}
