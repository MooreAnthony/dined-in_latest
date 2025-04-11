import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  // Example data for bookings over time (months)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Time labels (e.g., months)
    datasets: [
      {
        label: 'Bookings Over Time', // Label for the line
        data: [10, 20, 10, 40, 80, 30, 15], // Sample booking data
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area color
        fill: true, // Whether to fill the area under the line
        tension: 0.4, // Smoothing of the line
        pointRadius: 5, // Size of the points on the line
      },
      {
        label: 'Cancellations', // Label for the line
        data: [5, 3, 12, 5, 21, 9, 3], // Sample booking data
        borderColor: 'rgb(19, 50, 134)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area color
        fill: true, // Whether to fill the area under the line
        tension: 0.4, // Smoothing of the line
        pointRadius: 5, // Size of the points on the line
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bookings Over Time',
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
          text: 'Number of Bookings',
        },
      },
    },
  };

  return (
    <div className="bg-dark-primary p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Bookings Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
