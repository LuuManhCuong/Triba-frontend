import React, { useState } from "react";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import { MdClear } from "react-icons/md";
import FromCreateJob from "../forms/FormCreateJob";
import axios from "axios";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";

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
                    username={job.user.lastName + " " + job.user.firstName}
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
  key,
  owner,
  job,
}) {
  const [item, setItem] = useState(false);
  const [show, setShow] = useState(false);
  function handleBlock() {
    setItem(!item);
  }
  function handleEdit() {
    setShow(!show);
  }
  function handleState() {}
  async function handleDelete() {
    // console.log("xóa: ", job.jobId);
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/user/job/delete/${job.jobId}`
      );
      toast.success("Job deleted successfully!");
      console.log("xóa thành công");
      dispatch(counterSlice.actions.increase());
      // Optionally refresh the jobs list or update the state to remove the deleted job
    } catch (error) {
      toast.error("Failed to delete the job.");
    }
  }
  return (
    <div className="col-lg-12" key={key}>
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
          <button onClick={() => setShow(false)}>
            <MdClear></MdClear>
          </button>
          Edit post
        </Modal.Title>
        <Modal.Body>
          <FromCreateJob jobEdit={job}></FromCreateJob>
        </Modal.Body>
      </Modal>
      <ToastContainer />
      <div className="item">
        <div className="row">
          <div className="col-lg-4 col-sm-5">
            <div className="image">
              <img src={imgSrc} alt={imgSrc} />
            </div>
          </div>

          <div className="col-lg-8 col-sm-7">
            <div className="right-content">
              <h4>{username}</h4>
              <span>{address}</span>
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
              <p>{title}</p>
              <ul className="info">
                <li>
                  <i className="fa fa-user"></i> {industry}
                </li>
                <li>
                  <i className="fa fa-globe"></i> {time}
                </li>
                <li>
                  <i className="fa fa-home"></i> {salary} vnd
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
