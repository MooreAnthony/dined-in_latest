export interface Table {
  id: string;
  company_id: string;
  name: string;
  capacity: number;
  location: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  company_id: string;
  table_id: string | null;
  booking_reference: string;
  location_id: string | null;
  location_group_id: string | null;
  contact_id: string | null;
  external_reference: string | null;
  booking_source: 'In house' | 'Online' | 'Phone' | 'Internal';
  booking_type: 'Table' | 'Function';
  booking_occasion: string | null;
  booking_seated_date: string;
  contact: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    birthday_month: string | null;
    birthday_day: string | null;
    street_address: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
    email_consent: boolean;
    sms_consent: boolean;
    notes: string | null;
  } | null;
  location: {
    id: string;
    public_name: string;
  } | null;
  booking_seated_time: string;
  datetime_of_slot: string;
  time_slot_iso: string;
  booking_status: BookingStatus;
  covers_adult: number;
  covers_child: number;
  arrived_guests: number | null;
  deposit_required: boolean;
  deposit_amount_required: number | null;
  deposit_paid: number;
  total_payment: number;
  total_net_payment: number;
  total_gross_payment: number;
  duration: number | null;
  tags: string[] | null;
  pos_tickets: { ticket_id: string; amount: number; timestamp: string }[] | null;
  seated_time: string | null;
  left_time: string | null;
  guests: number;
  special_requests: string | null;
  notes: string | null;
  created_at: string;
  modified_at: string;
  created_by: string | null;
  modified_by: string | null;
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

export interface CreateBookingData {
  table_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_dob_month: string;
  booking_date: string;
  booking_time: string;
  guests: number;
  special_requests?: string;
  notes?: string;
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
export interface UpdateBookingData extends Partial<CreateBookingData> {
  status?: BookingStatus;
    booking_status?: string;
    guests?: number;
    table_id?: string;
    notes?: string;
    booking_seated_date?: string;
    booking_seated_time?: string;
    location_id: string;
    booking_source: string; 
    booking_type: string;
    booking_occasion?: string;
    covers_adult: number;
    covers_child?: number;
    duration: number;
    special_requests?: string;
    arrived_guests: number | null;
    deposit_required: boolean;
    deposit_amount_required: number | null;
    deposit_paid: number;
    total_payment: number;
    total_net_payment: number;
    total_gross_payment: number;
    pos_tickets: { ticket_id: string; amount: number; timestamp: string }[] | null;
    seated_time: string | null;
    left_time: string | null;
    tags: string[] | null;
    table_ids: string[] | null;
}