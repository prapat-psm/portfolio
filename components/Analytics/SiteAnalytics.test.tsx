import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => <i data-testid="vercel-analytics" />,
}));
vi.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => <i data-testid="vercel-speed-insights" />,
}));

import { SiteAnalytics } from "./SiteAnalytics";

describe("SiteAnalytics", () => {
  it("mounts Vercel Analytics and Speed Insights", () => {
    const html = renderToStaticMarkup(<SiteAnalytics />);
    expect(html).toContain("vercel-analytics");
    expect(html).toContain("vercel-speed-insights");
  });
});
