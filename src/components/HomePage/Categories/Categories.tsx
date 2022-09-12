import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { MainContext } from "../../../contexts/mainContext";

import OurCategories from "../../../constants/categories";
import MainButton from "../../shared/MainButton";
import { useSelector, useDispatch } from "react-redux";

const Categories = () => {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();

  const [state, dispatch] = React.useContext(MainContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
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
            Великий продаючий заголовок можливо 2-3 рядки
          </h1>
          <p className="categories-first__text section__primary-text--white">
            Клієнт дуже важливий, за клієнтом піде клієнт. Ціна двох еросів –
            ціна смартфона. Зараз пакет повинен бути безкоштовним і
            мультиплікаційним. Спілкуйтеся як Бог горло, поставити перед або,
            отруйна посмішка.
          </p>
          <button
            className="categories-first__button"
            onClick={() =>
              user != null ? router.push("/account/add-business") : openModal()
            }
          >
            Зареєструвати бізнес зараз
          </button>
        </div>
      </section>
      <section className="categories-second">
        <div className="container categories-second__container">
          <h1 className="categories-second__title title--white">
            Великий продаючий заголовок можливо 2-3 рядки
          </h1>
          <p className="categories-second__text section__primary-text--white">
            Клієнт дуже важливий, за клієнтом піде клієнт. Ціна двох еросів –
            ціна смартфона. Зараз пакет повинен бути безкоштовним і
            мультиплікаційним. Спілкуйтеся як Бог горло, поставити перед або,
            отруйна посмішка.
          </p>
          <div className="categories-second__buttons">
            <button className="categories-second__button">
              Продати бізнес
            </button>
            <button className="categories-second__button--white">
              Інвестувати
            </button>
          </div>
        </div>
      </section>
    </Slider>
  );
};

export default Categories;
