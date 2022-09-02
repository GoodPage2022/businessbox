import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { AccountEditButtonContext } from "../../contexts/AccountEditButton";
import MainButtonBlack from "../shared/MainButtonBlack";
import EditSVG from "../../assets/svg/edit.svg";
import PlusSVG from "../../assets/svg/plus.svg";
import MainButtonGrey from "../shared/MainButtonGrey";

const AccountHeader = ({}) => {
  const { pathname } = useRouter();
  const router = useRouter();
  const [state, dispatch] = React.useContext(AccountEditButtonContext);
  const [isContactInfo, setIsContactInfo] = useState(() =>
    pathname === "/account/contact-info" ? true : false,
  );
  const [isBusiness, setIsBusiness] = useState(() =>
    pathname === "/account/my-businesses" ? true : false,
  );
  const [isFavorites, setIsFavorites] = useState(() =>
    pathname === "/account/favorites" ? true : false,
  );

  return (
    <div className="accountHeader">
      <div className="container accountHeader__container">
        <ul className="accountHeader__left">
          <li className="accountHeader__left--item">
            {isContactInfo ? (
              <Link href="/account/contact-info">
                <a>
                  <MainButtonGrey label="Контактна інформація" />
                </a>
              </Link>
            ) : (
              <Link href="/account/contact-info">
                <a>
                  <MainButtonBlack label="Контактна інформація" />
                </a>
              </Link>
            )}
          </li>
          <li className="accountHeader__left--item">
            {isBusiness ? (
              <Link href="/account/contact-info">
                <a>
                  <MainButtonGrey label="Мої бізнеси" />
                </a>
              </Link>
            ) : (
              <Link href="/account/my-businesses">
                <a>
                  <MainButtonBlack label="Мої бізнеси" />
                </a>
              </Link>
            )}
          </li>
          <li className="accountHeader__left--item">
            {isFavorites ? (
              <Link href="/account/contact-info">
                <a>
                  <MainButtonGrey label="Обрані" />
                </a>
              </Link>
            ) : (
              <Link href="/account/favorites">
                <a>
                  <MainButtonBlack label="Обрані" />
                </a>
              </Link>
            )}
          </li>
        </ul>
        <div className="accountHeader__right">
          {isContactInfo ? (
            <button
              className="accountHeader__button-edit"
              onClick={() => dispatch({ type: "toggle_edit" })}
            >
              <EditSVG />
            </button>
          ) : null}
          {isBusiness ? (
            <button
              onClick={() => router.push("/account/add-business")}
              className="accountHeader__button-plus"
            >
              <PlusSVG />
              <span className="accountHeader__button-plus--text">
                Додати бізнес
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
