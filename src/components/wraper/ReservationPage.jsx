import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa6";
import { MdWork } from "react-icons/md";

function ReservationPage({ totalApplications, totalUsers, totalJobs }) {
  return (
    <div>
      {/* Second Page Heading */}
      <div className="second-page-heading">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4>Wellcome To</h4>
              <h2>Admin Dashboard</h2>
              <p>
                Your work is going to fill a large part of your life, and the
                only way to be truly satisfied is to do what you believe is
                great work.
              </p>
              <div className="main-button">
                {/* <a href="about.html">Discover More</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Info Section */}
      <div className="more-info reservation-info">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="info-item">
                <FaRegUserCircle />
                USERS
                <h4>{totalUsers} </h4>
                <a href="#">
                  The only way to achieve the impossible is to believe it is
                  possible.
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="info-item">
                <MdWork /> JOBS
                <h4>{totalJobs} </h4>
                <a href="#">
                  Choose a job you love, and you will never have to work a day
                  in your life.
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="info-item">
                <FaFileSignature />
                APPLICATIONS
                <h4>{totalApplications} </h4>
                <a href="#">
                  Success is the result of preparation, hard work, and learning
                  from failure.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationPage;
