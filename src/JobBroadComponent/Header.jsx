import React from "react";
import "./css/style.scss";
import logo from "./img/logo.png"; // Đảm bảo rằng bạn có logo ở đường dẫn này

function Header() {
  return (
    <header>
      <div className="header-area">
        <div id="sticky-header" className="main-header-area">
          <div className="container-fluid">
            <div className="header_bottom_border">
              <div className="row align-items-center">
                <div className="col-xl-3 col-lg-2">
                  <div className="logo">
                    <a href="index.html">
                      <img src={logo} alt="Logo" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-7">
                  <div className="main-menu d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li>
                          <a href="index.html">home</a>
                        </li>
                        <li>
                          <a href="jobs.html">Browse Job</a>
                        </li>
                        <li>
                          <a href="#">
                            pages <i className="ti-angle-down"></i>
                          </a>
                          <ul className="submenu">
                            <li>
                              <a href="candidate.html">Candidates</a>
                            </li>
                            <li>
                              <a href="job_details.html">job details</a>
                            </li>
                            <li>
                              <a href="elements.html">elements</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#">
                            blog <i className="ti-angle-down"></i>
                          </a>
                          <ul className="submenu">
                            <li>
                              <a href="blog.html">blog</a>
                            </li>
                            <li>
                              <a href="single-blog.html">single-blog</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                  <div className="Appointment">
                    <div className="phone_num d-none d-xl-block">
                      <a href="#">Log in</a>
                    </div>
                    <div className="d-none d-lg-block">
                      <a className="boxed-btn3" href="#">
                        Post a Job
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
