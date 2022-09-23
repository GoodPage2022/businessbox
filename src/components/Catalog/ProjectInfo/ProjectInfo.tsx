import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";
import { Formik, Form, Field } from "formik";
import { signIn as signInReducer } from "../../../../store/actions/auth";

import HeartSVG from "../../../assets/svg/heart.svg";
import ArrowSVG from "../../../assets/svg/arrow-project.svg";
import OurCategoriesShort from "../../../constants/categories-short";
import MainButtonBlack from "../../shared/MainButtonBlack";
import ProfileInfo from "./ProfileInfo";
import Comment from "./Comment";
import OurComments from "../../../constants/comments";
import BusinessCard from "../../shared/BusinessCard";
import { useDispatch, useSelector } from "react-redux";
import CardsSlider from "../../HomePage/CardsSlider/CardsSlider";

const ProjectInfo = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.user);
  const dispatchRedux = useDispatch();
  const imageSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [link, setLink] = useState("");
  const [projectInfo, setProjectInfo] = useState<any>(null);

  useEffect(() => {
    if (!!user && !!user.favourites && !!projectInfo)
      setIsLiked(user.favourites.map((f: any)=>f._id).includes(projectInfo._id) ? true : false)
  }, [user, projectInfo]);

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
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 1,
        },
      },
    ],
  };

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

      // console.log("addViewCount");
      // console.log(addViewCount);
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

  const handleSubmit = async (
    values: any,
    { resetForm, setFieldValue }: any,
  ) => {
    const { comment } = values;

    let newComment: any = {
      text: comment,
      date: new Date(Date.now()),
    };
    console.log(newComment);

    try {
      const newCommentResponse = await axios.post(`/api/comments/post`, {
        data: newComment,
        user,
      });
      console.log(newCommentResponse);
      resetForm({});
    } catch (err: any) {
      console.log("newUserResponse3");
      console.log(JSON.parse(err.response.data.err));
    }
  };

  const handleFavourites = async () => {
    const requestBody = {
      user,
      project: {
        _id: projectInfo._id,
        title: projectInfo.title
      },
    };

    const response = await axios.post(`/api/account/favourites`, requestBody);
    
    if (response.status == 200) {
      dispatchRedux(
        signInReducer({
          ...user,
          favourites: response.data
        }),
      );
    }
  }

  function escapeHtml(text: string) {
    const map: any = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return text.replace(/[&<>"']/g, function (m: any) {
      return map[m];
    });
  }

  return (
    <section className="projectInfo">
      <div className="container projectInfo__container">
        <div className="projectInfo__title">
          <h1 className="projectInfo__title--text title">
            {projectInfo.title}
          </h1>
          <div className="projectInfo__title--icons">
            {!!user && <button
              onClick={handleFavourites}
              className={`projectInfo__title--heart-icon ${
                isLiked ? "active" : ""
              }`}
            >
              <HeartSVG />
            </button>}
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
          {projectInfo.images && projectInfo.images.length > 1
            ? (
                <Slider {...imageSliderSettings}>
                  {projectInfo.images.map((img: any, index: number) => (
                    <li
                      key={index}
                      className="projectInfo__image-slider--image"
                    >
                    <Image
                      className=""
                      src={`${
                        img.meta.assets == ""
                          ? ``
                          : `http://157.230.99.45:8082`
                      }${img.path}`}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      />
                    </li>
                  ))}
                </Slider>
              )
            : projectInfo.images.map((img: any, index: number) => (
                <li key={index} className="projectInfo__image-slider--image">
                  <Image
                    className=""
                    src={`${
                      img.meta.assets == ""
                        ? ``
                        : `http://157.230.99.45:8082`
                    }${img.path}`}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </li>
              ))}
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
          <div className="projectInfo__button-wrapper--mob">
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
          <div className="projectInfo__price">
            <p className="section__primary-text">Ціна:</p>
            <p className="projectInfo__amount title">{projectInfo.price}₴</p>
          </div>
          <div className="projectInfo__button-wrapper--desctop">
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

        <ProfileInfo projectData={projectInfo} />
        {OurComments.length > 0 ? (
          <ul className="projectInfo__comments">
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
          </ul>
        ) : (
          <p className="projectInfo__comments-empty section__primary-text">
            Нижче залишай питання та коментарі до бізнесу
          </p>
        )}
        {user != null ? (
          <Formik
            initialValues={{
              comment: "",
            }}
            validate={(values: any) => {
              escapeHtml(values.comment);

              const errors: any = {};

              return errors;
            }}
            onSubmit={handleSubmit}
          >
            <Form className="projectInfo__form">
              <label className="projectInfo__field">
                <Field
                  as="textarea"
                  className="projectInfo__textarea section__primary-text"
                  type="text"
                  name="comment"
                  minLength={2}
                  maxLength={1000}
                  required
                  placeholder="Додати коментар..."
                />
              </label>
              <div className="projectInfo__button-send">
                <MainButtonBlack label="Опублікувати" />
              </div>
            </Form>
          </Formik>
        ) : (
          <p className="projectInfo__comments-empty section__primary-text">
            Додавати коментарі можливо після авторизації
          </p>
        )}

        <h2 className="projectInfo__offers-title title">Схожі пропозиції</h2>
        <ul className="popular__cards">
          <CardsSlider cards={cards} />
        </ul>
      </div>
    </section>
  );
};

export default ProjectInfo;
