type RateLimiterOptions = {
  limit: number;
  windowMs: number;
};

/**
 * Fixed-window, in-memory rate limiter.
 * Best effort only: each server instance keeps its own counts.
 * For a hard limit across instances, swap this for Upstash/Redis or Turnstile.
 */
export const createRateLimiter = ({ limit, windowMs }: RateLimiterOptions) => {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (key: string, now: number = Date.now()): boolean => {
    const entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (entry.count >= limit) return false;

    entry.count += 1;
    return true;
  };
};
