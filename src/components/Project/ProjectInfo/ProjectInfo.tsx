import Slider from "react-slick";
import Image from "next/image";

import HeartSVG from "../../../assets/svg/heart.svg";
import ArrowSVG from "../../../assets/svg/arrow-project.svg";
import CopySVG from "../../../assets/svg/copy.svg";
import OurCategoriesShort from "../../../constants/categories-short";
import MainButtonBlack from "../../shared/MainButtonBlack";
import ProfileInfo from "./ProfileInfo";
import Comment from "./Comment";
import OurComments from "../../../constants/comments";
import PopularCards from "../../../constants/popular";
import PopularCard from "../../shared/BusinessCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";

const ProjectInfo = () => {
  const [isCopy, setIsCopy] = useState(false);
  const imageSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    arrows: false,
  };
  const [link, setLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLink(window.location.href);
    }
  }, []);

  const categoriesSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    arrows: false,
  };

  const [cards, setCards] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.user)

  const getBusinesses = async () => {
    const response = await axios.post(`/api/businesses/get`, { user })

    if (response.data) {
      setCards(response.data.entries)
      return response.data.entries
    }

    setCards([])
    return [];
  }
  
  useEffect(() => {
    getBusinesses()
  }, [])

  return (
    <section className="projectInfo">
      <div className="container projectInfo__container">
        <div className="projectInfo__title">
          <h1 className="projectInfo__title--text title">Назва проекту</h1>
          <div className="projectInfo__title--icons">
            <button className="projectInfo__title--red-icon">
              <HeartSVG />
            </button>
            <button
              className="projectInfo__title--transparent-icon"
              onClick={() => setIsCopy((prev) => !prev)}
            >
              <ArrowSVG />
            </button>
          </div>
        </div>
        {isCopy && (
          <div className="projectInfo__copy">
            <div className="projectInfo__copy--text-wrapper">
              <p className="section__primary-text">{link}</p>
            </div>
            <div
              className="projectInfo__copy-button"
              onClick={() => {
                navigator.clipboard.writeText(link);
                setIsCopy(false);
              }}
            >
              <CopySVG />
            </div>
          </div>
        )}
        <div className="projectInfo__image-slider">
          <Slider {...imageSliderSettings}>
            <li className="projectInfo__image-slider--image">
              <Image
                className=""
                src="/assets/images/project-image-1.png"
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </li>
            <li className="projectInfo__image-slider--image">
              <Image
                className=""
                src="/assets/images/project-image-2.png"
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </li>
            <li className="projectInfo__image-slider--image">
              <Image
                className=""
                src="/assets/images/project-image-3.png"
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </li>
          </Slider>
        </div>
        <div className="projectInfo__categories-slider">
          <Slider {...categoriesSliderSettings}>
            {OurCategoriesShort.map(({ id, content }) => (
              <li key={id} className="categories__buttons__item">
                <MainButtonBlack label={content} />
              </li>
            ))}
          </Slider>
        </div>
        <p className="projectInfo__text section__primary-text">
          Клієнт дуже важливий, за клієнтом піде клієнт. Duis feugiat sapien і
          lectus convallis commodo. Curabitur vulputate lectus не від стрілок,
          нехай буде багато членів і не приймає. Меценат Tellus Sapien, dapibus
          a ullamcorper sit amet, hendrerit sit amet ex. Футбол футбольний
          сезон. But rutrum tellus neque, and eleifend orci convallis molestie.
          Все життя школи часом буває дитячим салатом чи, піснею. Еней якраз
          такий м`який, йому треба вкладати в озеро. Перед ним, перш за все, в
          горлах лікарні стелити ліжка догляду та догляду; Завтра я проведу
          трохи часу зі стрілками. Але урна самого життя. Хворобливі і вагітні
          гравці. До того часу лікар хоче знати, що робити.
        </p>

        <ProfileInfo />

        {OurComments.map(({ id, name, mail, date, text, image }) => (
          <Comment
            key={id}
            name={name}
            mail={mail}
            date={date}
            image={image}
            text={text}
          />
        ))}

        <h2 className="projectInfo__offers-title title">Схожі пропозиції</h2>
        <ul className="popular__cards">
          {cards.map(({ _id, title, description, images }: any) => (
            <PopularCard
              key={_id}
              title={title}
              description={description}
              image={`http://157.230.99.45:8082${images[0].path}`}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectInfo;
