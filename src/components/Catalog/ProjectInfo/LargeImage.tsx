import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MainContext } from "../../../contexts/mainContext";
import ArrowBackSVG from "../../../assets/svg/project-info-arrow.svg";
import CrossSVG from "../../../assets/svg/cross.svg";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";

const LargeImage = ({ onClose }: { onClose: any }) => {
  const [state, dispatch] = React.useContext(MainContext);
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!state.imageIdx) return;
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideTo(state.imageIdx, 0);
  }, [state.imageIdx]);

  const handleKeyDown = (e: any) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`largeImage ${state.isOpenLargeImage ? "active" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className="largeImage__close" onClick={onClose}>
        <CrossSVG />
      </div>

      <div className="largeImage__container">
        <div className="largeImage__image-wrapper">
          <Swiper ref={sliderRef} spaceBetween={50} slidesPerView={1}>
            {state.images.map((image: any) => (
              <SwiperSlide key={image.path}>
                <Image
                  className=""
                  src={
                    image.meta.assets == ""
                      ? image.path
                      : `https://admin.bissbox.com/${image.path}`
                  }
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="largeImage__buttons">
          <button
            className="largeImage__btn largeImage__first-btn"
            onClick={handlePrev}
          >
            <ArrowBackSVG />
          </button>
          <button
            className="largeImage__btn largeImage__second-btn"
            onClick={handleNext}
          >
            <ArrowBackSVG />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LargeImage;
