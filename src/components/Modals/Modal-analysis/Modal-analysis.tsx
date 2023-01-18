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

import LiqPay from "@azarat/liqpay";

function ModalAnalysis({ onClose }: { onClose: any }) {
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
    if (!router.query.project) return
    setProjectId(router.query.project.toString())
  },[router])

  // useEffect(() => {
  //   if (!state.tariff) return
  //   setTariff(state.tariff)
  // },[state])

  // useEffect(() => {
  //   if (!orderId || !tariff || !projectId) return

  //   const liqpay = new LiqPay(process.env.liqpayClientId ?? "", process.env.liqpayClientSecret ?? "");
  //   const liqpayJSX = liqpay.cnb_form({
  //     'language'       : 'ru',
  //     'action'         : 'pay',
  //     'amount'         : (tariff == "premium") ? '2' : '1',
  //     'currency'       : 'UAH',
  //     'description'    : `Оплата послуг Bissbox. Тариф "${tariff}"`,
  //     'order_id'       : orderId.toString(),
  //     'version'        : '3',
  //     'server_url'     : `${process.env.baseUrl}/api/analysis/completeOrder`,
  //     'result_url'     : `${process.env.baseUrl}/catalog/${projectId}?order_id=${orderId}`
  //   }, liqpayFormRef);

  //   setLiqpayForm(liqpayJSX)
  // },[orderId, tariff, projectId])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // useEffect(() => {
  //   if (!liqpayForm) return
  //   if (!liqpayFormRef.current) return

  //   liqpayFormRef.current?.submit()
  // }, [liqpayForm]);

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
      const response = await axios.post(`/api/analysis/post`, newRequest);
      if (response.status == 200) {
        // setOrderId(response.data._id)
        dispatch({ type: "toggle_analysisModal" });
        router.push(`${process.env.baseUrl}/catalog/${projectId}?order_id=${response.data._id}`)

        // onClose();
        // resetForm({});
        // setError("");
        // dispatch({ type: "toggle_analysisThankModal" });
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
      className={`modal-analysis__overlay${
        state.isActiveAnalysisModal == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-analysis__container">
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
        <div className="modal-analysis__header">
          <div>
            <h2 className="modal-analysis__title title--white">
              Починаємо аналіз бізнесу!
            </h2>
            <p className="section__primary-text--white">
              Вкажіть ваші данні для отримання результатів
            </p>
          </div>
          <div>
            <button onClick={onClose} className="modal-analysis__button-close">
              <CrossSVG />
            </button>
          </div>
        </div>
        <div className="modal-analysis__body">
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
            <Form className="modal-analysis__form">
              <div className="modal-analysis__name-wrapper">
                <label className="modal-analysis__field">
                  test
                  <span className="modal-analysis__label">Ім’я</span>
                  <Field
                    className="modal-analysis__input section__primary-text"
                    type="text"
                    name="name"
                    minLength={1}
                    maxLength={255}
                    required
                    component={CustomInput}
                    placeholder="Петро"
                  />
                </label>
              </div>
              <div className="modal-analysis__phone-wrapper">
                <label className="modal-analysis__field">
                  <span className="modal-analysis__label">Телефон</span>
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
                        className="modal-analysis__input section__primary-text"
                      />
                    )}
                  />
                </label>
              </div>

              <div className="modal-analysis__city-wrapper">
                <label className="modal-analysis__field">
                  <span className="modal-analysis__label">
                    Електронна пошта
                  </span>
                  <Field
                    className="modal-analysis__input section__primary-text"
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

              {error && <div className="modal-analysis__failed">{error}</div>}
              <button className="modal-analysis__button" type="submit">
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
export default ModalAnalysis;
