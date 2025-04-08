import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../contexts/CompanyContext';
import { findContactByEmailOrMobile } from '../services/supabase/contacts';
import { createBookingWithContact, updateBooking, fetchBooking } from '../services/supabase/bookings';
import { addContactTags, removeContactTags } from '../services/supabase/tags';
import { createBookingSchema, type CreateBookingFormData } from '../utils/bookingValidation';
import type { ContactFields, Booking } from '../types/bookings';
import { useEffect } from 'react';

export const useBookingForm = (bookingId?: string, initialData = {}) => {
  const navigate = useNavigate();
  const { currentCompany } = useCompany();
  const [selectedContactTags, setSelectedContactTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentBooking ] = useState<Booking | null>(null);
  const [showFields, setShowFields] = useState<ContactFields>({
    first_name: false,
    last_name: false,
    birthday_month: false,
    birthday_day: false,
    street_address: false,
    city: false,
    state: false,
    postal_code: false,
    country: false,
    communication: false,
    tags: false,
  });

  // Form setup with initial values
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreateBookingFormData>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      ...initialData,
      booking_source: 'In house',
      booking_type: 'Table',
      covers_child: 0,
      duration: 90,
      email_consent: false,
      sms_consent: false,
    },
  });

  // Load booking data if editing
  useEffect(() => {
    const loadBookingData = async () => {
      if (bookingId && currentCompany) {
        try {
          const booking = await fetchBooking(bookingId);

          // Populate form with booking data
          if (booking) {
            // Contact information
            if (booking.contact) {
              setValue('first_name', booking.contact.first_name);
              setValue('last_name', booking.contact.last_name);
              setValue('email', booking.contact.email);
              setValue('mobile', booking.contact.mobile);
              setValue('birthday_month', booking.contact.birthday_month ? Number(booking.contact.birthday_month) : undefined);
              setValue('birthday_day', booking.contact.birthday_day ? Number(booking.contact.birthday_day) : undefined);
              setValue('street_address', booking.contact.street_address || '');
              setValue('city', booking.contact.city || '');
              setValue('state', booking.contact.state || '');
              setValue('postal_code', booking.contact.postal_code || '');
              setValue('country', booking.contact.country || '');
              setValue('email_consent', booking.contact.email_consent || false);
              setValue('sms_consent', booking.contact.sms_consent || false);

              // Set selected contact tags
              setSelectedContactTags(Array.isArray(booking.contact.contact_tags) ? booking.contact.contact_tags.map((tag) => tag.id) : []);
            }

            // Booking details
            setValue('booking_seated_date', booking.booking_seated_date);
            setValue('booking_seated_time', booking.booking_seated_time);
            setValue('location_id', booking.location_id || '');
            setValue('booking_source', booking.booking_source as 'In house' | 'Online' | 'Phone' | 'Internal');
            setValue('booking_type', booking.booking_type as 'Table' | 'Function');
            setValue('booking_occasion', booking.booking_occasion || '');
            setValue('covers_adult', booking.covers_adult);
            setValue('covers_child', booking.covers_child ?? 0);
            setValue('duration', booking.duration || 90);
            setValue('special_requests', booking.special_requests || '');
            setValue('notes', booking.notes || '');

            // Show all contact fields
            setShowFields({
              first_name: true,
              last_name: true,
              birthday_month: true,
              birthday_day: true,
              street_address: true,
              city: true,
              state: true,
              postal_code: true,
              country: true,
              communication: true,
              tags: true,
            });
          }
        } catch (error) {
          console.error('Failed to load booking:', error);
        }
      }
    };

    loadBookingData();
  }, [bookingId, currentCompany, setValue]);

  const handleContactSearch = async (field: 'email' | 'mobile') => {
    if (!currentCompany?.id) return;

    setIsSearching(true);
    try {
      const email = field === 'email' ? getValues('email') : undefined;
      const mobile = field === 'mobile' ? getValues('mobile') : undefined;

      if (!email && !mobile) return;

      const contact = await findContactByEmailOrMobile(currentCompany.id, email, mobile);

      if (contact) {
        // Populate form with contact details
        setValue('first_name', contact.first_name);
        setValue('last_name', contact.last_name);
        setValue('email', contact.email);
        setValue('mobile', contact.mobile);
        setValue('birthday_month', contact.birthday_month || undefined);
        setValue('birthday_day', contact.birthday_day || undefined);
        setValue('street_address', contact.street_address || '');
        setValue('city', contact.city || '');
        setValue('state', contact.state || '');
        setValue('postal_code', contact.postal_code || '');
        setValue('country', contact.country || '');
        setValue('email_consent', contact.email_consent);
        setValue('sms_consent', contact.sms_consent);

        // Set selected tags
        if (contact.tags) {
          setSelectedContactTags(contact.tags.map(t => t.id));
        }
      } else {
        // Clear form if no contact found
        setValue('first_name', '');
        setValue('last_name', '');
        setValue('birthday_month', undefined);
        setValue('birthday_day', undefined);
        setValue('street_address', '');
        setValue('city', '');
        setValue('state', '');
        setValue('postal_code', '');
        setValue('country', '');
        setValue('email_consent', false);
        setValue('sms_consent', false);
        setSelectedContactTags([]);
      }

      // Show all fields after search
      setShowFields({
        first_name: true,
        last_name: true,
        birthday_month: true,
        birthday_day: true,
        street_address: true,
        city: true,
        state: true,
        postal_code: true,
        country: true,
        communication: true,
        tags: true,
      });
    } catch (error) {
      console.error('Error searching for contact:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const onSubmit = async (data: CreateBookingFormData) => {
    if (!currentCompany) return;

    setIsSubmitting(true);
    try {
      if (bookingId) {
        // Format the datetime properly for timestamp fields
        const formattedSeatedTime = data.booking_seated_date 
          ? `${data.booking_seated_date} ${data.booking_seated_time}`
          : null;

        // Update existing booking
        await updateBooking(bookingId, {
          location_id: data.location_id,
          booking_source: data.booking_source,
          booking_type: data.booking_type,
          booking_seated_date: data.booking_seated_date,
          booking_seated_time: data.booking_seated_time,
          covers_adult: data.covers_adult,
          covers_child: data.covers_child,
          duration: data.duration,
          special_requests: data.special_requests,
          notes: data.notes,
          arrived_guests: 0,
          deposit_required: false,
          deposit_amount_required: 0,
          deposit_paid: 0,
          booking_status: 'New',
          total_payment: 0,
          total_net_payment: 0,
          total_gross_payment: 0,
          pos_tickets: [],
          seated_time: formattedSeatedTime,
          left_time: formattedSeatedTime,
          tags: selectedContactTags,
          table_ids: null,
        });

        // Update contact tags
        interface ContactTag {
          id: string;
        }
        const existingTags: string[] = Array.isArray(currentBooking?.contact?.contact_tags) 
          ? currentBooking?.contact?.contact_tags?.map((tag: ContactTag) => tag.id) 
          : [];
        const tagsToAdd = selectedContactTags.filter(tagId => !existingTags.includes(tagId));
        const tagsToRemove = existingTags.filter(tagId => !selectedContactTags.includes(tagId));

        if (tagsToAdd.length > 0 && currentBooking?.contact?.id) {
          await addContactTags(currentBooking.contact.id, tagsToAdd);
        }
        if (tagsToRemove.length > 0 && currentBooking?.contact?.id) {
          await removeContactTags(currentBooking.contact.id, tagsToRemove);
        }
      } else {
        // Create new booking with contact
        const bookingData = {
          ...data,
          birthday_month: data.birthday_month === null ? undefined : data.birthday_month,
          birthday_day: data.birthday_day === null ? undefined : data.birthday_day,
        };
        const { contact } = await createBookingWithContact(currentCompany.id, bookingData);

        // Add tags to the new contact
        if (selectedContactTags.length > 0 && contact.id) {
          await addContactTags(contact.id, selectedContactTags);
        }
      }

      navigate('/dashboard/bookings');
    } catch (error) {
      console.error('Failed to create booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    reset,
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
    onSubmit,
    addContactTags, // Export addContactTags
  };
};