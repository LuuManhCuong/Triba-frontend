import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { countImgSlice } from "../../redux-tookit/reducer/countImgSlice";

function ImageSlick({ imgs, activeImg }) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(activeImg);
  useEffect(() => {
    dispatch(countImgSlice.actions.increase(active));
  }, [active]);

  return (
    <div className="img-view">
      {imgs.length > 1 ? (
        <div className="img-inner">
          <div
            onClick={() => {
              active <= 0 ? setActive(imgs.length - 1) : setActive(active - 1);
            }}
          >
            <MdKeyboardArrowLeft />
          </div>
          <img src={imgs[active].url} alt="img" />
          <div
            onClick={() =>
              active >= imgs.length - 1 ? setActive(0) : setActive(active + 1)
            }
          >
            <MdKeyboardArrowRight />
          </div>
        </div>
      ) : (
        <div className="img-inner">
          <img src={imgs[active].url} alt="img" />
        </div>
      )}
    </div>
  );
}

export default ImageSlick;
