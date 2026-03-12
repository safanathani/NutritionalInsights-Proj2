import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function ScatterPlot({ data }) {

  const scatterData = {
    datasets: [
      {
        label: "Protein vs Carbs",
        data: data.dietTypes.map((diet, index) => ({
          x: data.proteinContent[index],
          y: data.carbsContent[index]
        })),
        backgroundColor: "rgba(75,192,192,1)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Protein vs Carbs by Diet Type"
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Protein (g)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Carbs (g)"
        }
      }
    }
  };

  return (
    <div className="chart-box">
      <Scatter data={scatterData} options={options} />
    </div>
  );
}

export default ScatterPlot;