import { SxProps } from "@mui/material";
import { JSXElementConstructor, ReactElement } from "react";

export enum ElementTypes {
  Text,
  Number,
  Select,
  Checkbox,
  Radiobox,
  ToggleBox,
  DynamicElement,
}



export interface DefaultElement {
  formName: string;
  name4Save?: string;
  name: string;
  caption?: string; // label
  disable?: boolean;
  hidden?: boolean;
  tabIndex?: number;
  error?: boolean;
  helperText?: string;
  helperText2?: string;
  isNotEffectFormState?: boolean;
  placeholder?: string;
}

export interface itemOption {
  id: string | number;
  value: string | number;
  label: string;
  icon?:
    | string
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | undefined;
  closeable?: boolean;
  children?: itemOption[];
  subText?: string;
}

export interface TextInput extends DefaultElement {
  defaultValue?: string;
  txtAlign?: "right" | "left" | "center";
  type: ElementTypes.Text;
  value?: string;
  isPassword?: boolean;
  isEmail?: boolean;
  isArea?: boolean;
}

export interface NumberInput extends DefaultElement {
  defaultValue?: number | string;
  type: ElementTypes.Number;
  allowZeroAtfirst?: boolean;
  value?: number | string;
  allowNegative?: boolean;
  decimalPlaces?: number;
  min?: number;
  max?: number;
  maxLength?: number;
  useThousandsSeparator?: boolean;
  error?: boolean;
}
export interface DynamicElement extends DefaultElement {
  defaultValue?: unknown;
  type: ElementTypes.DynamicElement;
  value?: unknown;
}
export interface SelectInput extends DefaultElement {
  defaultValue?: number | string;
  type: ElementTypes.Select;
  value?: number | string;
  options: itemOption[];
  withSearch?: boolean;
  withVirtuoso?: boolean;
  noOptionsText?: string;
}

export interface CheckBoxInput extends DefaultElement {
  defaultValue?: boolean;
  type: ElementTypes.Checkbox;
  value?: boolean;
  indeterminate?: boolean;
}

export interface RadioBoxInput extends DefaultElement {
  defaultValue?: number | string;
  type: ElementTypes.Radiobox;
  value?: number | string;
  options: itemOption[];
  isRow?: boolean;
  withDivider?: boolean;
}
export interface ToggleBoxInput extends DefaultElement {
  defaultValue?: boolean;
  type: ElementTypes.ToggleBox;
  value?: boolean;
  captionPosition?: "left" | "right";
  subCaption?: string;
}

export type GenerateConfig =
  | TextInput
  | NumberInput
  | SelectInput
  | CheckBoxInput
  | ToggleBoxInput
  | RadioBoxInput
  | DynamicElement;

export interface ElementStore<T extends ElementTypes> {
  [key: string]: AllElement<T>;
}

export interface TextBoxInputProps {
  config: TextInput;
  isPersist?: boolean;
}

export interface NumberBoxInputProps {
  config: NumberInput;
  isPersist?: boolean;
}
export interface SelectBoxInputProps {
  config: SelectInput;
  isPersist?: boolean;
}

export interface CheckBoxInputProps {
  config: CheckBoxInput;
  isPersist?: boolean;
}
export interface RadioBoxInputProps {
  config: RadioBoxInput;
  optionsSx?: SxProps;
  isPersist?: boolean;
}
export interface ToggleBoxInputProps {
  config: ToggleBoxInput;
  isPersist?: boolean;
}

export type AllElement<T extends ElementTypes> = T extends ElementTypes.Text
  ? TextInput
  : T extends ElementTypes.Number
    ? NumberInput
    : T extends ElementTypes.Select
      ? SelectInput
      : T extends ElementTypes.Checkbox
        ? CheckBoxInput
        : T extends ElementTypes.Radiobox
          ? RadioBoxInput
          : T extends ElementTypes.ToggleBox
            ? ToggleBoxInput
            : DynamicElement;
