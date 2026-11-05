export function getSiteOrigin(): URL | null {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (process.env.NODE_ENV === "production" && (
      url.protocol !== "https:" ||
      ["localhost", "127.0.0.1", "::1"].includes(url.hostname) ||
      !url.hostname.includes(".")
    )) return null;
    return new URL(url.origin);
  } catch {
    return null;
  }
}