import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const JobByLocationChart = () => {
  const [value, setValue] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("Token is not available.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/count-by-location",
        config
      );

      const dataObject = response.data;
      const labels = Object.keys(dataObject);
      const data = Object.values(dataObject);
      // console.log("data: ", data);
      //   console.log("inner: ", labels, data);

      setLabels(labels);
      setValue(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  console.log("out: ", labels, value);

  const index = {
    labels: labels || [],
    datasets: [
      {
        label: "Jobs in: ",
        data: value || [0],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Job Count By Location",
        fontSize: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Bar data={index} options={options} />;
};

export default JobByLocationChart;
