import React from 'react';

interface BookingStatusBadgeProps {
  status: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-400/10 text-blue-400';
      case 'Pending':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'Enquiry':
        return 'bg-cyan-400/10 text-cyan-400';
      case 'No Show':
        return 'bg-orange-400/10 text-orange-400';
      case 'Arrived':
        return 'bg-green-400/10 text-green-400';
      case 'Complete':
        return 'bg-emerald-400/10 text-emerald-400';
      case 'Cancelled':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-gray-400/10 text-gray-400';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};