import { setElementValue } from "@/app/shared/core";
import { SxProps, TextField, Theme, Typography, Box } from "@mui/material";
import { numberBoxInputStyles } from "./NumberBox.styles";
import {
  convertPersianToEnglishDigits,
  correctNumberVal,
  isNumber,
} from "./untils";
import { ElementTypes, NumberBoxInputProps } from "../models";
import useInitElement from "../hooks/useElementState";

interface NumberBoxInputPropsWithSx extends NumberBoxInputProps {
  sx?: SxProps<Theme>;
  whitoutLegend?: boolean;
}

const NumberBoxInput = (props: NumberBoxInputPropsWithSx) => {
  const { config, sx, isPersist } = props;

  const {
    formName,
    caption,
    name,
    tabIndex,
    maxLength = 20,
    allowZeroAtfirst,
    decimalPlaces,
    disable,
    hidden,
    useThousandsSeparator,
    value,
    helperText,
    helperText2,
    error,
    placeholder,
  } = useInitElement<ElementTypes.Number>({ config, isPersist });

  if (hidden) return null;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = convertPersianToEnglishDigits(ev.target.value);

    if (allowZeroAtfirst) {
      if (isNumber(inputValue, true)) {
        if (inputValue.length > maxLength) return;
        return setElementValue({ formName, name, value: inputValue });
      }
    }

    if (inputValue === "")
      return setElementValue({ formName, name, value: inputValue });

    if (isNumber(inputValue)) {
      if (inputValue.length > maxLength) return;
      inputValue = correctNumberVal({
        value: inputValue,
        floatCount: decimalPlaces,
        isSeprator: useThousandsSeparator,
      });
      setElementValue({ formName, name, value: inputValue });
    }
  };

  const styles = {
    ...numberBoxInputStyles({
      haveHelper: !!(helperText || helperText2),
      error,
      disable,
    }),
  };

  const correctval = allowZeroAtfirst
    ? value || ""
    : correctNumberVal({
        value: convertPersianToEnglishDigits(value?.toString() || "") || "",
        floatCount: decimalPlaces,
        isSeprator: useThousandsSeparator,
      }) || "";

  return (
    <Box width="100%">
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
            sx={{ p: 0, color: "#363636" }}
            fontSize={14}
            fontWeight={400}
          >
            {caption}
          </Typography>
        )}
        {helperText2 && (
          <Typography
            sx={{ p: 0, m: 0, color: "#5D5D5D" }}
            fontSize={10}
            fontWeight={400}
          >
            {helperText2}
          </Typography>
        )}
      </Box>
      <TextField
        placeholder={placeholder ? placeholder : undefined}
        onChange={handleChange}
        value={correctval}
        disabled={disable}
        inputProps={{
          tabIndex,
          inputMode: "numeric",
          pattern: "[0-9/]*",
          maxLength: maxLength,
        }}
        type="text"
        sx={{ ...styles, ...sx }}
        size="small"
      />
      <Box sx={{ width: "100%" }}>
        {helperText && (
          <Typography
            sx={{ p: 0, m: 0 }}
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

export default NumberBoxInput;
