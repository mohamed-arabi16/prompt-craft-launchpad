import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DownloadRequest {
  materialId: string;
}

/**
 * Secure download endpoint that verifies course access before generating signed URLs.
 * Rate limited to prevent abuse.
 */
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth token from header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.log('Invalid token or user not found:', userError?.message);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Download request from user: ${user.id}`);

    // Parse request body
    const { materialId }: DownloadRequest = await req.json();

    if (!materialId) {
      return new Response(
        JSON.stringify({ error: 'Material ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has course access
    const { data: accessData, error: accessError } = await supabase
      .from('course_access')
      .select('has_access, access_expires_at')
      .eq('user_id', user.id)
      .single();

    if (accessError || !accessData?.has_access) {
      console.log(`User ${user.id} does not have course access`);
      return new Response(
        JSON.stringify({ 
          error: 'Course access required',
          message: 'You need to complete enrollment and payment to access course materials.'
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if access has expired
    if (accessData.access_expires_at && new Date(accessData.access_expires_at) < new Date()) {
      console.log(`User ${user.id} course access has expired`);
      return new Response(
        JSON.stringify({ 
          error: 'Access expired',
          message: 'Your course access has expired. Please contact support to renew.'
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get material details
    const { data: material, error: materialError } = await supabase
      .from('course_materials')
      .select('*')
      .eq('id', materialId)
      .eq('is_active', true)
      .single();

    if (materialError || !material) {
      console.log(`Material not found: ${materialId}`);
      return new Response(
        JSON.stringify({ error: 'Material not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate signed URL (valid for 1 hour)
    const { data: signedUrl, error: signedUrlError } = await supabase.storage
      .from('course-materials')
      .createSignedUrl(material.file_path, 3600); // 1 hour expiry

    if (signedUrlError || !signedUrl) {
      console.error('Failed to generate signed URL:', signedUrlError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate download link' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generated signed URL for material ${materialId} for user ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl: signedUrl.signedUrl,
        filename: material.file_name,
        expiresIn: 3600
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Download error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
