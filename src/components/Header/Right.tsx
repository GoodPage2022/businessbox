import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SearchSVG from "../../assets/svg/search.svg";
import IconButton from "../shared/IconButton";
import MainButton from "../shared/MainButton";
import MainButtonRed from "../shared/MainButtonRed";
import ModalRegister from "../Modal-register/Modal-register";
import { MainContext } from "../../contexts/mainContext";

const Right = () => {
  const { pathname } = useRouter();
  const [state, dispatch] = React.useContext(MainContext);

  const router = useRouter();

  const openModal = () => {
    router.push(`${pathname}/#register`);
    dispatch({ type: "toggle_registrationModal" });
  };
  const closeModal = () => {
    dispatch({ type: "toggle_registrationModal" });
    router.push("/");
  };
  console.log(state);

  return (
    <ul className="header__right">
      <li className="header__right__btn">
        <IconButton borderColor="#FFFFFF" icon={<SearchSVG />} />
      </li>
      <li onClick={openModal} className="header__right__btn">
        <MainButton label="Вхід" />
      </li>
      <li
        className="header__right__btn"
        onClick={() => router.push("/account/add-business")}
      >
        <MainButtonRed label="Зареєструвати бізнес" />
      </li>

      <ModalRegister onClose={closeModal}></ModalRegister>
    </ul>
  );
};

export default Right;
