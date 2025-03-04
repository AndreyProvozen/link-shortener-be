import { LINK_CODE_REGEXP } from "../constants/regexp.js";
import Link from "../models/Link.js";
import CustomError from "../utils/customError.js";
import updateMetricsData from "../utils/updateMetricsData.js";

class RedirectService {
  async redirectToFullLink({ code, userAgent, acceptLanguage, remoteAddress }) {
    if (!LINK_CODE_REGEXP.test(code)) throw CustomError.BadRequest("Invalid code format");

    const link = await Link.findOne({ code });
    if (!link) throw CustomError.NotFound("Link not found");

    const updatedMetrics = await updateMetricsData({
      metrics: link.metrics || [],
      userAgent,
      remoteAddress,
      acceptLanguage,
    });

    link.metrics = updatedMetrics;
    link.clicked++;

    await link.save();
    return link.url;
  }
}

export default new RedirectService();
