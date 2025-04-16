import Calendar from '../../components/Testing/Calendar';
import ButtonsShowcase from '../../components/Testing/ButtonShowcase';
import LineGraph from '../../components/Testing/LineGraph'; // Import the chart
import BarChart from '../../components/Testing/BarChart'; // Import the chart
import PieChart from '../../components/Testing/PieChart'; // Import the chart
import SidebarExample from '../../components/Testing/Sidebar2'; // Import the sidebar
import ChecklistSteps from '../../components/Testing/ChecklistSteps';
import Tabs from '../../components/common/Tabs';
import BookingInteractions from '../../components/Testing/BookingInteractions';

const steps = [
  { label: 'Add a venue', completed: true, required: true,route: '../../dashboard/settings/Locations' },
  { label: 'Set Availability', completed: true, required: true },
  { label: 'Set Capacity', completed: false, required: true },
  { label: 'Configure widget', completed: false, required: true },
  { label: 'Setup payment gateway', completed: false, required: false },
];

const dummyInteractions = [
  {
    id: '1',
    category: 'booking',
    sub_category: 'booking_created',
    summary: 'Booking created by John Doe',
    detail: { table: 'T1', guests: 4 },
    created_at: '2025-04-10T12:00:00Z',
  },
  {
    id: '2',
    category: 'Contact',
    sub_category: 'Updated',
    summary: 'Michael Williamss profile was updated',
    detail: {"last_name": {"to": "Williamss", "from": "Williams"}, "modified_at": {"to": "2025-04-14T16:38:14.631003+00:00", "from": "2025-03-18T10:06:28.881314+00:00"}},
    created_at: '2025-04-11T14:30:00Z',
  },
  {
    id: '3',
    category: 'contact',
    sub_category: 'contact_tag_added',
    summary: 'VIP tag added to Jane Smith',
    detail: { tag: 'VIP' },
    created_at: '2025-04-12T09:45:00Z',
  },
];

const ShowcasePage = () => {
  return (
    <div className="min-h-screen bg-dark-primary text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Component Showcase</h1>
      <div className="flex flex-col gap-6">
      <Tabs
          tabs={[
            {
              label: 'Demo Tab A',
              content: <div className="text-white">Tab A content here!
              <LineGraph />
              </div>,
            },
            {
              label: 'Demo Tab B',
              content: <div className="text-white">Tab B content here!
              <BarChart />
              </div>,
            },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-secondary p-4 rounded-xl">
            <LineGraph />
          </div>

          <div className="bg-dark-secondary p-4 rounded-xl">
            <BarChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-secondary p-4 rounded-xl">
            <Calendar />
          </div>

          <div className="bg-dark-secondary p-4 rounded-xl">
            <ChecklistSteps steps={steps} />
          </div>
          
          <div className="bg-dark-secondary p-4 rounded-xl">
            <PieChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="bg-dark-secondary p-4 rounded-xl">
            <ButtonsShowcase />
          </div>

          <div className="bg-dark-secondary p-4 rounded-xl">
            <SidebarExample />
          </div>
        </div>
        <div className="bg-dark-secondary p-4 rounded-xl">
        <BookingInteractions 
          interactions={dummyInteractions}
          bookingId="demo-booking-id"
          fetchInteractions={() => Promise.resolve(dummyInteractions)}
        />
          </div>
      </div>
    </div>
  );
};

export default ShowcasePage;
