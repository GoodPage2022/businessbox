import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";
import CustomInput from "../../shared/CustomInput";
import { Oval } from "react-loader-spinner";

function ModalAnalysisThank({
  onClose,
  orderId,
}: {
  onClose: any;
  orderId: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, dispatch] = React.useContext(MainContext);
  const [isformSent, setIsformSent] = useState(false);
  const [isGetErr, setIsGetErr] = useState(false);
  const [forgotPasswordError, setforgotPasswordError] = useState("");
  const [order, setOrder] = useState({});

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

  const liqpayInfo = async () => {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const checkLiqpay = await axios.post(
        "/api/analysis/check-liqpay",
        { orderId },
        options,
      );

      console.log(checkLiqpay);

      // if (checkLiqpay.status == 200) {
      //   return checkLiqpay.data;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("asasasasasas");
    liqpayInfo();
  }, []);

  async function getOrderDetails() {
    const liqpayStatus = await liqpayInfo();

    try {
      const response = await axios.post(`/api/sale/order-details`, {
        orderId,
      });
      if (response.data.success) {
        // consoleLog(response.data);

        // Google ADWARDS
        if (typeof window !== "undefined") {
          window.gtag("event", "conversion", {
            send_to: "AW-847937607/r2uCCIPDiJMDEMeAqpQD",
            value: parseFloat(response.data.order_total),
            currency: "UAH",
            transaction_id: response.data.order_id,
          });

          // Google ANALYTICS
          // window.gtag("event", "purchase", {
          //   value: parseFloat(response.data.order_total),
          //   currency: "UAH",
          //   transaction_id: response.data.order_id,
          //   items: response.data.products.map((p: any) => ({
          //     id: p.id,
          //     name: p.name,
          //     price: p.price,
          //     quantity: p.order_qty,
          //     category: p.category[0].name,
          //     brand: "Artimat",
          //   })),
          // });
        }

        setOrder(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={`modal-analysisThank__overlay${
        state.isActiveAnalysisThankModal ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-analysisThank__container">
        <div className="modal-analysisThank__header">
          <h2 className="modal-analysisThank__title title--white">
            Запит надіслано успішно!
          </h2>

          <button
            onClick={onClose}
            className="modal-forgotPassword__button-close--mob"
          >
            <CrossSVG />
          </button>
        </div>
        <div className="modal-analysisThank__body">
          <button
            onClick={onClose}
            className="modal-analysisThank__button-close--desctop"
          >
            <CrossSVG />
          </button>
          <p className="modal-analysisThank__text">
            Дякуємо! З вами зв’яжеться менеджер для відправки результатів
            аналітики
          </p>
        </div>
      </div>
    </div>
  );
}
export default ModalAnalysisThank;
