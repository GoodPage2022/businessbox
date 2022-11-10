import React, { useMemo, useRef, useState, useEffect } from "react";
import Slider, { LazyLoadTypes } from "react-slick";

import debounce from "lodash.debounce";

import BusinessCard from "../../shared/BusinessCard";
import axios from "axios";

const ondemand: LazyLoadTypes = "ondemand";

function SampleNextArrow(props: any) {
  const { className, onClick } = props;

  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

const CardsSlider = ({ cards }: { cards: any }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    className: "cards-slider",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    lazyLoad: ondemand,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: { lazyLoad: ondemand, slidesToShow: 2.7 },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          arrows: false,
        },
      },
    ],
  };

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

  const scroll = (e: any) => {
    if (slider.current === null) return 0;

    if (!scrollLock) {
      if (e.nativeEvent.deltaX > 0) {
        slider.current.slickNext();
      } else if (e.nativeEvent.deltaX < 0) {
        slider.current.slickPrev();
      }
    }

    setScrollLock(true);

    debouncedChangeHandler();
  };

  return cards.length > 1 ? (
    <div onWheel={scroll}>
      <Slider {...settings} ref={slider}>
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
            />
          ),
        )}
      </Slider>
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
        />
      ),
    )
  );
};

export default CardsSlider;
