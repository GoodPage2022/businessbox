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
  const [businessesAmountPrice, setBusinessesAmountPrice] = useState("0");
  const rate = useSelector((state: any) => state.currency.value);

  const getBusinesses = async () => {
    const response = await axios.post(`/api/businesses/stats`, { rate });

    if (response.data) {
      setBusinessesQuantity(response.data[0].count);
      const formatedPrice = new Intl.NumberFormat("uk-UA", {
        notation: "compact",
        compactDisplay: "long",
      }).format(response.data[0].total);

      setBusinessesAmountPrice(formatedPrice);
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
            Переглянути варіанти
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
            className="categories-first__button"
          >
            Продати бізнес
          </button>
        )}
        {i === 2 && (
          // <p className="title--white categories-third__continue">Далі буде…</p>
          <button
            className="categories-first__button"
            onClick={() => router.push("/invest")}
          >
            Детальніше
          </button>
        )}
        {i === 3 && (
          // <p className="title--white categories-third__continue">Далі буде…</p>
          <button
            className="categories-first__button"
            onClick={() => router.push("/experts")}
          >
            Детальніше
          </button>
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
              Купити бізнес
            </h1>
            <p className="categories-first__text section__primary-text--white">
              Ми відібрали і підготували у простій та зрозумілій формі бізнеси,
              що продаються на ринку. <br /> Також з легкістю допоможено
              розкласти будь-який варіант, що тобі сподобається, до дрібних
              деталей. Твоє завдання - просто вказати пальцем)
            </p>
            <div className="categories-first__buttons">
              <button
                className="categories-first__button"
                onClick={
                  () => router.push("/catalog")
                  // user != null ? router.push("/account/add-business") : openModal()
                }
              >
                Переглянути варіанти
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
              бізнес з компетентним покупцем, який про нього мріє. В свою чергу
              ми розберемо, пояснимо, упакуємо та прорекламуємо бізнес, щоб твій
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
                className="categories-first__button"
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
            <h1 className="categories-third__title title--white">Інвестиції</h1>
            <p className="categories-third__text section__primary-text--white">
              Даний розділ створений для взаємодії бізнес проектів, що шукають
              інвестиції, та інвесторів, що шукають куди б інвестувати. Наша
              платформа є точкою взаємодії цих двох напрямків, та може надати
              додаткову детальну аналітику стосовно того чи іншого проекту
            </p>
            <div className="categories-third__buttons">
              {/* <p className="title--white">Далі буде…</p> */}
              <button
                className="categories-first__button"
                onClick={
                  () => router.push("/invest")
                  // user != null ? router.push("/account/add-business") : openModal()
                }
              >
                Детальніше
              </button>
            </div>
          </div>
        </section>
        {/*   <section className="categories-fourth">
          <div className="container categories-fourth__container">
            <h1 className="categories-fourth__title title--white">
              Прокачка бізнесу
            </h1>
            <p className="categories-fourth__text section__primary-text--white">
              Розділ, який надає вам можливість звертатися до перевірених та
              досвідчених фахівців, яких ми знаємо і в яких впевнені. Тут ви
              знайдете відомих професіоналів, готових допомогти вам з усіма
              аспектами вашого бізнесу
            </p>
            <div className="categories-fourth__buttons">
              <button
                className="categories-first__button"
                onClick={
                  () => router.push("/experts")
                }
              >
                Обрати експерта
              </button>
            </div>
          </div>
        </section> */}
      </Slider>
      <div className="categories__popUp">
        <p className="section__secondary-text">
          Зареєстровано бізнесів: {businessesQuantity}
        </p>
        <p className="section__secondary-text">
          Продається на сумму: <span>{businessesAmountPrice}</span> грн
        </p>
      </div>
    </div>
  );
};

export default Categories;
