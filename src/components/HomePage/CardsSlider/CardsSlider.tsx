import React from "react";
import Slider from "react-slick";

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
        breakpoint: 1439,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return cards.length > 1 ? (
    <Slider {...settings}>
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
