import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import MaskedInput from "react-text-mask";
import axios from "axios";

import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";
import phoneNumberMask from "../../../masks/phoneNumberMask";
import CustomInput from "../../shared/CustomInput";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/router";

function ModalMoreAboutBusiness({ onClose }: { onClose: any }) {
  const [state, dispatch] = React.useContext(MainContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>("");
  // const [orderId, setOrderId] = useState<string>("");
  // const [tariff, setTariff] = useState<string>("");
  const router = useRouter();
  const [liqpayForm, setLiqpayForm] = useState<JSX.Element>();
  const liqpayFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!router.query.project) return;
    setProjectId(router.query.project.toString());
  }, [router]);

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
    const projectLink = `${process.env.baseUrl}${router.asPath}`;
    setIsLoading(true);
    const { name, phone, email } = values;

    const newRequest = {
      request: {
        name,
        email,
        phone,
        link: projectLink,
        tariff: state.tariff,
        status: "Pending",
      },
    };

    try {
      const response = await axios.post(
        `/api/moreAboutBusiness/post`,
        newRequest,
      );
      if (response.status == 200) {
        // setOrderId(response.data._id)
        dispatch({ type: "toggle_moreAboutBusinessModal" });
        router.push(
          `${process.env.baseUrl}/catalog/${projectId}?order_id=${response.data._id}`,
        );

        // onClose();
        // resetForm({});
        // setError("");
        // dispatch({ type: "toggle_moreAboutBusinessThankModal" });
      }
    } catch (err: any) {
      console.log(err);
      setError("На жаль, виникла помилка. Спробуйте ще раз");
    }

    // setIsLoading(false);
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
      className={`modal-moreAboutBusiness__overlay${
        state.isOpenMoreAboutBusiness == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-moreAboutBusiness__container">
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
        <div className="modal-moreAboutBusiness__header">
          <div>
            <h2 className="modal-moreAboutBusiness__title title--white">
              Форма для картки бізнесу
            </h2>
            <p className="section__primary-text--white">
              Вкажіть ваші данні для отримання результатів
            </p>
          </div>
          <div>
            <button
              onClick={onClose}
              className="modal-moreAboutBusiness__button-close"
            >
              <CrossSVG />
            </button>
          </div>
        </div>
        <div className="modal-moreAboutBusiness__body">
          <Formik
            initialValues={{
              name: "",
              phone: "",

              email: "",
            }}
            validate={(values) => {
              escapeHtml(values.name);
              escapeHtml(values.email);
              escapeHtml(values.phone);
            }}
            onSubmit={handleSubmit}
          >
            <Form className="modal-moreAboutBusiness__form">
              <div className="modal-moreAboutBusiness__name-wrapper">
                <label className="modal-moreAboutBusiness__field">
                  test
                  <span className="modal-moreAboutBusiness__label">Ім’я</span>
                  <Field
                    className="modal-moreAboutBusiness__input section__primary-text"
                    type="text"
                    name="name"
                    minLength={1}
                    maxLength={255}
                    required
                    component={CustomInput}
                    placeholder="Петро"
                  />
                </label>
                <label className="modal-moreAboutBusiness__field">
                  <span className="modal-moreAboutBusiness__label">
                    Телефон
                  </span>
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
                        className="modal-moreAboutBusiness__input section__primary-text"
                      />
                    )}
                  />
                </label>
              </div>
              {/* <div className="modal-moreAboutBusiness__phone-wrapper"></div> */}

              <div className="modal-moreAboutBusiness__city-wrapper">
                <label className="modal-moreAboutBusiness__field">
                  <span className="modal-moreAboutBusiness__label">
                    Електронна пошта
                  </span>
                  <Field
                    className="modal-moreAboutBusiness__input section__primary-text"
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

              <label className="modal-moreAboutBusiness__field">
                <span className="modal-moreAboutBusiness__label">Коментар</span>
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

              {error && (
                <div className="modal-moreAboutBusiness__failed">{error}</div>
              )}
              <button className="modal-moreAboutBusiness__button" type="submit">
                Відправити
              </button>
            </Form>
          </Formik>
          {/* {liqpayForm} */}
        </div>
      </div>
    </div>
  );
}
export default ModalMoreAboutBusiness;
