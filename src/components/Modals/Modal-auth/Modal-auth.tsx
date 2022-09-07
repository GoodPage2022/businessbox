import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import router from "next/router";

import EyeSVG from "../../../assets/svg/eye.svg";
import CrossSVG from "../../../assets/svg/cross.svg";
import GoogleSVG from "../../../assets/svg/google.svg";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";

function ModalAuth({ onClose }: { onClose: any }) {
  const [state, dispatch] = React.useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);

  const openRegisterModal = () => {
    router.push("/#register");
    dispatch({ type: "toggle_authModal" });
    dispatch({ type: "toggle_registrationModal" });
  };

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
    const { name, phone, wishes } = values;

    const data = {
      title: "Форма: Підібрати краще авто",
      name,
      phone,
      wishes,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/tg_bot";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    // const result = await response.json()

    if (response.status === 200) {
      router.push("/thankyou");
      localStorage.removeItem("url");
    }

    resetForm({});
  };

  return (
    <div
      className={`modal-auth__overlay${
        state.isActiveModalAuth == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-auth__container">
        <div className="modal-auth__header">
          <h2 className="modal-auth__title title--white">Вікно входу</h2>
        </div>
        <div className="modal-auth__body">
          <button onClick={onClose} className="modal-auth__button-close">
            <CrossSVG />
          </button>
          <Formik
            initialValues={{
              mail: "",
              password: "",
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
            <Form className="modal-auth__form">
              <label className="modal-auth__field--mail">
                <span className="modal-auth__label">Електронна пошта</span>
                <Field
                  className="modal-auth__input section__primary-text"
                  type="email"
                  name="mail"
                  required
                  placeholder="example@mail.com"
                />
              </label>

              <label className="modal-auth__field--password">
                <span className="modal-auth__label">Пароль</span>
                <span className="modal-auth__input-wrapper">
                  <Field
                    className="modal-auth__input section__primary-text"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="******"
                  />
                  <EyeSVG
                    className="modal-auth__eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </span>
              </label>

              <div className="modal-auth__buttons">
                <button
                  className="modal-auth__button section__secondary-text--white"
                  type="button"
                  onClick={openRegisterModal}
                >
                  Зареєструватись
                </button>
                <MainButtonRed label="Увійти" />
              </div>
              <p className="modal-auth__text section__secondary-text">або</p>

              <button className="modal-auth__google" type="button">
                <GoogleSVG />
                <span className="modal-auth__google--text section__secondary-text">
                  Увійти за допомогою Google
                </span>
              </button>
              <button
                className="modal-auth__forgot-password section__secondary-text"
                type="button"
              >
                Забули пароль?
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default ModalAuth;
