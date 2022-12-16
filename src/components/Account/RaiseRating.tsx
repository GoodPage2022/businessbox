import React from "react";
import { MainContext } from "../../contexts/mainContext";

const RaiseRating = () => {
  const [state, dispatch] = React.useContext(MainContext);
  return (
    <div className="raiseRating">
      <p className="section__secondary-text">
        Ваше(і) оголошення зараз знаходиться на останнії сторінках і бгато
        потенційних клієнтів можуть його не знайти.
        <br /> Пропонуємо підняти Ваше оголошення на топові позиції нашого
        списку (Вартість 40 грн)
      </p>
      <button
        className="raiseRating__button"
        onClick={() => {
          dispatch({ type: "toggle_raiseRatingModal" });
        }}
      >
        Підняти у топ
      </button>
    </div>
  );
};

export default RaiseRating;
