import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/css/fontawesome.css";
import "../../assets/css/templatemo-woox-travel.css";
// import "../../assets/css/owl.css";
import "../../assets/css/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLogoFirebase } from "react-icons/io5";
import { useNavigate, NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const username = localStorage.getItem("email");
  const avatar = localStorage.getItem("avatar");

  const checkAdmin = localStorage.getItem("role");
  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, [token, navigate]);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("avatar");

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
                                style={{
                                  color: "white",
                                  fontSize: "3rem",
                                  display: "flex",
                                  fontWeight: "600",
                                  justifyItems: "center",
                                  alignItems: "center",
                                }}
                              >
                                <IoLogoFirebase /> Triba
                              </a>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-7">
                            <div className="main-menu d-none d-lg-block">
                              <nav>
                                <ul id="navigation">
                                  <li>
                                    <NavLink
                                      to="/index"
                                      className={({ isActive }) =>
                                        isActive ? "active link" : "link"
                                      }
                                    >
                                      Home
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/deals"
                                      className={({ isActive }) =>
                                        isActive ? "active link" : "link"
                                      }
                                    >
                                      Jobs
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/"
                                      className={({ isActive }) =>
                                        isActive ? "active link" : "link"
                                      }
                                    >
                                      Explore
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/about"
                                      className={({ isActive }) =>
                                        isActive ? "active link" : "link"
                                      }
                                    >
                                      About
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/new-post"
                                      className={({ isActive }) =>
                                        isActive ? "active link" : "link"
                                      }
                                    >
                                      New Post
                                    </NavLink>
                                  </li>
                                  {checkAdmin === "ADMIN" && (
                                    <li>
                                      <NavLink
                                        to="#"
                                        className={({ isActive }) =>
                                          isActive ? "active link" : "link"
                                        }
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        Admin <i className="ti-angle-down"></i>{" "}
                                        <span>
                                          <IoMdArrowDropdown />
                                        </span>
                                      </NavLink>
                                      <ul className="submenu shadow-lg">
                                        <li>
                                          <NavLink
                                            to="/admin/dashboard"
                                            className={({ isActive }) =>
                                              isActive ? "active link" : "link"
                                            }
                                          >
                                            Dashboard
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/admin/manage/job"
                                            className={({ isActive }) =>
                                              isActive ? "active link" : "link"
                                            }
                                          >
                                            Manage Post
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/admin/manage/user"
                                            className={({ isActive }) =>
                                              isActive ? "active link" : "link"
                                            }
                                          >
                                            Manage User
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </li>
                                  )}
                                </ul>
                              </nav>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                            {token == null ? (
                              <div className="Appointment">
                                <div className="phone_num d-none d-xl-block">
                                  <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                      isActive ? "active link" : "link"
                                    }
                                  >
                                    Log in
                                  </NavLink>
                                </div>
                              </div>
                            ) : (
                              <div className="Appointment">
                                <div className="d-none d-lg-block">
                                  <NavLink
                                    className={({ isActive }) =>
                                      isActive
                                        ? "active boxed-btn3"
                                        : "boxed-btn3"
                                    }
                                    to="/personal"
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      fontSize: "1.2rem",
                                    }}
                                  >
                                    {avatar == null ? (
                                      <img
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                          borderRadius: "50px",
                                        }}
                                        src={
                                          "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                                        }
                                        alt="avt"
                                      />
                                    ) : (
                                      <img
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                          borderRadius: "50px",
                                        }}
                                        src={avatar}
                                        alt="avt"
                                      />
                                    )}
                                    {username}
                                  </NavLink>
                                </div>

                                <div
                                  className="d-none d-lg-block"
                                  onClick={handleLogout}
                                >
                                  <a
                                    style={{ color: "red !important" }}
                                    className="boxed-btn3"
                                  >
                                    Logout
                                  </a>
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
