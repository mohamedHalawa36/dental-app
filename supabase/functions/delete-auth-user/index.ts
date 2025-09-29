import { createClient } from "npm:@supabase/supabase-js@2.28.0";
console.info("Delete Auth User function starting (with CORS)");
const CORS_ALLOWED_ORIGINS = (Deno.env.get('CORS_ALLOWED_ORIGINS') || '').split(',').map((s)=>s.trim()).filter(Boolean); // optional env var
function buildCorsHeaders(req) {
  const origin = req.headers.get('origin') || '*';
  const allowed = CORS_ALLOWED_ORIGINS.length === 0 ? origin : CORS_ALLOWED_ORIGINS.includes(origin) ? origin : null;
  const base = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
  if (allowed) base['Access-Control-Allow-Origin'] = allowed;
  // Allow credentials if origin matched
  if (allowed && allowed !== '*') base['Access-Control-Allow-Credentials'] = 'true';
  return base;
}
Deno.serve(async (req)=>{
  try {
    // Handle preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: buildCorsHeaders(req)
      });
    }
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'Only POST allowed'
      }), {
        status: 405,
        headers: buildCorsHeaders(req)
      });
    }
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({
        error: 'Server not configured'
      }), {
        status: 500,
        headers: buildCorsHeaders(req)
      });
    }
    const authHeader = req.headers.get('Authorization') || '';
    const match = authHeader.match(/Bearer\s+(.+)/i);
    if (!match) return new Response(JSON.stringify({
      error: 'Missing Authorization header'
    }), {
      status: 401,
      headers: buildCorsHeaders(req)
    });
    const accessToken = match[1];
    const body = await req.json().catch(()=>null);
    if (!body || !body.user_id) {
      return new Response(JSON.stringify({
        error: 'Missing target user_id in body'
      }), {
        status: 400,
        headers: buildCorsHeaders(req)
      });
    }
    const targetUserId = body.user_id;
    // Validate requester token to get their user id
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false
      }
    });
    const { data: getUserData, error: getUserError } = await anonClient.auth.getUser(accessToken);
    if (getUserError || !getUserData?.user) {
      return new Response(JSON.stringify({
        error: 'Invalid access token'
      }), {
        status: 401,
        headers: buildCorsHeaders(req)
      });
    }
    const requesterId = getUserData.user.id;
    // Service role client for sensitive DB reads and admin actions
    const svcClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false
      }
    });
    // Check requester is admin
    const { data: requesterProfile, error: requesterProfileError } = await svcClient.from('profiles').select('is_admin').eq('id', requesterId).single();
    if (requesterProfileError) {
      return new Response(JSON.stringify({
        error: 'Error checking requester profile',
        detail: requesterProfileError.message
      }), {
        status: 500,
        headers: buildCorsHeaders(req)
      });
    }
    if (!requesterProfile || requesterProfile.is_admin !== true) {
      return new Response(JSON.stringify({
        error: 'Forbidden: admin only'
      }), {
        status: 403,
        headers: buildCorsHeaders(req)
      });
    }
    // Prevent deleting other admins: check target's profile
    const { data: targetProfile, error: targetProfileError } = await svcClient.from('profiles').select('is_admin').eq('id', targetUserId).single();
    if (targetProfileError && targetProfileError.code !== 'PGRST116') {
      return new Response(JSON.stringify({
        error: 'Error checking target profile',
        detail: targetProfileError.message
      }), {
        status: 500,
        headers: buildCorsHeaders(req)
      });
    }
    if (targetProfile && targetProfile.is_admin === true) {
      return new Response(JSON.stringify({
        error: 'Forbidden: cannot delete another admin'
      }), {
        status: 403,
        headers: buildCorsHeaders(req)
      });
    }
    // Proceed to delete the target user via admin API
    const { data: deletedData, error: deleteError } = await svcClient.auth.admin.deleteUser(targetUserId);
    if (deleteError) {
      return new Response(JSON.stringify({
        error: 'Failed to delete auth user',
        detail: deleteError.message
      }), {
        status: 500,
        headers: buildCorsHeaders(req)
      });
    }
    // After auth user deleted, remove their profile row if it exists
    const { data: deletedProfiles, error: deleteProfileError } = await svcClient.from('profiles').delete().eq('id', targetUserId);
    if (deleteProfileError) {
      console.error('Failed to delete profile row for', targetUserId, deleteProfileError.message);
      return new Response(JSON.stringify({
        success: true,
        auth_deleted: true,
        profile_deleted: false,
        detail: deleteProfileError.message
      }), {
        status: 200,
        headers: buildCorsHeaders(req)
      });
    }
    return new Response(JSON.stringify({
      success: true,
      auth_deleted: true,
      profile_deleted: true,
      result: deletedData
    }), {
      status: 200,
      headers: buildCorsHeaders(req)
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      error: 'Internal error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});
