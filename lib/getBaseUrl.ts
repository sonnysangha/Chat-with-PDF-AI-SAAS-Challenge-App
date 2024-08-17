const getBaseUrl = () =>
  process.env.NODE_ENV === "development"
    ? `https://${process.env.NETIFY_URL}`
    : `https://${process.env.VERCEL_URL}`;

  process.env.NODE_ENV === "production"
  ? `https://${process.env.NETIFY_URL}`
  : `https://${process.env.VERCEL_URL}`;

export default getBaseUrl;
