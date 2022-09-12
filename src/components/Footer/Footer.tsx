import Link from "next/link";
import Logo from "./Logo";
import Networks from "./Networks";
import PolygonSVG from "../../assets/svg/polygon.svg";
import CopyrightSVG from "../../assets/svg/copyright.svg";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__logo">
          <Logo />
          <Networks />
          <p className="section__secondary-text--white">Create by Good Page</p>
        </div>
        <div className="footer__categories">
          <Link href="/">
            <a className=" footer__categories--button">
              <span className="section__secondary-text--white footer__categories--text">
                Категорії
              </span>
              <PolygonSVG />
            </a>
          </Link>
        </div>
        <div className="footer__catalog">
          <Link href="/catalog">
            <a className="section__secondary-text--white footer__categories--button">
              Каталог бізнесів
            </a>
          </Link>
        </div>

        <div className="footer__contacts">
          <Link href="/">
            <a className="section__secondary-text--white footer__categories--button">
              Контакти
            </a>
          </Link>
          <div>
            <p className="footer__contacts--item">
              <a href="tel:0501234567">+38 (050) 123-45-67</a>
            </p>
            <p className="footer__contacts--item">
              {" "}
              <a href="mailto:example@gmail.com">example@gmail.com</a>
            </p>
          </div>
          <p className="footer__contacts--text section__secondary-text--white">
            <CopyrightSVG className="footer__contacts--icon" />
            Copyright 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
