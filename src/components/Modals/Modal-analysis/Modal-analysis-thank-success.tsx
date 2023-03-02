import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";
import CustomInput from "../../shared/CustomInput";
import { Oval } from "react-loader-spinner";

function ModalAnalysisThankSuccess({ onClose }: { onClose: any }) {
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

  return (
    <div
      className={`modal-analysisThank__overlay${
        state.isActiveAnalysisThankSuccessModal ? " active" : ""
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
export default ModalAnalysisThankSuccess;
