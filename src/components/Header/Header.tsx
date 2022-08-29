import Logo from './Logo'
import Navbar from './Navbar'
import Networks from './Networks'
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router';
// import BurgerSVG from '../../assets/svg/burger.svg'
// import BurgerCloseSVG from '../../assets/svg/burger-close.svg'
import NetworksMob from './NetworksMob';
import NetworksTab from './NetworksTab';
import Address from './Address';
// import Modal from '../HomePage/Modal/Modal'
import LogoTab from './LogoTab';


const Header = () => {
  const [offset, setOffset] = useState(0);
  const { pathname } = useRouter();
  const [ active, setActive ] = useState(false)

  const [showModal, setShowModal] = useState(false);

  const openMenuBurger = () => {
    setActive(!active)
    setShowModal(prevState => !prevState);
  };

  const closeMenuBurger = () => {
    setShowModal(prevState => !prevState);
    setActive(!active)
  }
  

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  return (
    <header className={`header${(offset > 20 || pathname != '/') ? " scrolled" : ""}`}>
      <div className="container header__container__desc">
        <Logo /> 
        <Navbar />
        <Networks /> 
      </div>
      <LogoTab/>
      <NetworksTab/>
      <button className={"header__menu-burger" + (active == true ? " isHidden" : "")} onClick={openMenuBurger}>{/* <BurgerSVG/> */}</button>
      <button className={"header__menu-burger--close" + (active == true ? "" : " isHidden")} onClick={closeMenuBurger}>{/* <BurgerCloseSVG/> */}</button>
      <div className={"container header__container__mob" + (active == true ? "--active" : "")}>
        <div className="header__wrapper">
          <Logo /> 
          <Navbar />
        </div>
        <div className='header__wrapper'>
          <Address />
          <NetworksMob /> 
        </div>
      </div>
    
    </header>
  )
}

export default Header
