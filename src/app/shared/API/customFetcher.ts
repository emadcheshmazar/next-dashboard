import apiAddress from "./apiAddress";
import config from "./config";

const noAuthUrls: string[] = [apiAddress.login, apiAddress.signup];

const customFetcher = (url: string, init?: RequestInit): Promise<Response> => {
  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const shouldSkipAuth = noAuthUrls.some((api) => url.startsWith(api));
  const token = "getToken()";
  //   const token = getToken();

  if (token && !shouldSkipAuth) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const headers = new Headers({
    ...defaultHeaders,
    ...(init?.headers || {}),
  });

  return fetch(`${config.apiUrl}${url}`, {
    ...init,
    headers,
    mode: "cors",
  });
};

export default customFetcher;
