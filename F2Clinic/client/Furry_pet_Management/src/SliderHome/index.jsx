import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image2 from "../assets/Image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import Slider from "react-slick";

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  appendDots: (dots) => (
    <div>
      <ul style={{ display: "flex", justifyContent: "center" }}>{dots}</ul>
    </div>
  ),
  customPaging: (i) => (
    <div
      style={{
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        backgroundColor: "#333",
        margin: "0 5px",
      }}
    ></div>
  ),
};

const SliderHome = () => {
  return (
    <div className="slider-container bg-white text-black">
      <Slider {...carouselSettings}>
        <div>
          <img
            src={image2}
            alt="Image 1"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src={image3}
            alt="Image 2"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src={image4}
            alt="Image 3"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src={image5}
            alt="Image 4"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src={image6}
            alt="Image 5"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default SliderHome;
