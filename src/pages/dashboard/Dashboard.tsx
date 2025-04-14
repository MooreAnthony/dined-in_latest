import React from 'react';
import {
  Calendar,
  Users,
  TrendingUp,
  Activity,
  XCircle,
  PoundSterlingIcon,
} from 'lucide-react';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { BookingsFeed } from '../../components/dashboard/BookingsFeed';
import LineGraph from '../../components/Testing/LineGraph';

export const Dashboard: React.FC = () => {
  // Mock data 
  const kpis = [
    {
      title: 'Total Bookings Today',
      value: '24',
      trend: { value: 12, isPositive: true },
      icon: Calendar,
      description: '8 pending confirmations',
    },
    {
      title: 'Revenue Today',
      value: '£1,248',
      trend: { value: 8, isPositive: true },
      icon: PoundSterlingIcon,
      description: 'Avg. £52 per booking',
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      trend: { value: 5, isPositive: true },
      icon: Users,
      description: '12 tables available',
    },
    {
      title: 'Conversion Rate',
      value: '64%',
      trend: { value: 3, isPositive: false },
      icon: TrendingUp,
      description: '256 visits, 164 bookings',
    },
    {
      title: 'Active Bookings',
      value: '18',
      icon: Activity,
      description: '6 arriving in next hour',
    },
    {
      title: 'Cancellation Rate',
      value: '4.2%',
      trend: { value: 1.5, isPositive: true },
      icon: XCircle,
      description: '3 cancellations today',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-dark-text-primary">Dashboard</h1>
        <div className="text-dark-text-secondary">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            icon={kpi.icon}
            description={kpi.description}
          />
        ))}
      </div>
      <div className="bg-dark-secondary p-4 rounded-xl">
            <LineGraph />
          </div>
      </div>

      {/* Recent Bookings Feed */}
      <BookingsFeed />
    </div>
  );
};