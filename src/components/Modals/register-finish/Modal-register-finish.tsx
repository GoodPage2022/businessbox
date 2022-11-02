import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import EyeSVG from "../../../assets/svg/eye.svg";
import CrossSVG from "../../../assets/svg/cross.svg";
import GoogleSVG from "../../../assets/svg/google.svg";
import { MainContext } from "../../../contexts/mainContext";

function ModalRegisterFinish({ onClose }: { onClose: any }) {
  const [state, dispatch] = React.useContext(MainContext);

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
      className={`modal-registerFinish__overlay${
        state.isOpenModalRegisterFinish == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-registerFinish__container">
        <div className="modal-registerFinish__header">
          <h2 className="modal-registerFinish__title title--white">
            Реєстрація
          </h2>
          <button
            onClick={onClose}
            className="modal-registerFinish__button-close--mob"
          >
            <CrossSVG />
          </button>
        </div>
        <div className="modal-registerFinish__body">
          <button
            onClick={onClose}
            className="modal-registerFinish__button-close--desctop"
          >
            <CrossSVG />
          </button>
          <p className="modal-registerFinish__send-title">
            Вітаємо! Реєстрація пройшла успішно
          </p>
        </div>
      </div>
    </div>
  );
}
export default ModalRegisterFinish;
