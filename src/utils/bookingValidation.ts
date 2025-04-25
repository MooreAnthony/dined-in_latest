import { z } from 'zod';

export const createBookingSchema = z.object({
  // Contact Details
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
  birthday_month: z.number().min(1).max(12).optional().nullable(),
  birthday_day: z.number().min(1).max(31).optional().nullable(),
  street_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  email_consent: z.boolean().default(false),
  sms_consent: z.boolean().default(false),
  
  // Booking Details
  venue_group_id: z.string().optional(),
  location_id: z.string().min(1, 'Location is required'),
  booking_source: z.enum(['In house', 'Online', 'Phone', 'Internal']),
  booking_type: z.enum(['Table', 'Function']),
  booking_occasion_id: z.string().optional(),
  booking_seated_date: z.string().min(1, 'Date is required'),
  booking_seated_time: z.string().min(1, 'Time is required'),
  covers_adult: z.number().min(1, 'At least 1 adult guest is required'),
  covers_child: z.number().default(0),
  duration: z.number().min(30, 'Duration must be at least 30 minutes'),
  special_requests: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateBookingFormData = z.infer<typeof createBookingSchema>;