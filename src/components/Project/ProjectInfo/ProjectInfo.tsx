import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
import { useDispatch, useSelector } from "react-redux";

const ProjectInfo = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isCopy, setIsCopy] = useState(false);
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
    let response

    try {
      response = await axios.post(`/api/businesses/get`, { user, projectId });
      if (response.data) {
        setProjectInfo(response.data.entries[0])
      }
    } catch (error) {
      router.push("/404");
    }

    try {
      const addViewCount = await axios.post(`/api/businesses/view`, { user, project: response?.data.entries[0] });
      
      console.log("addViewCount");
      console.log(addViewCount);
    } catch (error) {
      console.log(error);
    }
  }

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
              className="projectInfo__title--transparent-icon"
              onClick={() => {
                navigator.clipboard.writeText(link);
                // setIsCopy(false);
              }}
              // onClick={() => setIsCopy((prev) => !prev)}
            >
              <ArrowSVG />
            </button>
          </div>
        </div>
        <p className="projectInfo__city section__primary-text">
          {projectInfo.state}, {projectInfo.city}
        </p>
        {/* {isCopy && (
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
        )} */}
        <div className="projectInfo__image-slider">
          {projectInfo.images && <Slider {...imageSliderSettings}>
            {projectInfo.images.map((img: any, index: number) => 
              <li key={index} className="projectInfo__image-slider--image">
                <Image
                  className=""
                  src={`http://157.230.99.45:8082${img.path}`}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </li>
            )}
          </Slider>}
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
        <div className="projectInfo__price">
          <p className="section__primary-text">Ціна:</p>
          <p className="projectInfo__amount title">{projectInfo.price}₴</p>
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
          {cards.map(({ _id, title, description, images, view_count, price, is_verified }: any) => (
            <PopularCard
              key={_id}
              alias={_id}
              title={title}
              description={description}
              image={`http://157.230.99.45:8082${images[0].path}`}
              price={price}
              views={view_count ?? 0}
              isVerified={is_verified}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectInfo;
