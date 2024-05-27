import React from "react";
import "./css/style.scss"; // Đảm bảo đường dẫn đúng đến file CSS của bạn

function CategoryArea() {
  return (
    <div className="catagory_area">
      <div className="container">
        <div className="row cat_search">
          <div className="col-lg-3 col-md-4">
            <div className="single_input">
              <input type="text" placeholder="Search keyword" />
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="single_input">
              <select className="wide">
                <option data-display="Location">Location</option>
                <option value="1">Dhaka</option>
                <option value="2">Rangpur</option>
                <option value="4">Sylet</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="single_input">
              <select className="wide">
                <option data-display="Category">Category</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="4">Category 3</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="job_btn">
              <a href="#" className="boxed-btn3">
                Find Job
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="popular_search d-flex align-items-center">
              <span>Popular Search:</span>
              <ul>
                <li>
                  <a href="#">Design & Creative</a>
                </li>
                <li>
                  <a href="#">Marketing</a>
                </li>
                <li>
                  <a href="#">Administration</a>
                </li>
                <li>
                  <a href="#">Teaching & Education</a>
                </li>
                <li>
                  <a href="#">Engineering</a>
                </li>
                <li>
                  <a href="#">Software & Web</a>
                </li>
                <li>
                  <a href="#">Telemarketing</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryArea;
