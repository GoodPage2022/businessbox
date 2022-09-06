import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field } from "formik";

import CrossSVG from "../../assets/svg/cross.svg";
import router from "next/router";
import axios from "axios";

function Modal({ onClose }: { onClose: any }) {
  let modalRoot: any;
  if (typeof window !== "undefined") {
    modalRoot = document.querySelector("#modal-root");
  }

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
    const { name, phone, mail, surname, business, city } = values;

    const newUser = {
      user:{
        name,
        user: mail,
        password:"secret",
        email: mail,
        group:"user",
        api_key:1,
        phone,
        surname,
        business,
        city,    
      }
    }

    const newUserResponse = await axios.post(`${process.env.cockpitApiUrl}/cockpit/saveUser?token=${process.env.cockpitApiToken}`, newUser)
    console.log(newUserResponse);

    resetForm({});
  };

  return createPortal(
    <div className="modal-register__overlay" onClick={handleBackdropClick}>
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
              business: "",
              city: "",
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.name) {
                errors.name = "Обязательное поле";
              }
              if (!values.phone) {
                errors.phone = "Обязательное поле";
              }
              return errors;
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
                    required
                    placeholder="Петро"
                  />
                </label>
                <label className="modal-register__field">
                  <span className="modal-register__label">Призвіще</span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="text"
                    name="surname"
                    required
                    placeholder="Петренко"
                  />
                </label>
              </div>
              <div className="modal-register__phone-wrapper">
                <label className="modal-register__field">
                  <span className="modal-register__label">Телефон</span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="text"
                    name="phone"
                    required
                    placeholder="+380 (__) __ __ __"
                  />
                </label>
              </div>
              <div className="modal-register__mail-wrapper">
                <label className="modal-register__field">
                  <span className="modal-register__label">Електрона пошта</span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="mail"
                    name="mail"
                    required
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
                    required
                    placeholder="Дніпро"
                  />
                </label>
                <label className="modal-register__field">
                  <span className="modal-register__label">Сфера бізнесу</span>
                  <Field
                    className="modal-register__input section__primary-text"
                    type="text"
                    name="business"
                    required
                    placeholder="Графічний дизайн"
                  />
                </label>
              </div>
              <button className="modal-register__button" type="submit">
                Зареєструватись
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>,
    modalRoot,
  );
}
export default Modal;
