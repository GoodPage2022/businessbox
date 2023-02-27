import React, { useEffect } from "react";

import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";

function ModalThankComment({ onClose }: { onClose: any }) {
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
      className={`modal-thankComment__overlay${
        state.thankComment ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-thankComment__container">
        <div className="modal-thankComment__header">
          <button
            onClick={onClose}
            className="modal-thankComment__button-close"
          >
            <CrossSVG />
          </button>

          <h2 className="modal-thankComment__title title--white">
            Дякуємо за інтерес до цього бізнесу. Ваш коментар відправлено на
            модерацію
          </h2>
        </div>
      </div>
    </div>
  );
}
export default ModalThankComment;
