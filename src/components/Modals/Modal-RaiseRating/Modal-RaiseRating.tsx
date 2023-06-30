import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import CrossSVG from "../../../assets/svg/cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";
import axios from "axios";
import { useRouter } from "next/router";
import LiqPay from "@azarat/liqpay";

function ModalRaiseRating({
  onClose,
  lowRatingBusinesses,
}: {
  onClose: any;
  lowRatingBusinesses: any[];
}) {
  const [state, dispatch] = React.useContext(MainContext);
  const [raiseRatingError, setraiseRatingError] = useState("");
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  const [liqpayForm, setLiqpayForm] = useState<JSX.Element>();
  const liqpayFormRef = useRef<HTMLFormElement>(null);
  const [projectsId, setProjectsId] = useState<string[]>();
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    if (!liqpayForm) return;
    if (!liqpayFormRef.current) return;

    liqpayFormRef.current?.submit();
  }, [liqpayForm]);

  useEffect(() => {
    if (!orderId) return;
    if (!projectsId || projectsId.length == 0) return;

    console.log("projectsId", projectsId);

    const liqpay = new LiqPay(
      process.env.liqpayClientId ?? "",
      process.env.liqpayClientSecret ?? ""
    );
    const liqpayJSX = liqpay.cnb_form(
      {
        language: "ua",
        action: "pay",
        amount: (40 * projectsId.length).toString(),
        currency: "UAH",
        description: `Оплата послуг Bissbox. Послуга "Підняти в топ"`,
        order_id: orderId.toString(),
        version: "3",
        server_url: `${process.env.baseUrl}/api/businesses/raiseToTop`,
        result_url: `${process.env.baseUrl}/catalog/top/${orderId}`,
      },
      liqpayFormRef
    );

    setLiqpayForm(liqpayJSX);
  }, [orderId, projectsId]);

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

  useEffect(() => {
    if (!liqpayForm) return;
    if (!liqpayFormRef.current) return;

    liqpayFormRef.current?.submit();
  }, [liqpayForm]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    // const { deleteReason, deleteReasonOther } = values;
    console.log(values);
    setProjectsId(values.checked);
    // const data = {
    //   user,
    // deleteReason,
    // deleteReasonOther,
    // projectId,
    // projectTitle,
    // };

    try {
      const createOrder = await axios.post("/api/businesses/topOrder", {
        projects: values.checked,
        user,
        status: "Pending",
      });

      if (createOrder.status == 200) {
        setOrderId(createOrder.data.insertedId);
        console.log("insertedId", createOrder.data.insertedId);
      }
    } catch (error) {
      console.log(error);
    }

    // router.push("/account/my-businesses");
  };

  return (
    <div
      className={`modal-raiseRating__overlay${
        state.isActiveRaiseRatingModal ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-raiseRating__container">
        <div className="modal-raiseRating__header">
          <h2 className="modal-raiseRating__title title--white">
            Просунути бізнес
          </h2>
          <p className="modal-raiseRating__text--desctop">
            Оберіть один чи декілька бізнесів, оголошення на них будуть
            переміщені на перші позиції каталогу
          </p>
          <button
            onClick={onClose}
            className="modal-raiseRating__button-close--mob"
          >
            <CrossSVG />
          </button>
        </div>
        <div className="modal-raiseRating__body">
          <button
            onClick={onClose}
            className="modal-raiseRating__button-close--desctop"
          >
            <CrossSVG />
          </button>

          <Formik
            initialValues={{
              checked: [],
            }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="modal-raiseRating__form">
                {raiseRatingError && (
                  <div className="modal-raiseRating__failed">
                    {raiseRatingError}
                  </div>
                )}
                <ul>
                  {lowRatingBusinesses.map((i) => (
                    <li key={i._id} className="modal-raiseRating__checkbox">
                      <Field
                        id={`cat_${i._id}`}
                        className="checkbox__input agree"
                        type="checkbox"
                        name="checked"
                        value={i._id}
                      />
                      <label
                        htmlFor={`cat_${i._id}`}
                        className="checkbox__label"
                      >
                        <span className="checkbox__text section__secondary-text">
                          {i.title}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="modal-raiseRating__button">
                  <MainButtonRed label="До оплати" />
                  <div className="liqpayForm">{liqpayForm}</div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default ModalRaiseRating;
