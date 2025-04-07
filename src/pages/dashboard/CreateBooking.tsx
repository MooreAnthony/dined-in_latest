import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useCompany } from '../../contexts/CompanyContext';
import { useTags } from '../../hooks/useTags';
import { fetchBooking } from '../../services/supabase/bookings';
import { useLocations } from '../../hooks/useLocations';
import { ContactSearch } from '../../components/bookings/ContactSearch';
import { ContactDetails } from '../../components/bookings/ContactDetails';
import { ContactTagsSection } from '../../components/bookings/ContactTagsSection';
import { BookingDetailsForm } from '../../components/bookings/BookingDetailsForm';
import { FormActions } from '../../components/bookings/FormActions';
import { useBookingForm } from '../../hooks/useBookingForm';
import type { Booking } from '../../types/bookings';
import { MessageBox } from '../../components/common/MessageBox';

export const CreateBooking: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: bookingId } = useParams();
  const [isLoadingBooking, setIsLoadingBooking] = useState(!!bookingId);
  const { currentCompany } = useCompany();
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  //const [venueGroups] = useState<{ id: string; name: string }[]>([]);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false); // State for MessageBox

  const { locations, isLoading } = useLocations();
  const { tags: contactTags } = useTags(currentCompany?.id, 'contact');

  const {
    register,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
    isSearching,
    showFields,
    selectedContactTags,
    setSelectedContactTags,
    handleContactSearch,
    handleCreateContactTag,
    onSubmit,
  } = useBookingForm(bookingId, location.state);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    if (!bookingId || !currentCompany) return;

    const loadBooking = async () => {
      setIsLoadingBooking(true);
      try {
        const booking = await fetchBooking(bookingId);
        setCurrentBooking(booking);
        hasFetched.current = true;
      } catch (error) {
        console.error('Failed to load booking:', error);
        navigate('/dashboard/bookings');
      } finally {
        setIsLoadingBooking(false);
      }
    };

    loadBooking();
  }, [bookingId, currentCompany, navigate]);

  const selectedVenueGroup = watch('venue_group_id');

  if (isLoading || isLoadingBooking) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="p-4 bg-dark-accent/10 rounded-full">
            <Loader2 className="w-12 h-12 text-dark-accent animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-dark-text-primary">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  if (!currentCompany) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="p-4 bg-red-400/10 rounded-full">
            <Calendar className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-dark-text-primary">
            No Company Selected
          </h2>
          <p className="text-dark-text-secondary">
            Please select a company to create bookings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowCancelConfirm(true)} // Show MessageBox on cancel
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-dark-text-primary">
            {bookingId
              ? `Edit Booking ${currentBooking?.booking_reference ? `- ${currentBooking.booking_reference}` : ''}`
              : 'New Booking'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Contact Details */}
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
            onTagSelect={setSelectedContactTags}
            onCreateTag={handleCreateContactTag}
          />
        </div>

        {/* Booking Details */}
        <BookingDetailsForm
          register={register}
          errors={errors}
          locations={locations}
         // venueGroups={venueGroups}
          selectedVenueGroup={selectedVenueGroup}
        />

        {/* Form Actions */}
        <FormActions
          onCancel={() => setShowCancelConfirm(true)} // Show MessageBox on cancel
          isSubmitting={isSubmitting}
          isEditing={!!bookingId}
        />
      </form>

      {/* MessageBox for Cancel Confirmation */}
      {showCancelConfirm && (
        <MessageBox
          title="Cancel Booking"
          message="Are you sure you want to cancel? Any unsaved changes will be lost."
          onConfirm={() => {
            setShowCancelConfirm(false);
            navigate('/dashboard/bookings');
          }}
          onCancel={() => setShowCancelConfirm(false)}
        />
      )}
    </div>
  );
};