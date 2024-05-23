import React from "react";
function MoreAbout() {
  return (
    <div className="more-about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="left-image">
              <img
                src="https://www.bestgamblingforum.org/assets/img/gambling-tourism.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-heading">
              <h2>Discover More About Our Country</h2>
              <p>
                Find your dream job and build a successful career from there.
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="info-item">
                  <h4>150.640 +</h4>
                  <span>Total User Yearly</span>
                </div>
              </div>
              {/* Add more info items here */}
            </div>
            <p>Find your dream job and build a successful career from there.</p>
            <div className="main-button">
              <a href="/">Discover More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreAbout;
