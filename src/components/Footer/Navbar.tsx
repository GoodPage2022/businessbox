import Link from "next/link";
import PolygonSVG from "../../assets/svg/polygon.svg";

const Navbar = () => {
  return (
    <nav className="header__nav">
      <ul className="header__nav__menu">
        <li className="header__nav__menu__item ">
          <Link href="/">
            <a className="section__secondary-text--white">
              Категорії <PolygonSVG />
            </a>
          </Link>
        </li>
        <li className="header__nav__menu__item  section__secondary-text--white">
          <Link href="/">
            <a className="section__secondary-text--white">Про нас</a>
          </Link>
        </li>
        <li className="header__nav__menu__item   section__secondary-text--white">
          <Link href="/">
            <a className="section__secondary-text--white">Контакти</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
