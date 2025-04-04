import React from 'react';
import { Building2 } from 'lucide-react';
import { FormField } from '../common/FormField';
import type { Location } from '../../types/locations';

interface BookingDetailsFormProps {
  register: any; // TODO: Add proper type from react-hook-form
  errors: any; // TODO: Add proper type from react-hook-form
  locations: Location[];
  venueGroups: { id: string; name: string }[];
  selectedVenueGroup: string | undefined;
}

export const BookingDetailsForm: React.FC<BookingDetailsFormProps> = ({
  register,
  errors,
  locations,
  venueGroups,
  selectedVenueGroup,
}) => {
  // Filter locations based on selected venue group
  const filteredLocations = selectedVenueGroup
    ? locations.filter(loc => loc.venue_group_id === selectedVenueGroup)
    : locations || [];

  return (
    <div className="bg-dark-secondary rounded-lg border border-dark-border p-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-dark-border">
        <div className="p-2 bg-dark-accent/10 rounded-lg">
          <Building2 className="w-5 h-5 text-dark-accent" />
        </div>
        <div>
          <h3 className="font-medium text-dark-text-primary">Booking Details</h3>
          <p className="text-sm text-dark-text-secondary">
            Enter the booking information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-text-secondary">
            Venue Group
          </label>
          <select
            {...register('venue_group_id')}
            className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
              text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50"
          >
            <option value="">All Venues</option>
            {(venueGroups || []).map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-text-secondary">
            Location
          </label>
          <select
            {...register('location_id')}
            className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
              text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50"
          >
            <option value="">Select a location</option>
            {filteredLocations.map(location => (
              <option key={location.id} value={location.id}>
                {location.public_name}
              </option>
            ))}
          </select>
          {errors.location_id && (
            <p className="text-sm text-red-400">{errors.location_id.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-text-secondary">
            Booking Source
          </label>
          <select
            {...register('booking_source')}
            className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
              text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50"
          >
            <option value="In house">In House</option>
            <option value="Online">Online</option>
            <option value="Phone">Phone</option>
            <option value="Internal">Internal</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-text-secondary">
            Booking Type
          </label>
          <select
            {...register('booking_type')}
            className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
              text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50"
          >
            <option value="Table">Table</option>
            <option value="Function">Function</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormField
          label="Date"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          {...register('booking_seated_date')}
          error={errors.booking_seated_date?.message}
        />
        <FormField
          label="Time"
          type="time"
          {...register('booking_seated_time')}
          error={errors.booking_seated_time?.message}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <FormField
          label="Adult Guests"
          type="number"
          min={1}
          {...register('covers_adult', { valueAsNumber: true })}
          error={errors.covers_adult?.message}
        />
        <FormField
          label="Child Guests"
          type="number"
          min={0}
          {...register('covers_child', { valueAsNumber: true })}
          error={errors.covers_child?.message}
        />
        <FormField
          label="Duration (minutes)"
          type="number"
          min={30}
          step={15}
          {...register('duration', { valueAsNumber: true })}
          error={errors.duration?.message}
        />
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
          placeholder="Enter any special requests..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-dark-text-secondary">
          Internal Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
            text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50
            resize-none"
          placeholder="Add internal notes..."
        />
      </div>
    </div>
  );
};