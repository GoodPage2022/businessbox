import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import UserSVG from "../../assets/svg/user.svg";
import SearchSVG from "../../assets/svg/search.svg";
import IconButton from "../shared/IconButton";
import MainButton from "../shared/MainButton";
import MainButtonRed from "../shared/MainButtonRed";
import ModalRegister from "../Modals/Modal-register/Modal-register";
import ModalForgotPassword from "../Modals/modal-forgot-password/Modal-forgot-password";
import { MainContext } from "../../contexts/mainContext";
import ModalAuth from "../Modals/Modal-auth/Modal-auth";
import { useDispatch, useSelector } from "react-redux";

import { signOut as signOutReducer } from "../../../store/actions/auth";
import { useSession, signOut as signOutGoogle } from "next-auth/react";
import Search from "./Search";
import ModalRegisterFinish from "../Modals/register-finish/Modal-register-finish";

const initialValues = {
  search: "",
};

const Right = () => {
  const { data: session } = useSession();
  const user = useSelector((state: any) => state.auth.user);
  const dispatchRedux = useDispatch();
  const [state, dispatch] = React.useContext(MainContext);
  const router = useRouter();

  const signOut = async () => {
    if (session !== undefined) {
      await signOutGoogle();
    }
    dispatchRedux(signOutReducer());
  };

  const openContactInfo = () => {
    router.push("/account/contact-info");
  };

  const openModal = () => {
    router.push("#auth");
    dispatch({ type: "toggle_authModal" });
  };

  const closeAuthModal = () => {
    dispatch({ type: "toggle_authModal" });
  };

  const closeRegisterModal = () => {
    dispatch({ type: "toggle_registrationModal" });
    router.push("/");
  };

  const closeRegisterFinishModal = () => {
    dispatch({ type: "toggle_registrationFinishModal" });
    router.push("/");
  };

  const closeForgotPasswordModal = () => {
    dispatch({ type: "toggle_forgotPasswordModal" });
    router.push("/");
  };

  return (
    <>
      <ul className="header__right">
        <li className="header__right__btn">
          <Search />
          {state.isActiveHeaderSearch ? (
            ""
          ) : (
            <IconButton
              onClick={() => dispatch({ type: "toggle_headerSearch" })}
              borderColor="#FFFFFF"
              icon={<SearchSVG />}
            />
          )}
        </li>
        <li
          className="header__right__btn" /* onClick={user == null ? openModal : signOut} */
        >
          {user == null ? (
            <span onClick={openModal}>
              <MainButton label={`Вхід`} />
            </span>
          ) : (
            <IconButton
              borderColor="#FFFFFF"
              icon={<UserSVG />}
              onClick={() => openContactInfo()}
            />
          )}
        </li>
        <li
          className="header__right__btn"
          onClick={() => {
            if (user != null) {
              router.push("/account/add-business");
            } else {
              localStorage.setItem("redirectToAddBusiness", "true");
              openModal();
            }
          }}
        >
          <MainButtonRed label="Зареєструвати бізнес" />
        </li>
      </ul>
      <ModalAuth onClose={closeAuthModal} />
      <ModalRegister onClose={closeRegisterModal} />
      <ModalRegisterFinish onClose={closeRegisterFinishModal} />
      <ModalForgotPassword onClose={closeForgotPasswordModal} />
    </>
  );
};

export default Right;
