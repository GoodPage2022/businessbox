import React from "react";
import { MainContext } from "../../contexts/mainContext";

const RaiseRating = () => {
  const [state, dispatch] = React.useContext(MainContext);
  return (
    <div className="raiseRating">
      <p className="section__secondary-text">
        Ваше(і) оголошення зараз знаходяться не в топі, тому багато потенційних
        клієнтів можуть його не знайти.
        <br /> Пропонуємо Вам можливість підняти Ваше оголошення на більш видимі
        позиції у нашому списку за символічну плату у розмірі 40 грн.
        <br />
        Це дозволить забезпечити більшу ефективність та зручність для
        потенційних клієнтів, які шукають ваші послуги
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
