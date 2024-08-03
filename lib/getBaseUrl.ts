const getBaseUrl = () =>
  process.env.NODE_ENV === "development"
    ? `https://${process.env.NETIFY_URL}`
    : `https://${process.env.VERCEL_URL}`;

export default getBaseUrl;
