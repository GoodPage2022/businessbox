import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MainContext } from "../../../contexts/mainContext";
import Slider from "react-slick";
import "swiper/css";
import LargeImage from "../../Catalog/ProjectInfo/LargeImage";

const ExpertsSlider = ({ images }: { images: any }) => {
  const [state, dispatch] = React.useContext(MainContext);

  function SampleNextArrow(props: any) {
    const { className, onClick } = props;

    return <div className={className} onClick={onClick} />;
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} />;
  }

  const imageSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    className: "projectInfo__slick-slider",
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const closeLargeImage = () => {
    dispatch({ type: "toggle_large-image" });
  };

  return (
    <div className="expertsSlider">
      <div className="expertsSlider__container container">
        <div className="projectInfo__image-slider">
          {images && images.length > 1 ? (
            <Slider {...imageSliderSettings}>
              {images.map((img: any, index: number) => (
                <li
                  key={index}
                  className="projectInfo__image-slider--image"
                  onClick={() => {
                    if (!state.isOpenLargeImage) {
                      state.imageIdx = index;
                      state.images = images;
                      dispatch({ type: "toggle_large-image" });
                    }
                  }}
                >
                  <Image
                    className=""
                    src={`${
                      img.meta.assets == "" ? `` : `https://admin.bissbox.com`
                    }${img.path}`}
                    layout="fill"
                    objectFit="cover"
                    loading="eager"
                    alt=""
                  />
                </li>
              ))}
            </Slider>
          ) : (
            images.map((img: any, index: number) => (
              <li
                key={index}
                className="projectInfo__image-slider--image"
                onClick={() => {
                  dispatch({ type: "toggle_large-image" });
                  state.imageUrl =
                    img.meta.assets == ""
                      ? `${img.path}`
                      : `https://admin.bissbox.com${img.path}`;
                }}
              >
                <Image
                  className=""
                  src={`${
                    img.meta.assets == "" ? `` : `https://admin.bissbox.com`
                  }${img.path}`}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </li>
            ))
          )}

          <LargeImage onClose={closeLargeImage} />
        </div>
      </div>
    </div>
  );
};

export default ExpertsSlider;
