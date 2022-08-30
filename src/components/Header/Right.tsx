import React from 'react'
import SearchSVG from '../../assets/svg/search.svg'
import IconButton from '../shared/IconButton'
import MainButton from '../shared/MainButton'
import MainButtonRed from '../shared/MainButtonRed'

const Right = () => {

  return (
      <ul className="header__right">
          <li className='header__right__btn'><IconButton borderColor='#FFFFFF' icon={<SearchSVG/>}/></li>
          <li className='header__right__btn'><MainButton label='Вхід'/></li>
          <li className='header__right__btn'><MainButtonRed  label='Зареєструвати бізнес'/></li>
      </ul>
  )
}

export default Right
