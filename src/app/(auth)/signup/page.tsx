"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Btn from "@/app/shared/components/atomic/Btn";
import {
  ElementTypes,
  GenerateConfig,
} from "@/app/shared/components/elements/models";
import { useRouter } from "next/navigation";
import { collectFormValues } from "@/app/shared/core";
import FormGenerator from "@/app/shared/components/FormGenerator";
import { validateSignupForm } from "./utils/validationSignup";
import { registerUser } from "@/app/shared/services/auth";

const SignupPage = () => {
  const formName = "auth";
  const router = useRouter();

  const inputs: GenerateConfig[] = [
    {
      formName,
      name: "email",
      name4Save: "email",
      type: ElementTypes.Text,
      caption: "ایمیل",
      placeholder: "ایمیل خود را وارد کنید",
      isEmail: true,
    },
    {
      formName,
      name: "password",
      name4Save: "password",
      type: ElementTypes.Text,
      caption: "رمز عبور",
      placeholder: "رمز عبور خود را وارد کنید",
      isPassword: true,
    },
    {
      formName,
      name: "confirmPassword",
      name4Save: "confirmPassword",
      type: ElementTypes.Text,
      caption: "تایید رمز عبور",
      placeholder: "رمز عبور را دوباره وارد کنید",
      isPassword: true,
    },
  ];
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const signupBody = collectFormValues({ formName }) as Record<
      string,
      string
    >;
    console.log(signupBody, "signupBody");

    const isValid = validateSignupForm({ formName, inputs, data: signupBody });
    if (!isValid) return;

    await registerUser({
      email: signupBody.email,
      password: signupBody.password,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: { xs: "#fff", lg: "#f5f5f5" },
        p: { xs: 0, md: 2 },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 380,
          bgcolor: "#fff",
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: { xs: "none", lg: "0 4px 20px rgba(0,0,0,0.1)" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography sx={{ textAlign: "center", fontWeight: 600 }} variant="h5">
          ثبت‌نام
        </Typography>

        <FormGenerator configs={inputs} />

        <Btn
          type="submit"
          label="ثبت‌نام"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        />

        <Btn
          label="حساب کاربری دارید؟ وارد شوید"
          variant="text"
          color="primary"
          onClick={() => router.push("/login")}
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};

export default SignupPage;
