const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com/",
  apiRequestRetryCount: Number(process.env.NEXT_PUBLIC_API_RETRY_COUNT) || 1,
  dontRetryStatus: process.env.NEXT_PUBLIC_DONT_RETRY_STATUS
    ? process.env.NEXT_PUBLIC_DONT_RETRY_STATUS.split(",").map(Number)
    : [403, 404, 400],
  apiStaleTime: 1500,
  apiGcTime: 5 * 60 * 1000,
  author: "emad-the-shinobi-no-coder",
};

export default config;
