import React, { useEffect } from "react";
import Header from "../wraper/Header";
import JobListingArea from "../../JobBroadComponent/JobListingArea";
import { useNavigate } from "react-router-dom";

function AdminManageJob() {
  const navigate = useNavigate();
  const checkAdmin = localStorage.getItem("role");

  useEffect(() => {
    if (checkAdmin !== "ADMIN") {
      navigate("/index");
    }
  }, [checkAdmin]);
  return (
    <div className="job-broad">
      <Header></Header>
      <JobListingArea isAdmin={true}></JobListingArea>
    </div>
  );
}

export default AdminManageJob;
