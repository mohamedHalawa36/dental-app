// supabase/functions/reset-user-password/index.ts
Deno.core?.enableInspect?.(); // no-op if not available

// --------- Configuration ---------
const ALLOWED_ORIGINS = [
  "https://yacout.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

// CORS utility
function isOriginAllowed(origin: string | null) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

function makeCorsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "600",
    "Content-Type": "application/json",
  };
}

// --------- Helpers ---------
async function parseJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

function getBearerToken(req: Request): string | null {
  const h =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (!h) return null;
  const m = h.match(/Bearer\s+(.+)/i);
  return m ? m[1] : null;
}

function decodeJwtSub(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const padded = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const decoded =
      typeof atob === "function"
        ? atob(padded)
        : Buffer.from(padded, "base64").toString("utf8");
    const json = JSON.parse(decoded);
    return json.sub ?? json.user_id ?? null;
  } catch {
    return null;
  }
}

async function getProfileByAuthId(authUserId: string) {
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const url = `${SUPABASE_URL}/rest/v1/profiles?id=eq.${authUserId}&select=*`;
  const res = await fetch(url, {
    headers: {
      apiKey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
  });
  if (!res.ok) return null;
  const j = await res.json();
  return Array.isArray(j) && j.length ? j[0] : null;
}

async function updateProfileHasReseted(targetAuthUserId: string) {
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const url = `${SUPABASE_URL}/rest/v1/profiles?id=eq.${targetAuthUserId}`;
  const body = { has_reseted_password: false };
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      apiKey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });
  return res.ok;
}

async function updateAuthUserPassword(
  targetAuthUserId: string,
  newPassword: string,
) {
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const url = `${SUPABASE_URL}/auth/v1/admin/users/${targetAuthUserId}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      apiKey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword, email_confirm: true }),
  });
  if (res.ok) return { ok: true };
  const text = await res.text();
  return { ok: false, error: text };
}

// --------- Main handler ---------
Deno.serve(async (req: Request) => {
  try {
    const origin = req.headers.get("origin");

    // If origin is missing or not allowed, reject
    if (!isOriginAllowed(origin)) {
      // For preflight, mirror the same behavior
      if (req.method === "OPTIONS") {
        return new Response(JSON.stringify({ error: "Origin not allowed" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const corsHeaders = makeCorsHeaders(origin!);

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Only POST allowed" }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    const token = getBearerToken(req);
    if (!token)
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401, headers: corsHeaders },
      );

    const adminAuthId = decodeJwtSub(token);
    if (!adminAuthId)
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: corsHeaders,
      });

    const body = await parseJson(req);
    if (!body)
      return new Response(
        JSON.stringify({ error: "Invalid or missing JSON body" }),
        { status: 400, headers: corsHeaders },
      );

    const targetUserId = body.userId;
    const newPassword = body.password;
    if (!targetUserId || !newPassword)
      return new Response(
        JSON.stringify({
          error: "target_user_id and new_password are required",
        }),
        { status: 400, headers: corsHeaders },
      );

    if (typeof newPassword !== "string" || newPassword.length < 6)
      return new Response(
        JSON.stringify({ error: "New password must be at least 6 characters" }),
        { status: 400, headers: corsHeaders },
      );

    const adminProfile = await getProfileByAuthId(adminAuthId);
    if (!adminProfile)
      return new Response(
        JSON.stringify({ error: "Admin profile not found" }),
        { status: 403, headers: corsHeaders },
      );
    if (
      !adminProfile.is_admin ||
      !adminProfile.is_active ||
      adminProfile.deleted_by !== null
    ) {
      return new Response(
        JSON.stringify({ error: "Requester not authorized" }),
        { status: 403, headers: corsHeaders },
      );
    }

    const targetProfile = await getProfileByAuthId(targetUserId);
    if (!targetProfile)
      return new Response(
        JSON.stringify({ error: "Target profile not found" }),
        { status: 404, headers: corsHeaders },
      );
    if (
      targetProfile.is_admin ||
      !targetProfile.is_active ||
      targetProfile.deleted_by !== null
    ) {
      return new Response(
        JSON.stringify({ error: "Target user not eligible for reset" }),
        { status: 400, headers: corsHeaders },
      );
    }

    const updateRes = await updateAuthUserPassword(targetUserId, newPassword);
    if (!updateRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Failed to update auth password",
          detail: updateRes.error,
        }),
        { status: 502, headers: corsHeaders },
      );
    }

    const profileUpdateOk = await updateProfileHasReseted(targetUserId);
    if (!profileUpdateOk) {
      return new Response(
        JSON.stringify({
          error:
            "Password updated but failed to update profile.has_reseted_password",
        }),
        { status: 500, headers: corsHeaders },
      );
    }

    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error(err);
    const origin = req.headers.get("origin");
    const headers =
      origin && isOriginAllowed(origin)
        ? makeCorsHeaders(origin)
        : { "Content-Type": "application/json" };
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
});
