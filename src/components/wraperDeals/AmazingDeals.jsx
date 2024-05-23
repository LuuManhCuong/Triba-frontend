import React from "react";

function AmazingDeals() {
  return (
    <div className="amazing-deals">
      <div className="container">
        <div className="row">
          {/* Deal 1 */}
          <div className="col-lg-6 col-sm-6">
            <div className="item">
              <div className="row">
                {/* Hình ảnh */}
                <div className="col-lg-6">
                  <div className="image">
                    <img
                      src="http://127.0.0.1:5500/assets/images/deals-04.jpg"
                      alt=""
                    />
                  </div>
                </div>
                {/* Nội dung */}
                <div className="col-lg-6 align-self-center">
                  <div className="content">
                    <span className="info">*Limited Offer Today</span>
                    <h4>Glasgow City Lorem</h4>
                    <div className="row">
                      <div className="col-6">
                        <i className="fa fa-clock"></i>
                        <span className="list">5 Days</span>
                      </div>
                      <div className="col-6">
                        <i className="fa fa-map"></i>
                        <span className="list">Daily Places</span>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet dire consectetur adipiscing
                      elit.
                    </p>
                    <div className="main-button">
                      <a href="reservation.html">Make a Reservation</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Deal 2 */}
          <div className="col-lg-6 col-sm-6">
            <div className="item">
              <div className="row">
                {/* Hình ảnh */}
                <div className="col-lg-6">
                  <div className="image">
                    <img
                      src="http://127.0.0.1:5500/assets/images/deals-04.jpg"
                      alt=""
                    />
                  </div>
                </div>
                {/* Nội dung */}
                <div className="col-lg-6 align-self-center">
                  <div className="content">
                    <span className="info">*Today & Tomorrow Only</span>
                    <h4>Venezia Italy Ipsum</h4>
                    <div className="row">
                      <div className="col-6">
                        <i className="fa fa-clock"></i>
                        <span className="list">5 Days</span>
                      </div>
                      <div className="col-6">
                        <i className="fa fa-map"></i>
                        <span className="list">Daily Places</span>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet dire consectetur adipiscing
                      elit.
                    </p>
                    <div className="main-button">
                      <a href="reservation.html">Make a Reservation</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Các deal khác */}
        </div>
      </div>
    </div>
  );
}

export default AmazingDeals;
