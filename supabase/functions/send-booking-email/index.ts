import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { Resend } from 'npm:resend@2.1.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface EmailData {
  bookingId: string;
  templateCode: 'booking_confirmation' | 'booking_cancellation' | 'booking_amendment';
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    const { bookingId, templateCode }: EmailData = await req.json();

    // Fetch booking details with contact and location info
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        contact:contacts (
          first_name,
          last_name,
          email
        ),
        location:locations (
          public_name,
          address_line1,
          city,
          state,
          postal_code
        )
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      throw new Error('Booking not found');
    }

    // Fetch email template
    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('company_id', booking.company_id)
      .eq('code', templateCode)
      .eq('is_enabled', true)
      .single();

    if (templateError || !template) {
      throw new Error('Template not found or disabled');
    }

    // Replace template variables
    const htmlContent = template.html_content
      .replace(/{{guest_name}}/g, `${booking.contact.first_name} ${booking.contact.last_name}`)
      .replace(/{{restaurant_name}}/g, booking.location.public_name)
      .replace(/{{booking_date}}/g, new Date(booking.booking_seated_date).toLocaleDateString())
      .replace(/{{booking_time}}/g, booking.booking_seated_time)
      .replace(/{{guest_count}}/g, (booking.covers_adult + booking.covers_child).toString())
      .replace(/{{booking_reference}}/g, booking.booking_reference);

    const subject = template.subject
      .replace(/{{restaurant_name}}/g, booking.location.public_name);

    // Send email using Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `${booking.location.public_name} <bookings@resend.dev>`,
      to: booking.contact.email,
      subject: subject,
      html: htmlContent,
    });

    if (emailError) {
      throw emailError;
    }

    // Log email success
    await supabase
      .from('email_logs')
      .insert({
        company_id: booking.company_id,
        template_id: template.id,
        booking_id: bookingId,
        recipient: booking.contact.email,
        subject: subject,
        status: 'success',
      });

    return new Response(
      JSON.stringify({ success: true, data: emailData }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    // Log email failure
    if (error instanceof Error) {
      await supabase
        .from('email_logs')
        .insert({
          company_id: booking.company_id,
          template_id: template?.id,
          booking_id: bookingId,
          recipient: booking.contact?.email,
          subject: template?.subject,
          status: 'failed',
          error_message: error.message,
        });
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});