import Slider from "react-slick"

import  OurCategories  from '../../../constants/categories'
import MainButton from '../../shared/MainButton'

const Categories = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className='categories'>
      <div className="container categories__container--desc">
      <Slider {...settings}> 
          {OurCategories.map(({ id, content }) => (
            <li key={id} className="categories__buttons__item">
              <MainButton label={content} color={''} border={''} />
            </li>
            ))
          }
      </Slider>
        <h1 className="categories__title title--white">Великий продаючий заголовок можливо 2-3 рядки</h1>
        <p className="categories__text section__primary-text--white">Клієнт дуже важливий, за клієнтом піде клієнт. Ціна двох 
        еросів – ціна смартфона. Зараз пакет повинен бути 
        безкоштовним і мультиплікаційним. Спілкуйтеся 
        як Бог горло, поставити перед або, отруйна посмішка.</p>
        {/* <MainButton label='Зареєструвати бізнес зараз' color={''} border={''} /> */}
        <button className="categories__button section__primary-text--white">Зареєструвати бізнес зараз</button>
      </div>
    
    </section>
  )
}

export default Categories
