import React from "react";
import ReservationPage from "../components/wraper/ReservationPage";
import CreateJob from "../components/wraper/CreateJob";
import Header from "../components/wraper/Header";
import Footer from "../components/wraper/Footer";
import AdminDashboard from "../components/admin/AdminDashboard";

function Reservation() {
  return (
    <div>
      <Header></Header>
      {/* <ReservationPage></ReservationPage> */}
      <AdminDashboard></AdminDashboard>
      <Footer></Footer>
    </div>
  );
}

export default Reservation;
