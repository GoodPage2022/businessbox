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

function ModalDeleteBusiness({ onClose }: { onClose: any }) {
  const dispatchRedux = useDispatch();
  const [state, dispatch] = React.useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteBusinessError, setdeleteBusinessError] = useState("");

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
      className={`modal-deleteBusiness__overlay${
        state.isOpenDeleteBusiness ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-deleteBusiness__container">
        <div className="modal-deleteBusiness__header">
          <h2 className="modal-deleteBusiness__title title--white">
            Видалити бізнес
          </h2>
          <p className="modal-deleteBusiness__text--desctop">
            Вкажіть будь ласка причину видалення вашого бізнесі
          </p>
          <button
            onClick={onClose}
            className="modal-deleteBusiness__button-close--mob"
          >
            <CrossSVG />
          </button>
        </div>
        <div className="modal-deleteBusiness__body">
          <button
            onClick={onClose}
            className="modal-deleteBusiness__button-close--desctop"
          >
            <CrossSVG />
          </button>
          <p className="modal-deleteBusiness__text--mob">
            Вкажіть будь ласка причину видалення вашого бізнесі
          </p>
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
            <Form className="modal-deleteBusiness__form">
              {deleteBusinessError && (
                <div className="modal-deleteBusiness__failed">
                  {deleteBusinessError}
                </div>
              )}
              <label className="modal-deleteBusiness__field">
                <Field
                  className="modal-deleteBusiness__input section__primary-text"
                  type="radio"
                  name="sold"
                />
                <span className="modal-deleteBusiness__label">
                  Бізнес вже продано
                </span>
              </label>
              <label className="modal-deleteBusiness__field">
                <Field
                  className="modal-deleteBusiness__input section__primary-text"
                  type="radio"
                  name="incorect"
                />
                <span className="modal-deleteBusiness__label">
                  Введена некоректна інформація
                </span>
              </label>
              <label className="modal-deleteBusiness__field">
                <Field
                  className="modal-deleteBusiness__input section__primary-text"
                  type="radio"
                  name="other"
                />
                <span className="modal-deleteBusiness__label">Інше</span>
              </label>
              <label className="modal-deleteBusiness__field">
                <Field
                  className="modal-deleteBusiness__input-text section__primary-text"
                  type="text"
                  name="name"
                  minLength={1}
                  maxLength={255}
                  required
                  placeholder="Передумав продавати..."
                />
              </label>

              <div className="modal-deleteBusiness__button">
                <MainButtonRed label="Відправити" />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default ModalDeleteBusiness;
