import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { MdClear } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Comment from "../comment/Comment";
import { useSelector, useDispatch } from "react-redux";
import { showComponentSelector } from "../../redux-tookit/selector";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";
import axios from "axios";
import ImageGrid from "./ImageGrid";

function PostDetail({ imgs }) {
  const dispatch = useDispatch();
  const { jobId } = useSelector(showComponentSelector);
  const [activeImg, setActiveImg] = useState(0);
  const [showImgs, setShowImgs] = useState([]);
  const [show, setShow] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async (jobId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/job/${jobId}`
        );
        setJobDetail(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails(jobId);

    // Scroll to the top of the detail component
    window.scrollTo(0, 0);
  }, [jobId]);

  if (!jobDetail) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <>
      <Col className="post-wrap-detail-block">
        <div className="post-wrap-detail">
          <div className="post-head">
            <div className="user">
              <img
                className="avatar"
                src={
                  jobDetail.user?.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlxn9oYNzB9fzQULwldEAN2DKZdqYojMyDA&s"
                }
                alt="avatar"
              />
              <div>
                <h3 className="username">
                  {jobDetail.user
                    ? jobDetail.user.lastName + " " + jobDetail.user.firstName
                    : "Unknown User"}
                </h3>
                <p className="time">{jobDetail.createAt}</p>
              </div>
            </div>
            <div className="salary">{jobDetail.salary} VND</div>
            <div
              className="action"
              onClick={() =>
                dispatch(
                  showComponentSlice.actions.setComponent({
                    jobId: 0,
                    component: "default",
                  })
                )
              }
            >
              <MdClear />
            </div>
          </div>
          <div className="post-body post-body-detail">
            <h2 className="content">{jobDetail.title}</h2>
            <p className="content">{jobDetail.description}</p>

            {/* {imgs?.length > 1 ? (
              <Slider {...settings} className="detail-img-slick">
                {imgs.map((e, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setShow(true);
                      setActiveImg(i);
                      setShowImgs(imgs);
                    }}
                    className="img-slick"
                  >
                    <img src={e} alt="img" />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                onClick={() => {
                  setShow(true);
                  setActiveImg(0);
                  setShowImgs(imgs);
                }}
                className="img-Detail"
                src={imgs[0]}
                alt="img"
              />
            )} */}

            <ImageGrid imgs={jobDetail.images}></ImageGrid>
          </div>
          <Comment hiddenInfo={true} />
        </div>
      </Col>
    </>
  );
}

export default PostDetail;
