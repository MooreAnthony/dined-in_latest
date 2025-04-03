# Send Booking Email Edge Function

This Edge Function handles sending transactional emails for bookings using Resend.

## Features

- Sends booking confirmation, cancellation, and amendment emails
- Uses predefined HTML templates from the database
- Supports template variables
- Logs all email attempts (success/failure)
- Handles errors gracefully

## Environment Variables Required

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for database access
- `RESEND_API_KEY`: API key for Resend email service

## Usage

Call the function with:

```typescript
const { data, error } = await supabase.functions.invoke('send-booking-email', {
  body: {
    bookingId: 'uuid',
    templateCode: 'booking_confirmation' // or 'booking_cancellation' or 'booking_amendment'
  }
});
```

## Error Handling

The function will:
1. Log all email attempts to the `email_logs` table
2. Return detailed error messages for debugging
3. Handle CORS and authentication automatically