import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
// import Slider, { LazyLoadTypes } from "react-slick";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper";
import "swiper/css";

// import debounce from "lodash.debounce";

import BusinessCard from "../../shared/BusinessCard";
import axios from "axios";
import InvestSlide from "./Slide";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const ondemand: LazyLoadTypes = "ondemand";

const InvestSlider = ({ slides }: { slides: any }) => {
  // const [slides, setSlides] = useState([]);
  // const rate = useSelector((state: any) => state.currency.value);

  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  function SampleNextArrow() {
    return <div className="slick-arrow slick-next" onClick={handleNext} />;
  }

  function SamplePrevArrow() {
    return <div className="slick-arrow slick-prev" onClick={handlePrev} />;
  }

  // const getSlides = async () => {
  //   try {
  //     const response = await axios.post(`/api/invest-slider/getList`);
  //     if (response.data) {
  //       setSlides(response.data.entries);
  //       console.log(response.data, "ddd");

  //       return;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   return [];
  // };

  // useEffect(() => {
  //   getSlides();
  // }, []);

  return (
    <div className="investSlider">
      {slides.length > 1 ? (
        <div className="swiper-outer">
          <Swiper
            ref={sliderRef}
            modules={[Mousewheel, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{}}
            autoplay={{ delay: 5000 }}
            mousewheel={{
              forceToAxis: true,
            }}
            loop={true}
            navigation={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {slides.map(({ _id, business_id, images }: any) => (
              <SwiperSlide key={_id}>
                {" "}
                <div key={_id}>
                  {" "}
                  <InvestSlide images={images} id={business_id} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <SamplePrevArrow />
          <SampleNextArrow />
        </div>
      ) : (
        slides.map(({ _id, business_id, images }: any) => (
          <div key={_id}>
            {" "}
            <InvestSlide images={images} id={business_id} />
          </div>
        ))
      )}
    </div>
  );
};

export default InvestSlider;
