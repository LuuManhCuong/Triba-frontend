import React from "react";

function Banner() {
  return (
    <section id="section-1">
      <div className="content-slider">
        <input
          type="radio"
          id="banner1"
          className="sec-1-input"
          name="banner"
          defaultChecked
        />
        <input
          type="radio"
          id="banner2"
          className="sec-1-input"
          name="banner"
        />
        <input
          type="radio"
          id="banner3"
          className="sec-1-input"
          name="banner"
        />
        <input
          type="radio"
          id="banner4"
          className="sec-1-input"
          name="banner"
        />
        <div className="slider">
          {/* Repeat for each banner */}
          <div id="top-banner-1" className="banner">
            <div className="banner-inner-wrapper header-text">
              <div className="main-caption">
                <h2>
                  Explore thousands of job opportunities from leading companies
                  in the market
                </h2>
                <h1>TRIBA-CARREER JOURNEY</h1>
                <div className="border-button">
                  <a href="/">Go There</a>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="more-info">
                      <div className="row">
                        <div className="col-lg-3 col-sm-6 col-6">
                          <i className="fa fa-user"></i>
                          <h4>
                            <span>Community:</span>
                            <br />
                            10+
                          </h4>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-6">
                          <i className="fa fa-globe"></i>
                          <h4>
                            <span>Region:</span>
                            <br />
                            275.400 KM<em>2</em>
                          </h4>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-6">
                          <i className="fa fa-home"></i>
                          <h4>
                            <span>Collaboration:</span>
                            <br />
                            100+
                          </h4>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-6">
                          <div className="main-button">
                            <a href="/">Explore More</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Repeat similar block for other banners */}
        </div>
        <nav>
          <div className="controls">
            <label htmlFor="banner1">
              <span className="progressbar">
                <span className="progressbar-fill"></span>
              </span>
              <span className="text">1</span>
            </label>
            <label htmlFor="banner2">
              <span className="progressbar">
                <span className="progressbar-fill"></span>
              </span>
              <span className="text">2</span>
            </label>
            <label htmlFor="banner3">
              <span className="progressbar">
                <span className="progressbar-fill"></span>
              </span>
              <span className="text">3</span>
            </label>
            <label htmlFor="banner4">
              <span className="progressbar">
                <span className="progressbar-fill"></span>
              </span>
              <span className="text">4</span>
            </label>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Banner;
