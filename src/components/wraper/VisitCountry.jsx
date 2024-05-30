import React, { useEffect, useState } from "react";
import country1 from "../../assets/images/country-01.jpg";
import country2 from "../../assets/images/country-02.jpg";
import country3 from "../../assets/images/country-03.jpg";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";
import CommentDetail from "../comment/CommentDetail";
import { FaHeart, FaRegComments, FaRegHeart } from "react-icons/fa6";
import { PiShareFatBold } from "react-icons/pi";
import { BiDetail } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { accountSelector } from "../../redux-tookit/selector";
import { useNavigate } from "react-router-dom";

function VisitCountry({ job }) {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const account = useSelector(accountSelector);
  const [showComment, setShowComment] = useState(false);
  let userId = localStorage.getItem("userId");
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

  const [liked, setLiked] = useState(
    job.likes.some((like) => like.user.userId === userId)
  ); // Trạng thái like
  useEffect(() => {
    setLiked(job.likes.some((like) => like.user.userId === userId));
  }, [job]);
  const handleLike = async () => {
    // Thực hiện yêu cầu POST đến backend
    // console.log("like: ", job.jobId);
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.warning(`Vui lòng đăng nhập!`);
      console.error("Token is not available.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/user/like?jobId=${job.jobId}&userId=${userId}`
      );
      console.log(response.data);
      setLiked(response.data);
      // Kiểm tra nếu yêu cầu thành công
    } catch (error) {
      console.error("Error while sending like request:", error);
    }
  };
  return (
    <div className="visit-country shadow-lg">
      <div className="container">
        <ToastContainer />

        <div className="row">
          <div className="col-lg-8">
            <div className="items">
              <div className="row">
                <div className="col-lg-12">
                  <div className="item">
                    <div className="row">
                      <div className="col-lg-4 col-sm-5">
                        <div className="image">
                          <img
                            src={job?.images[0]?.url || country1}
                            alt="Country 1"
                          />
                        </div>
                      </div>
                      <div className="col-lg-8 col-sm-7">
                        <div className="right-content">
                          <h4>{job?.title}</h4>
                          <span className="time">
                            {job?.companyName || "Fpt Software"}
                          </span>

                          <span></span>
                          <div
                            className="main-button"
                            onClick={() => handleApplyJob(job)}
                          >
                            <a>Apply now</a>
                          </div>
                          <p>{job?.description}</p>
                          <ul className="info">
                            <li
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <img
                                src={
                                  job?.user?.avatar ||
                                  "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                                }
                                alt="avt"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50px",
                                  margin: "auto",
                                }}
                              />

                              {job?.user?.lastName + " " + job?.user?.firstName}
                              {/* <i className="fa fa-user"></i> {job?.createAt} */}
                            </li>
                            {/* <li>
                              <i className="fa fa-globe"></i> {job?.createAt}
                            </li> */}
                            <li>
                              <i className="fa fa-globe"></i>{" "}
                              {job?.locations[0]?.name}
                            </li>
                            <li>
                              <i className="fa fa-home"></i> ${job?.salary}
                            </li>
                          </ul>

                          <div className="text-button">
                            <div className="post-footer">
                              <div className="react footer-action">
                                {/* <h3 className="count">{job?.likes?.length}</h3> */}
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
                                    setShowComment(!showComment);
                                  }}
                                  style={{
                                    color:
                                      showComment && "var(--primary-color)",
                                    userSelect: "none",
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
                                  onClick={() =>
                                    naviagte(`/job/detail/${job.jobId}`)
                                  }
                                >
                                  <BiDetail></BiDetail>
                                  Detail
                                </div>
                              </div>
                            </div>
                            {showComment ? (
                              <>
                                <CommentDetail
                                  hiddenInfo={true}
                                  jobId={job.jobId}
                                ></CommentDetail>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Repeat similar block for other countries */}
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="side-bar-map">
              <div class="row">
                <div class="col-lg-12">
                  <div id="map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12469.776493332698!2d-80.14036379941481!3d25.907788681148624!2m3!1f357.26927939317244!2f20.870722720054623!3f0!3m2!1i1024!2i093!4f35!3m3!1m2!1s0x88d9add4b4ac788f%3A0xe77469d09480fcdb!2sSunny%20Isles%20Beach!5e1!3m2!1sen!2sth!4v1642869952544!5m2!1sen!2sth"
                      width="100%"
                      height="200px"
                      frameborder="0"
                      // style="border:0; border-radius: 23px; "
                      style={{ border: "0", borderRadius: "30px" }}
                      allowfullscreen=""
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitCountry;
