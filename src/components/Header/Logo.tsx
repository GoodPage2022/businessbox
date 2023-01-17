import Link from "next/link";
import LogoSVG from "../../assets/svg/logo.svg";

const Logo = () => {
  return (
    <div className="header__logo">
      <Link href="/">
        <a className="header__logo__text">
          <div className="header__logo__svg">
            <LogoSVG />
          </div>
          {/* Business Box */}
        </a>
      </Link>
    </div>
  );
};

export default Logo;
