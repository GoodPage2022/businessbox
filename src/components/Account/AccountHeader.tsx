import { useState } from "react";

import MainButtonBlack from "../shared/MainButtonBlack";
import EditSVG from "../../assets/svg/edit.svg";
import PlusSVG from "../../assets/svg/plus.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const AccountHeader = () => {
  const { pathname } = useRouter();
  const router = useRouter();

  const [isContactInfo, setIsContactInfo] = useState(() =>
    pathname === "/account/contact-info" ? true : false,
  );
  const [isBusiness, setIsBusiness] = useState(() =>
    pathname === "/account/my-businesses" ? true : false,
  );

  return (
    <div className="accountHeader">
      <div className="container accountHeader__container">
        <ul className="accountHeader__left">
          <li className="accountHeader__left--item">
            <Link href="/account/contact-info">
              <a>
                <MainButtonBlack label="Контактна інформація" />
              </a>
            </Link>
          </li>
          <li className="accountHeader__left--item">
            <Link href="/account/my-businesses">
              <a>
                <MainButtonBlack label="Мої бізнеси" />
              </a>
            </Link>
          </li>
          <li className="accountHeader__left--item">
            <Link href="/account/favorites">
              <a>
                <MainButtonBlack label="Обрані" />
              </a>
            </Link>
          </li>
        </ul>
        <div className="accountHeader__right">
          {isContactInfo ? (
            <button className="accountHeader__button-edit">
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
