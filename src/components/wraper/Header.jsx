import React from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/css/fontawesome.css";
import "../../assets/css/templatemo-woox-travel.css";
// import "../../assets/css/owl.css";
import "../../assets/css/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLogoFirebase } from "react-icons/io5";
function Header() {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
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
              <ul className="nav">
                <li>
                  <a href="/index" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/">Jobs</a>
                </li>

                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/deals">Deals</a>
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
              </ul>
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
