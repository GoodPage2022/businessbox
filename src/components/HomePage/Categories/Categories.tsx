import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { MainContext } from "../../../contexts/mainContext";
import MainSliderText from "../../../constants/main-slider";

const Categories = () => {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();

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
            Купити зараз
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
            Продати бізнес
          </button>
        )}
        {i === 2 && (
          <p className="title--white categories-third__continue">Далі буде…</p>
        )}
      </div>
    ),
  };

  const openModal = () => {
    router.push("#auth");
    dispatch({ type: "toggle_authModal" });
  };

  return (
    <Slider {...settings}>
      <section className="categories-first">
        <div className="container categories-first__container">
          <h1 className="categories-first__title title--white">
            Купити бізнес
          </h1>
          <p className="categories-first__text section__primary-text--white">
            Ми відібрали і підготували у простій та зрозумілій формі бізнеси, що
            продаються на ринку. <br /> Також з легкістю допоможено розкласти
            будь-який варіант, що тобі сподобається, до дрібних деталей. Твоє
            завдання - просто вказати пальцем)
          </p>
          <div className="categories-first__buttons">
            <button
              className="categories-first__button"
              onClick={
                () => router.push("/catalog")
                // user != null ? router.push("/account/add-business") : openModal()
              }
            >
              Купити зараз
            </button>
          </div>
        </div>
      </section>
      <section className="categories-second">
        <div className="container categories-second__container">
          <h1 className="categories-second__title title--white">
            Продати бізнес
          </h1>
          <p className="categories-second__text section__primary-text--white">
            Головною метою нашої платформи є - конект людини що продає власний
            бізнес з компетентним покупцем, який про нього мріє. В свою чергу ми
            розберемо, пояснимо, упакуємо та прорекламуємо бізнес, щоб твій
            покупець якомога швидше тебе знайшов.
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
              Продати бізнес
            </button>
            {/* <button
              onClick={() =>
                user != null ? router.push("/catalog") : openModal()
              }
              className="categories-second__button--white"
            >
              Інвестувати
            </button> */}
          </div>
        </div>
      </section>
      <section className="categories-third">
        <div className="container categories-third__container">
          <h1 className="categories-third__title title--white">Франчайзинг</h1>
          <p className="categories-third__text section__primary-text--white">
            Ми відібрали та розклали по полицям найкращі варіанти франшиз у
            зрозумілому для тебе форматі. Тепер знайти бажане можна на одній
            сторінці не випускаючи каву з рук. А ми в свою чергу будемо постійно
            доповнювати варіанти новими партнерами
          </p>
          <div className="categories-third__buttons">
            <p className="title--white">Далі буде…</p>
          </div>
        </div>
      </section>
    </Slider>
  );
};

export default Categories;
