import React, { useEffect, useState } from "react";
import CrossSVG from "../../../assets/svg/cross.svg";
import { MainContext } from "../../../contexts/mainContext";

function ModalPayment({ onClose }: { onClose: any }) {
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
      className={`modal-payment__overlay${
        state.isActiveModalPayment ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-payment__container">
        <div className="modal-payment__header">
          <h2 className="modal-payment__title title--white">
            {state.method == "visa"
              ? "Verified by Visa"
              : "MasterCard® SecureCode™"}
          </h2>
          <button onClick={onClose} className="modal-payment__button-close">
            <CrossSVG />
          </button>
        </div>
        <div className="modal-payment__body">
          {state.method == "visa" ? (
            <div className="">
              <p className="section__primary-text">
                Платіжні системи в партнерстві з банками-емітентами впроваджують
                сучасні схеми перевірки особистості власника картки, щоб зробити
                покупки в Інтернеті більш безпечними. Встановлюється спеціальний
                пароль для кожної операції, що здійснюється, і це вселяє в Вас
                впевненість, що тільки Ви можете робити такі покупки онлайн.
                Сучасні технологічні рішення необхідні для того, щоб власник
                картки був упевнений в безпеці транзакції і в тому, що він має
                справу зі справжнім (а не «підставним») магазином.
              </p>
              <p className="section__primary-text">
                Одне з таких технологічних рішень називається Verified by Visa
                («Перевірено Visa»).
              </p>
              <p className="section__primary-text">
                Verified by Visa — це нова система захисту, яка сповіщає
                онлайн-торговців, що беруть участь в програмі, і банки про те,
                що Ви є справжнім власником картки, коли Ви робите
                онлайн-покупки. Вона дозволяє використовувати персональний
                пароль для підтвердження вашої особи і захисту Вашої картки
                Visa, коли Ви використовуєте її в Інтернеті, вселяючи велику
                впевненість в здійснюваних Вами діях.
              </p>{" "}
              <p className="section__primary-text">
                До технології Verified by Visa легко підключитися, її легко
                використовувати, послуга діє для всіх карток Visa.
              </p>{" "}
              <p className="section__primary-text">
                Для активації послуги Verified by Visa для Вашої картки
                необхідно звернутися в Ваш банк.
              </p>
            </div>
          ) : (
            <div>
              <p className="section__primary-text">
                MasterCard® SecureCode™ — це технологія, яка забезпечує Вашу
                картку MasterCard® або Maestro® додатковим секретним кодом, що
                захищає її від несанкціонованого використання під час здійснення
                покупок в інтернет-магазинах, що беруть участь в програмі.
              </p>
              <p className="section__primary-text">
                Щоб підключити технологію SecureCode, необхідно звернутися в
                банк, що випустив Вашу карту. Ваш секретний код буде відомий
                тільки Вам і Вашому банку. Далі при кожній оплаті покупок або
                послуг в інтернет-магазинах, що беруть участь в програмі, Ваш
                банк запропонує Вам ввести даний секретний код, який Ви
                отримаєте на Ваш мобільний телефон, зареєстрований в банку.
                Тільки після перевірки та підтвердження банком даного коду
                операція з оплати буде проведена. Процедура використання
                технології SecureCode так само проста, як введення PIN-коду в
                банкоматі.
              </p>
              <p className="section__primary-text">
                Ввівши правильний SecureCode в процесі покупки, Ви
                підтверджуєте, що є авторизованим власником карти. Якщо ввести
                неправильний SecureCode, покупка не буде здійснена. Навіть якщо
                комусь відомий номер Вашої платіжної карти, без SecureCode не
                вдасться оплатити покупку в інтернет-магазинах, що беруть участь
                в програмі.
              </p>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
export default ModalPayment;
