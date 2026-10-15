/**
 * Payload field validator: empty, or an absolute http(s) URL.
 * Blocks `javascript:` and other schemes that would run when the link is clicked.
 */
export const validateHttpUrl = (value: unknown): true | string => {
  if (value === null || value === undefined || value === "") return true;
  if (typeof value !== "string") return "Must be a URL";

  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:"
      ? true
      : "URL must start with http:// or https://";
  } catch {
    return "Must be a full URL, e.g. https://example.com";
  }
};
