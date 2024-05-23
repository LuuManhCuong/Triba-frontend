import React from "react";

function BestLocations() {
  return (
    <div className="best-locations">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-heading text-center">
              <h2>Best Locations In Caribbeans</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-2">
            <div className="options">
              <div
                className="option active"
                style={{
                  "--optionBackground":
                    "url(https://www.bestgamblingforum.org/assets/img/gambling-tourism.jpg)",
                }}
              >
                <div className="shadow"></div>
                <div className="label">
                  <div className="icon">
                    <i className="fas fa-expand"></i>
                  </div>
                  <div className="info">
                    <div className="main">Havana</div>
                    <div className="sub">Population: 2M</div>
                  </div>
                </div>
              </div>
              <div
                className="option"
                style={{
                  "--optionBackground":
                    "url(https://www.bestgamblingforum.org/assets/img/gambling-tourism.jpg)",
                }}
              >
                <div className="shadow"></div>
                <div className="label">
                  <div className="icon">
                    <i className="fas fa-expand"></i>
                  </div>
                  <div className="info">
                    <div className="main">Kingston</div>
                    <div className="sub">Population: 3.5M</div>
                  </div>
                </div>
              </div>
              {/* Add more options here */}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="main-button text-center">
              <a href="deals.html">Discover All Places</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestLocations;
