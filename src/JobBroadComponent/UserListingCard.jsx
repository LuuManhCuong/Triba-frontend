import axios from "axios";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { counterSlice } from "../redux-tookit/reducer/counterSlice";
import Modal from "react-bootstrap/Modal";
import { MdClear } from "react-icons/md";
import FromCreateJob from "../components/forms/FormCreateJob";
import ImageGrid from "../components/post/ImageGrid";
import { accountSlice } from "../redux-tookit/reducer/accountSlice";
import EditProfile from "../components/project/EditProfile";

function UserListingCard({ user }) {
  let userId = localStorage.getItem("userId");
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleToggleRole = (userId) => {
    axios
      .patch(`http://localhost:8080/api/v1/user/toggle-role/${userId}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Update Role Successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(counterSlice.actions.increase()); // Refresh the user list after changing the role
      })
      .catch((error) => {
        console.error("Error toggling user role:", error);
      });
  };

  function handleDeleteUser(userId) {
    console.log("delete user: " + userId);

    axios
      .delete(`http://localhost:8080/api/v1/user/delete/${userId}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Delete user Successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(counterSlice.actions.increase()); // Refresh the user list after changing the role
      })
      .catch((error) => {
        console.error("Error delete user:", error);
      });
  }
  return (
    <div className="col-lg-12 col-md-12">
      <div className="single_jobs white-bg d-flex justify-content-between">
        <div className="jobs_left d-flex align-items-center">
          <ToastContainer />
          {/* Modal Edit */}
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
              Edit user
              <button onClick={() => setShow(false)}>
                <MdClear></MdClear>
              </button>
            </Modal.Title>
            <Modal.Body>
              <div style={{ width: "70vw", margin: "auto" }}>
                <EditProfile user={user}></EditProfile>
              </div>
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
              src={
                user?.avatar ||
                `https://res.cloudinary.com/djcamu6kz/image/upload/v1716727509/byq36gfaokzcytmmcbgf.svg`
              }
              alt="avt"
            />
          </div>
          <div className="jobs_conetent">
            <a href="job_details.html">
              <h4>{user?.lastName + " " + user?.firstName}</h4>
            </a>
            <div className="links_locat d-flex align-items-center">
              <div className="location">
                <p>
                  <i className="fa fa-map-marker"></i> {user?.email}{" "}
                </p>
              </div>
              <div className="location">
                <p>
                  <i className="fa fa-map-marker"></i> {user?.phoneNumber}{" "}
                </p>
              </div>
              <div className="location">
                <p>
                  <i className="fa fa-map-marker"></i>{" "}
                  {user?.authorities[0]?.authority}{" "}
                </p>
              </div>
              <div className="location">
                <p>
                  <i className="fa fa-map-marker"></i> {user?.address}{" "}
                </p>
              </div>
              <div className="location">
                <p
                  style={{
                    width: "100px",
                    border: "1px solid var(--primay-color)",
                  }}
                >
                  {/* <i className="fa fa-map-marker"></i> {user?.address}{" "} */}
                  <ImageGrid imgs={[user?.coverImg]}></ImageGrid>
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
          <>
            <div
              className="apply_now"
              style={{ margin: "5px", width: "100px", zoom: "0.6" }}
              onClick={() => handleDeleteUser(user?.userId)}
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
              onClick={() => handleToggleRole(user.userId)}
            >
              <a style={{ display: "block" }} className="boxed-btn3">
                Change Role
              </a>
            </div>
            <div
              className="apply_now"
              style={{ margin: "5px", width: "100px", zoom: "0.6" }}
              onClick={() => setShow(!show)}
            >
              <a style={{ display: "block" }} className="boxed-btn3">
                Edit
              </a>
            </div>
          </>

          <div
            className="date"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>{user?.createAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserListingCard;
