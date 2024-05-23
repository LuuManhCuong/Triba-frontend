import React from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/css/fontawesome.css";
import "../../assets/css/templatemo-woox-travel.css";
// import "../../assets/css/owl.css";
import "../../assets/css/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="index.html" className="logo">
                <img src={logo} alt="Logo" />
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
                  <a href="/reservation">Reservation</a>
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
