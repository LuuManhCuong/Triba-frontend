import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Reservation from "../../page/Reservation";
import ReservationPage from "../wraper/ReservationPage";
import JobByLocationChart from "./JobByLocationChart";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";

// Đăng ký các thành phần biểu đồ với Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalUsers: 0,
    totalApplications: 0,
  });

  const navigate = useNavigate();
  const checkAdmin = localStorage.getItem("role");

  useEffect(() => {
    if (checkAdmin !== "ADMIN") {
      navigate("/index");
    }
  }, [checkAdmin]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Token is not available.");
      return;
    }

    // Thêm token vào headers của yêu cầu
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:8080/api/v1/admin/stats", config)
      .then((response) => {
        console.log(response.data); // Log dữ liệu để kiểm tra
        setStats(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the stats!", error);
      });
  }, []);

  const data = {
    labels: ["Jobs", "Users", "Applications"],
    datasets: [
      {
        label: "Total Counts",
        data: [stats.totalJobs, stats.totalUsers, stats.totalApplications],
        backgroundColor: "#22b3c1",
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
        text: "Statistics Overview",
      },
    },
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ReservationPage
        totalApplications={stats.totalApplications}
        totalUsers={stats.totalUsers}
        totalJobs={stats.totalJobs}
      ></ReservationPage>
      <Row>
        <Col xs={6}>
          <Bar data={data} options={options} />
        </Col>
        <Col xs={6}>
          <JobByLocationChart></JobByLocationChart>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
