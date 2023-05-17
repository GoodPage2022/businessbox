import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { MainContext } from "../../contexts/mainContext";
import MainButtonBlack from "../shared/MainButtonBlack";
import EditSVG from "../../assets/svg/edit.svg";
import PlusSVG from "../../assets/svg/plus.svg";
import MainButtonGrey from "../shared/MainButtonGrey";
import Slider from "react-slick";

const AccountHeader = ({}) => {
  const { pathname } = useRouter();
  const router = useRouter();
  const [state, dispatch] = React.useContext(MainContext);
  const [isContactInfo, setIsContactInfo] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);

  useEffect(() => {
    if (pathname === "/account/contact-info") {
      setIsContactInfo(true);
    }
    if (pathname === "/account/my-businesses") {
      setIsBusiness(true);
    }
    if (pathname === "/account/favorites") {
      setIsFavorites(true);
    }
  }, [pathname]);

  const categoriesSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    // slidesToShow: 2,
    // slidesToScroll: 1,
    initialSlide: isBusiness ? 1 : isContactInfo ? 0 : 2,
    rtl: isContactInfo ? false : true,
    // focusOnSelect: true,

    arrows: false,
    variableWidth: true,
    className: "accountHeader__slider",

    // autoplay: true,
    responsive: [
      // {
      //   breakpoint: 1270,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 1,
      //     infinite: true,
      //     dots: true,
      //   },
      // },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="accountHeader">
      <div className="container accountHeader__container--desctop">
        <ul className="accountHeader__left">
          <li className="accountHeader__left--item">
            {isContactInfo ? (
              <MainButtonGrey
                onClick={() => router.push("/account/contact-info")}
                label="Контактна інформація"
              />
            ) : (
              <MainButtonBlack
                onClick={() => router.push("/account/contact-info")}
                label="Контактна інформація"
              />
            )}
          </li>
          <li className="accountHeader__left--item">
            {isBusiness ? (
              <MainButtonGrey
                onClick={() => router.push("/account/my-businesses")}
                label="Мої бізнеси"
              />
            ) : (
              <MainButtonBlack
                onClick={() => router.push("/account/my-businesses")}
                label="Мої бізнеси"
              />
            )}
          </li>
          <li className="accountHeader__left--item">
            {isFavorites ? (
              <MainButtonGrey
                onClick={() => router.push("/account/favorites")}
                label="Обрані"
              />
            ) : (
              <MainButtonBlack
                onClick={() => router.push("/account/favorites")}
                label="Обрані"
              />
            )}
          </li>
        </ul>
        <div className="accountHeader__right">
          {isContactInfo ? (
            <button
              className="accountHeader__button-edit"
              onClick={() => dispatch({ type: "toggle_edit" })}
            >
              <EditSVG />
            </button>
          ) : null}
          {isBusiness ? (
            <button
              onClick={() => router.push("/account/add-business")}
              className="accountHeader__button-plus"
            >
              <PlusSVG />
              <span className="accountHeader__button-plus--text">
                Додати бізнес
              </span>
            </button>
          ) : null}
        </div>
      </div>
      <div className="container accountHeader__container--mob">
        <Slider {...categoriesSliderSettings}>
          <li className="accountHeader__left--item">
            {isContactInfo ? (
              <button
                onClick={() => router.push("/account/contact-info")}
                className="main-button-grey section__primary-text"
              >
                Контактна інформація
              </button>
            ) : (
              <button
                onClick={() => router.push("/account/contact-info")}
                className="main-button-black section__primary-text"
              >
                Контактна інформація
              </button>
            )}
          </li>
          <li className="accountHeader__left--item">
            {isBusiness ? (
              <button
                onClick={() => router.push("/account/my-businesses")}
                className="main-button-grey section__primary-text"
              >
                Мої бізнеси
              </button>
            ) : (
              <button
                onClick={() => router.push("/account/my-businesses")}
                className="main-button-black section__primary-text"
              >
                Мої бізнеси
              </button>
            )}
          </li>
          <li className="accountHeader__left--item">
            {isFavorites ? (
              <button
                onClick={() => router.push("/account/favorites")}
                className="main-button-grey section__primary-text"
              >
                Обрані
              </button>
            ) : (
              <button
                onClick={() => router.push("/account/favorites")}
                className="main-button-black section__primary-text"
              >
                Обрані
              </button>
            )}
          </li>
        </Slider>
      </div>
    </div>
  );
};

export default AccountHeader;
