import React, { useState } from 'react';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { FormField } from '../common/FormField';
import type { Location, VenueGroup } from '../../types/locations';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ContactSearch } from '../../components/bookings/ContactSearch';
import { ContactDetails } from '../../components/bookings/ContactDetails';
import { ContactTagsSection } from '../../components/bookings/ContactTagsSection';

interface BookingFormValues {
  venue_group_id?: string;
  location_id: string;
  booking_source: string;
  booking_type: string;
  booking_seated_date: string;
  booking_seated_time: string;
  covers_adult: number;
  covers_child: number;
  duration: number;
  special_requests: string;
  notes: string;
}

interface ContactDetailsFormProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  locations: Location[];
  venueGroups: VenueGroup[];
  selectedVenueGroup: string | undefined;
}

export const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
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
         <div className="bg-dark-secondary rounded-lg border border-dark-border p-6 space-y-6">
           <div className="flex items-center gap-3 pb-4 border-b border-dark-border">
             <div className="p-2 bg-dark-accent/10 rounded-lg">
               <User className="w-5 h-5 text-dark-accent" />
             </div>
             <div>
               <h3 className="font-medium text-dark-text-primary">Basic Information</h3>
               <p className="text-sm text-dark-text-secondary">Enter the customer's contact information</p>
             </div>
           </div>
 
           <ContactSearch
             onSearch={handleContactSearch}
             register={register}
             errors={errors}
             isSearching={isSearching}
           />
 
           <ContactDetails
             showFields={showFields}
             register={register}
             errors={errors}
             isSearching={isSearching}
           />
 
           <ContactTagsSection
             show={showFields.tags}
             tags={contactTags}
             selectedTags={selectedContactTags}
             contactId={currentBooking?.contact?.id ?? ''}
             user={currentCompany?.id ?? ''}
             onTagSelect={setSelectedContactTags}
             onCreateTag={handleCreateContactTag}
           />
         </div>

  );
};