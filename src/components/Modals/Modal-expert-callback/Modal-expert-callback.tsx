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

function ModalExpertCallback({ onClose }: { onClose: any }) {
  const [state, dispatch] = React.useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreePolicy, setAgreePolicy] = useState<boolean>(false);
  const router = useRouter();
  const [isSentForm, setIsSentForm] = useState(false);

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

  const handleSubmit = async (values: any, {}: any) => {
    console.log(values, "values");

    setIsLoading(true);
    const { name, phone, email, surname, city, comment } = values;

    const data = {
      title: `Форма Отримати консультацію`,
      name,
      phone,
      email,
      surname,
      city,
      comment,
      url: `${process.env.baseUrl}${router.asPath}`,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/telegram/tg_bot";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    try {
      const response = await fetch(endpoint, options);
      console.log(response, "resp");
      if (response.status == 200) {
        setIsSentForm(true);
      }
    } catch (error) {
      console.log(error, "err");
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
        state.isActiveModalExpertCallback == true ? " active" : ""
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
            {isSentForm
              ? "Дякуємо! Найближчим часом з Вами зв'яжеться менеджер!"
              : "Заповніть форму"}
          </h2>
          <button onClick={onClose} className="modal-register__button-close">
            <CrossSVG />
          </button>
        </div>
        {!isSentForm && (
          <div className="modal-register__body">
            <Formik
              initialValues={{
                name: "",
                phone: "",
                surname: "",
                email: "",
                comment: "",
                city: "",
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
                      name="email"
                      minLength={1}
                      maxLength={255}
                      required
                      component={CustomInput}
                      placeholder="example@mail.com"
                    />
                  </label>
                </div>

                {/* <div className="modal-register__city-wrapper">
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
              </div> */}
                <label className="modal-moreAboutBusiness__field">
                  <span className="modal-moreAboutBusiness__label">
                    Коментар
                  </span>
                  <Field
                    as="textarea"
                    className="projectInfo__textarea section__primary-text"
                    type="text"
                    name="comment"
                    minLength={1}
                    maxLength={1000}
                    required
                    placeholder="Додати коментар..."
                  />
                </label>

                {/* {registerError && (
                <div className="modal-register__failed">{registerError}</div>
              )} */}
                <div className="modal-register__policy">
                  <button className="modal-register__button" type="submit">
                    Відправити
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}
export default ModalExpertCallback;
