import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import ArrowSVG from "../../../src/assets/svg/catalog-arrow.svg";
import { MainContext } from "../../contexts/mainContext";

const Navbar = () => {
  const [state, dispatch] = useContext(MainContext);
  const userUseSelector = useSelector((state: any) => state.auth.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userUseSelector);
  }, [userUseSelector]);

  return (
    <nav className="header__nav">
      <Logo />
      <ul className="header__nav__menu">
        <li className="header__nav__menu__item header__nav__menu__catalog">
          {/* <Link href="#"> */}
          <p className="section__secondary-text--white">
            Каталог бізнесів <ArrowSVG />
          </p>
          {/* </Link> */}
          <div className="header__nav__menu__dropdown">
            {" "}
            <Link href="/catalog">
              <a className="section__secondary-text--white">Купівля</a>
            </Link>
            {/* {user && ( */}
            <Link href="/invest/catalog">
              <a className="section__secondary-text--white">Інвестування</a>
            </Link>
            {/* )} */}
          </div>
        </li>

        {!user && (
          <li className="header__nav__menu__item   section__secondary-text--white">
            <Link href="/invest">
              <a className="section__secondary-text--white">Інвестування</a>
            </Link>
          </li>
        )}

        <li className="header__nav__menu__item   section__secondary-text--white">
          <Link href={`/experts`}>
            <a className="section__secondary-text--white">Прокачка бізнесу</a>
          </Link>
        </li>

        <li
          onClick={() => {
            // if (!user) {
            //   dispatch({ type: "toggle_authModal" });
            //   localStorage.setItem("redirectToInformation", "true");
            // }
          }}
          className="header__nav__menu__item   section__secondary-text--white"
        >
          <Link href={`/useful-information`}>
            <a className="section__secondary-text--white">Корисна інформація</a>
          </Link>
        </li>

        <li className="header__nav__menu__item   section__secondary-text--white">
          <Link href="#footer">
            <a className="section__secondary-text--white">Контакти</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
