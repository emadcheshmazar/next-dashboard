"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Btn from "@/app/shared/components/atomic/Btn";
import {
  ElementTypes,
  GenerateConfig,
} from "@/app/shared/components/elements/models";
import { useRouter } from "next/navigation";
import { collectFormValues, showToast } from "@/app/shared/core";
import { validateLoginForm } from "./utils";
import FormGenerator from "@/app/shared/components/FormGenerator";

const LoginPage = () => {
  const formName = "loginForm";
  const router = useRouter();

  const inputs: GenerateConfig[] = [
    {
      formName,
      name: "email",
      type: ElementTypes.Text,
      caption: "ایمیل",
      placeholder: "ایمیل خود را وارد کنید",
    },
    {
      formName,
      name: "password",
      type: ElementTypes.Text,
      caption: "رمز عبور",
      placeholder: "رمز عبور خود را وارد کنید",
      isPassword: true,
    },
  ];

  const handleSubmit = () => {
    const loginBody = collectFormValues({ formName }) as Record<string, string>;
    const isValid = validateLoginForm({ formName, inputs, data: loginBody });
    if (!isValid) return;
    showToast({ title: "ورود موفق", variant: "success" });
    console.log("Login form submitted", loginBody);
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
        sx={{
          width: "100%",
          maxWidth: 380,
          bgcolor: "#fff",
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: { xs: "none", lg: "0 4px 20px rgba(0,0,0,0.1)" },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography sx={{ textAlign: "center", fontWeight: 600 }} variant="h5">
          ورود به حساب کاربری
        </Typography>

        <FormGenerator configs={inputs} />

        <Btn
          label="ورود"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        />

        <Btn
          label="حساب کاربری ندارید؟ ثبت‌نام کنید"
          variant="text"
          color="primary"
          onClick={() => router.push("/signup")}
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
