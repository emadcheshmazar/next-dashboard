import { useState, useEffect } from "react";
import { fakeApiCall, getCurrentUser } from ".";

export const useIsLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      const result = await fakeApiCall(() => getCurrentUser() !== null, 500);
      setIsLoggedIn(result);
      setLoading(false);
    };

    verify();
  }, []);

  return { isLoggedIn, loading };
};
