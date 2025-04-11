import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartType, setChartType] = useState<'pie' | 'doughnut'>('pie'); // Default is 'pie'

  const data = {
    labels: ['New', 'Confirmed', 'Cancelled', 'No Show', 'Completed'],
    datasets: [
      {
        label: 'Bookings by Source',
        data: [100, 200, 50, 20, 300],
        backgroundColor: ['#6366F1', '#F59E0B', '#EF4444', '#10B981', '#34D399'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
      {/* Dropdown to switch chart types */}
      <select
        aria-label="Chart Type"
        className="mb-4 p-2 rounded-lg bg-dark-secondary text-white"
        value={chartType}
        onChange={(e) => setChartType(e.target.value as 'pie' | 'doughnut')}
      >
        <option value="pie">Pie</option>
        <option value="doughnut">Doughnut</option>
      </select>

      {/* Pie Chart Rendering */}
      <Pie data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default PieChart;
