import { revalidateTag } from "next/cache";

/* The API calls this after an admin saves, so the change shows on the next visit instead of after the cache
   lifetime. Body: { tags: ["site" | "properties" | "property:<slug>"] }, header x-revalidate-secret. */

const ALLOWED = /^(site|properties|meta|property:[a-z0-9-]{1,200})$/;

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ error: "Not allowed" }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { tags?: unknown };
  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === "string" && ALLOWED.test(t)) : [];
  // expire 0: the next visitor gets the fresh version, not one more view of the old one.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: tags });
}
