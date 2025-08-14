import { addElementHelperText, setElementError } from "@/app/shared/core";
import { GenerateConfig } from "@/app/shared/components/elements/models";
import { checkNestedObjectValues } from "@/app/shared/utils/checkNestedObjectValues";

interface ValidateLoginFormParams {
  formName: string;
  inputs: GenerateConfig[];
  data: Record<string, string>;
}

export const validateLoginForm = ({
  formName,
  inputs,
  data,
}: ValidateLoginFormParams) => {
  let isValid = true;

  inputs.forEach((item) => {
    setElementError({ formName, name: item.name, error: false });
    addElementHelperText({ formName, name: item.name, helperText: "" });
  });

  const { missingKeys } = checkNestedObjectValues(data);
  if (missingKeys?.length > 0) {
    isValid = false;
    for (const key of missingKeys) {
      setElementError({ formName, name: key, error: true });
      addElementHelperText({
        formName,
        name: key,
        helperText: `فیلد ${inputs.find((item) => item.name === key)?.caption} الزامی است`,
      });
    }
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    isValid = false;
    setElementError({ formName, name: "email", error: true });
    addElementHelperText({
      formName,
      name: "email",
      helperText: "ایمیل معتبر نیست",
    });
  }

  if (data.password && data.password.length < 6) {
    isValid = false;
    setElementError({ formName, name: "password", error: true });
    addElementHelperText({
      formName,
      name: "password",
      helperText: "رمز عبور باید حداقل ۶ کاراکتر باشد",
    });
  }

  return isValid;
};
