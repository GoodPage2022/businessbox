import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import HeartSVG from "../../assets/svg/heart.svg";
import ExitSVG from "../../assets/svg/exit.svg";
import CloseBurgerSVG from "../../assets/svg/close-burger.svg";
import BurgerSVG from "../../assets/svg/burger-menu.svg";
import UserSVG from "../../assets/svg/user.svg";
import SearchSVG from "../../assets/svg/search.svg";

import LogoSVG from "../../assets/svg/logo.svg";
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

const RightMob = () => {
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
    if (state.isOpenBurger) {
      dispatch({ type: "toggle_burger" });
    }
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
      <div className="header__left">
        {state.isOpenBurger ? (
          <IconButton
            onClick={() => dispatch({ type: "toggle_burger" })}
            borderColor="#FFFFFF"
            icon={<CloseBurgerSVG />}
          />
        ) : (
          <IconButton
            onClick={() => dispatch({ type: "toggle_burger" })}
            borderColor="#FFFFFF"
            icon={<BurgerSVG />}
          />
        )}

        <Link href="/">
          <a
            className={`header__logo__text ${
              state.isActiveHeaderSearch ? "hidden" : ""
            }`}
          >
            <div className="header__logo__svg">
              <LogoSVG />
            </div>

            {/* Business Box */}
          </a>
        </Link>
      </div>
      <ul
        className={`header__right ${
          state.isActiveHeaderSearch ? "active" : ""
        }`}
      >
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
        <div className="header__right__btn-wrapper">
          {user != null && (
            <li className="header__right__btn">
              <button
                onClick={() => router.push("/account/favorites")}
                className={`header__right__btn--favorites`}
              >
                <HeartSVG />
              </button>
            </li>
          )}

          {user == null ? (
            <li className="header__right__btn" onClick={openModal}>
              <MainButton label={`Вхід`} />
            </li>
          ) : (
            ""
          )}
          <li
            className="header__right__btn" /* onClick={user == null ? openModal : signOut} */
          >
            {user == null ? (
              ""
            ) : (
              <IconButton
                borderColor="#FFFFFF"
                icon={<UserSVG />}
                onClick={() => openContactInfo()}
              />
            )}
          </li>
          {user != null && (
            <li className="header__right__btn exit">
              <IconButton
                onClick={signOut}
                borderColor="#FFFFFF"
                icon={<ExitSVG />}
              />
            </li>
          )}
        </div>
      </ul>

      <ModalAuth onClose={closeAuthModal} />
      <ModalRegister onClose={closeRegisterModal} />
      <ModalRegisterFinish onClose={closeRegisterFinishModal} />
      <ModalForgotPassword onClose={closeForgotPasswordModal} />
    </>
  );
};

export default RightMob;
