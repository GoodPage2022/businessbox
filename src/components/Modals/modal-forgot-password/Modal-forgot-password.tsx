import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import EyeSVG from "../../../assets/svg/eye.svg";
import CrossSVG from "../../../assets/svg/cross.svg";
import GoogleSVG from "../../../assets/svg/google.svg";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";

function ModalForgotPassword({ onClose }: { onClose: any }) {
  const dispatchRedux = useDispatch();
  const [state, dispatch] = React.useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordError, setforgotPasswordError] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const { mail, password } = values;

    const data = {
      user: mail,
      password,
      // user: "sdfsdf@sdf.df",
      // password: "secret"
    };

    try {
    } catch (err: any) {}
  };

  return (
    <div
      className={`modal-forgotPassword__overlay${
        state.isActiveModalForgotPassword == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-forgotPassword__container">
        <div className="modal-forgotPassword__header">
          <h2 className="modal-forgotPassword__title title--white">
            Забули пароль
          </h2>
          <p className="modal-forgotPassword__text--desctop">
            Введіть адрес електронної пошти на який буде висланий новий пароль
            до вашого аккаунту
          </p>
          <button
            onClick={onClose}
            className="modal-forgotPassword__button-close--mob"
          >
            <CrossSVG />
          </button>
        </div>
        <div className="modal-forgotPassword__body">
          <p className="modal-forgotPassword__text--mob">
            Введіть адрес електронної пошти на який буде висланий новий пароль
            до вашого аккаунту
          </p>
          <button
            onClick={onClose}
            className="modal-forgotPassword__button-close--desctop"
          >
            <CrossSVG />
          </button>
          <Formik
            initialValues={{
              email: "",
            }}
            validate={(values) => {
              const errors: any = {};
              // if (!values.name) {
              //   errors.name = "Обязательное поле";
              // }
              // if (!values.phone) {
              //   errors.phone = "Обязательное поле";
              // }
              // else if (!numberRegEpx.test(values.phone)) {
              //   errors.phone = 'Не правильно введен номер'
              // }

              return errors;
            }}
            onSubmit={handleSubmit}
          >
            <Form className="modal-forgotPassword__form">
              {forgotPasswordError && (
                <div className="modal-forgotPassword__failed">
                  {forgotPasswordError}
                </div>
              )}
              <label className="modal-forgotPassword__field">
                <span className="modal-forgotPassword__label">
                  Електронна пошта
                </span>
                <Field
                  className="modal-forgotPassword__input section__primary-text"
                  type="email"
                  name="email"
                  required
                  placeholder="example@mail.com"
                />
              </label>

              <div className="modal-forgotPassword__button">
                <MainButtonRed label="Відправити" />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default ModalForgotPassword;
