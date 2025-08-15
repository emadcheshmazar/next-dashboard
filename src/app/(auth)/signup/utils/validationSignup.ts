import { addElementHelperText, setElementError } from "@/app/shared/core";
import { GenerateConfig } from "@/app/shared/components/elements/models";
import { checkNestedObjectValues } from "@/app/shared/utils/checkNestedObjectValues";

interface ValidateSignupFormParams {
  formName: string;
  inputs: GenerateConfig[];
  data: Record<string, string>;
  isPersist?: boolean;
}

export const validateSignupForm = ({
  formName,
  inputs,
  data,
  isPersist,
}: ValidateSignupFormParams) => {
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

  const { missingKeys } = checkNestedObjectValues(data);
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

  if (
    data.password &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(data.password)
  ) {
    isValid = false;
    setElementError({ formName, name: "password", error: true, isPersist });
    addElementHelperText({
      formName,
      name: "password",
      helperText:
        "رمز باید حداقل ۶ کاراکتر، شامل حروف بزرگ، کوچک، عدد و سمبل باشد",
      isPersist,
    });
  }

  if (
    data.password &&
    data.confirmPassword &&
    data.password !== data.confirmPassword
  ) {
    isValid = false;
    setElementError({
      formName,
      name: "confirmPassword",
      error: true,
      isPersist,
    });
    addElementHelperText({
      formName,
      name: "confirmPassword",
      helperText: "رمز عبور و تایید آن یکسان نیستند",
      isPersist,
    });
  }

  return isValid;
};
