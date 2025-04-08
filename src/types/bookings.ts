export interface Table {
  id: string;
  company_id: string;
  name: string;
  capacity: number;
  location: string | null;
  is_active: boolean;
  created_at: string;
}

export interface CreateBooking {
  booking_reference: string;
  booking_seated_date: string;
  booking_seated_time: string;
  booking_source: string;
  booking_status: string;
  booking_type: string;
  company_id?: string | null;
  contact_id?: string | null;
  location_id?: string | null;
  location_group_id?: string | null;
  table_ids?: string[] | null;
  tags?: string[] | null;
  covers_adult?: number;
  covers_child?: number;
  guests: number;
  special_requests?: string | null;
  notes?: string | null;
  arrived_guests?: number | null;
  duration?: number | null;
  datetime_of_slot: string;
  time_slot_iso: string;
  deposit_required?: boolean | null;
  deposit_amount_required?: number | null;
  deposit_paid?: number | null;
  outstanding_balance?: number | null;
  total_payment?: number | null;
  total_net_payment?: number | null;
  total_gross_payment?: number | null;
  pos_tickets?: POS_Ticket[] | null;
  seated_time?: string | null;
  left_time?: string | null;
  created?: string | null;
  updated?: string | null;
  deleted?: string | null;
}


export interface UpdateBooking {
  id?: string;
  booking_reference?: string;
  booking_seated_date?: string;
  booking_seated_time?: string;
  booking_source?: string;
  booking_status?: string;
  booking_type?: string;
  company_id?: string | null;
  contact_id?: string | null;
  location_id?: string | null;
  location_group_id?: string | null;
  table_ids?: string[] | null;
  tags?: string[] | null;
  covers_adult?: number;
  covers_child?: number;
  guests?: number;
  special_requests?: string | null;
  notes?: string | null;
  arrived_guests?: number | null;
  duration?: number | null;
  datetime_of_slot?: string;
  time_slot_iso?: string;
  deposit_required?: boolean | null;
  deposit_amount_required?: number | null;
  deposit_paid?: number | null;
  outstanding_balance?: number | null;
  total_payment?: number | null;
  total_net_payment?: number | null;
  total_gross_payment?: number | null;
  pos_tickets?: POS_Ticket[] | null;
  seated_time?: string | null;
  left_time?: string | null;
  created?: string | null;
  updated?: string | null;
  deleted?: string | null;
}


export type BookingStatus = 'New' | 'Pending' | 'Enquiry' | 'No Show' | 'Arrived' | 'Complete' | 'Cancelled';

export interface BookingFilters {
  search?: string;
  locationId?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: BookingStatus;
  minGuests?: number;
  maxGuests?: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  birthday_month?: string | null;
  birthday_day?: string | null;
  street_address?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  email_consent: boolean;
  sms_consent: boolean;
  notes?: string | null;
  contact_tags?: Tag | null;
}


export interface Location {
  id: string;
  public_name: string;
}


export interface POS_Ticket {
  ticket_id: string;
  amount: number;
  timestamp: string;
}


export interface ContactFields {
  first_name: boolean;
  last_name: boolean;
  birthday_month: boolean;
  birthday_day: boolean;
  street_address: boolean;
  city: boolean;
  state: boolean;
  postal_code: boolean;
  country: boolean;
  communication: boolean;
  tags: boolean;
}

export interface Booking {
  id: string;
  booking_reference: string;
  booking_seated_date: string;
  booking_seated_time: string;
  booking_source: string;
  booking_status: string;
  booking_type: string;
  booking_occasion?: string | null;
  company_id?: string | null;
  contact_id?: string | null;
  location_id?: string | null;
  location_group_id?: string | null;
  table_ids?: string[] | null;
  tags?: string[] | null;
  covers_adult: number;
  covers_child?: number;
  guests: number;
  special_requests?: string | null;
  notes?: string | null;
  arrived_guests?: number | null;
  duration?: number | null;
  datetime_of_slot: string;
  time_slot_iso: string;
  deposit_required?: boolean | null;
  deposit_amount_required?: number | null;
  deposit_paid?: number | null;
  outstanding_balance?: number | null;
  total_payment?: number | null;
  total_net_payment?: number | null;
  total_gross_payment?: number | null;
  pos_tickets?: POS_Ticket[] | null;
  seated_time?: string | null;
  left_time?: string | null;
  created?: string | null;
  updated?: string | null;
  deleted?: string | null;
  contact: Contact;
  location: Location;
}
