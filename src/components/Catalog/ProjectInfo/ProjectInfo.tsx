import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";

import HeartSVG from "../../../assets/svg/heart.svg";
import ArrowSVG from "../../../assets/svg/arrow-project.svg";
import OurCategoriesShort from "../../../constants/categories-short";
import MainButtonBlack from "../../shared/MainButtonBlack";
import ProfileInfo from "./ProfileInfo";
import Comment from "./Comment";
import OurComments from "../../../constants/comments";
import BusinessCard from "../../shared/BusinessCard";
import { useDispatch, useSelector } from "react-redux";

const ProjectInfo = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const imageSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    arrows: false,
  };
  const [link, setLink] = useState("");
  const [projectInfo, setProjectInfo] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLink(window.location.href);
    }
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
  };

  const categoriesSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    arrows: false,
  };

  const [cards, setCards] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.user);

  const getBusinesses = async () => {
    const response = await axios.post(`/api/businesses/getList`, { user });

    if (response.data) {
      setCards(response.data.entries);
      return response.data.entries;
    }

    setCards([]);
    return [];
  };

  const getBusinessInfo = async () => {
    let response;

    try {
      response = await axios.post(`/api/businesses/get`, { user, projectId });
      if (response.data) {
        setProjectInfo(response.data.entries[0]);
      }
    } catch (error) {
      router.push("/404");
    }

    try {
      const addViewCount = await axios.post(`/api/businesses/view`, {
        user,
        project: response?.data.entries[0],
      });

      console.log("addViewCount");
      console.log(addViewCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinesses();
    getBusinessInfo();
  }, []);

  useEffect(() => {
    if (projectInfo == null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [projectInfo]);

  if (loading) return <></>;

  return (
    <section className="projectInfo">
      <div className="container projectInfo__container">
        <div className="projectInfo__title">
          <h1 className="projectInfo__title--text title">
            {projectInfo.title}
          </h1>
          <div className="projectInfo__title--icons">
            <button
              onClick={() => setIsLiked((prev) => !prev)}
              className={`projectInfo__title--heart-icon ${
                isLiked ? "active" : ""
              }`}
            >
              <HeartSVG />
            </button>
            <button
              data-tip
              data-for="copyTip"
              data-event="click"
              className="projectInfo__title--transparent-icon"
              data-event-off={"focusout"}
            >
              <ArrowSVG />
            </button>
            <ReactTooltip
              id="copyTip"
              afterShow={() => {
                copyLink();
              }}
              scrollHide={true}
              clickable={true}
            >
              Посилання скопійовано в буфер обміну
            </ReactTooltip>
          </div>
        </div>
        <p className="projectInfo__city section__primary-text">
          {projectInfo.state}, {projectInfo.city}
        </p>

        <div className="projectInfo__image-slider">
          {projectInfo.imagesyarn && (
            <Slider {...imageSliderSettings}>
              {projectInfo.images.map((img: any, index: number) => (
                <li key={index} className="projectInfo__image-slider--image">
                  <Image
                    className=""
                    src={`http://157.230.99.45:8082${img.path}`}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </li>
              ))}
            </Slider>
          )}
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
        <p
          className="projectInfo__description section__primary-text"
          dangerouslySetInnerHTML={{ __html: projectInfo.description }}
        />
        <div className="projectInfo__info-wrapper">
          <div className="projectInfo__price">
            <p className="section__primary-text">Ціна:</p>
            <p className="projectInfo__amount title">{projectInfo.price}₴</p>
          </div>
          <div className="projectInfo__button-wrapper">
            <button
              className="projectInfo__button-info"
              onClick={() =>
                user != null
                  ? router.push(`/catalog/detail-info/${projectId}`)
                  : setIsAuth(true)
              }
            >
              Відкрити повну інформацію
            </button>
            {isAuth && (
              <p className="projectInfo__err-msg">
                Тільки для авторизованих користувачів
              </p>
            )}
          </div>
        </div>

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
          {cards.map(
            ({
              _id,
              title,
              description,
              images,
              view_count,
              price,
              is_verified,
            }: any) => (
              <BusinessCard
                key={_id}
                alias={_id}
                title={title}
                description={description}
                image={
                  images == null || !images.length
                    ? ""
                    : `${
                        images[0].meta.assets == ""
                          ? ``
                          : `http://157.230.99.45:8082`
                      }${images[0].path}`
                }
                price={price}
                views={view_count ?? 0}
                isVerified={is_verified}
              />
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default ProjectInfo;
