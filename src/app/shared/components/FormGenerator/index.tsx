"use client";
import React from "react";

import {
  GenerateConfig,
  ElementTypes,
} from "@/app/shared/components/elements/models";
import TextBoxInput from "../elements/TextBoxInput";
import NumberBoxInput from "../elements/NumberBoxInput";

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
          default:
            return null;
        }
      })}
    </>
  );
};

export default FormGenerator;
