import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import MaskedInput from "react-text-mask";
import axios from "axios";

import EyeSVG from "../../../assets/svg/eye.svg";
import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";
import phoneNumberMask from "../../../masks/phoneNumberMask";
import CustomInput from "../../shared/CustomInput";
import { Oval } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/router";

function ModalRegister({ onClose }: { onClose: any }) {
  const [state, dispatch] = React.useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreePolicy, setAgreePolicy] = useState<boolean>(false);
  const router = useRouter();
  // console.log(state.isInvestor == 1, "asaasasdasdasd");
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
    setIsLoading(true);
    const { name, phone, email, surname, password, city } = values;

    const newUser = {
      user: {
        name,
        // user: email,
        password,
        // password: "secret",
        email,
        group: state.isInvestor == 1 ? "investor" : "user",
        // api_key: 1,
        phone,
        surname,
        city,
        investor: state.isInvestor == 1 ? 1 : 0,
      },
    };

    try {
      if (agreePolicy) {
        const newUserResponse = await axios.post(
          `/api/account/signUp`,
          newUser
        );

        console.log(newUserResponse, "newUserResponse");
        if (newUserResponse.status == 200) {
          onClose();
          resetForm({});
          setRegisterError("");
          dispatch({ type: "toggle_registrationFinishModal" });
        }
      } else {
        setRegisterError("Ви не дали згоду на обробку персональних даних");
      }
    } catch (err: any) {
      console.log("Register Error");
      console.log(err);
      if (err.response.data.error === "Username is already used!") {
        setRegisterError(
          "Користувач з такою поштою вже зареєстрований в системі. Змініть пошту або скористайтеся функцією відновлення паролю"
        );
      } else {
        setRegisterError("На жаль, виникла помилка. Спробуйте ще раз");
      }
    }
    setIsLoading(false);
  };

  function escapeHtml(text: string) {
    const map: any = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    if (text == undefined) {
      return;
    }
    return text.replace(/[&<>"']/g, function (m: any) {
      return map[m];
    });
  }

  return (
    <div
      className={`modal-register__overlay${
        state.isActiveModalRegistration == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-register__container">
        {isLoading && (
          <Oval
            height={150}
            width={150}
            color="#f22a4e"
            wrapperStyle={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#e95973"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        )}
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
              email: "",
              password: "",
              city: "",
              checked: [],
            }}
            validate={(values) => {
              escapeHtml(values.name);
              // escapeHtml(values.business);
              escapeHtml(values.surname);
              escapeHtml(values.email);
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
                    component={CustomInput}
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
                    component={CustomInput}
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
                    component={CustomInput}
                    required
                    placeholder="+___ (__) __ __ __"
                    type="text"
                    maxLength={20}
                    className="modal-register__input section__primary-text"
                  />
                </label>
                <label className="modal-register__field">
                  <span className="modal-register__label">
                    Електронна пошта
                  </span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="email"
                    name="email"
                    minLength={1}
                    maxLength={255}
                    required
                    component={CustomInput}
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
                    component={CustomInput}
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
                      component={CustomInput}
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
              <div className="modal-register__policy">
                <input
                  className={`modal-register__checkbox__input ${
                    agreePolicy ? "agree" : ""
                  }`}
                  type="checkbox"
                  name="checked"
                />
                <label
                  className="modal-register__checkbox__label"
                  onClick={() => setAgreePolicy((prev) => !prev)}
                >
                  <span className="modal-register__checkbox__text section__secondary-text">
                    Я згоден(а) з{" "}
                    <Link href="/information/public-offer">
                      <a
                        onClick={() => setAgreePolicy((prev) => !prev)}
                        target="_blank"
                        className="modal-register__link"
                      >
                        договором оферти
                      </a>
                    </Link>{" "}
                    та{" "}
                    <Link href="/information/privacy-policy">
                      <a
                        onClick={() => setAgreePolicy((prev) => !prev)}
                        target="_blank"
                        className="modal-register__link"
                      >
                        конфіденційності
                      </a>
                    </Link>{" "}
                  </span>
                </label>
                <button className="modal-register__button" type="submit">
                  Зареєструватись
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default ModalRegister;
