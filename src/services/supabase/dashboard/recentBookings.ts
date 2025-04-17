import { supabase } from '../config';
import type { Booking } from '../../../types/bookings';

export async function fetchRecentBookings(companyId: string): Promise<Booking[]> {
  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      id,
      booking_reference,
      booking_status,
      booking_seated_date,
      booking_seated_time,
      covers_adult,
      covers_child,
      location:locations (
        public_name
      ),
      contact:contacts (
        id,
        first_name,
        last_name,
        email
      )
    `)
    .eq('company_id', companyId)
    .order('updated', { ascending: false })
    .limit(5);

  if (error) throw error;
  return booking as unknown as Booking[];
}
