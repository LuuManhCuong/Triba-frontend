import React from "react";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";
import { useDispatch } from "react-redux";

function CardJob({ jobs }) {
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
                      job.thumbnail ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlxn9oYNzB9fzQULwldEAN2DKZdqYojMyDA&s"
                    }
                    username="Mạnh cường"
                    address={job.address}
                    title={job.title}
                    people="8.66 Mil People"
                    time={job.createAt}
                    salary={job.salary}
                    dispatch={dispatch}
                    jobId={job.jobId}
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
  people,
  time,
  salary,
  dispatch,
  jobId,
}) {
  return (
    <div className="col-lg-12">
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
              <p>{title}</p>
              <ul className="info">
                <li>
                  <i className="fa fa-user"></i> {people}
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
