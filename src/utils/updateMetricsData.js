import UAParser from "ua-parser-js";
import getIp from "./getIp.js";
import getLanguageCode from "./getLanguageCode.js";
import CustomError from "./customError.js";

const updateMetricsData = async ({ metrics, userAgent, remoteAddress, acceptLanguage }) => {
  const parser = new UAParser(userAgent);
  const { browser, os, device } = parser.getResult();

  const ipResponse = await fetch(`http://ip-api.com/json/${getIp(remoteAddress)}?fields=message,country`);

  if (!ipResponse.ok) throw new CustomError("Failed to fetch IP data");

  const { country } = await ipResponse.json();

  const metricFields = [
    { title: "Browsers clicks", field: browser.name },
    { title: "System clicks", field: os.name },
    { title: "Languages clicks", field: getLanguageCode(acceptLanguage) },
    { title: "Devices clicks", field: device.type || "Desktop" },
    { title: "Country clicks", field: country },
  ];

  const updatedMetrics = metricFields.reduce(
    (acc, { title, field }) => {
      const existingMetric = acc.find(metric => metric.title === title);

      if (existingMetric) {
        existingMetric.data = { ...existingMetric.data, [field]: (existingMetric.data[field] || 0) + 1 };
      } else {
        acc.push({ title, data: { [field]: 1 } });
      }

      return acc;
    },
    [...metrics]
  );

  return updatedMetrics;
};

export default updateMetricsData;
