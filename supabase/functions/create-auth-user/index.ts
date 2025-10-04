import { createClient } from "npm:@supabase/supabase-js@2.28.0";
console.info("Create Auth User function starting");
const CORS_ALLOWED_ORIGINS = (Deno.env.get("CORS_ALLOWED_ORIGINS") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
function buildCorsHeaders(req) {
  const origin = req.headers.get("origin") || "*";
  const allowed =
    CORS_ALLOWED_ORIGINS.length === 0
      ? origin
      : CORS_ALLOWED_ORIGINS.includes(origin)
        ? origin
        : null;
  const base = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  if (allowed) base["Access-Control-Allow-Origin"] = allowed;
  if (allowed && allowed !== "*")
    base["Access-Control-Allow-Credentials"] = "true";
  return base;
}
Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS")
      return new Response(null, {
        status: 204,
        headers: buildCorsHeaders(req),
      });
    if (req.method !== "POST")
      return new Response(
        JSON.stringify({
          error: "Only POST allowed",
        }),
        {
          status: 405,
          headers: buildCorsHeaders(req),
        },
      );
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({
          error: "Server not configured",
        }),
        {
          status: 500,
          headers: buildCorsHeaders(req),
        },
      );
    }
    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization");
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return new Response(
        JSON.stringify({
          error: "Missing Authorization Bearer token",
        }),
        {
          status: 401,
          headers: buildCorsHeaders(req),
        },
      );
    }
    const accessToken = authHeader.split(" ")[1];
    const body = await req.json().catch(() => null);
    if (!body || !body.email || !body.password) {
      return new Response(
        JSON.stringify({
          error: "Missing email or password",
        }),
        {
          status: 400,
          headers: buildCorsHeaders(req),
        },
      );
    }
    const { email, password, metadata, ...profile } = body;
    if (typeof profile !== "object" || Array.isArray(profile)) {
      return new Response(
        JSON.stringify({
          error: "profile must be an object",
        }),
        {
          status: 400,
          headers: buildCorsHeaders(req),
        },
      );
    }
    // Use service role client to verify the provided access token and to create user/profile
    const svc = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
      },
    });
    // Verify token: call getUser with the provided access token
    const { data: tokenUser, error: tokenError } =
      await svc.auth.getUser(accessToken);
    if (tokenError || !tokenUser || !tokenUser.user) {
      return new Response(
        JSON.stringify({
          error: "Invalid or expired access token",
        }),
        {
          status: 401,
          headers: buildCorsHeaders(req),
        },
      );
    }
    const adminUser = tokenUser.user;
    const adminUid = adminUser.id;

    //Check is the creator is admin
    const { data: adminProfile, error: adminProfileError } = await svc
      .from("profiles")
      .select()
      .eq("id", adminUid)
      .single();

    if (adminProfileError) {
      return new Response(
        JSON.stringify({
          error: "Failed to get admin profile row",
          detail: adminProfileError.message,
        }),
        {
          status: 500,
        },
      );
    }

    if (
      !adminProfile.is_admin ||
      !adminProfile.is_active ||
      adminProfile.deleted_at
    ) {
      return new Response(
        JSON.stringify({
          error: "only admins can create users",
        }),
        {
          status: 403,
          headers: buildCorsHeaders(req),
        },
      );
    }

    //End Check is the creator is admin

    // Create the auth user via admin API and force email to be confirmed
    const { data: createData, error: createError } =
      await svc.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: metadata || undefined,
      });

    if (createError) {
      return new Response(JSON.stringify(createError), {
        status: createError.status,
        headers: buildCorsHeaders(req),
      });
    }

    const newUser = createData.user;
    if (!newUser || !newUser.id) {
      return new Response(
        JSON.stringify({
          error: "Auth user created but missing id",
        }),
        {
          status: 500,
          headers: buildCorsHeaders(req),
        },
      );
    }
    // Build profile row: ensure id is set to the auth user's id and user_id is adminUid
    const now = new Date().toISOString();
    const profileRow = {
      id: newUser.id,
      user_id: adminUid,
      email: newUser.email,
      created_at: now,
      ...profile,
    };
    // Ensure profile cannot override id, user_id or created_at
    profileRow.id = newUser.id;
    profileRow.user_id = adminUid;
    profileRow.created_at = now;
    // Insert profile row with same id
    const { data: profileData, error: profileError } = await svc
      .from("profiles")
      .insert(profileRow)
      .select()
      .single();
    if (profileError) {
      // Attempt to rollback user creation if profile insert fails
      console.error(
        "Profile insert failed, attempting to delete created auth user",
        profileError.message,
      );
      await svc.auth.admin
        .deleteUser(newUser.id)
        .catch((e) => console.error("Rollback delete failed", e));
      return new Response(
        JSON.stringify({
          error: "Failed to create profile row",
          detail: profileError.message,
        }),
        {
          status: 500,
          headers: buildCorsHeaders(req),
        },
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        user: newUser,
        profile: profileData,
      }),
      {
        status: 201,
        headers: buildCorsHeaders(req),
      },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        error: "Internal error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});
