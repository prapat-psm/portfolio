import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Visitor tracking for every public page: page views, referrers, countries,
 * devices (Vercel Web Analytics) and Core Web Vitals (Speed Insights).
 * Cookieless, so no consent banner. Data shows only on Vercel deployments.
 */
export function SiteAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
