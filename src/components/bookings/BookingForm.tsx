import React from 'react';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Calendar, Users } from 'lucide-react';
import { FormField } from '../common/FormField'; 
import { Button } from '../common/Button';
import type { Table, Booking, CreateBookingData, UpdateBookingData } from '../../types/bookings';
import { useForm } from 'react-hook-form';

const bookingSchema = z.object({
  table_id: z.string().optional(),
  customer_name: z.string().min(1, 'Customer name is required'),
  customer_email: z.string().email('Invalid email address'),
  customer_phone: z.string().optional(),
  customer_dob_month: z.string().nullable().optional(),
  customer_dob_day: z.string().nullable().optional(),
  customer_address1: z.string().optional(),
  customer_postcode: z.string().optional(),
  customer_city: z.string().optional(),
  customer_state: z.string().optional(),
  booking_date: z.string().min(1, 'Booking date is required'),
  booking_time: z.string().min(1, 'Booking time is required'),
  guests: z.number().min(1, 'At least 1 guest is required'),
  special_requests: z.string().optional(),
  notes: z.string().optional(),
});

interface BookingFormProps {
  tables: Table[];
  booking?: Booking;
  isEditing?: boolean;
  onSubmit: (data: CreateBookingData | UpdateBookingData) => Promise<void>;
  onCancel: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  tables,
  booking,
  isEditing = false,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, 
  } = useForm<CreateBookingData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {} // <-- Empty to avoid stale values
  });
  
  // Reset form values when `booking` changes
  useEffect(() => {
    if (isEditing && booking) {
      reset({
        customer_name: booking.contact ? `${booking.contact.first_name} ${booking.contact.last_name}` : '',
        customer_email: booking.contact?.email || '',
        customer_phone: booking.contact?.mobile || '',
        customer_dob_month: booking.contact?.birthday_month || '',
        customer_dob_day: booking.contact?.birthday_day || undefined,
        customer_address1: booking.contact?.street_address || '',
        customer_postcode: booking.contact?.postal_code || '',
        customer_city: booking.contact?.city || '',
        customer_state: booking.contact?.state || '',
        booking_date: booking.booking_seated_date,
        booking_time: booking.booking_seated_time,
        guests: booking.covers_adult + booking.covers_child,
        special_requests: booking.special_requests || 'no special requests',
        notes: booking.notes || '',
        table_id: booking.table_id || undefined,
      });
    }
  }, [booking, isEditing, reset]); // <-- Runs when `booking` changes
  

  const handleFormSubmit = async (data: CreateBookingData) => {
    if (isEditing && booking) {
      // Format data for update
      const updateData: UpdateBookingData = {
        ...booking, // Spread the existing booking data
        location_id: booking.location_id || '',
        booking_source: booking.booking_source,
        booking_type: booking.booking_type,
        duration: booking.duration ?? 0,
        booking_status: booking.booking_status,
        booking_occasion: booking.booking_occasion ?? 'Birthday',
        booking_seated_date: data.booking_seated_date || '',
        booking_seated_time: data.booking_seated_time,
        covers_adult: data.guests,
        covers_child: 0,
        table_ids: [booking.table_id ?? ''],
        table_id: booking.table_id ?? '',
        special_requests: booking.special_requests ?? '',
        notes: booking.notes ?? 'no notes',
      };
      await onSubmit(updateData);
    } else {
        const createData: CreateBookingData = {
          customer_name: data.contact ? `${data.contact.first_name} ${data.contact.last_name}` : '',
          customer_email: data.contact ? data.contact.email : '',
          customer_phone: data.contact ? data.contact.mobile : '',
          customer_dob_month: data.contact?.birthday_month || '',
          customer_dob_day: data.contact?.birthday_day || '',
          customer_address1: data.contact?.street_address || '',
          customer_postcode: data.contact?.postal_code || '',
          customer_country: data.contact?.country || '',
          booking_occasion: booking?.booking_occasion ?? 'Birthday',
          customer_city: data.contact?.city || '',
          customer_state: data.contact?.state || '',
          booking_seated_date: data.booking_seated_date,
          booking_seated_time: data.booking_seated_time,
          covers_adult: data.covers_adult,
          covers_child: data.covers_child,
          special_requests: data.special_requests || 'no special requests',
          notes: data.notes || 'no notes',
          table_id: data.table_id || undefined,
          location_id: booking?.location_id || '',
          booking_source: booking?.booking_source || '',
          booking_type: booking?.booking_type || '',
          booking_status: booking?.booking_status || 'New',
          duration: booking?.duration ?? 60,
        };
        await onSubmit(createData);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Customer Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-dark-border">
          <div className="p-2 bg-dark-accent/10 rounded-lg">
            <User className="w-5 h-5 text-dark-accent" />
          </div>
          <div>
            <h3 className="font-medium text-dark-text-primary">Customer Details</h3>
            <p className="text-sm text-dark-text-secondary">
              {isEditing ? 'Contact information for this booking' : 'Search for an existing contact or enter new details'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Name"
            {...register('customer_name')}
            error={errors.customer_name?.message}
            disabled={isEditing}
          />
          <FormField
            label="Email"
            type="email"
            {...register('customer_email')}
            error={errors.customer_email?.message}
            disabled={isEditing}
          />
        </div>
        <FormField
          label="Phone"
          {...register('customer_phone')}
          error={errors.customer_phone?.message}
          disabled={isEditing}
        />
      </div>

      {/* Booking Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-dark-border">
          <div className="p-2 bg-dark-accent/10 rounded-lg">
            <Calendar className="w-5 h-5 text-dark-accent" />
          </div>
          <div>
            <h3 className="font-medium text-dark-text-primary">Booking Details</h3>
            <p className="text-sm text-dark-text-secondary">
              Date, time, and table information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Date"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            {...register('booking_date')}
            error={errors.booking_date?.message}
          />
          <FormField
            label="Time"
            type="time"
            {...register('booking_time')}
            error={errors.booking_time?.message}
          />
          <FormField
            label="Number of Guests"
            type="number"
            min="1"
            {...register('guests', { valueAsNumber: true })}
            error={errors.guests?.message}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-dark-text-secondary">
              Table (Optional)
            </label>
            <select
              {...register('table_id')}
              className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
                text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50"
            >
              <option value="">Select a table</option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.name} (Capacity: {table.capacity})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-dark-border">
          <div className="p-2 bg-dark-accent/10 rounded-lg">
            <Users className="w-5 h-5 text-dark-accent" />
          </div>
          <div>
            <h3 className="font-medium text-dark-text-primary">Additional Information</h3>
            <p className="text-sm text-dark-text-secondary">
              Special requests and internal notes
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-text-secondary">
            Special Requests
          </label>
          <textarea
            {...register('special_requests')}
            rows={3}
            className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
              text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50
              resize-none"
            placeholder="Any special requests or dietary requirements?"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-text-secondary">
            Internal Notes
          </label>
          <textarea
            {...register('notes')}
            rows={2}
            className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
              text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50
              resize-none"
            placeholder="Add internal notes about this booking"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="flex items-center gap-2"
        >
          {isEditing ? 'Update Booking' : 'Create Booking'}
        </Button>
      </div>
    </form>
  );
};

