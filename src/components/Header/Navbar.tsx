import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from './Logo'

const Navbar = () => {


  return (
      <nav className="header__nav">
        <Logo/>
        <ul className="header__nav__menu">
          <li className='header__nav__menu__item  section__secondary-text--white'>Каталог бізнесів</li>
          <li className='header__nav__menu__item  section__secondary-text--white'>Про нас</li>
          <li className='header__nav__menu__item   section__secondary-text--white'>Контакти</li>
        </ul>
      </nav>
  )
}

export default Navbar
