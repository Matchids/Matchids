import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteOrigin } from "@/lib/site-origin";

const previousUrl = process.env.NEXT_PUBLIC_APP_URL;

afterEach(() => {
  if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
  else process.env.NEXT_PUBLIC_APP_URL = previousUrl;
  vi.unstubAllEnvs();
});

describe("configured site origin", () => {
  it("returns only the origin of a configured HTTP(S) URL", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://matchids.com/app/path";
    expect(getSiteOrigin()?.toString()).toBe("https://matchids.com/");
  });

  it("returns null when the site URL is missing or unsafe", () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    expect(getSiteOrigin()).toBeNull();
    process.env.NEXT_PUBLIC_APP_URL = "javascript:alert(1)";
    expect(getSiteOrigin()).toBeNull();
  });

  it("rejects local and non-HTTPS origins in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
    expect(getSiteOrigin()).toBeNull();
    process.env.NEXT_PUBLIC_APP_URL = "https://matchids.com";
    expect(getSiteOrigin()?.toString()).toBe("https://matchids.com/");
  });
});