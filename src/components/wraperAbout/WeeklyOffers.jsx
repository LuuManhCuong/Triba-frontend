import React from "react";
import Slider from "react-slick";

function WeeklyOffers() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
  };

  return (
    <div className="weekly-offers">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div
              className="section-heading text-center"
              style={{ marginBottom: "40px" }}
            >
              <h2>Best Weekly Offers In Each City</h2>
              <p>
                Find your dream job and build a successful career from
                there.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 slider-container">
            <Slider className="owl-weekly-offers owl-carousel" {...settings}>
              <div className="item">
                <div className="thumb">
                  <img
                    src="http://127.0.0.1:5500/assets/images/offers-01.jpg"
                    alt=""
                  />
                  <div className="text">
                    <h4>
                      Havana
                      <br />
                      <span>
                        <i className="fa fa-users"></i> 234 Check Ins
                      </span>
                    </h4>
                    <h6>
                      $420
                      <br />
                      <span>/person</span>
                    </h6>
                    <div className="line-dec"></div>
                    <ul>
                      <li>Deal Includes:</li>
                      <li>
                        <i className="fa fa-taxi"></i> 5 Days Trip Hotel
                        Included
                      </li>
                      <li>
                        <i className="fa fa-plane"></i> Airplane Bill Included
                      </li>
                      <li>
                        <i className="fa fa-building"></i> Daily Places Visit
                      </li>
                    </ul>
                    <div className="main-button">
                      <a href="reservation.html">Make a Reservation</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <img
                    src="http://127.0.0.1:5500/assets/images/offers-01.jpg"
                    alt=""
                  />
                  <div className="text">
                    <h4>
                      Havana
                      <br />
                      <span>
                        <i className="fa fa-users"></i> 234 Check Ins
                      </span>
                    </h4>
                    <h6>
                      $420
                      <br />
                      <span>/person</span>
                    </h6>
                    <div className="line-dec"></div>
                    <ul>
                      <li>Deal Includes:</li>
                      <li>
                        <i className="fa fa-taxi"></i> 5 Days Trip Hotel
                        Included
                      </li>
                      <li>
                        <i className="fa fa-plane"></i> Airplane Bill Included
                      </li>
                      <li>
                        <i className="fa fa-building"></i> Daily Places Visit
                      </li>
                    </ul>
                    <div className="main-button">
                      <a href="reservation.html">Make a Reservation</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <img
                    src="http://127.0.0.1:5500/assets/images/offers-01.jpg"
                    alt=""
                  />
                  <div className="text">
                    <h4>
                      Havana
                      <br />
                      <span>
                        <i className="fa fa-users"></i> 234 Check Ins
                      </span>
                    </h4>
                    <h6>
                      $420
                      <br />
                      <span>/person</span>
                    </h6>
                    <div className="line-dec"></div>
                    <ul>
                      <li>Deal Includes:</li>
                      <li>
                        <i className="fa fa-taxi"></i> 5 Days Trip Hotel
                        Included
                      </li>
                      <li>
                        <i className="fa fa-plane"></i> Airplane Bill Included
                      </li>
                      <li>
                        <i className="fa fa-building"></i> Daily Places Visit
                      </li>
                    </ul>
                    <div className="main-button">
                      <a href="reservation.html">Make a Reservation</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <img
                    src="http://127.0.0.1:5500/assets/images/offers-01.jpg"
                    alt=""
                  />
                  <div className="text">
                    <h4>
                      Havana
                      <br />
                      <span>
                        <i className="fa fa-users"></i> 234 Check Ins
                      </span>
                    </h4>
                    <h6>
                      $420
                      <br />
                      <span>/person</span>
                    </h6>
                    <div className="line-dec"></div>
                    <ul>
                      <li>Deal Includes:</li>
                      <li>
                        <i className="fa fa-taxi"></i> 5 Days Trip Hotel
                        Included
                      </li>
                      <li>
                        <i className="fa fa-plane"></i> Airplane Bill Included
                      </li>
                      <li>
                        <i className="fa fa-building"></i> Daily Places Visit
                      </li>
                    </ul>
                    <div className="main-button">
                      <a href="reservation.html">Make a Reservation</a>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyOffers;
