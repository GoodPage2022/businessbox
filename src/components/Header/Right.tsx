import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SearchSVG from "../../assets/svg/search.svg";
import IconButton from "../shared/IconButton";
import MainButton from "../shared/MainButton";
import MainButtonRed from "../shared/MainButtonRed";
import Modal from "../Modal-register/Modal-register";
const Right = () => {
  const { pathname } = useRouter();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const openModal = () => {
    router.push("/#register");
    setShowModal((prevState) => !prevState);
  };
  const closeModal = () => {
    setShowModal((prevState) => !prevState);
    router.push("/");
  };

  return (
    <ul className="header__right">
      <li className="header__right__btn">
        <IconButton borderColor="#FFFFFF" icon={<SearchSVG />} />
      </li>
      <li onClick={openModal} className="header__right__btn">
        <MainButton label="Вхід" />
      </li>
      <li className="header__right__btn">
        <MainButtonRed label="Зареєструвати бізнес" />
      </li>
      {showModal && <Modal onClose={closeModal}></Modal>}
    </ul>
  );
};

export default Right;
