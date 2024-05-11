import React, { useEffect, useRef, useState } from "react";
import "./comment.scss";
import { IoIosMenu } from "react-icons/io";
import { MdClear } from "react-icons/md";
import PostGrid from "../post/PostGrid";
import { useSelector, useDispatch } from "react-redux";
import { showComponentSelector } from "../../redux-tookit/selector";
import { showComponentSlice } from "../../redux-tookit/reducer/showComponent";

function Comment({ clear }) {
  const dispatch = useDispatch();
  const { jobId, component } = useSelector(showComponentSelector);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Cập nhật chiều cao của textarea
    adjustTextareaHeight();
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleChange = () => {
    // Cập nhật chiều cao của textarea khi nội dung thay đổi
    adjustTextareaHeight();
  };

  return (
    <>
      <div className="comment-block">
        <div className="comment-title">
          <h3>Bình luận về bài viết của Mạnh Cường {jobId}</h3>
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
        <div className="comment-input">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/WLwD-mQrBHLv1isMGjCdcBv9evwumLpPgOFP14p7OR9FRAuiEERRHV5weM-LdlgPCZPk3qUf=s88-c-k-c0x00ffffff-no-rj"
              alt="avt"
            />
            <div className="write-comment">
              <textarea
                ref={textareaRef}
                type="text"
                placeholder="Viết bình luận của bạn..."
                onChange={handleChange}
              />
              <button>Gửi</button>
            </div>
          </div>
        </div>
        <div className="comment-item">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/WLwD-mQrBHLv1isMGjCdcBv9evwumLpPgOFP14p7OR9FRAuiEERRHV5weM-LdlgPCZPk3qUf=s88-c-k-c0x00ffffff-no-rj"
              alt="avt"
            />
            <div className="user-infor">
              <h3>Mạnh Cường</h3>
              <p>5 giờ trước</p>
            </div>
          </div>
          <div className="content">
            <p>
              Rất nhân văn , gặp tình huống này nhiều người đã có thể hại con
              gấu .Nhưng người đàn ông này rất từ bi lại còn biết tận dụng sự
              sành ăn của con gấu để làm giàu ... Tại hạ bái phục .🙏
            </p>
            <div className="action">
              <div className="like">Yêu thích</div>
              <div className="reply">Phản hồi</div>
            </div>
          </div>
        </div>
        <div className="comment-item">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/WLwD-mQrBHLv1isMGjCdcBv9evwumLpPgOFP14p7OR9FRAuiEERRHV5weM-LdlgPCZPk3qUf=s88-c-k-c0x00ffffff-no-rj"
              alt="avt"
            />
            <div className="user-infor">
              <h3>Mạnh Cường</h3>
              <p>5 giờ trước</p>
            </div>
          </div>
          <div className="content">
            <p>
              Rất nhân văn , gặp tình huống này nhiều người đã có thể hại con
              gấu
            </p>
            <div className="action">
              <div className="like">Yêu thích</div>
              <div className="reply">Phản hồi</div>
            </div>
          </div>
        </div>{" "}
        <div className="comment-item">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/WLwD-mQrBHLv1isMGjCdcBv9evwumLpPgOFP14p7OR9FRAuiEERRHV5weM-LdlgPCZPk3qUf=s88-c-k-c0x00ffffff-no-rj"
              alt="avt"
            />
            <div className="user-infor">
              <h3>Mạnh Cường</h3>
              <p>5 giờ trước</p>
            </div>
          </div>
          <div className="content">
            <p>
              Tuyển dụng lập trình viên JavaScript Since you're fetching images
              from the internet Since you're fetching images from the internet,
              you might encounter CORS (Cross-Origin Resource Sharing) issues
              when trying to load them into your React application. This happens
              because the browser has security restrictions that prevent web
              pages from making requests to a different domain than the one that
              served the page.To
            </p>
            <div className="action">
              <div className="like">Yêu thích</div>
              <div className="reply">Phản hồi</div>
            </div>
          </div>
        </div>{" "}
        <div className="comment-item">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/WLwD-mQrBHLv1isMGjCdcBv9evwumLpPgOFP14p7OR9FRAuiEERRHV5weM-LdlgPCZPk3qUf=s88-c-k-c0x00ffffff-no-rj"
              alt="avt"
            />
            <div className="user-infor">
              <h3>Mạnh Cường</h3>
              <p>5 giờ trước</p>
            </div>
          </div>
          <div className="content">
            <p>
              Rất nhân văn , gặp tình huống này nhiều người đã có thể hại con
              gấu .Nhưng người đàn ông này rất từ bi lại còn biết tận dụng sự
              sành ăn của con gấu để làm giàu ... Tại hạ bái phục .🙏
            </p>
            <div className="action">
              <div className="like">Yêu thích</div>
              <div className="reply">Phản hồi</div>
            </div>
          </div>
        </div>{" "}
        <div className="comment-item">
          <div className="user">
            <img
              src="https://yt3.ggpht.com/WLwD-mQrBHLv1isMGjCdcBv9evwumLpPgOFP14p7OR9FRAuiEERRHV5weM-LdlgPCZPk3qUf=s88-c-k-c0x00ffffff-no-rj"
              alt="avt"
            />
            <div className="user-infor">
              <h3>Mạnh Cường</h3>
              <p>5 giờ trước</p>
            </div>
          </div>
          <div className="content">
            <p>
              Rất nhân văn , gặp tình huống này nhiều người đã có thể hại con
              gấu .Nhưng người đàn ông này rất từ bi lại còn biết tận dụng sự
              sành ăn của con gấu để làm giàu ... Tại hạ bái phục .🙏
            </p>
            <div className="action">
              <div className="like">Yêu thích</div>
              <div className="reply">Phản hồi</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
