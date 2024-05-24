import React, { useEffect, useState } from "react";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import { MdClear } from "react-icons/md";
import FromCreateJob from "../forms/FormCreateJob";
import axios from "axios";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";
import { accountSelector, counterSelector } from "../../redux-tookit/selector";

function CardJob({ jobs, owner }) {
  const dispatch = useDispatch();

  return (
    <div className="visit-country my-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="items">
              <div className="row">
                {jobs?.map((job, i) => (
                  <CountryItem
                    key={i}
                    imgSrc={
                      job?.images[0]?.url ||
                      "https://i.ytimg.com/vi/OKZFHo5p4VA/sddefault.jpg"
                    }
                    username={job.user?.lastName + " " + job.user?.firstName}
                    address={job.address}
                    title={job.title}
                    industry={job.industries.map((e, i) => (
                      <>{e.name + " "}</>
                    ))}
                    time={job.createAt}
                    salary={job.salary}
                    dispatch={dispatch}
                    jobId={job.jobId}
                    job={job}
                    owner={owner}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountryItem({
  imgSrc,
  username,
  address,
  title,
  industry,
  time,
  salary,
  dispatch,
  jobId,

  owner,
  job,
}) {
  // const reload = useSelector(counterSelector);
  const [item, setItem] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [dataApply, setDataApply] = useState();
  const account = useSelector(accountSelector);

  function handleBlock() {
    setItem(!item);
  }
  function handleEdit() {
    setShowEditModal(!showEditModal);
  }

  function handleState() {}

  async function handleApplyManage(jobId) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/job/applications/apply/${jobId}`
      );

      // console.log("data: ", response.data);
      setDataApply(response.data);
      // dispatch(counterSlice.actions.increase());
    } catch (error) {
      toast.error("Failed to get");
    }
    setShowApplyModal(!showApplyModal);
  }

  async function handleReloadApplyManage() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/job/applications/apply/${job.jobId}`
      );

      // console.log("data: ", response.data);
      setDataApply(response.data);
      // dispatch(counterSlice.actions.increase());
    } catch (error) {
      toast.error("Failed to get");
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/user/job/delete/${job.jobId}`
      );
      toast.success("Job deleted successfully!");
      // console.log("xóa thành công");
      dispatch(counterSlice.actions.increase());
    } catch (error) {
      toast.error("Failed to delete the job.");
    }
  }

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  function handleViewCV(user) {
    // Thực hiện các thao tác khi người dùng muốn xem CV
    // Ví dụ: Mở một modal hiển thị CV của người dùng
  }

  async function handleUpdateStatus(id, status) {
    // console.log("update status: ", id, status);
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/user/job/applications/${id}/update-status/${status}`
      );
      // dispatch(counterSlice.actions.increase());
      // console.log("data: ", response.data);
      handleReloadApplyManage();

      // toast.success("Colabrate success!!!");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  }

  return (
    <div className="col-lg-12">
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
          <button onClick={() => setShowEditModal(false)}>
            <MdClear></MdClear>
          </button>
          Edit post
        </Modal.Title>
        <Modal.Body>
          <FromCreateJob jobEdit={job}></FromCreateJob>
        </Modal.Body>
      </Modal>

      {/* Modal Apply Manage */}
      <Modal
        className="moda"
        show={showApplyModal}
        onHide={() => setShowApplyModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Title
          className="header-moda"
          id="example-custom-modal-styling-title"
        >
          <button onClick={() => setShowApplyModal(false)}>
            <MdClear></MdClear>
          </button>
          Application Manage
        </Modal.Title>
        <Modal.Body>
          {!dataApply?.lengh > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Apply Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataApply &&
                  dataApply.map((apply, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={
                            apply?.user?.avatar ||
                            "https://res.cloudinary.com/djcamu6kz/image/upload/v1716456163/buio7bmyejvpe4zxnxbo.png"
                          }
                          alt="avt"
                        />
                        {apply?.user?.firstName} {apply?.user?.lastName}
                      </td>
                      <td>{formatDateTime(apply?.applicationTime)}</td>
                      <td
                        style={{
                          color: apply.status === "APPROVED" ? "green" : "red",
                        }}
                      >
                        {apply.status}
                      </td>
                      <td>
                        <button
                          style={{ magin: "0 10px" }}
                          className="btn btn-primary btn-sm"
                          onClick={() => handleViewCV(apply.user)}
                        >
                          Xem CV
                        </button>
                        <>
                          {apply.status !== "REJECTED" && (
                            <button
                              style={{ magin: "0 10px" }}
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleUpdateStatus(apply.id, "REJECTED")
                              }
                            >
                              REJECTED
                            </button>
                          )}

                          {apply.status !== "APPROVED" && (
                            <button
                              style={{ magin: "0 10px" }}
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                handleUpdateStatus(apply.id, "APPROVED")
                              }
                            >
                              APPROVED
                            </button>
                          )}
                        </>
                      </td>{" "}
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div>Chưa có người ứng tuyển</div>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer />
      <div className="item shadow-md">
        <div className="row">
          <div className="col-lg-4 col-sm-5">
            <div className="image">
              <img src={imgSrc} alt={imgSrc} />
            </div>
          </div>

          <div className="col-lg-8 col-sm-7">
            <div className="right-content">
              <h4>{title}</h4>
              <span>{time}</span>
              {owner ? (
                <div
                  className="main-button"
                  onClick={handleBlock}
                  onBlur={handleBlock}
                >
                  <a>...</a>

                  {item && (
                    <ul className="sub-action shadow-lg">
                      <li
                        onClick={() => handleEdit()}
                        className="sub-action-item"
                      >
                        Edit
                      </li>
                      <li
                        onClick={() => handleApplyManage(job.jobId)}
                        className="sub-action-item"
                      >
                        Apply Manage
                      </li>
                      <li onClick={handleState} className="sub-action-item">
                        Stop Hiring
                      </li>
                      <li onClick={handleDelete} className="sub-action-item">
                        Delete
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <div
                  className="main-button"
                  onClick={() => {
                    dispatch(
                      showComponentSlice.actions.setComponent({
                        jobId: jobId,
                        component: "detail",
                      })
                    );
                  }}
                >
                  <a>Chi tiết</a>
                </div>
              )}
              <p>{job?.description}</p>
              <ul className="info">
                <li>
                  <i className="fa fa-user"></i> {industry}
                </li>
                <li>
                  <i className="fa fa-globe"></i> {address}
                </li>
                <li>
                  <i className="fa fa-home"></i> ${salary}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardJob;
