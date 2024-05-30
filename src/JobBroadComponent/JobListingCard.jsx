import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { counterSlice } from "../redux-tookit/reducer/counterSlice";
import Modal from "react-bootstrap/Modal";
import { MdClear } from "react-icons/md";
import FromCreateJob from "../components/forms/FormCreateJob";

function JobListingCard({ job, isAdmin }) {
  let userId = localStorage.getItem("userId");
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);

  const [liked, setLiked] = useState(
    job.likes.some((like) => like.user.userId === userId)
  ); // Trạng thái like

  useEffect(() => {
    setLiked(job.likes.some((like) => like.user.userId === userId));
  }, [job]);
  function handleEdit() {
    setShowEditModal(!showEditModal);
  }

  const handleLike = async (jobId) => {
    // Thực hiện yêu cầu POST đến backend
    // console.log("like: ", jobId);
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.warning(`Vui lòng đăng nhập!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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

  async function handleDelete(jobId) {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/user/job/delete/${jobId}`
      );
      toast.success("Job deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // console.log("xóa thành công");
      dispatch(counterSlice.actions.increase());
    } catch (error) {
      toast.error("Failed to delete the job.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <div className="col-lg-12 col-md-12">
      <div className="single_jobs white-bg d-flex justify-content-between">
        <div className="jobs_left d-flex align-items-center">
          <ToastContainer />
          {/* Modal Edit */}
          <Modal
            className="moda"
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Title
              className="header-moda"
              id="example-custom-modal-styling-title"
            >
              Edit post
              <button onClick={() => setShowEditModal(false)}>
                <MdClear></MdClear>
              </button>
            </Modal.Title>
            <Modal.Body>
              <FromCreateJob jobEdit={job}></FromCreateJob>
            </Modal.Body>
          </Modal>
          <div className="thumb">
            <img
              style={{
                width: "100%",
                borderRadius: "10px",
                height: "100%",
                objectFit: "cover",
              }}
              src={job?.images[0]?.url}
              alt=""
            />
          </div>
          <div className="jobs_conetent">
            <a href={`/job/detail/${job?.jobId}`}>
              <h4>{job?.title}</h4>
            </a>
            <div className="links_locat d-flex align-items-center">
              <div className="location">
                <p style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      job?.user?.avatar ||
                      "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                    }
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50px",
                    }}
                  />
                  {job?.user?.lastName + " " + job?.user?.firstName}
                </p>
              </div>

              <div className="location">
                <p>
                  <i className="fa fa-map-marker"></i> {job?.address}
                </p>
              </div>
              {/* <div className="location">
                <p>
                  <i className="fa fa-clock-o"></i> {job?.workTypes[0]?.name}{" "}
                  {job?.workTypes[1]?.name}
                </p>
              </div> */}
              <div className="location">
                <p>
                  <i className="fa fa-map-marker"></i> {job?.positions[0]?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="jobs_right"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {isAdmin ? (
            <>
              <div
                className="apply_now"
                style={{ margin: "5px", width: "100px", zoom: "0.6" }}
                onClick={() => handleDelete(job.jobId)}
              >
                <a
                  style={{ display: "block", background: "red" }}
                  className="boxed-btn3"
                >
                  Delete
                </a>
              </div>
              <div
                className="apply_now"
                style={{ margin: "5px", width: "100px", zoom: "0.6" }}
                onClick={() => handleEdit()}
              >
                <a style={{ display: "block" }} className="boxed-btn3">
                  Update
                </a>
              </div>
            </>
          ) : (
            ""
          )}
          <div
            className="apply_now"
            style={{ margin: "5px", width: "100px", zoom: "0.6" }}
            onClick={() => naviagte(`/job/detail/${job.jobId}`)}
          >
            <a style={{ display: "block" }} className="boxed-btn3">
              Detail
            </a>
          </div>

          <div
            className="date"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="post-footer" style={{ margin: "0 10px" }}>
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
            </div>
            <p>{job?.createAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListingCard;
