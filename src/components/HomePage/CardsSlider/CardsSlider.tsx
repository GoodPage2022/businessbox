import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import Slider, { LazyLoadTypes } from "react-slick";
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper';
import 'swiper/css';

import debounce from "lodash.debounce";

import BusinessCard from "../../shared/BusinessCard";
import axios from "axios";

const ondemand: LazyLoadTypes = "ondemand";

const CardsSlider = ({ cards }: { cards: any }) => {
  // const [sliderClicked, setSliderClicked] = useState(false);
// 
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   arrows: true,
  //   swipeToSlide: true,
  //   className: "cards-slider",
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  //   lazyLoad: ondemand,
  //   autoplay: true,

  //   responsive: [
  //     {
  //       breakpoint: 1440,
  //       infinite: true,
  //       settings: { lazyLoad: ondemand, slidesToShow: 2.7 },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1.3,
  //         arrows: false,
  //         infinite: false,
  //       },
  //     },
  //   ],
  // };

  const [scrollLock, setScrollLock] = useState(false);
  const [rate, setRate] = useState<number>(0);

  const slider = useRef<any>(null);

  const getCurrencyRate = async () => {
    const { data: rateUSD, status: rateUSDStus } = await axios.get(
      `/api/currency/get`,
    );

    if (rateUSDStus == 200) {
      setRate(rateUSD);
    }
  };

  useEffect(() => {
    getCurrencyRate();
  }, []);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce(() => {
        setScrollLock(false);
      }, 100),
    [],
  );

  // const scroll = (e: any) => {
  //   if (slider.current === null) return 0;

  //   if (!scrollLock) {
  //     if (e.nativeEvent.deltaX > 0) {
  //       slider.current.slickNext();
  //     } else if (e.nativeEvent.deltaX < 0) {
  //       slider.current.slickPrev();
  //     }
  //   }

  //   setScrollLock(true);

  //   debouncedChangeHandler();
  // };

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
    return <div className="slick-arrow slick-next" onClick={handleNext} />
  }
  
  function SamplePrevArrow() {
    return <div className="slick-arrow slick-prev" onClick={handlePrev} />
  }
    
  return cards.length > 1 ? (
    <div className="swiper-outer">
    <Swiper
      ref={sliderRef}
      modules={[ Mousewheel ]}
      slidesPerView={1.3}
      spaceBetween={30}
      breakpoints={{
        1440: {
          spaceBetween: 0,
          slidesPerView: 4,
        },
        768: {
          spaceBetween: 0,
          slidesPerView: 2.7,
        },
      }}
      autoplay={{
        delay: 3000,
      }}
      mousewheel={{
        forceToAxis: true
      }}
      loop={true}
      navigation={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {cards.map(
          ({
            _id,
            title,
            description,
            images,
            view_count,
            price,
            is_verified,
            sold_out,
            currency,
            negotiatedPrice,
          }: any) => (
            <SwiperSlide key={_id}>
              <BusinessCard
                key={_id}
                alias={_id}
                title={title}
                description={description}
                image={
                  images == null || !images.length
                    ? ""
                    : `${
                        images[0].meta.assets == ""
                          ? ``
                          : `https://admin.bissbox.com`
                      }${images[0].path}`
                }
                price={price}
                views={view_count ?? 0}
                isVerified={is_verified}
                isSoldOut={sold_out}
                currency={currency}
                negotiatedPrice={negotiatedPrice}
              />
            </SwiperSlide>
          ),
        )}
    </Swiper>
    <SamplePrevArrow />
    <SampleNextArrow />
    </div>
  ) : (
    cards.map(
      ({
        _id,
        title,
        description,
        images,
        view_count,
        price,
        is_verified,
        sold_out,
        currency,
        negotiatedPrice,
      }: any) => (
        <BusinessCard
          key={_id}
          alias={_id}
          title={title}
          description={description}
          image={
            images == null || !images.length
              ? ""
              : `${
                  images[0].meta.assets == "" ? `` : `https://admin.bissbox.com`
                }${images[0].path}`
          }
          price={price}
          views={view_count ?? 0}
          isVerified={is_verified}
          isSoldOut={sold_out}
          currency={currency}
          negotiatedPrice={negotiatedPrice}
        />
      ),
    )
  );
};

export default CardsSlider;
