"use client";
import React from "react";
import TextBoxInput from "@/app/shared/components/elements/TextBoxInput";
import NumberBoxInput from "@/app/shared/components/elements/NumberBoxInput";

import {
  GenerateConfig,
  ElementTypes,
} from "@/app/shared/components/elements/models";
import SelectBoxInput from "../elements/SelectBoxInput";
import CheckboxInput from "../elements/CheckboxInput";
import ToggleBoxInput from "../elements/ToggleBoxInput";
import RadioBoxInput from "../elements/RadioboxInput";
import DynamicElementInput from "../elements/DynamicElement";

interface FormGeneratorProps {
  configs: GenerateConfig[];
  isPersist?: boolean;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  configs,
  isPersist,
}) => {
  return (
    <>
      {configs.map((config) => {
        switch (config.type) {
          case ElementTypes.Text:
            return (
              <TextBoxInput
                key={config.name}
                config={config}
                isPersist={isPersist}
              />
            );
          case ElementTypes.Number:
            return (
              <NumberBoxInput
                key={config.name}
                config={config}
                isPersist={isPersist}
              />
            );
          case ElementTypes.Select:
            return (
              <SelectBoxInput
                key={config.name}
                config={config}
                isPersist={isPersist}
              />
            );
          case ElementTypes.Checkbox:
            return (
              <CheckboxInput
                key={config.name}
                config={config}
                isPersist={isPersist}
              />
            );
          case ElementTypes.ToggleBox:
            return (
              <ToggleBoxInput
                key={config.name}
                config={config}
                isPersist={isPersist}
              />
            );
          case ElementTypes.Radiobox:
            return (
              <RadioBoxInput
                key={config.name}
                config={config}
                isPersist={isPersist}
              />
            );
          case ElementTypes.DynamicElement:
            <DynamicElementInput key={config.name} config={config} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default FormGenerator;
