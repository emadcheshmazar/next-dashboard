import { addElementHelperText, setElementError } from "@/app/shared/core";
import { GenerateConfig } from "@/app/shared/components/elements/models";
import { checkNestedObjectValues } from "@/app/shared/utils/checkNestedObjectValues";

interface ValidateLoginFormParams {
  formName: string;
  inputs: GenerateConfig[];
  data: Record<string, string>;
  isPersist?: boolean;
}

export const validateLoginForm = ({
  formName,
  inputs,
  data,
  isPersist,
}: ValidateLoginFormParams) => {
  let isValid = true;

  inputs.forEach((item) => {
    setElementError({ formName, name: item.name, error: false, isPersist });
    addElementHelperText({
      formName,
      name: item.name,
      helperText: "",
      isPersist,
    });
  });

  const { missingKeys } = checkNestedObjectValues(data, ["confirmPassword"]);
  if (missingKeys?.length > 0) {
    isValid = false;
    for (const key of missingKeys) {
      setElementError({ formName, name: key, error: true, isPersist });
      addElementHelperText({
        formName,
        name: key,
        helperText: `فیلد ${inputs.find((item) => item.name === key)?.caption} الزامی است`,
        isPersist,
      });
    }
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    isValid = false;
    setElementError({ formName, name: "email", error: true, isPersist });
    addElementHelperText({
      formName,
      name: "email",
      helperText: "ایمیل معتبر نیست",
      isPersist,
    });
  }

  if (data.password && data.password.length < 6) {
    isValid = false;
    setElementError({ formName, name: "password", error: true, isPersist });
    addElementHelperText({
      formName,
      name: "password",
      helperText: "رمز عبور باید حداقل ۶ کاراکتر باشد",
      isPersist,
    });
  }

  return isValid;
};
