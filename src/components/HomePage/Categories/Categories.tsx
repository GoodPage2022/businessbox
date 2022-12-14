import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { MainContext } from "../../../contexts/mainContext";
import MainSliderText from "../../../constants/main-slider";
import axios from "axios";

const Categories = () => {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  const [businessesQuantity, setBusinessesQuantity] = useState(0);
  const [businessesAmountPrice, setBusinessesAmountPrice] = useState(0);
  const rate = useSelector((state: any) => state.currency.value);

  const getBusinesses = async () => {
    const response = await axios.post(`/api/businesses/stats`, { rate });

    if (response.data) {
      setBusinessesQuantity(response.data[0].count);
      setBusinessesAmountPrice(response.data[0].total);
    }

    return;
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  const [state, dispatch] = React.useContext(MainContext);
  const settings = {
    className: "main-slider",
    dotsClass: "main-slider-dots",
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 768,
        settings: { vertical: true, verticalSwiping: true },
      },
    ],
    appendDots: (dots: any) => (
      <div>
        <ul className="main-slider-dots-list">{dots}</ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div className="main-slider-dots-item">
        <h2 className="main-slider-dots-item--title">
          {MainSliderText[i].title}
        </h2>
        <p className="main-slider-dots-item--text">{MainSliderText[i].text}</p>
        <p className="main-slider-dots-item--textFull">
          {MainSliderText[i].textFull}
        </p>
        {i === 0 && (
          <button
            className="categories-first__button"
            onClick={() => router.push("/catalog")}
          >
            ???????????? ??????????
          </button>
        )}

        {i === 1 && (
          <button
            onClick={() => {
              if (user != null) {
                router.push("/account/add-business");
              } else {
                localStorage.setItem("redirectToAddBusiness", "true");
                openModal();
              }
            }}
            className="categories-second__button--white"
          >
            ?????????????? ????????????
          </button>
        )}
        {i === 2 && (
          <p className="title--white categories-third__continue">???????? ???????????</p>
        )}
      </div>
    ),
  };

  const openModal = () => {
    router.push("#auth");
    dispatch({ type: "toggle_authModal" });
  };

  return (
    <div className="categories__wrapper">
      <Slider {...settings}>
        <section className="categories-first">
          <div className="container categories-first__container">
            <h1 className="categories-first__title title--white">
              ???????????? ????????????
            </h1>
            <p className="categories-first__text section__primary-text--white">
              ???? ?????????????????? ?? ?????????????????????? ?? ?????????????? ???? ???????????????????? ?????????? ??????????????,
              ???? ???????????????????? ???? ??????????. <br /> ?????????? ?? ???????????????? ????????????????????
              ?????????????????? ????????-???????? ??????????????, ???? ???????? ????????????????????????, ???? ??????????????
              ??????????????. ???????? ???????????????? - ???????????? ?????????????? ??????????????)
            </p>
            <div className="categories-first__buttons">
              <button
                className="categories-first__button"
                onClick={
                  () => router.push("/catalog")
                  // user != null ? router.push("/account/add-business") : openModal()
                }
              >
                ???????????? ??????????
              </button>
            </div>
          </div>
        </section>
        <section className="categories-second">
          <div className="container categories-second__container">
            <h1 className="categories-second__title title--white">
              ?????????????? ????????????
            </h1>
            <p className="categories-second__text section__primary-text--white">
              ???????????????? ?????????? ?????????? ?????????????????? ?? - ???????????? ???????????? ???? ???????????? ??????????????
              ???????????? ?? ???????????????????????? ????????????????, ???????? ?????? ?????????? ????????. ?? ???????? ??????????
              ???? ??????????????????, ????????????????, ???????????????? ???? ?????????????????????????? ????????????, ?????? ????????
              ???????????????? ?????????????? ???????????? ???????? ??????????????.
            </p>
            <div className="categories-second__buttons">
              <button
                onClick={() => {
                  if (user != null) {
                    router.push("/account/add-business");
                  } else {
                    localStorage.setItem("redirectToAddBusiness", "true");
                    openModal();
                  }
                }}
                className="categories-second__button--white"
              >
                ?????????????? ????????????
              </button>
              {/* <button
              onClick={() =>
                user != null ? router.push("/catalog") : openModal()
              }
              className="categories-second__button--white"
            >
              ??????????????????????
            </button> */}
            </div>
          </div>
        </section>
        <section className="categories-third">
          <div className="container categories-third__container">
            <h1 className="categories-third__title title--white">
              ??????????????????????
            </h1>
            <p className="categories-third__text section__primary-text--white">
              ???? ?????????????????? ???? ???????????????? ???? ?????????????? ???????????????? ???????????????? ?????????????? ??
              ?????????????????????? ?????? ???????? ??????????????. ?????????? ???????????? ???????????? ?????????? ???? ??????????
              ???????????????? ???? ???????????????????? ???????? ?? ??????. ?? ???? ?? ???????? ?????????? ????????????
              ???????????????? ?????????????????????? ???????????????? ???????????? ????????????????????
            </p>
            <div className="categories-third__buttons">
              <p className="title--white">???????? ???????????</p>
            </div>
          </div>
        </section>
      </Slider>
      <div className="categories__popUp">
        <p className="section__secondary-text">
          ?????????????????????????? ????????????????: {businessesQuantity}
        </p>
        <p className="section__secondary-text">
          ???????????????????? ???? ??????????: {businessesAmountPrice.toFixed()} ??????
        </p>
      </div>
    </div>
  );
};

export default Categories;
