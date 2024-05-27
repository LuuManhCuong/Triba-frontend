import React, { useEffect } from "react";
import Header from "../wraper/Header";
import UserListingArea from "../../JobBroadComponent/UserListingArea";
import { useNavigate } from "react-router-dom";

function AdminManageUser() {
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
      <UserListingArea></UserListingArea>
    </div>
  );
}

export default AdminManageUser;
