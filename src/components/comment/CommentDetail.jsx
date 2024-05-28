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

function CommentDetail({ clear, hiddenInfo, jobId }) {
  const dispatch = useDispatch();

  const textareaRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);
  const avatar = localStorage.getItem("avatar");
  // console.log("avat: ", avatar);
  useEffect(() => {
    adjustTextareaHeight();
  }, [newComment]);

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
  }, [jobId]);

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

  const getComments = (jobId) => {
    axios
      .get(`http://localhost:8080/api/v1/user/comments/${jobId}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  // console.log("comment: ", comments);
  return (
    <div className="comment-block">
      <div className="comment-input shadow-md">
        <div className="user">
          <img src={avatar} alt="avt" />
          <div className="write-comment">
            <textarea
              ref={textareaRef}
              value={newComment}
              placeholder="Viết bình luận của bạn..."
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Send</button>
          </div>
        </div>
      </div>
      <div
        className="comments-container"
        style={{ maxHeight: "70vh", overflow: "auto" }}
      >
        {comments?.map((comment, index) => (
          <div key={index} className="comment-item shadow-md">
            <div className="user">
              <img src={comment?.user?.avatar} alt="avt" />
              <div className="user-infor">
                <h3>
                  {comment.user?.firstName} {comment.user?.lastName}
                </h3>
                <p>{comment.createdAt}</p>
              </div>
            </div>
            <div className="content">
              <p className="cm-content">{comment.content}</p>
              <div className="action">
                <div className="like">Yêu thích</div>
                <div className="reply">Phản hồi</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentDetail;
