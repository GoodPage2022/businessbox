import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <nav className="header__nav">
      <Logo />
      <ul className="header__nav__menu">
        <li className="header__nav__menu__item">
          <Link href="/catalog">
            <a className="section__secondary-text--white">Каталог бізнесів</a>
          </Link>
        </li>
        {user && (
          <li className="header__nav__menu__item section__secondary-text--white">
            <Link href="/useful-tools">
              <a className="section__secondary-text--white">
                Корисні інструменти
              </a>
            </Link>
          </li>
        )}
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
