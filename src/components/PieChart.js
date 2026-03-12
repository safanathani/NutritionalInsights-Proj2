import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data }) {
  const chartData = {
    labels: data.dietTypes,
    datasets: [
      {
        label: 'Recipe Distribution',
        data: data.recipeDistribution,
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recipe Distribution by Diet Type',
      },
    },
  };

  return (
    <div className="chart-box">
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default PieChart;