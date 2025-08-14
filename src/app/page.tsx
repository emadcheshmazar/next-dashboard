"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ROUTES from "./shared/routes";
import LoadingPage from "./shared/components/composite/LoadingPage";

function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.AUTH.LOGIN);
  }, [router]);

  return <LoadingPage />;
}

export default RedirectPage;
