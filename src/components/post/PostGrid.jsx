import React, { useEffect, useState } from "react";
import "./post.scss";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import PostDetail from "./PostDetail";
import { useSelector, useDispatch } from "react-redux";

function PostGrid() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/triba/job"
      );
      setJobs(response.data);
    };

    fetchData();
  }, []);

  return (
    <Row className="post-grid">
      {jobs.map((job, i) => (
        <Col xs={6} className="post-card">
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

          <h2 className="title">{job.title}</h2>
          <h2>{job.salary} Vnd</h2>
          <h2>{job.address} Vnd</h2>
        </Col>
      ))}
    </Row>
  );
}

export default PostGrid;
