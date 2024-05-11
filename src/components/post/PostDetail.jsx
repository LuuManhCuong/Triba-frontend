import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MdClear } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostGrid from "./PostGrid";
import Comment from "../comment/Comment";
import { useSelector, useDispatch } from "react-redux";
import { showComponentSelector } from "../../redux-tookit/selector";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";

function PostDetail({ imgs }) {
  const dispatch = useDispatch();
  const componentf = useSelector(showComponentSelector);
  console.log("Compoentn: ", componentf);
  const [activeImg, setActiveImg] = useState(0);
  const [showImgs, setShowImgs] = useState([]);
  const [show, setShow] = useState(false);

  var settings = {
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
                  // job.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlxn9oYNzB9fzQULwldEAN2DKZdqYojMyDA&s"
                }
                alt="avatar"
              />
              <div>
                <h3 className="username">Mạnh Cường</h3>
                <p className="time"></p>
              </div>
            </div>
            <div className="salary"> VND</div>
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
          <div className="post-body post-body-detal">
            <h2 className="content"> gfdgfds</h2>
            <p className="content"> đàasfdsa</p>

            {imgs?.length > 1 ? (
              <Slider {...settings} className="detail-img-slick">
                {imgs.map((e, i) => (
                  <div
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
                className="img-Dettail"
                src={imgs[0]}
                alt="img"
              />
            )}
          </div>
          <Comment></Comment>
        </div>
      </Col>
    </>
  );
}

export default PostDetail;
