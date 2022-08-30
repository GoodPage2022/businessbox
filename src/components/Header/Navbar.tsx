import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'

const Navbar = () => {


  return (
      <nav className="header__nav">
        <Logo/>
        <ul className="header__nav__menu">
          <li className='header__nav__menu__item '>
            <Link  href="/">
              <a className='section__secondary-text--white'>Каталог бізнесів</a>
            </Link></li>
          <li className='header__nav__menu__item  section__secondary-text--white'>
            <Link  href="/">
              <a className='section__secondary-text--white'>Про нас</a>
            </Link></li>
          <li className='header__nav__menu__item   section__secondary-text--white'>
            <Link  href="/">
              <a className='section__secondary-text--white'>Контакти</a>
            </Link></li>
        </ul>
      </nav>
  )
}

export default Navbar
