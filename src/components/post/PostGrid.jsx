import React, { useEffect, useRef, useState } from "react";
import "./post.scss";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import PostDetail from "./PostDetail";
import { useSelector, useDispatch } from "react-redux";
import CardJob from "../card/CardJob";

function PostGrid() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [size, setSize] = useState(4);

  const postRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(3000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/job?page=${page}&size=${size}`
        );
        console.log("data: ", response.data.content);
        setJobs(response.data.content);
        setTotalPage(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [size]);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = postRef.current;
      setScrollTop(scrollTop);
      setClientHeight(clientHeight);
      setScrollHeight(scrollHeight);
    };
    postRef.current.addEventListener("scroll", handleScroll);
    // Kiểm tra khi người dùng cuộn đến cuối trang
    if (scrollTop + clientHeight >= scrollHeight && page < totalPage) {
      setSize((prev) => prev + 4);
    }
    // return () => {
    //   postRef.current.removeEventListener("scroll", handleScroll);
    // };
  }, [scrollTop]);
  return (
    <Row
      className="post-grid"
      ref={postRef}
      style={{ overflow: "auto", maxHeight: "76vh" }}
    >
      {/* {jobs.map((job, i) => (
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
      ))} */}

      <CardJob jobs={jobs}></CardJob>
    </Row>
  );
}

export default PostGrid;
