import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import MaskedInput from "react-text-mask";
import axios from "axios";

import EyeSVG from "../../../assets/svg/eye.svg";
import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";
import phoneNumberMask from "../../../masks/phoneNumberMask";

function ModalRegister({ onClose }: { onClose: any }) {
  const [state, dispatch] = React.useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");

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
    const { name, phone, mail, surname, password, city } = values;

    const newUser = {
      user: {
        name,
        user: mail,
        password,
        // password: "secret",
        email: mail,
        group: "user",
        api_key: 1,
        phone,
        surname,
        city,
      },
    };

    try {
      const newUserResponse = await axios.post(`/api/account/signUp`, newUser);

      if (newUserResponse.status == 200) {
        onClose();
        resetForm({});
        setRegisterError("");
        dispatch({ type: "toggle_registrationFinishModal" });
      }
    } catch (err: any) {
      console.log("Register Error");
      console.log(err);
      if (err.response.data.error === "Username is already used!") {
        setRegisterError(
          "Користувач з такою поштою вже зареєстрований в системі. Змініть пошту або скористайтеся функцією відновлення паролю",
        );
      } else {
        setRegisterError("На жаль, виникла помилка. Спробуйте ще раз");
      }
    }
  };

  function escapeHtml(text: string) {
    const map: any = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return text.replace(/[&<>"']/g, function (m: any) {
      return map[m];
    });
  }

  function validate(e: any) {
    const input = e.target as HTMLInputElement;
    input?.setCustomValidity("");
    const validityState = input?.validity;
    if (!validityState?.valid) {
      input?.setCustomValidity("Заповнити поле");
    }
  }

  return (
    <div
      className={`modal-register__overlay${
        state.isActiveModalRegistration == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-register__container">
        <div className="modal-register__header">
          <h2 className="modal-register__title title--white">
            Вікно реєстрації
          </h2>
          <button onClick={onClose} className="modal-register__button-close">
            <CrossSVG />
          </button>
        </div>
        <div className="modal-register__body">
          <Formik
            initialValues={{
              name: "",
              phone: "",
              surname: "",
              mail: "",
              password: "",
              city: "",
            }}
            validate={(values) => {
              escapeHtml(values.name);
              // escapeHtml(values.business);
              escapeHtml(values.surname);
              escapeHtml(values.mail);
              escapeHtml(values.city);
              escapeHtml(values.phone);
            }}
            onSubmit={handleSubmit}
          >
            <Form className="modal-register__form">
              <div className="modal-register__name-wrapper">
                <label className="modal-register__field">
                  <span className="modal-register__label">Ім’я</span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="text"
                    name="name"
                    minLength={1}
                    maxLength={255}
                    required
                    onFocus={(e: any) => {
                      validate(e);
                    }}
                    placeholder="Петро"
                  />
                </label>
                <label className="modal-register__field">
                  <span className="modal-register__label">Прізвище</span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="text"
                    minLength={1}
                    maxLength={255}
                    name="surname"
                    onFocus={(e: any) => {
                      validate(e);
                    }}
                    required
                    placeholder="Петренко"
                  />
                </label>
              </div>
              <div className="modal-register__phone-wrapper">
                <label className="modal-register__field">
                  <span className="modal-register__label">Телефон</span>
                  <Field
                    name="phone"
                    onFocus={(e: any) => {
                      validate(e);
                    }}
                    render={({ field }: { field: any }) => (
                      <MaskedInput
                        {...field}
                        mask={phoneNumberMask}
                        required
                        placeholder="+380 (__) __ __ __"
                        type="text"
                        className="modal-register__input section__primary-text"
                      />
                    )}
                  />
                </label>
                <label className="modal-register__field">
                  <span className="modal-register__label">
                    Електронна пошта
                  </span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="email"
                    name="mail"
                    minLength={1}
                    maxLength={255}
                    required
                    onFocus={(e: any) => {
                      validate(e);
                    }}
                    placeholder="example@mail.com"
                  />
                </label>
              </div>

              <div className="modal-register__city-wrapper">
                <label className="modal-register__field">
                  <span className="modal-register__label">Місто</span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="text"
                    name="city"
                    minLength={1}
                    maxLength={255}
                    required
                    onFocus={(e: any) => {
                      validate(e);
                    }}
                    placeholder="Дніпро"
                  />
                </label>
                <label className="modal-register__field--password">
                  <span className="modal-register__label">Пароль</span>
                  <span className="modal-register__input-wrapper">
                    <Field
                      className="modal-register__input section__primary-text"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      minLength={6}
                      onFocus={(e: any) => {
                        validate(e);
                      }}
                      maxLength={255}
                      placeholder="******"
                    />
                    <EyeSVG
                      className="modal-register__eye-icon"
                      onClick={() => setShowPassword((prev: boolean) => !prev)}
                    />
                  </span>
                </label>
              </div>

              {registerError && (
                <div className="modal-register__failed">{registerError}</div>
              )}
              <button className="modal-register__button" type="submit">
                Зареєструватись
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default ModalRegister;
