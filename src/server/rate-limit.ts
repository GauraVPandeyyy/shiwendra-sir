import "server-only";
import { createHash } from "node:crypto";
const buckets = new Map<string, { count: number; until: number }>();
export async function allowSubmission(identity: string): Promise<boolean> {
  const key = createHash("sha256").update(identity).digest("hex");
  const url = process.env.RATE_LIMIT_REST_URL;
  const token = process.env.RATE_LIMIT_REST_TOKEN;
  if (url && token) {
    try {
      const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", `sks:contact:${key}`],
          ["EXPIRE", `sks:contact:${key}`, 900, "NX"],
        ]),
        cache: "no-store",
        signal: AbortSignal.timeout(2500),
      });
      if (!response.ok) return false;
      const result: unknown = await response.json();
      return (
        Array.isArray(result) &&
        typeof result[0]?.result === "number" &&
        result[0].result <= 5
      );
    } catch {
      return false;
    }
  }
  // Single-process fallback. A trusted reverse proxy must overwrite the configured IP header.
  const now = Date.now();
  for (const [k, v] of buckets) if (v.until < now) buckets.delete(k);
  if (buckets.size > 10000) return false;
  const item = buckets.get(key) ?? { count: 0, until: now + 900000 };
  item.count++;
  buckets.set(key, item);
  return item.count <= 5;
}
