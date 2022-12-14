import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Right from "./Right";
import HeaderMob from "./HeaderMob";
import BurgerMenu from "./BurgerMenu";
import { MainContext } from "../../contexts/mainContext";

const Header = () => {
  const [offset, setOffset] = useState(0);
  const { pathname } = useRouter();

  const [state, dispatch] = React.useContext(MainContext);
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openMenuBurger = () => {
    setActive(!active);
    setShowModal((prevState) => !prevState);
  };

  const closeMenuBurger = () => {
    setShowModal((prevState) => !prevState);
    setActive(!active);
  };

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`header${offset > 20 || pathname != "/" ? " scrolled" : ""}`}
        onClick={() => {
          if (state.isActiveMobFilter) {
            dispatch({ type: "toggle_mobFilter" });
            // document.querySelector("body")?.classList.toggle("disable-scroll");
          }
        }}
      >
        <div className="container header__container__desctop">
          <Navbar />
          <Right />
        </div>
        <div className="container header__container__mob">
          <HeaderMob />
        </div>

        <BurgerMenu />
      </header>
    </>
  );
};

export default Header;
