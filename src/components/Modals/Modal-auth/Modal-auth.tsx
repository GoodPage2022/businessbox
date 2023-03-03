import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import router from "next/router";

import EyeSVG from "../../../assets/svg/eye.svg";
import CrossSVG from "../../../assets/svg/cross.svg";
import GoogleSVG from "../../../assets/svg/google.svg";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signIn as signInReducer } from "../../../../store/actions/auth";
import { useSession, signIn as signInGoogle } from "next-auth/react";
import CustomInput from "../../shared/CustomInput";
import { Oval } from "react-loader-spinner";
import Script from "next/script";

const CancelToken = axios.CancelToken;
let cancel: any;

function ModalAuth({ onClose }: { onClose: any }) {
  const { data: session } = useSession();
  const user = useSelector((state: any) => state.auth.user);
  const dispatchRedux = useDispatch();
  const [state, dispatch] = React.useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInGoogleRequest = async (session: any) => {
    if (cancel !== undefined) {
      cancel();
    }

    try {
      const signInResponse = await axios.post(
        `/api/account/signIn`,
        {
          session,
          group: state.isInvestor == 1 ? "investor" : "user",
        },
        {
          cancelToken: new CancelToken((c) => {
            cancel = c;
          }),
        },
      );
      if (signInResponse.status == 200) {
        dispatchRedux(signInReducer(signInResponse.data));
        setAuthError("");
        if (localStorage.getItem("redirectToAddBusiness")) {
          localStorage.removeItem("redirectToAddBusiness");
          router.push("/account/add-business");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      console.log(err);

      setAuthError("Google auth error");
    }
  };

  useEffect(() => {
    if (session != null && user == null) {
      signInGoogleRequest(session);
    }
  }, [session, user]);

  const openRegisterModal = () => {
    router.push("/#register");
    dispatch({ type: "toggle_authModal" });
    dispatch({ type: "toggle_registrationModal" });
    window.gtag("event", "conversion", {
      send_to: "AW-11042174734/e0iYCN3-4oQYEI7uqJEp",
    });
  };

  const openForgotPasswordModal = () => {
    router.push("/#forgot-password");
    dispatch({ type: "toggle_authModal" });
    dispatch({ type: "toggle_forgotPasswordModal" });
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
    setIsLoading(true);
    const { email, password } = values;

    const data = {
      user: email,
      password,
      // user: "sdfsdf@sdf.df",
      // password: "secret"
    };

    try {
      const signInResponse = await axios.post(`/api/account/signIn`, data);
      if (signInResponse.status == 200) {
        dispatchRedux(signInReducer(signInResponse.data));
        onClose();
        resetForm({});
        setAuthError("");
        console.log(signInResponse.data);
        if (state.isInvestor == 1 && signInResponse.data.investor == 1) {
          router.push("/invest/catalog");
          dispatch({ type: "toggle_investor" });
          state.isInvestor = 0;
          return;
        }
        if (state.isInvestor == 1 && signInResponse.data.investor != 1) {
          router.push("/invest/add-business");
          dispatch({ type: "toggle_investor" });
          state.isInvestor = 0;
          return;
        }
        if (localStorage.getItem("redirectToAddBusiness")) {
          localStorage.removeItem("redirectToAddBusiness");
          router.push("/account/add-business");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      setAuthError("Хибний логін або пароль");
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
      className={`modal-auth__overlay${
        state.isActiveModalAuth == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-auth__container">
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
        <div className="modal-auth__header">
          <h2 className="modal-auth__title title--white">Вікно входу</h2>
          <button onClick={onClose} className="modal-auth__button-close--mob">
            <CrossSVG />
          </button>
        </div>
        <div className="modal-auth__body">
          <button
            onClick={onClose}
            className="modal-auth__button-close--desctop"
          >
            <CrossSVG />
          </button>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors: any = {};
              escapeHtml(values.password);
              escapeHtml(values.email);
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
              {authError && (
                <div className="modal-auth__failed">{authError}</div>
              )}
              <label className="modal-auth__field--mail">
                <span className="modal-auth__label">Електронна пошта</span>
                <Field
                  className="modal-auth__input section__primary-text"
                  type="email"
                  name="email"
                  minLength={1}
                  maxLength={255}
                  required
                  component={CustomInput}
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
                    minLength={6}
                    maxLength={255}
                    required
                    component={CustomInput}
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

              <button
                className="modal-auth__google"
                onClick={() => signInGoogle("google")}
                type="button"
              >
                <GoogleSVG />
                <span className="modal-auth__google--text section__secondary-text">
                  Google Authorization
                </span>
              </button>
              <button
                className="modal-auth__forgot-password section__secondary-text"
                type="button"
                onClick={() => {
                  openForgotPasswordModal();
                }}
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
