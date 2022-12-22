import React, { useEffect, useState } from "react";
import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/router";
import MainButtonRed from "../../shared/MainButtonRed";

function ModalAnalysisTariffs({ onClose }: { onClose: any }) {
  const [state, dispatch] = React.useContext(MainContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
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
      className={`modal-analysisTariffs__overlay${
        state.isActiveAnalysisTariffsModal == true ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-analysisTariffs__container">
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
        <div className="modal-analysisTariffs__header">
          <h2 className="modal-analysisTariffs__title title--white">
            Аналітика бізнесу
          </h2>
          <div>
            <button
              onClick={onClose}
              className="modal-analysisTariffs__button-close"
            >
              <CrossSVG />
            </button>
          </div>
        </div>
        <div className="modal-analysisTariffs__body">
          <p className="modal-analysisTariffs__title-text">
            В нас ви можете замовити детальний аналіз бізнесу, що вас зацікавив
          </p>
          <p className="modal-analysisTariffs__text section__secondary-text">
            Для замовлення доступні два пакети Light та Pro. Вони відрізняються
            глибиной дослідження та деталізацією інформації.
          </p>
          <div className="modal-analysisTariffs__tariffs">
            <ul className="modal-analysisTariffs__first-list">
              <p className="modal-analysisTariffs__list-title">Light</p>
              <li className="section__secondary-text modal-analysisTariffs__list-item">
                - Поверхнева перевірка реєстраційних документів
              </li>
              <li className="section__secondary-text modal-analysisTariffs__list-item">
                - Аналіз маркетингової активності
              </li>
              <li className="section__secondary-text modal-analysisTariffs__list-item">
                - Перевірка фінансової звітність компанії та актуальності
                вказаних продавцем даних
              </li>
              <div
                className="modal-analysisTariffs__button"
                onClick={() => {
                  onClose();
                  dispatch({ type: "toggle_analysisModal" });
                  state.tariff = "light";
                }}
              >
                <div className="modal-analysisTariffs__price">1 грн</div>
                <MainButtonRed label="Замовити Light" />
              </div>
            </ul>
            <ul className="modal-analysisTariffs__second-list">
              <p className="modal-analysisTariffs__list-title">Premium</p>
              <li className="section__secondary-text modal-analysisTariffs__list-item">
                - Фізичне відвідування локації та детальний фотозвіт
              </li>
              <li className="section__secondary-text modal-analysisTariffs__list-item">
                - Глибока перевірка реєстраційних документів та повязаних осіб
              </li>
              <li className="section__secondary-text modal-analysisTariffs__list-item">
                - Маркетинговий аналіз компанії та аналіз конкурентів
              </li>
              <li className="section__secondary-text modal-analysisTariffs__list-item">
                - Детальна фінансова звітність підприємства та актуальність
                вказаних продавцем данних
              </li>
              <li className="section__secondary-text modal-analysisTariffs__list-item">
                - Річний план подальшого розвитку із зрозумілим, очікуванним та
                запланованим зростанням.
              </li>
              <div
                className="modal-analysisTariffs__button premium"
                onClick={() => {
                  onClose();
                  dispatch({ type: "toggle_analysisModal" });
                  state.tariff = "premium";
                }}
              >
                <div className="modal-analysisTariffs__price">2 грн</div>
                <MainButtonRed label="Замовити Premium" />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalAnalysisTariffs;
