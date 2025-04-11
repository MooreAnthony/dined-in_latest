import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Example data for contacts count by month (over the last 12 months)
  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ], // Month labels
    datasets: [
      {
        label: 'Contacts Count', // Label for the bars
        data: [150, 200, 120, 180, 220, 250, 270, 190, 160, 210, 240, 230], // Sample contact data for each month
        backgroundColor: 'rgba(7, 121, 121, 0.32)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Contacts Count by Month (12 months)',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Contact Count',
        },
        beginAtZero: true, // Make sure the Y-axis starts at 0
      },
    },
  };

  return (
    <div className="bg-dark-primary p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Contacts Count by Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
