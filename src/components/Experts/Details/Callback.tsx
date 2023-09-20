import { useState } from "react";
import MainButton from "../../shared/MainButton";
import MainButtonRed from "../../shared/MainButtonRed";
import { MainContext } from "../../../contexts/mainContext";
import React from "react";
import ModalExpertCallback from "../../Modals/Modal-expert-callback/Modal-expert-callback";

const Callback = ({}: any) => {
  const [state, dispatch] = React.useContext(MainContext);

  return (
    <div className="callback">
      <div className="callback__container container">
        <MainButtonRed
          onClick={() => dispatch({ type: "toggle_expertCallback" })}
          label="Замовити зворотній зв'язок"
        />
        <ModalExpertCallback
          onClose={() => dispatch({ type: "toggle_expertCallback" })}
        />
      </div>
    </div>
  );
};

export default Callback;
