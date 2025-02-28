const getLanguageCode = acceptLanguage =>
  acceptLanguage?.split(",")[0]?.split("-")[0].trim().toUpperCase() || "Unknown";

export default getLanguageCode;
