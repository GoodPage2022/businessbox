import Link from "next/link";
import router from "next/router";
import MainButton from "../shared/MainButton";
import { useSelector } from "react-redux";
import { MainContext } from "../../contexts/mainContext";
import React from "react";
import MainButtonRed from "../shared/MainButtonRed";

const BurgerMenu = () => {
  const [state, dispatch] = React.useContext(MainContext);
  const user = useSelector((state: any) => state.auth.user);

  const openModal = () => {
    router.push("#auth");
    dispatch({ type: "toggle_authModal" });
    dispatch({ type: "toggle_burger" });
  };

  const openAddBusiness = () => {
    router.push(
      `${
        router.pathname.includes("invest")
          ? "/invest/add-business"
          : "/account/add-business"
      }`,
    );
    dispatch({ type: "toggle_burger" });
  };

  return (
    <div className={`burgerMenu ${state.isOpenBurger ? "active" : ""}`}>
      <ul className="header__nav__menu">
        <li
          className="header__nav__menu__item"
          onClick={() => dispatch({ type: "toggle_burger" })}
        >
          <Link href="/catalog">
            <a className="section__primary-text--white">Купівля бізнесу</a>
          </Link>
        </li>
        {/* <li
          className="header__nav__menu__item   section__primary-text--white"
          onClick={() => dispatch({ type: "toggle_burger" })}
        >
          <Link href="/useful-tools">
            <a className="section__primary-text--white">Корисні інструменти</a>
          </Link>
        </li> */}
        <li
          className="header__nav__menu__item   section__primary-text--white"
          onClick={() => dispatch({ type: "toggle_burger" })}
        >
          <Link href="#footer">
            <a className="section__primary-text--white">Контакти</a>
          </Link>
        </li>
      </ul>
      <ul className="burgerMenu__buttons">
        {/* {user == null ? (
          <li className="burgerMenu__button" onClick={openModal}>
            <MainButton label={`Вхід`} />
          </li>
        ) : (
          ""
        )} */}

        <li
          className="burgerMenu__button"
          onClick={() => {
            if (user != null) {
              openAddBusiness();
            } else {
              localStorage.setItem("redirectToAddBusiness", "true");
              openModal();
            }
          }}
        >
          <MainButtonRed label="Зареєструвати бізнес" />
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
