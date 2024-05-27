import React, { useEffect, useState } from "react";
import "./post.scss";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { countImgSliceSelector } from "../../redux-tookit/selector";
import { MdClear } from "react-icons/md";
import ImageSlick from "./ImageSlick";

function ImageGrid({ imgs }) {
  // console.log("imgsss: ", imgs);
  const { value } = useSelector(countImgSliceSelector);
  const [activeImg, setActiveImg] = useState(0);
  const [showImgs, setShowImgs] = useState(imgs);
  const [show, setShow] = useState(false);

  return (
    <>
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
          Ảnh {value + 1} / {imgs?.length}
          <button onClick={() => setShow(false)}>
            <MdClear></MdClear>
          </button>
        </Modal.Title>
        <Modal.Body>
          {showImgs?.length > 1 ? (
            <ImageSlick imgs={showImgs} activeImg={activeImg}></ImageSlick>
          ) : (
            <div className="img-inner">
              <img src={showImgs[0]} alt="img" />
            </div>
          )}
        </Modal.Body>
      </Modal>
      <div>
        {imgs?.length === 1 && (
          <img
            style={{ width: "70%", margin: "auto" }}
            onClick={() => {
              setShow(true);
              setShowImgs(imgs);
              setActiveImg(0);
            }}
            className="post-body-img img-1"
            src={
              imgs[0]?.url ||
              imgs[0] ||
              "https://res.cloudinary.com/djcamu6kz/image/upload/v1716727509/byq36gfaokzcytmmcbgf.svg"
            }
            alt="img"
          />
        )}

        {imgs?.length === 2 && (
          <Row className="p-0">
            {imgs?.map((img, i) => (
              <Col
                className="p-1"
                xs={6}
                onClick={() => {
                  setShow(true);
                  setShowImgs(imgs);

                  setActiveImg(i);
                }}
              >
                <img className="post-body-img img-2" src={img.url} alt="img" />
              </Col>
            ))}
          </Row>
        )}

        {imgs?.length >= 3 && (
          <Row className="p-0">
            <Col
              className="p-1"
              xs={6}
              onClick={() => {
                setShow(true);
                setShowImgs(imgs);

                setActiveImg(0);
              }}
            >
              <img
                className="post-body-img img-3 img-3-1st"
                src={imgs[0].url}
                alt="img"
              />
            </Col>
            <Col className="p-1" xs={6}>
              <Row>
                <Col
                  xs={12}
                  className="img-p"
                  onClick={() => {
                    setShowImgs(imgs);
                    setShow(true);
                    setActiveImg(1);
                  }}
                >
                  <img
                    className="post-body-img img-3"
                    src={imgs[1].url}
                    alt="img"
                  />
                </Col>
                <Col
                  className="more-img"
                  xs={12}
                  onClick={() => {
                    setShow(true);
                    setShowImgs(imgs);
                    setActiveImg(2);
                  }}
                >
                  <img
                    className="post-body-img img-3"
                    src={imgs[2].url}
                    alt="img"
                  />
                  {imgs?.length > 3 && (
                    <div className="more">Xem thêm +{imgs?.length - 3}</div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default ImageGrid;
