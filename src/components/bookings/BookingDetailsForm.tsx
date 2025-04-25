import React, { useState } from 'react';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { FormField } from '../common/FormField';
import type { Location, VenueGroup } from '../../types/locations';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { BookingOccasion } from '../../types/bookings';


interface BookingFormValues {
  venue_group_id?: string;
  location_id: string;
  booking_source: string;
  booking_type: string;
  booking_occasion: string;
  booking_seated_date: string;
  booking_seated_time: string;
  covers_adult: number;
  covers_child: number;
  duration: number;
  special_requests: string;
  notes: string;
}

interface BookingDetailsFormProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  locations: Location[];
  venueGroups: VenueGroup[];
  selectedVenueGroup: string | undefined;
  occasions: BookingOccasion[];
}

export const BookingDetailsForm: React.FC<BookingDetailsFormProps> = ({
  register,
  errors,
  locations,
  venueGroups,
  selectedVenueGroup,
}) => {
  const [isExpanded, setIsExpanded] = useState(true); // Add state for expansion

  // Filter locations based on selected venue group
  const filteredLocations = selectedVenueGroup
    ? locations.filter(loc => loc.venue_group_id === selectedVenueGroup)
    : locations || [];

    

  return (
    <div className="bg-dark-secondary rounded-lg border border-dark-border">
      {/* Header Section - Make it clickable */}
      <div
        className="flex items-center justify-between gap-3 p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)} // Toggle state on click
      >
        <div className="flex items-center gap-3">
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
        {/* Toggle Icon */}
        <button type="button" className="text-dark-text-secondary hover:text-dark-text-primary">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Conditionally Rendered Content */}
      {isExpanded && (
        <div className="p-6 pt-0 space-y-6 border-t border-dark-border">
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
                <p className="text-sm text-red-400">{errors.location_id.message?.toString()}</p>
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-text-secondary">
                Booking Occasion
              </label>
              <select
                {...register('booking_occasion')}
                className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
                  text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50"
              >
                <option value="">Select an Occasion</option>
                
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              label="Date"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              min={new Date().toISOString().split('T')[0]}
              {...register('booking_seated_date')}
              error={errors.booking_seated_date?.message?.toString()}
            />
            <FormField
              label="Time"
              type="time"
              defaultValue={new Date().toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              {...register('booking_seated_time')}
              error={errors.booking_seated_time?.message?.toString()}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <FormField
              label="Adult Guests"
              type="number"
              min={1}
              defaultValue={2}
              {...register('covers_adult', { valueAsNumber: true })}
              error={errors.covers_adult?.message?.toString()}
            />
            <FormField
              label="Child Guests"
              type="number"
              min={0}
              {...register('covers_child', { valueAsNumber: true })}
              error={errors.covers_child?.message?.toString()}
            />
            <FormField
              label="Duration (minutes)"
              type="number"
              min={30}
              step={15}
              {...register('duration', { valueAsNumber: true })}
              error={errors.duration?.message?.toString()}
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
      )}
    </div>
  );
};