import React, { useEffect, useState } from "react";
import "./post.scss";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { IoIosMenu } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComments } from "react-icons/fa";
import { RiMessengerFill } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import axios from "axios";
import ImageGrid from "./ImageGrid";
import { MdClear } from "react-icons/md";
import ImageSlick from "./ImageSlick";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  countImgSliceSelector,
  showComponentSelector,
} from "../../redux-tookit/selector";
import PostGrid from "./PostGrid";
import PostDetail from "./PostDetail";
import Comment from "../comment/Comment";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";

function Post() {
  const dispatch = useDispatch();
  const component = useSelector(showComponentSelector);
  const { value } = useSelector(countImgSliceSelector);
  const [jobs, setJobs] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [showImgs, setShowImgs] = useState([]);
  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/job"
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const imgs = [
    "https://i.ytimg.com/vi/OKZFHo5p4VA/sddefault.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeizyn8SwFNfeJdYexfcqyurpCe47SKVR0Ew&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTANwDuYP5dvG_YaN4TQXxf53cavMSPzAFqyA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRImgQ_NEpkyh1-06jjt3QfXrnPL6qP_SPrE9iSxbafA0Ryep_kNJohVnM4UkZRT00g3Y4&usqp=CAU",
  ];
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
      <Modal
        className="moda"
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Title
          className="header-moda"
          id="example-custom-modal-styling-title"
        >
          Ảnh {value + 1} / {imgs.length}
          <button onClick={() => setShow(false)}>
            <MdClear></MdClear>
          </button>
        </Modal.Title>
        <Modal.Body>
          {/* <img src={showImgs[0]} alt="img" /> */}
          <ImageSlick imgs={showImgs} activeImg={activeImg}></ImageSlick>
        </Modal.Body>
      </Modal>

      <Row>
        <Col className="post-wrap" xs={6}>
          {jobs?.map((job, i) => (
            <div key={i} className="post">
              <div className="post-head">
                <div className="user">
                  <img
                    className="avatar"
                    src={
                      job.avatar ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlxn9oYNzB9fzQULwldEAN2DKZdqYojMyDA&s"
                    }
                    alt="avatar"
                  />
                  <div>
                    <h3 className="username">Mạnh Cường</h3>
                    <p className="time">{job.createAt}</p>
                  </div>
                </div>
                <div className="salary">{job.salary} VND</div>
                <div className="action">
                  <IoIosMenu />
                </div>
              </div>

              <div className="post-body">
                <h2 className="content">{job.title}</h2>
                <p className="content">{job.description}</p>

                <ImageGrid imgs={imgs}></ImageGrid>
              </div>

              <div className="post-footer">
                <div className="react footer-action">
                  <h3 className="count">133</h3>
                  <div>
                    <FaRegHeart></FaRegHeart> Yêu thích
                  </div>
                </div>
                <div className="comment footer-action">
                  <h3 className="count">133</h3>
                  <div
                    onClick={() => {
                      dispatch(
                        showComponentSlice.actions.setComponent({
                          jobId: job.jobId,
                          component: "comment",
                        })
                      );
                    }}
                  >
                    <FaRegComments></FaRegComments>
                    Bình luận
                  </div>
                </div>
                <div className="share footer-action">
                  <h3 className="count">133</h3>
                  <div>
                    <PiShareFatBold></PiShareFatBold>
                    Chia sẻ
                  </div>
                </div>
                <div className="detail footer-action">
                  <h3 className="count">133</h3>
                  <div
                    onClick={() => {
                      dispatch(
                        showComponentSlice.actions.setComponent({
                          jobId: job.jobId,
                          component: "detail",
                        })
                      );
                    }}
                  >
                    <BiDetail></BiDetail>
                    Chi tiết
                  </div>
                </div>
                <div className="detail footer-action">
                  <h3 className="count">0</h3>
                  <div>
                    <RiMessengerFill></RiMessengerFill> Trao đổi
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Col>

        {component.component === "comment" ? (
          <Col className="post-wrap-detail-block">
            <Comment clear={true} className="post-wrap-detail"></Comment>
          </Col>
        ) : component.component === "detail" ? (
          <PostDetail imgs={imgs}></PostDetail>
        ) : (
          <Col xs={6}>
            <PostGrid></PostGrid>
          </Col>
        )}
      </Row>
    </>
  );
}

export default Post;
