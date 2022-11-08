import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import EyeSVG from "../../../assets/svg/eye.svg";
import CrossSVG from "../../../assets/svg/cross.svg";
import GoogleSVG from "../../../assets/svg/google.svg";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";
import CustomInput from "../../shared/CustomInput";
import { Oval } from "react-loader-spinner";

function ModalForgotPassword({ onClose }: { onClose: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, dispatch] = React.useContext(MainContext);
  const [isformSent, setIsformSent] = useState(false);
  const [isGetErr, setIsGetErr] = useState(false);
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
    setIsLoading(true);
    const { email } = values;

    const reqData = {
      to_email: email,
    };

    try {
      const response = await axios.post(`/api/reset/send`, reqData);
      setIsformSent(true);
      console.log(response.data);
    } catch (err: any) {
      setIsGetErr(true);
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`modal-forgotPassword__overlay${
        state.isActiveModalForgotPassword == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-forgotPassword__container">
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
              zIndex: "999999999",
            }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#e95973"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        )}
        <div className="modal-forgotPassword__header">
          <h2 className="modal-forgotPassword__title title--white">
            Забули пароль
          </h2>
          {!isformSent && (
            <p className="modal-forgotPassword__text--desctop">
              Введіть адрес електронної пошти на який буде висланий новий пароль
              до вашого аккаунту
            </p>
          )}

          <button
            onClick={onClose}
            className="modal-forgotPassword__button-close--mob"
          >
            <CrossSVG />
          </button>
        </div>
        <div className="modal-forgotPassword__body">
          {!isformSent && (
            <p className="modal-forgotPassword__text--mob">
              Введіть адрес електронної пошти на який буде висланий новий пароль
              до вашого аккаунту
            </p>
          )}
          <button
            onClick={onClose}
            className="modal-forgotPassword__button-close--desctop"
          >
            <CrossSVG />
          </button>
          {isformSent ?? isGetErr ? (
            <>
              {isGetErr ? (
                <p className="modal-forgotPassword__send-err">
                  Упс, щось пішло не так. Повторіть спробу або напишіть нам на
                  пошту
                </p>
              ) : (
                <p className="modal-forgotPassword__send-title">
                  Запит на зміну паролю, прийнято. Перейдіть на пошту для
                  подальших інструкцій
                </p>
              )}
            </>
          ) : (
            <Formik
              initialValues={{
                email: "",
              }}
              validate={() => {
                const errors: any = {};

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
                    component={CustomInput}
                  />
                </label>

                <div className="modal-forgotPassword__button">
                  <MainButtonRed label="Відправити" />
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
export default ModalForgotPassword;
