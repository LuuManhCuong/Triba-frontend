import React from "react";
import "../../assets/css/fontawesome.css";
import "../../assets/css/templatemo-woox-travel.css";
// import "../../assets/css/owl.css";
import "../../assets/css/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DialogflowMessenger from "./DialogFlowMessenger";

function Footer() {
  return (
    <>
      <div className="call-to-action">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>Are You Looking For A Job ?</h2>
              <h4>
                Easily search, apply, and access the most suitable job
                opportunities for you.
              </h4>
            </div>
            <div className="col-lg-4">
              <div className="border-button">
                <a href="reservation.html">Apply Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>
                {/* Copyright © 2024 */}
                <br />
                Design:{" "}
                {/* <a href="https://templatemo.com" target="_blank" rel="nofollow"> */}
                me
                {/* </a> */}
              </p>
            </div>
          </div>
        </div>
        <DialogflowMessenger></DialogflowMessenger>
      </footer>
    </>
  );
}

export default Footer;
