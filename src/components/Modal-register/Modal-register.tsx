import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field } from "formik";

import CrossSVG from "../../assets/svg/cross.svg";
import router from "next/router";

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
              // else if (!numberRegEpx.test(values.phone)) {
              //   errors.phone = 'Не правильно введен номер'
              // }

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
