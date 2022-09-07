import React, { useEffect, useRef, useState } from "react";
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
  ChartArea,
  ChartData,
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
      ticks: {
        color: "#0C0C0C",
      },

      beginAtZero: false,
      grid: { tickLength: 12, display: false },
    },
    y: {
      ticks: {
        color: "#0C0C0C",
      },
      beginAtZero: true,
      grid: {
        tickLength: 20,
        tickWidth: 36,

        // tickBorderDashOffset: 55,
        display: false,
      },
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
  " ",
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
      display: false,
      data: ["none", 1, 1, 1.5, 2, 3, 2, 4, 6, 2, 5.5, 5, 4],
      borderColor: "#F22A4E",
      borderWidth: 5,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      point: false,
      lineTension: 0.5,
      pointRadius: 0,
    },
  ],
};
function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = "rgba(242, 42, 78, 0)";
  const colorEnd = "rgba(242, 42, 78, 0.5)";

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}
export function Chart() {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData]: [chartData: any, setChartData: any] =
    useState<ChartData<"bar">>({
      datasets: [],
    });
  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);
  return <Line ref={chartRef} options={options} data={chartData} />;
}
