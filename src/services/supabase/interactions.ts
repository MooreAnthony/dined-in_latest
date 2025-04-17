import { supabase } from './config';
import { Interaction } from '../../types/interaction'; 


export async function fetchBookingInteractions(bookingId: string): Promise<Interaction[]> {
  const { data: contact, error } = await supabase
    .from('interactions')
    .select()
    .eq('booking_id', bookingId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return contact;
}


export async function fetchContactInteractions(contactId: string): Promise<Interaction[]> {
    const { data: contact, error } = await supabase
      .from('interactions')
      .select()
      .eq('contact_id', contactId)
      .order('created_at', { ascending: false });
  
    if (error) throw error;
    return contact;
  }