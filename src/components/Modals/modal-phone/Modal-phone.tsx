import React, { useEffect, useState, useRef } from "react";

import ReactTooltip from "react-tooltip";
import ArrowSVG from "../../../assets/svg/arrow-project.svg";
import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";
import { Oval } from "react-loader-spinner";

function ModalPhone({ onClose }: { onClose: any }) {
  const [state, dispatch] = React.useContext(MainContext);
  const [phone, setPhone] = useState("+38 (066) 202-63-04");

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
  const copyLink = () => {
    navigator.clipboard.writeText(phone);
  };

  return (
    <div
      className={`modal-phone__overlay${
        state.isActivePhoneModal == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-phone__container">
        <div className="modal-phone__body">
          <button
            onClick={onClose}
            className="modal-phone__button-close--desctop"
          >
            <CrossSVG />
          </button>
          <div className="modal-phone__title">
            <h1 className="title modal-phone__text">{phone}</h1>

            <button
              data-tip
              data-for="copyTip"
              data-event="click"
              className="detailInfo__title--transparent-icon"
              data-event-off={"focusout"}
            >
              <div>
                <ArrowSVG />
              </div>
            </button>
            <ReactTooltip
              id="copyTip"
              afterShow={() => {
                copyLink();
              }}
              scrollHide={true}
              clickable={true}
            >
              Номер скопійовано в буфер обміну
            </ReactTooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalPhone;
