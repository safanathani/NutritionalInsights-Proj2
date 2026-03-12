import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data }) {
  const chartData = {
    labels: data.dietTypes,
    datasets: [
      {
        label: 'Protein (g)',
        data: data.proteinContent,
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Carbs (g)',
        data: data.carbsContent,
        backgroundColor: '#22c55e',
      },
      {
        label: 'Fat (g)',
        data: data.fatContent,
        backgroundColor: '#f59e0b',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 300
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Macronutrient Content by Diet Type',
      },
    },
  };

  return (
    <div className="chart-box">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart;