import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

Chart.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

import "./MainChart.css";

const MainChart = (arrData) => {
  const data = {
    labels: [1, 7, 15, 22, 30],
    datasets: [
      {
        label: "test",
        data: [20, 40, 60, 80, 100, 120, 140],
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        reverse: true,
        grid: {
          display: false,
        },
      },
      y: {
        position: "right",
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return value + "k";
          },
          stepSize: 20,
        },
      },
    },
  };

  options.scales.y.border = {
    display: false,
  };

  return (
    <div className="mainchart">
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default MainChart;
