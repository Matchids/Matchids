import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET as getHealth } from "@/app/health/route";
import { GET as getReady } from "@/app/ready/route";
import { prisma } from "@/lib/db/prisma";

vi.mock("@/lib/db/prisma", () => ({
  prisma: { $queryRaw: vi.fn() },
}));

const queryRaw = vi.mocked(prisma.$queryRaw);
let previousDatabaseUrl: string | undefined;

beforeEach(() => {
  previousDatabaseUrl = process.env.DATABASE_URL;
  queryRaw.mockReset();
});

afterEach(() => {
  if (previousDatabaseUrl === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = previousDatabaseUrl;
});

describe("health endpoints", () => {
  it("reports process health without exposing configuration", async () => {
    const response = getHealth();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("reports not ready when the database is not configured", async () => {
    delete process.env.DATABASE_URL;

    const response = await getReady();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "not_ready" });
    expect(queryRaw).not.toHaveBeenCalled();
  });

  it("reports ready only after the database responds", async () => {
    process.env.DATABASE_URL = "postgresql://test.invalid/matchids";
    queryRaw.mockResolvedValue([] as never);

    const response = await getReady();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ready" });
    expect(queryRaw).toHaveBeenCalledOnce();
  });

  it("does not leak database errors when readiness fails", async () => {
    process.env.DATABASE_URL = "postgresql://test.invalid/matchids";
    queryRaw.mockRejectedValue(new Error("private database detail"));

    const response = await getReady();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "not_ready" });
  });
});