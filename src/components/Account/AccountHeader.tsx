import { useState } from "react";

import MainButtonBlack from "../shared/MainButtonBlack";
import EditSVG from "../../assets/svg/edit.svg";
import PlusSVG from "../../assets/svg/plus.svg";

const AccountHeader = () => {
  const [isContactInfo, setIsContactInfo] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);

  return (
    <div className="accountHeader">
      <div className="container accountHeader__container">
        <div className="accountHeader__left">
          <MainButtonBlack label="Контактна інформація" />
          <MainButtonBlack label="Мої бізнеси" />
          <MainButtonBlack label="Обрані" />
        </div>
        <div className="accountHeader__right">
          {isContactInfo ? (
            <button className="accountHeader__button-edit">
              <EditSVG />
            </button>
          ) : null}
          {isBusiness ? (
            <button className="accountHeader__button-plus">
              <PlusSVG />
              <span className="accountHeader__button-plus--text section__secondary-text--white">
                Додати бізнес
              </span>
            </button>
          ) : null}
        </div>

        {/* <ContactInfo /> */}
      </div>
    </div>
  );
};

export default AccountHeader;
