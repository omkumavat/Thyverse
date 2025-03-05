import React from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ThyroidLineChart = ({ thyroidData }) => {
  // Prepare data for the line chart
  const data = {
    labels: ["TSH", "T4", "T3"],
    datasets: [
      {
        label: "Thyroid Panel",
        data: thyroidData.map((item) => parseFloat(item.value)),
        borderColor: "#FF9F43",
        backgroundColor: "rgba(255, 159, 67, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "#FF9F43",
        pointBorderColor: "#FF9F43",
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0, // Start Y-axis from 0
        max: 20, // Ensure Y-axis goes up to 20
        ticks: {
          color: "#1B2B65",
          stepSize: 1, // Ensures consistent spacing
          callback: function (value) {
            const allowedTicks = [0, 2, 5, 7, 10, 15, 20];
            return allowedTicks.includes(value) ? value : null;
          },
        },
        grid: {
          color: "rgba(27, 43, 101, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#1B2B65",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1B2B65",
        titleColor: "white",
        bodyColor: "white",
        callbacks: {
          label: function (context) {
            const item = thyroidData.find(
              (data) => parseFloat(data.value) === context.parsed.y
            );
            return `${item.name}: ${item.value} (Range: ${item.range})`;
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white p-6 rounded-xl shadow-lg h-[300px]"
    >
      <div className="flex items-center gap-2 mb-4">
        <FlaskConical className="text-[#FF9F43]" />
        <h2 className="text-xl font-semibold text-[#1B2B65]">
          Thyroid Panel Analysis
        </h2>
      </div>
      <div className="h-[220px]">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default ThyroidLineChart;
