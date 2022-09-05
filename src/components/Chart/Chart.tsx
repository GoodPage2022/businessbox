import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "01.01",
  "01.02",
  "01.03",
  "01.04",
  "01.05",
  "01.06",
  "01.07",
  "01.08",
  "01.09",
  "01.10",
  "01.11",
  "01.12",
];

export const data = {
  labels,

  datasets: [
    {
      fill: true,
      label: "",
      data: [1, 1, 1.5, 2, 3, 2, 4, 6, 2, 5.5, 5, 4],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function Chart() {
  return <Line options={options} data={data} />;
}
