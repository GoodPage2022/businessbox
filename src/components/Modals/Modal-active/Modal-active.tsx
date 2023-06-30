import React, { useEffect, useRef, useState } from "react";
import CrossSVG from "../../../assets/svg/cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";
import axios from "axios";
import { useRouter } from "next/router";
import TopSVG from "../../../assets/svg/top-label.svg";
import CheckActiveSVG from "../../../assets/svg/check-active.svg";
import MainButtonBlack from "../../shared/MainButtonBlack";
import LiqPay from "@azarat/liqpay";

function ModalActive({
  onClose,
  projectId,
}: {
  onClose: any;
  projectId?: string;
}) {
  const dispatchRedux = useDispatch();
  const [state, dispatch] = React.useContext(MainContext);
  const user = useSelector((state: any) => state.auth.user);
  const [liqpayForm, setLiqpayForm] = useState<JSX.Element>();
  const liqpayFormRef = useRef<HTMLFormElement>(null);
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    if (!liqpayForm) return;
    if (!liqpayFormRef.current) return;

    liqpayFormRef.current?.submit();
  }, [liqpayForm]);

  useEffect(() => {
    if (!orderId) return;

    const liqpay = new LiqPay(
      process.env.liqpayClientId ?? "",
      process.env.liqpayClientSecret ?? ""
    );
    const liqpayJSX = liqpay.cnb_form(
      {
        language: "ua",
        action: "pay",
        amount: (40).toString(),
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
  }, [orderId]);

  const openLiqpay = async ({ resetForm }: any) => {
    try {
      const createOrder = await axios.post("/api/businesses/topOrder", {
        projects: [projectId],
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

  const activateBusiness = async () => {
    try {
      const response = await axios.post(`/api/businesses/activateBusiness`, {
        id: projectId,
      });
      if (response.data.success) {
        dispatch({ type: "toggle_modalActive" });
        dispatch({ type: "toggle_thankActive" });
      }
      // console.log(response.data, "response");
    } catch (error) {
      console.log(error, "errer");
    }
  };

  return (
    <div
      className={`modal-active__overlay${
        state.isOpenModalActive ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-active__container">
        <div className="modal-active__header">
          <h2 className="modal-active__title title--white">
            Активувати бізнес
          </h2>
          <button onClick={onClose} className="modal-active__button-close--mob">
            <CrossSVG />
          </button>
        </div>
        <div className="modal-active__body">
          <div className="modal-active__top">
            <TopSVG />
            <div className="modal-active__top-descr">
              <p className="modal-active__top-title section__primary-text--bold">
                Просування оголошення{" "}
              </p>
              <p className="modal-active__text">ВАРТІСТЬ 40 ГРН </p>
            </div>
            <button
              onClick={onClose}
              className="modal-active__button-close--desctop"
            >
              <CrossSVG />
            </button>
          </div>

          <ul className="modal-active__description">
            <li className="modal-active__list-item">
              <CheckActiveSVG />{" "}
              <p className="modal-active__text">
                Протягом 30 днів оголошення в ТОП{" "}
              </p>
            </li>
            <li className="modal-active__list-item">
              <CheckActiveSVG />{" "}
              <p className="modal-active__text">
                Збільшена кількість переглядів
              </p>
            </li>
            <li className="modal-active__list-item">
              <CheckActiveSVG />{" "}
              <p className="modal-active__text">
                Продати бізнес в декілька разів швидше
              </p>
            </li>
          </ul>

          <div className="modal-active__buttons">
            <MainButtonBlack
              label="Опублікувати без реклами"
              onClick={activateBusiness}
            />
            <MainButtonRed label="Оплатити" onClick={openLiqpay} />
          </div>
          <div className="liqpayForm">{liqpayForm}</div>
        </div>
      </div>
    </div>
  );
}

export default ModalActive;
