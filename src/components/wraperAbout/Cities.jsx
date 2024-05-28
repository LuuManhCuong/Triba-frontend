import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Cities() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
  };
  return (
    <div className="cities-town">
      <div className="container">
        <div className="row">
          <div className="slider-content">
            <div className="row">
              <div className="col-lg-12">
                <h2>
                  <em>Cities &amp; Towns</em>
                </h2>
              </div>
              <div className="col-lg-12">
                <Slider className="owl-cites-town owl-carousel" {...settings}>
                  <div className="item">
                    <div className="thumb">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTLh0MS56bf3GDC842yDLrea27tLdFVmBFHA&s"
                        alt=""
                      />
                      <h4>Havana</h4>
                    </div>
                  </div>
                  <div className="item">
                    <div className="thumb">
                      <img
                        src="https://a0.muscache.com/im/pictures/63127938/e69a7563_original.jpg?im_w=720"
                        alt=""
                      />
                      <h4>DaNang</h4>
                    </div>
                  </div>
                  <div className="item">
                    <div className="thumb">
                      <img
                        src="https://a0.muscache.com/im/pictures/miso/Hosting-743842439028434931/original/8f48c20b-7c0c-4136-88fd-de2e0da70e27.jpeg?im_w=720"
                        alt=""
                      />
                      <h4>Brazil</h4>
                    </div>
                  </div>
                  <div className="item">
                    <div className="thumb">
                      <img
                        src="https://a0.muscache.com/im/pictures/8f64650d-be85-420d-98fc-1a63d009cf4e.jpg?im_w=720"
                        alt=""
                      />
                      <h4>Manila</h4>
                    </div>
                  </div>
                </Slider>

                {/* Add more items here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cities;
