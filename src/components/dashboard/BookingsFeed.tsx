import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Building2 } from 'lucide-react';
import { fetchRecentBookings } from '../../services/supabase/dashboard/recentBookings';
import { useCompany } from '../../contexts/CompanyContext';
import type { Booking } from '../../types/bookings';
import { BookingStatusBadge } from '../../components/common/BookingStatusBadge';
import { Link } from 'react-router-dom';

export const BookingsFeed: React.FC = () => {
  const { currentCompany } = useCompany();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      if (!currentCompany?.id) return;
      setLoading(true);
      try {
        const data = await fetchRecentBookings(currentCompany.id);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching recent bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [currentCompany?.id]);

  return (
    <div className="bg-dark-secondary rounded-xl border border-dark-border p-6">
      <h3 className="text-lg font-semibold text-dark-text-primary mb-4">Recent Bookings</h3>
      {loading ? (
        <p className="text-dark-text-secondary">Loading...</p>
      ) : (
        <div className="space-y-4">
{bookings.map((booking) => (
  <Link
    to={`/dashboard/bookings/${booking.id}`}
    key={booking.id}
    className="block" // ensures link wraps the card correctly
  >
    <div
      className="flex items-center justify-between p-4 rounded-lg bg-dark-primary border border-dark-border hover:border-dark-accent transition-colors duration-200 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-dark-accent/10 rounded-lg">
          <Calendar className="w-5 h-5 text-dark-accent" />
        </div>
        <div>
          <p className="font-medium text-dark-text-primary">
            {booking.contact?.first_name} {booking.contact?.last_name}
            <span className="text-sm text-dark-text-secondary"> ({booking.contact?.email})</span>
          </p>

          <div className="flex items-center">
            <Building2 className="w-4 h-4 mr-1" />
            {booking.location?.public_name}
          </div>

          <div className="flex items-center space-x-4 mt-1 text-sm text-dark-text-secondary">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {booking.booking_seated_date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {booking.booking_seated_time}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {booking.covers_adult + (booking.covers_child || 0)}
            </div>
          </div>
        </div>
      </div>
      <div>
        <BookingStatusBadge status={booking.booking_status} />
      </div>
    </div>
  </Link>
))}
        </div>
      )}
    </div>
  );
};
