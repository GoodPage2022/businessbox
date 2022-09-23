import React, { useMemo, useRef, useState } from "react";
import Slider from "react-slick";

import debounce from "lodash.debounce";

import BusinessCard from "../../shared/BusinessCard";

const CardsSlider = ({ cards }: { cards: any }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    className: "cards-slider",
    adaptiveHeight: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2.7,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          infinite: false,
        },
      },
    ],
  };

  const [scrollLock, setScrollLock] = useState(false);

  const slider = useRef<any>(null);

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
                        : `http://157.230.99.45:8082`
                    }${images[0].path}`
              }
              price={price}
              views={view_count ?? 0}
              isVerified={is_verified}
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
                  images[0].meta.assets == "" ? `` : `http://157.230.99.45:8082`
                }${images[0].path}`
          }
          price={price}
          views={view_count ?? 0}
          isVerified={is_verified}
        />
      ),
    )
  );
};

export default CardsSlider;
