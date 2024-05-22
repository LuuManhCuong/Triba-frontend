import React, { useEffect, useRef, useState, useCallback } from "react";
import "./comment.scss";
import { MdClear } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  accountSelector,
  showComponentSelector,
} from "../../redux-tookit/selector";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";
import axios from "axios";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

function Comment({ clear, hiddenInfo }) {
  const dispatch = useDispatch();
  const { jobId } = useSelector(showComponentSelector);
  const textareaRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [newComment]);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  useEffect(() => {
    const fetchJobDetails = async (jobId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/job/${jobId}`
        );
        setJobDetail(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails(jobId);
    // Scroll to the top of the detail component
    window.scrollTo(0, 0);
  }, [jobId]);

  function getComments(jobId) {
    axios
      .get(`http://localhost:8080/api/v1/user/comments/${jobId}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }
  // useEffect(() => {}, [jobId]);

  useEffect(() => {
    getComments(jobId);

    const socket = new SockJS("http://localhost:8080/api/v1/user/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        setStompClient(client);
        setIsConnected(true);
        client.subscribe(`/api/v1/user/topic/comments/${jobId}`, (message) => {
          getComments(jobId);
        });
      },
      (error) => {
        console.error("Connection error", error);
        setIsConnected(false);
      }
    );

    return () => {
      if (client && isConnected) {
        client.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      }
    };
  }, [jobId]);

  const [reload, setReload] = useState(false);

  const handleAddComment = () => {
    const userId = localStorage.getItem("userId");
    if (newComment.trim() && userId && isConnected && stompClient) {
      const commentData = {
        jobId,
        userId,
        content: newComment,
      };

      stompClient.send(
        `/api/v1/user/app/comments/${jobId}`,
        {},
        JSON.stringify(commentData)
      );
    }
    setNewComment("");
  };

  // Loại bỏ các phần tử trùng lặp trong mảng comments
  // const filteredComments = comments.filter(
  //   (comment) => comment.id !== newComment.id
  // );
  return (
    <div className="comment-block">
      {!hiddenInfo && (
        <div className="wrap-header-comment ">
          <div className="comment-title">
            <h3></h3>

            {clear && (
              <div
                className="action"
                onClick={() =>
                  dispatch(
                    showComponentSlice.actions.setComponent({
                      jobId: 0,
                      component: "default",
                    })
                  )
                }
              >
                <MdClear />
              </div>
            )}
          </div>
          <div className="user">
            <img
              className="avatar"
              src={
                jobDetail?.user?.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlxn9oYNzB9fzQULwldEAN2DKZdqYojMyDA&s"
              }
              alt="avatar"
            />
            <div>
              <h3 className="username">
                {jobDetail?.user
                  ? jobDetail?.user?.lastName + " " + jobDetail?.user?.firstName
                  : "Unknown User"}
              </h3>
              <p className="time">{jobDetail?.createAt}</p>
            </div>
            <h2 className="content-cm">
              {jobDetail?.title}{" "}
              <ul className="info">
                <li>
                  <i className="fa fa-user"></i>{" "}
                  {jobDetail?.industries.map((e, i) => (
                    <>{e.name + " "}</>
                  ))}
                </li>
                <li>
                  <i className="fa fa-globe"></i> {jobDetail?.createAt}
                </li>
                <li>
                  <i className="fa fa-home"></i> {jobDetail?.salary} vnd
                </li>
              </ul>
            </h2>
          </div>
        </div>
      )}
      <div className="comment-input">
        <div className="user">
          <img
            src="https://yt3.ggpht.com/WLwD-mQrBHLv1isMGjCdcBv9evwumLpPgOFP14p7OR9FRAuiEERRHV5weM-LdlgPCZPk3qUf=s88-c-k-c0x00ffffff-no-rj"
            alt="avt"
          />
          <div className="write-comment">
            <textarea
              ref={textareaRef}
              value={newComment}
              placeholder="Viết bình luận của bạn..."
              onChange={handleChange}
            />
            <button onClick={handleAddComment}>Gửi</button>
          </div>
        </div>
      </div>
      {comments?.map((comment, index) => (
        <div key={index} className="comment-item">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/WLwD-mQrBHLv1isMGjCdcBv9evwumLpPgOFP14p7OR9FRAuiEERRHV5weM-LdlgPCZPk3qUf=s88-c-k-c0x00ffffff-no-rj"
              alt="avt"
            />
            <div className="user-infor">
              <h3>
                {comment.user?.firstName} {comment.user?.lastName}
              </h3>
              <p>{comment.createdAt}</p>
            </div>
          </div>
          <div className="content">
            <p>{comment.content}</p>
            <div className="action">
              <div className="like">Yêu thích</div>
              <div className="reply">Phản hồi</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
