import React from "react";
import Slider from "react-slick";
import ImageGrid from "../post/ImageGrid";
import { IoBusiness } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";

function WeeklyOffers({ recommend }) {
  console.log("suggest: ", recommend);

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
              <h2 style={{ color: "var(--primary-color)" }}>
                Best Offers For You
              </h2>
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
              {recommend?.map((job, i) => (
                <div className="item">
                  <div className="thumb">
                    {/* <img src={job?.images[0].url} alt="" /> */}
                    <ImageGrid
                      isRecommend={true}
                      imgs={[job?.images[0].url]}
                    ></ImageGrid>
                    <div className="text">
                      <h4>
                        {job?.title}
                        <br />
                        {/* <span>
                          <i className="fa fa-users"></i> 234 Check Ins
                        </span> */}
                      </h4>
                      {/* <h6>
                        ${job?.salary}
                        <br />
                        <span>/person</span>
                      </h6> */}
                      <div className="line-dec"></div>
                      <ul>
                        <li>Information:</li>
                        <li>
                          <IoBusiness /> {job?.companyName}
                        </li>
                        <li>
                          <RiGitRepositoryCommitsFill />
                          {job?.positions[0]?.name}
                        </li>
                        <li>
                          <MdOutlineAttachMoney />${job?.salary}
                        </li>
                        <li>
                          <FaLocationDot />
                          {job?.address}
                        </li>
                      </ul>
                      <div className="main-button">
                        <a href={`/job/detail/${job?.jobId}`}>View More</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyOffers;
