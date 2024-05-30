import React, { useEffect, useState } from "react";
import "./css/style.scss"; // Ensure the correct path to your CSS file
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import CommentDetail from "../components/comment/CommentDetail";
import { useSelector } from "react-redux";
import { accountSelector } from "../redux-tookit/selector";
import ImageGrid from "../components/post/ImageGrid";
const JobDetails = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let userId = localStorage.getItem("userId");
  const account = useSelector(accountSelector);

  const [liked, setLiked] = useState(
    jobs?.likes.some((like) => like.user.userId === userId)
  ); // Trạng thái like

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/job/${id}`
      );
      console.log("res ", response.data);
      setJobs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchData(id);
  }, [id]);

  // console.log("job: ", jobs);

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
      console.log(response.data);
      setLiked(response.data);
      // Kiểm tra nếu yêu cầu thành công
    } catch (error) {
      console.error("Error while sending like request:", error);
    }
  };
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

  return (
    <>
      {/* bradcam_area */}
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>{jobs?.title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/ bradcam_area */}

      <div className="job_details_area">
        <div className="container">
          <ToastContainer />

          <div className="row">
            <div className="col-lg-8">
              <div className="job_details_header">
                <div className="single_jobs white-bg d-flex justify-content-between">
                  <div className="jobs_left d-flex align-items-center">
                    <div className="thumb">
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                        src={
                          jobs?.images[0]?.url ||
                          "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                        }
                        alt="avt"
                      />
                    </div>
                    <div className="jobs_conetent">
                      <a href="#">
                        <h4>{jobs?.title}</h4>
                      </a>
                      <div className="links_locat d-flex align-items-center">
                        <div className="location" style={{ display: "flex" }}>
                          <img
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50px",
                              marginRight: "5px",
                            }}
                            src={
                              jobs?.user?.avatar ||
                              "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                            }
                            alt="avt"
                          />
                          <p>
                            {jobs?.user?.lastName + " " + jobs?.user?.firstName}
                          </p>
                        </div>
                        <div className="location">
                          <p>
                            <i className="fa fa-map-marker"></i>
                            {jobs?.address}
                          </p>
                        </div>
                        <div className="location">
                          <p>
                            <i className="fa fa-clock-o"></i>{" "}
                            {jobs?.positions[0]?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="jobs_right">
                    <div className="apply_now">
                      <div className="post-footer" style={{ margin: "0 10px" }}>
                        <div className="react footer-action">
                          {/* <h3 className="count">133</h3> */}
                          <div
                            onClick={() => handleLike(jobs?.jobId)}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="descript_wrap white-bg">
                <div className="single_wrap">
                  <h4>Job description</h4>
                  <p>{jobs?.description}</p>
                  <p>
                    Variations of passages of lorem Ipsum available, but the
                    majority have suffered alteration in some form, by injected
                    humour, or randomised words which don't look even slightly
                    believable. If you are going to use a passage of Lorem
                    Ipsum, you need to be sure there isn't anything
                    embarrassing.
                  </p>
                </div>
                <div className="single_wrap">
                  <h4>Responsibility</h4>
                  <ul>
                    <li>
                      The applicants should have experience in the following
                      areas.
                    </li>
                    <li>Have sound knowledge of commercial activities.</li>
                    <li>
                      Leadership, analytical, and problem-solving abilities.
                    </li>
                    <li>
                      Should have vast knowledge in IAS/ IFRS, Company Act,
                      Income Tax, VAT.
                    </li>
                  </ul>
                </div>
                {/* <div className="single_wrap">
                  <h4>Qualifications</h4>
                  <ul>
                    <li>
                      The applicants should have experience in the following
                      areas.
                    </li>
                    <li>Have sound knowledge of commercial activities.</li>
                    <li>
                      Leadership, analytical, and problem-solving abilities.
                    </li>
                    <li>
                      Should have vast knowledge in IAS/ IFRS, Company Act,
                      Income Tax, VAT.
                    </li>
                  </ul>
                </div> */}
                <div className="single_wrap">
                  <h4>Benefits</h4>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing.
                  </p>
                </div>
              </div>
              <div className="apply_job_form white-bg">
                <h4>Comment</h4>
                <CommentDetail
                  hiddenInfo={true}
                  jobId={jobs?.jobId}
                ></CommentDetail>
              </div>
              <div className="apply_job_form white-bg">
                <form action="#">
                  <h3>Send an email</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input_field">
                        <input type="text" placeholder="Your name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input_field">
                        <input type="text" placeholder="Email" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input_field">
                        <input
                          type="text"
                          placeholder="Website/Portfolio link"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <button type="button" id="inputGroupFileAddon03">
                            <i
                              className="fa fa-cloud-upload"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile03"
                            aria-describedby="inputGroupFileAddon03"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile03"
                          >
                            {/* Upload CV */}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input_field">
                        <textarea
                          name="#"
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="Coverletter"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="submit_btn">
                      <button
                        className="boxed-btn3 w-100"
                        onClick={() => handleApplyJob(jobs)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="job_sumary">
                <div className="summery_header">
                  <h3>Job Summery</h3>
                </div>
                <div className="job_content">
                  <ul>
                    <li>
                      Company: <span>{jobs?.companyName || "Private"}</span>
                    </li>
                    <li>
                      Published on: <span>{jobs?.createAt}</span>
                    </li>
                    <li>
                      Position: <span>{jobs?.positions[0]?.name}</span>
                    </li>
                    <li>
                      Salary: <span>{jobs?.salary}</span>
                    </li>
                    <li>
                      Location: <span>{jobs?.address}</span>
                    </li>
                    <li>
                      Job Nature: <span>{jobs?.workTypes[0]?.name}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-12">
                {!isLoading ? <ImageGrid imgs={jobs?.images}></ImageGrid> : ""}
              </div>
              <div className="share_wrap d-flex">
                <div className="col-md-12">
                  <div className="submit_btn">
                    <button
                      className="boxed-btn3 w-100"
                      onClick={() => handleApplyJob(jobs)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
                {/* <span>Share at:</span>
                <ul>
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-facebook"></i>
                    </a>{" "}
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-google-plus"></i>
                    </a>{" "}
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-twitter"></i>
                    </a>{" "}
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-envelope"></i>
                    </a>{" "}
                  </li>
                </ul> */}
              </div>
              <div className="job_location_wrap">
                <div className="job_lok_inner">
                  <div id="map" style={{ height: "200px" }}></div>
                  <script>
                    {`function initMap() {
                      var uluru = {lat: -25.363, lng: 131.044};
                      var grayStyles = [
                        {
                          featureType: "all",
                          stylers: [
                            { saturation: -90 },
                            { lightness: 50 }
                          ]
                        },
                        {elementType: 'labels.text.fill', stylers: [{color: '#ccdee9'}]}
                      ];
                      var map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: -31.197, lng: 150.744},
                        zoom: 9,
                        styles: grayStyles,
                        scrollwheel:  false
                      });
                    }`}
                  </script>
                  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpfS1oRGreGSBU5HHjMmQ3o5NLw7VdJ6I&callback=initMap"></script>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
