import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  Loader2,
  User,
} from 'lucide-react';
import { Button } from '../common/Button';
import type { Booking, BookingStatus } from '../../types/bookings';
import { BookingStatusBadge } from '../../components/common/BookingStatusBadge';

interface BookingsTableProps {
  bookings: Booking[];
  isLoading: boolean;
  currentPage: number;
  totalCount: number;
  sortBy: keyof Booking;
  sortDirection: 'asc' | 'desc';
  onPageChange: (page: number) => void;
  onSort: (field: keyof Booking) => void;
  onDelete: (id: string) => Promise<void>;
}


interface SortableColumnProps {
  field: keyof Booking;
  currentSort: keyof Booking;
  direction: 'asc' | 'desc';
  onSort: (field: keyof Booking) => void;
  children: React.ReactNode;
}

const SortableColumn: React.FC<SortableColumnProps> = ({
  field,
  currentSort,
  direction,
  onSort,
  children,
}) => (
  <button
    onClick={() => onSort(field)}
    className="flex items-center gap-2 hover:text-dark-accent"
  >
    {children}
    <ArrowUpDown
      className={`w-4 h-4 transition-transform ${
        currentSort === field
          ? 'text-dark-accent ' +
            (direction === 'desc' ? 'rotate-180' : '')
          : 'text-dark-text-muted'
      }`}
    />
  </button>
);

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  isLoading,
  currentPage,
  totalCount,
  sortBy,
  sortDirection,
  onPageChange,
  onSort,
}) => {
  const totalPages = Math.ceil(totalCount / 10);
  const navigate = useNavigate();


  return (
    <div className="bg-dark-secondary rounded-lg border border-dark-border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-dark-text-secondary">
                <SortableColumn
                  field="location_id"
                  currentSort={sortBy}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Location
                </SortableColumn>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-dark-text-secondary">
                <SortableColumn
                  field="booking_seated_date"
                  currentSort={sortBy}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Seated Date / Time
                </SortableColumn>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-dark-text-secondary">
              <SortableColumn
                  field="contact_id" //needs fixing, this sorts by ID not email address
                  currentSort={sortBy}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Customer Details
                </SortableColumn>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-dark-text-secondary">
                Booking Reference
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-dark-text-secondary">
                <SortableColumn
                  field="covers_adult"
                  currentSort={sortBy}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Guests
                </SortableColumn>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-dark-text-secondary">
                <SortableColumn
                  field="booking_source"
                  currentSort={sortBy}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Source
                </SortableColumn>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-dark-text-secondary">
                <SortableColumn
                  field="booking_type"
                  currentSort={sortBy}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Type
                </SortableColumn>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-dark-text-secondary">
                <SortableColumn
                  field="booking_status"
                  currentSort={sortBy}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Status
                </SortableColumn>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-6 py-8">
                  <div className="flex items-center justify-center text-dark-text-secondary">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    Loading bookings...
                  </div>
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-dark-text-secondary">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-dark-primary/50 transition-colors cursor-pointer"
                    onClick={() => {
                    //  console.log('Selected booking:', booking);
                      navigate(`/dashboard/bookings/${booking.id}`);
                    }}
                  >
                  <td className="px-6 py-4 text-dark-text-primary">
                    {booking.location?.public_name || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(`${booking.booking_seated_date}T${booking.booking_seated_time}`).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      {booking.contact && (
                        <User
                          className="w-6 h-6 flex-shrink-0 cursor-pointer text-dark-accent hover:text-dark-accent/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard/contact/profile/${booking.contact_id}`);
                          }}
                        />
                      )}
                      <div>
                        <div className="text-dark-text-primary">
                          {booking.contact 
                            ? `${booking.contact.first_name} ${booking.contact.last_name}`
                            : '-'
                          }
                        </div>
                        <div className="text-sm text-dark-text-secondary">
                          {booking.contact?.email || '-'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-text-secondary font-mono">
                    {booking.booking_reference}
                  </td>
                  <td className="px-6 py-4 text-dark-text-primary">
                    <div className="space-y-1">
                      <div className="text-dark-text-primary">
                        {booking.covers_adult + (booking.covers_child || 0)} total
                      </div>
                      <div className="text-sm text-dark-text-secondary">
                        Adults: {booking.covers_adult} / Children: {booking.covers_child}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-text-secondary">
                    {booking.booking_source}
                  </td>
                  <td className="px-6 py-4 text-dark-text-secondary">
                    {booking.booking_type}
                  </td>
                  <td className="px-6 py-4">
                    <span>
                        <BookingStatusBadge status={booking.booking_status} />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-dark-border">
        <div className="text-sm text-dark-text-secondary">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};