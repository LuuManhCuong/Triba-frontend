import React, { useCallback, useEffect, useRef, useState } from "react";
import "./post.scss";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { IoIosMenu } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
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
import LinearProgress from "@mui/joy/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import {
  accountSelector,
  countImgSliceSelector,
  filterSelector,
  showComponentSelector,
} from "../../redux-tookit/selector";
import PostGrid from "./PostGrid";
import PostDetail from "./PostDetail";
import Comment from "../comment/Comment";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";
import { filterSlice } from "../../redux-tookit/reducer/filterSclice";
import { toast, ToastContainer } from "react-toastify";

function Post() {
  const dispatch = useDispatch();
  const { filter, onFilter } = useSelector(filterSelector);

  const component = useSelector(showComponentSelector);
  const { value } = useSelector(countImgSliceSelector);
  const account = useSelector(accountSelector);
  const [jobs, setJobs] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [showImgs, setShowImgs] = useState([]);
  const [show, setShow] = useState(false);

  const [showComment, setShowComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(4);
  let userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(); // Trạng thái like

  const postRef = useRef(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(3000);

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
  useEffect(() => {
    setLiked(
      jobs.some((job) => job.likes.some((like) => like.user.userId === userId))
    );
  }, [jobs]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = postRef.current;
      setScrollTop(scrollTop);
      setClientHeight(clientHeight);
      setScrollHeight(scrollHeight);
    };
    postRef.current.addEventListener("scroll", handleScroll);
    if (scrollTop + 1 + clientHeight >= scrollHeight) {
      setSize((prev) => prev + 4);
    }
  }, [scrollTop]);

  useEffect(() => {
    // console.log("key: ", filter?.searchKeyword);
    axios
      .get(
        `http://localhost:8080/api/v1/user/job/search?keyword=${filter?.searchKeyword}`
      )
      .then((response) => {
        // console.log(response.data);
        setJobs(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(true);
      });
  }, [filter?.searchKeyword]);

  const fetchJobs = useCallback(() => {
    setIsLoading(true);
    // console.log("chekc: ", filter?.selectedIndustry);
    const url = `http://localhost:8080/api/v1/user/job/filter?industryName=${filter?.selectedIndustry}
    &positionName=${filter?.selectedPosition}
    &locationName=${filter?.selectedLocation}
    &workTypeName=${filter?.selectedWorkType}
    &page=${page}
    &size=${size}`;

    // console.log(url);
    axios
      .get(url)
      .then((response) => {
        setJobs(response.data.content);

        setTotalPage(response.data.totalPages);
        setIsLoading(false);
        postRef.current.scrollTop = 0;
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(true);
      });
  }, [
    page,
    size,
    filter?.selectedIndustry,
    filter?.selectedPosition,
    filter?.selectedLocation,
    filter?.selectedWorkType,
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/job?page=${page}&size=${size}`
      );
      setJobs(response.data.content);
      setTotalPage(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  !size && (postRef.current.scrollTop = 0);

  useEffect(() => {
    if (
      filter?.selectedIndustry ||
      filter?.selectedPosition ||
      filter?.selectedLocation ||
      filter?.selectedWorkType
    ) {
      setIsLoading(true);
      fetchJobs();
    } else {
      setIsLoading(true);
      fetchData();
    }
  }, [
    fetchJobs,
    filter?.selectedIndustry,
    filter?.selectedLocation,
    filter?.selectedPosition,
    filter?.selectedWorkType,
  ]);

  const sendEmail = async (email, subject, text) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("Token is not available.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/send-email",
        {
          to: email,
          subject: subject,
          text: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Email sent successfully");
        toast.success("Email sent successfully");
      } else {
        console.error("Failed to send email: ", response);
        toast.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      toast.error("Error occurred while sending email");
    }
  };

  function handleApplyJob(job) {
    // console.log("applying");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("email");
    const employerEmail = job.user.email;
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.warning(`Vui lòng đăng nhập để ứng tuyển!`);
      console.error("Token is not available.");
      return;
    }
    if (userId === job?.user?.userId) {
      // console.log("lko chạy ", job?.user?.userId);

      toast.warning(`Bạn không thể ứng tuyển bài viết của mình!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let url = `http://localhost:8080/api/v1/user/job/apply?jobId=${job.jobId}&userId=${userId}`;

    axios
      .post(url, {}, config)
      .then((response) => {
        // console.log("đagn chạy");
        sendEmail(
          userEmail,
          "Ứng tuyển công việc thành công",
          `Bạn đã ứng tuyển thành công vào công việc: ${job?.title}.`
        );
        sendEmail(
          employerEmail,
          "Có ứng viên mới ứng tuyển",
          `Ứng viên ${account.firstName} ${account.lastName} đã ứng tuyển vào công việc: ${job?.title}.`
        );
        toast.success(
          `Ứng tuyển thành công. Nhà tuyển dụng sẽ sớm liên lạc với bạn!`,
          {
            position: "top-right",
            top: 533,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      })
      .catch((error) => {
        toast.warning(`Bạn đã ứng tuyển công việc này!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error uploading image:", error.response.data);
        return null;
      });
  }

  const handleLike = async (jobId) => {
    // Thực hiện yêu cầu POST đến backend
    // console.log("like: ", jobId);
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.warning(`Vui lòng đăng nhập!`);
      console.error("Token is not available.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/user/like?jobId=${jobId}&userId=${userId}`
      );
      // console.log(response.data);
      setLiked(response.data);
      // Kiểm tra nếu yêu cầu thành công
    } catch (error) {
      console.error("Error while sending like request:", error);
    }
  };

  return (
    <>
      <Modal
        p
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
          <ImageSlick imgs={showImgs} activeImg={activeImg}></ImageSlick>
        </Modal.Body>
      </Modal>

      <Row>
        <Col className="post-wrap" xs={6} ref={postRef}>
          <ToastContainer style={{ zIndex: 23 }} />

          {jobs?.map((job, i) => (
            <div key={i} className="post shadow-xl">
              <div className="post-head">
                <div className="user">
                  <img
                    className="avatar"
                    src={
                      job.user.avatar ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlxn9oYNzB9fzQULwldEAN2DKZdqYojMyDA&s"
                    }
                    alt="avatar"
                  />
                  <div>
                    <h3 className="username">
                      {job.user.firstName + " " + job.user.lastName}
                    </h3>
                    <p className="time">{job.createAt}</p>
                  </div>
                </div>

                <div className="salary">${job.salary} </div>
                <div className="action">
                  <IoIosMenu />
                </div>
              </div>

              <div className="post-body">
                <h2
                  className="content"
                  style={{ color: "var(--primary-color)", fontSize: "1.6rem" }}
                >
                  {job.title}
                </h2>
                <p className="content">{job.description}</p>
                <ImageGrid imgs={job?.images}></ImageGrid>
              </div>

              <div className="post-footer">
                <div className="react footer-action">
                  {/* <h3 className="count">133</h3> */}
                  <div
                    onClick={() => handleLike(job?.jobId)}
                    style={{
                      color: liked && "var(--primary-color)",
                      userSelect: "none",
                    }}
                  >
                    {!liked ? (
                      <>
                        <FaRegHeart></FaRegHeart> Like
                      </>
                    ) : (
                      <>
                        <FaHeart
                          style={{
                            color: "red",
                          }}
                        />{" "}
                        Like
                      </>
                    )}
                  </div>
                </div>
                <div className="comment footer-action">
                  {/* <h3 className="count">133</h3> */}
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
                    Comment
                  </div>
                </div>
                <div className="share footer-action">
                  {/* <h3 className="count">133</h3> */}
                  <div onClick={() => handleApplyJob(job)}>
                    <PiShareFatBold></PiShareFatBold>
                    Apply
                  </div>
                </div>
                <div className="detail footer-action">
                  {/* <h3 className="count">133</h3> */}
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
                    Detail
                  </div>
                </div>
              </div>
            </div>
          ))}
          {jobs?.length <= 0 && !isLoading && <h2>Không tìm thấy dữ liệu</h2>}
          {isLoading && <LinearProgress />}
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
