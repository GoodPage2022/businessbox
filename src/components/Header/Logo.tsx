import Link from "next/link";

const Logo = () => {
  return (
    <div className="header__logo">
      <Link href="/">
        <a className="header__logo__text">Business Box</a>
      </Link>
    </div>
  );
};

export default Logo;
