import React from "react";

function ReservationPage() {
  return (
    <div>
      {/* Second Page Heading */}
      <div className="second-page-heading">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4>Book Prefered Deal Here</h4>
              <h2>Make Your Reservation</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt uttersi labore et dolore magna aliqua
                is ipsum suspendisse ultrices gravida
              </p>
              <div className="main-button">
                <a href="about.html">Discover More</a>
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
                <i className="fa fa-phone"></i>
                <h4>Make a Phone Call</h4>
                <a href="#">+123 456 789 (0)</a>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="info-item">
                <i className="fa fa-envelope"></i>
                <h4>Contact Us via Email</h4>
                <a href="#">company@email.com</a>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="info-item">
                <i className="fa fa-map-marker"></i>
                <h4>Visit Our Offices</h4>
                <a href="#">24th Street North Avenue London, UK</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>
                Copyright © 2036 <a href="#">WoOx Travel</a> Company. All rights
                reserved.
                <br />
                Design:{" "}
                <a
                  href="https://templatemo.com"
                  target="_blank"
                  title="free CSS templates"
                >
                  TemplateMo
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default ReservationPage;
