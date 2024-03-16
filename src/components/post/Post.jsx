import React, { useEffect, useState } from "react";
import "./post.scss";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { IoIosMenu } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComments } from "react-icons/fa";
import { RiMessengerFill } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import axios from "axios";

function Post() {
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
    <Row>
      <Col xs={6}>
        {jobs?.map((job, i) => (
          <div className="post">
            <div className="post-head">
              <div className="user">
                <img
                  className="avatar"
                  src={job.avatar || "https://s.net.vn/0woj"}
                  alt="avatar"
                />
                <div>
                  <h3 className="username">Mạnh Cường</h3>
                  <p className="time">{job.createAt}</p>
                </div>
              </div>
              <div className="salary">{job.salary} VND</div>
              <div className="action">
                <IoIosMenu />
              </div>
            </div>

            <div className="post-body">
              <h2 className="content">{job.title}</h2>
              <p className="content">{job.description}</p>
              <img
                className="post-body-img"
                src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/431955776_805022964985935_1933965139556264659_n.jpg?stp=dst-jpg_p480x480&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGr08WGwaByFmVMsoQd8u2ayARUKCNmkAXIBFQoI2aQBadgZUDDjZNxmsrE9FLNCZ0C9pOFa2cf7g68-75FWhpr&_nc_ohc=tKYhvPg5tjoAX-DYByx&_nc_zt=23&_nc_ht=scontent.fdad2-1.fna&oh=00_AfBL1osJoEYGXJJLFe5PVjbfZrsKVJkt8-wT7clv6G3cXw&oe=65F9596C"
                alt="img"
              />
              <img
                className="post-body-img"
                src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/429838755_800777385410493_7822550900069568141_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHQfuUZSQ_f72lorVWylsbfLxyvvBzDuSYvHK-8HMO5Jg6ZuPvZUYGOsObOV7MqX_qB9fGTk37CBw_jw42VwXWZ&_nc_ohc=Q7iCeHCJjdQAX8GoncU&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&oh=00_AfDzNGA6R7mSqB0FXt-0pvh-fMbzI9DjFnLopYs5ufZ3Tg&oe=65F8C0A8"
                alt="img"
              />
            </div>

            <div className="post-footer">
              <div className="react footer-action">
                <h3 className="count">133</h3>
                <div>
                  <FaRegHeart></FaRegHeart> Yêu thích
                </div>
              </div>
              <div className="comment footer-action">
                <h3 className="count">133</h3>
                <div>
                  <FaRegComments></FaRegComments>
                  Bình luận
                </div>
              </div>
              <div className="share footer-action">
                <h3 className="count">133</h3>
                <div>
                  <PiShareFatBold></PiShareFatBold>
                  Chia sẻ
                </div>
              </div>
              <div className="detail footer-action">
                <h3 className="count">133</h3>
                <div>
                  <BiDetail></BiDetail>
                  Ứng tuyển
                </div>
              </div>
              <div className="detail footer-action">
                <div>
                  <RiMessengerFill></RiMessengerFill> Trao đổi
                </div>
              </div>
            </div>
          </div>
        ))}
      </Col>
    </Row>
  );
}

export default Post;
