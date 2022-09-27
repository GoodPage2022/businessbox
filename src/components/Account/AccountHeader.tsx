import React, { useState } from "react";
import Link from "next/link";
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
  const [isContactInfo, setIsContactInfo] = useState(() =>
    pathname === "/account/contact-info" ? true : false,
  );
  const [isBusiness, setIsBusiness] = useState(() =>
    pathname === "/account/my-businesses" ? true : false,
  );
  const [isFavorites, setIsFavorites] = useState(() =>
    pathname === "/account/favorites" ? true : false,
  );

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
              <Link href="/account/contact-info">
                <a>
                  <MainButtonGrey label="Контактна інформація" />
                </a>
              </Link>
            ) : (
              <Link href="/account/contact-info">
                <a>
                  <MainButtonBlack label="Контактна інформація" />
                </a>
              </Link>
            )}
          </li>
          <li className="accountHeader__left--item">
            {isBusiness ? (
              <Link href="/account/my-businesses">
                <a>
                  <MainButtonGrey label="Мої бізнеси" />
                </a>
              </Link>
            ) : (
              <Link href="/account/my-businesses">
                <a>
                  <MainButtonBlack label="Мої бізнеси" />
                </a>
              </Link>
            )}
          </li>
          <li className="accountHeader__left--item">
            {isFavorites ? (
              <Link href="/account/favorites">
                <a>
                  <MainButtonGrey label="Обрані" />
                </a>
              </Link>
            ) : (
              <Link href="/account/favorites">
                <a>
                  <MainButtonBlack label="Обрані" />
                </a>
              </Link>
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
              <Link href="/account/contact-info">
                <a>
                  <button className="main-button-grey section__primary-text">
                    Контактна інформація
                  </button>
                  {/* <MainButtonGrey label="Контактна інформація" /> */}
                </a>
              </Link>
            ) : (
              <Link href="/account/contact-info">
                <a>
                  <button className="main-button-black section__primary-text">
                    Контактна інформація
                  </button>
                  {/* <MainButtonBlack label="Контактна інформація" /> */}
                </a>
              </Link>
            )}
          </li>
          <li className="accountHeader__left--item">
            {isBusiness ? (
              <Link href="/account/my-businesses">
                <a>
                  <button className="main-button-grey section__primary-text">
                    Мої бізнеси
                  </button>
                  {/* <MainButtonGrey label="Мої бізнеси" /> */}
                </a>
              </Link>
            ) : (
              <Link href="/account/my-businesses">
                <a>
                  <button className="main-button-black section__primary-text">
                    Мої бізнеси
                  </button>
                  {/* <MainButtonBlack label="Мої бізнеси" /> */}
                </a>
              </Link>
            )}
          </li>
          <li className="accountHeader__left--item">
            {isFavorites ? (
              <Link href="/account/favorites">
                <a>
                  <button className="main-button-grey section__primary-text">
                    Обрані
                  </button>
                  {/* <MainButtonGrey label="Обрані" /> */}
                </a>
              </Link>
            ) : (
              <Link href="/account/favorites">
                <a>
                  <button className="main-button-black section__primary-text">
                    Обрані
                  </button>
                  {/* <MainButtonBlack label="Обрані" /> */}
                </a>
              </Link>
            )}
          </li>
        </Slider>
      </div>
    </div>
  );
};

export default AccountHeader;
