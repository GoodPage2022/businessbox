import React from 'react'
import SearchSVG from '../../assets/svg/search.svg'
import MainButton from '../shared/MainButton'


const Right = () => {

  return (
      <ul className="header__right">
          <li className='header__right__btn'><button className='header__right__btn--search'><SearchSVG/></button></li>
          <li className='header__right__btn'><MainButton label='Вхід' color={''} border={''}/></li>
          <li className='header__right__btn'><MainButton  label='Зареєструвати бізнес' color={'#F22A4E'} border='none'/></li>
      </ul>
  )
}

export default Right
