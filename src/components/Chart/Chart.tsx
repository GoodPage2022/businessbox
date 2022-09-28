import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
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
ChartJS.defaults.borderColor = "#0C0C0C";
export const options = {
  responsive: true,

  scales: {
    x: {
      ticks: {
        color: "#0C0C0C",
      },
      offset: false,
      beginAtZero: false,
      grid: {
        tickLength: 12,
        display: false,

        // color: (contex: any) => {
        //   if (contex.tick.value === 0) {
        //     return "#0C0C0C";
        //   }
        // },
      },
    },
    y: {
      ticks: {
        color: "#0C0C0C",
      },
      beginAtZero: true,
      grid: {
        tickLength: 20,
        tickWidth: 36,
        // color: (contex: any) => {
        //   if (contex.tick.value === 0) {
        //     return "#0C0C0C";
        //   }
        // },
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
let screenWidth = 0;
if (typeof window !== "undefined") {
  // browser code
  screenWidth = window.screen.width;
}

// data.labels.unshift("");
// data.labels.push("");
// data.datasets[0].data.unshift(NaN);
// data.datasets[0].data.push(null);

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = "rgba(242, 42, 78, 0)";
  const colorEnd = "rgba(242, 42, 78, 0.5)";

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}
export function Chart({price_history, price, created} : {price_history: any, price: any, created: any}) {
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

    let priceValues = [price, price]
    
    let priceLabels = [moment(created * 1000).format("YYYY-MM-DD"), (new Date().getFullYear()) + "-" + ("0" + (new Date().getMonth())).slice(-2) + "-" + ("0" + (new Date().getDate())).slice(-2)]

    if (!!price_history && price_history.length == 1) {
      priceValues = [price, price_history[0].value.price]
      priceLabels = [price_history[0].value.date, price_history[0].value.date]
    }

    if (!!price_history && price_history.length > 1) {
      priceValues = price_history.map((p: any)=>p.value.price)
      priceLabels = price_history.map((p: any)=>p.value.date)
    }

    const data = {
      labels: priceLabels.slice(screenWidth > 1440 ? -12 : -6),
    
      datasets: [
        {
          fill: true,
          data: priceValues.slice(screenWidth > 1440 ? -12 : -6),
          borderColor: "#F22A4E",
          borderWidth: 5,
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          point: false,
          lineTension: 0.5,
          pointRadius: 0,
        },
      ],
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
