const getLanguageCode = headers => {
  const acceptLanguage = headers["accept-language"] || "";

  return acceptLanguage.split(",")[0]?.split("-")[0].trim().toUpperCase() || "Unknown";
};

export default getLanguageCode;
