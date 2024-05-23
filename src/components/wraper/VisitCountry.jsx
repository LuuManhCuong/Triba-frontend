import React from "react";
import country1 from "../../assets/images/country-01.jpg";
import country2 from "../../assets/images/country-02.jpg";
import country3 from "../../assets/images/country-03.jpg";

function VisitCountry({ job }) {
  return (
    <div className="visit-country shadow-lg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="items">
              <div className="row">
                <div className="col-lg-12">
                  <div className="item">
                    <div className="row">
                      <div className="col-lg-4 col-sm-5">
                        <div className="image">
                          <img
                            src={job?.images[0]?.url || country1}
                            alt="Country 1"
                          />
                        </div>
                      </div>
                      <div className="col-lg-8 col-sm-7">
                        <div className="right-content">
                          <h4>{job?.title}</h4>
                          <span className="time">
                            {job?.companyName || "Fpt Software"}
                          </span>

                          <span></span>
                          <div className="main-button">
                            <a href="about">Apply now</a>
                          </div>
                          <p>{job?.description}</p>
                          <ul className="info">
                            <li>
                              <i className="fa fa-user"></i> {job?.createAt}
                            </li>
                            <li>
                              <i className="fa fa-globe"></i>{" "}
                              {job?.locations[0]?.name}
                            </li>
                            <li>
                              <i className="fa fa-home"></i> ${job?.salary}
                            </li>
                          </ul>
                          <div className="text-button">
                            <a href="">
                              Detail <i className="fa fa-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Repeat similar block for other countries */}
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="side-bar-map">
              <div class="row">
                <div class="col-lg-12">
                  <div id="map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12469.776493332698!2d-80.14036379941481!3d25.907788681148624!2m3!1f357.26927939317244!2f20.870722720054623!3f0!3m2!1i1024!2i093!4f35!3m3!1m2!1s0x88d9add4b4ac788f%3A0xe77469d09480fcdb!2sSunny%20Isles%20Beach!5e1!3m2!1sen!2sth!4v1642869952544!5m2!1sen!2sth"
                      width="100%"
                      height="200px"
                      frameborder="0"
                      // style="border:0; border-radius: 23px; "
                      style={{ border: "0", borderRadius: "30px" }}
                      allowfullscreen=""
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitCountry;
