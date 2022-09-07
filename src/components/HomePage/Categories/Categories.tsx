import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { MainContext } from "../../../contexts/mainContext";

import OurCategories from "../../../constants/categories";
import MainButton from "../../shared/MainButton";
import { useSelector, useDispatch } from "react-redux";

const Categories = () => {
  const user = useSelector((state: any) => state.auth.user)
  const router = useRouter();
  const [state, dispatch] = React.useContext(MainContext);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8.5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  const openModal = () => {
    router.push("#auth");
    dispatch({ type: "toggle_authModal" });
  };

  return (
    <section className="categories">
      <div className="container categories__container">
        <Slider {...settings}>
          {OurCategories.map(({ id, content }) => (
            <li key={id} className="categories__buttons__item">
              <MainButton label={content} />
            </li>
          ))}
        </Slider>
        <h1 className="categories__title title--white">
          Великий продаючий заголовок можливо 2-3 рядки
        </h1>
        <p className="categories__text section__primary-text--white">
          Клієнт дуже важливий, за клієнтом піде клієнт. Ціна двох еросів – ціна
          смартфона. Зараз пакет повинен бути безкоштовним і мультиплікаційним.
          Спілкуйтеся як Бог горло, поставити перед або, отруйна посмішка.
        </p>
        <button
          className="categories__button"
          onClick={() => user != null ? router.push("/account/add-business") : openModal()}
        >
          Зареєструвати бізнес зараз
        </button>
      </div>
    </section>
  );
};

export default Categories;
