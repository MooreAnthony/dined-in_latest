import Calendar from '../../components/Testing/Calendar';
import ButtonsShowcase from '../../components/Testing/ButtonShowcase';
import LineGraph from '../../components/Testing/LineGraph'; // Import the chart
import BarChart from '../../components/Testing/BarChart'; // Import the chart
import PieChart from '../../components/Testing/PieChart'; // Import the chart
import SidebarExample from '../../components/Testing/Sidebar2'; // Import the sidebar
import ChecklistSteps from '../../components/Testing/ChecklistSteps';

const steps = [
  { label: 'Add a venue', completed: true, required: true,route: '../../dashboard/settings/Locations' },
  { label: 'Set Availability', completed: true, required: true },
  { label: 'Set Capacity', completed: false, required: true },
  { label: 'Configure widget', completed: false, required: true },
  { label: 'Setup payment gateway', completed: false, required: false },
];



const ShowcasePage = () => {
  return (
    <div className="min-h-screen bg-dark-primary text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Component Showcase</h1>

      <div className="flex flex-col gap-12">
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
      </div>
    </div>
  );
};

export default ShowcasePage;
