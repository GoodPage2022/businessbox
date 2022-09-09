import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SearchSVG from "../../assets/svg/search.svg";
import IconButton from "../shared/IconButton";
import MainButton from "../shared/MainButton";
import MainButtonRed from "../shared/MainButtonRed";
import ModalRegister from "../Modals/Modal-register/Modal-register";
import { MainContext } from "../../contexts/mainContext";
import ModalAuth from "../Modals/Modal-auth/Modal-auth";
import { useSelector, useDispatch } from "react-redux";
import { signOut as signOutReducer } from '../../../store/actions/auth';
import { useSession, signOut as signOutGoogle } from 'next-auth/react'

const Right = () => {
  const { data: session } = useSession()
  const user = useSelector((state: any) => state.auth.user);
  const dispatchRedux = useDispatch();
  const { pathname } = useRouter();
  const [state, dispatch] = React.useContext(MainContext);

  const router = useRouter();

  const signOut = async () => {
    if (session !== undefined) {
      await signOutGoogle()
    }
    dispatchRedux(signOutReducer())
  }

  const openModal = () => {
    router.push("#auth");
    dispatch({ type: "toggle_authModal" });
  };

  const closeAuthModal = () => {
    dispatch({ type: "toggle_authModal" });
    router.push("/");
  };

  const closeRegisterModal = () => {
    dispatch({ type: "toggle_registrationModal" });
    router.push("/");
  };

  return (
    <ul className="header__right">
      <li className="header__right__btn">
        <IconButton borderColor="#FFFFFF" icon={<SearchSVG />} />
      </li>
      <li onClick={user == null ? openModal : signOut} className="header__right__btn">
        <MainButton label={user == null ? `Вхід` : `Вихід`} />
      </li>
      <li
        className="header__right__btn"
        onClick={() => user != null ? router.push("/account/add-business") : openModal()}
      >
        <MainButtonRed label="Зареєструвати бізнес" />
      </li>
      <ModalAuth onClose={closeAuthModal} />
      <ModalRegister onClose={closeRegisterModal} />
    </ul>
  );
};

export default Right;
