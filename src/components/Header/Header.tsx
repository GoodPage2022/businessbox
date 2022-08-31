import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'

import Navbar from './Navbar'
import Right from './Right'

const Header = () => {
  const [offset, setOffset] = useState(0);
  const { pathname } = useRouter();
  
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  return (
    <header className={`header${(offset > 20 || pathname != '/') ? " scrolled" : ""}`}>
      <div className="container header__container__desc" >
        <Navbar />
        <Right/>
      </div>
      
    </header>
  )
}

export default Header
