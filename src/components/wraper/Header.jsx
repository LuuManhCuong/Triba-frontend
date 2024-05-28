import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/css/fontawesome.css";
import "../../assets/css/templatemo-woox-travel.css";
// import "../../assets/css/owl.css";
import "../../assets/css/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLogoFirebase } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const checkAdmin = localStorage.getItem("role");
  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, [token]);
  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/login");
  }
  return (
    <header
      className="header-area header-sticky job-broad"
      style={{ position: "fixed" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* <ul className="nav">
                <li>
                  <a href="/index" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/">Explore</a>
                </li>
                <li>
                  <a href="/deals">Jobs</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>

                <li>
                  <a href="/admin">Admin</a>
                </li>
                <li>
                  <a href="/new-post">Post</a>
                </li>
                <li>
                  <a href="/personal">Profile</a>
                </li>
              </ul> */}
              <header>
                <div className="header-area">
                  <div id="sticky-header" className="main-header-area">
                    <div className="container-fluid">
                      <div className="header_bottom_border">
                        <div className="row align-items-center">
                          <div className="col-xl-3 col-lg-2">
                            <div className="logo">
                              <a
                                href="/index"
                                className="logo"
                                style={{
                                  color: "white",
                                  fontSize: "3rem",
                                  display: "flex",
                                  fontWeight: "600",
                                  justifyItems: "center",
                                }}
                              >
                                {/* <img src={logo} alt="Logo" /> */}
                                <IoLogoFirebase /> Triba
                              </a>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-7">
                            <div className="main-menu d-none d-lg-block">
                              <nav>
                                <ul id="navigation">
                                  <li>
                                    <a href="/index">Home</a>
                                  </li>
                                  <li>
                                    <a href="/deals">Jobs</a>
                                  </li>
                                  <li>
                                    <a href="/">Explore</a>
                                  </li>

                                  <li>
                                    <a href="/about">About</a>
                                  </li>

                                  <li>
                                    <a href="/personal">Profile</a>
                                  </li>

                                  {checkAdmin === "ADMIN" ? (
                                    <li>
                                      <a href="#">
                                        Admin <i className="ti-angle-down"></i>{" "}
                                        <span>v</span>
                                      </a>
                                      <ul className="submenu">
                                        <li>
                                          <a href="/admin">Dashboard</a>
                                        </li>
                                        <li>
                                          <a href="/admin/manage/job">
                                            Manage Post
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/admin/manage/user">
                                            Manage User
                                          </a>
                                        </li>
                                      </ul>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                </ul>
                              </nav>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                            {token == null ? (
                              <div className="Appointment">
                                <div className="phone_num d-none d-xl-block">
                                  <a href="/login">Log in</a>
                                </div>
                              </div>
                            ) : (
                              <div className="Appointment">
                                <div className="d-none d-lg-block">
                                  <a className="boxed-btn3" href="/new-post">
                                    New Post
                                  </a>
                                </div>
                                <div
                                  className="d-none d-lg-block"
                                  onClick={handleLogout}
                                >
                                  <a className="boxed-btn3">Logout</a>
                                </div>
                              </div>
                            )}
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
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
