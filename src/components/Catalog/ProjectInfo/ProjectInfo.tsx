import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { Formik, Form, Field } from "formik";
import { signIn as signInReducer } from "../../../../store/actions/auth";
import { signOut as signOutReducer } from "../../../../store/actions/auth";
import { useSession, signOut as signOutGoogle } from "next-auth/react";

import HeartSVG from "../../../assets/svg/heart.svg";
import ArrowSVG from "../../../assets/svg/arrow-project.svg";
import ArrowBackSVG from "../../../assets/svg/project-info-arrow.svg";
import TelegramSVG from "../../../assets/svg/tg-connect.svg";
import MainButtonBlack from "../../shared/MainButtonBlack";
import ProfileInfo from "./ProfileInfo";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import CardsSlider from "../../HomePage/CardsSlider/CardsSlider";
import UseUsd from "../../../utils/useUsd";
import UseUah from "../../../utils/useUah";
import ModalAnalysis from "../../Modals/Modal-analysis/Modal-analysis";
import ModalAnalysisTariffs from "../../Modals/Modal-analysis/Modal-analysis-tariffs";
import { MainContext } from "../../../contexts/mainContext";
import React from "react";
import Breadcrumbs from "./BreadCrumbs";
import Link from "next/link";
import LargeImage from "./LargeImage";
import ModalAnalysisThankSuccess from "../../Modals/Modal-analysis/Modal-analysis-thank-success";
import ModalAnalysisThankError from "../../Modals/Modal-analysis/Modal-analysis-thank-error";
import ModalAnalysisThankPending from "../../Modals/Modal-analysis/Modal-analysis-thank-pending";
import Script from "next/script";
import ModalMoreAboutBusiness from "../../Modals/Invest/Modal-MoreAboutBusiness";
import ModalThankComment from "../../Modals/Modal-thank-comment/Modal-thank-comment";

const ProjectInfo = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  // const [offset, setOffset] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [commentIsSent, setCommentIsSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<any>([]);
  const { data: session } = useSession();

  const [creationDate, setCreationDate] = useState<string>("");
  const [comments, setComments] = useState<any>([]);
  const [isInvestmentBusiness, setIsInvestmentBusiness] =
    useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const user = useSelector((state: any) => state.auth.user);
  const dispatchRedux = useDispatch();
  // const [rate, setRate] = useState(0);
  const rate = useSelector((state: any) => state.currency.value);
  const [state, dispatch] = React.useContext(MainContext);

  // useEffect(() => {
  //   // const onScroll = () => setOffset(window.pageYOffset);

  //   window.removeEventListener("scroll", onScroll);
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  useEffect(() => {
    if (!router) return;
    if (!router.query.order_id) return;

    setOrderId(router.query.order_id.toString());
  }, [router]);

  // const getOrderStatus = async (orderId: string) => {
  //   try {
  //     const response = await axios.get(`/api/analysis/get`, {
  //       params: {
  //         order_id: orderId,
  //       },
  //     });

  //     if (response.status == 200) {
  //       if (
  //         response.data.status == "Paid" ||
  //         response.data.status == "Pending"
  //       ) {
  //         dispatch({ type: "toggle_analysisThankModal" });
  //       }
  //     }
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };

  const liqpayInfo = async (orderId: string) => {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const checkLiqpay = await axios.post(
        "/api/analysis/check-liqpay",
        { orderId },
        options,
      );
      if (checkLiqpay.data == "success") {
        dispatch({ type: "toggle_analysisThankSuccessModal" });
        return;
      }
      if (checkLiqpay.data == "error") {
        dispatch({ type: "toggle_analysisThankErrorModal" });
      } else {
        dispatch({ type: "toggle_analysisThankPendingModal" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!orderId) return;
    liqpayInfo(orderId);
  }, [orderId]);

  function SampleNextArrow(props: any) {
    const { className, onClick } = props;

    return <div className={className} onClick={onClick} />;
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} />;
  }

  const imageSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    // transformEnabled: false,
    slidesToScroll: 1,
    className: "projectInfo__slick-slider",
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
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
      setIsLiked(
        user.favourites.map((f: any) => f._id).includes(projectInfo._id)
          ? true
          : false,
      );
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
    const requestBody: any = {
      user,
      limit: 10,
      sort: {
        _created: -1,
      },
      filter: {
        $and: [
          { area: { $in: projectInfo.area } },
          { sold_out: false, investing: { $exists: false } },
        ],
      },
    };

    const response = await axios.post(`/api/businesses/getList`, requestBody);

    if (response.data) {
      setCards(response.data.entries);
      return response.data.entries;
    }

    setCards([]);
    return [];
  };

  const getBusinessComments = async () => {
    let requestBody: any = {
      user,
      sort: {
        _created: 1,
      },
      filter: { "business._id": projectId },
    };

    const response = await axios.post(`/api/comments/getList`, requestBody);

    if (response.data) {
      const commentUserIds = response.data.entries.map((c: any) => c.user);

      const requestBody = {
        userId: commentUserIds,
      };

      const getUsers = await axios.post(`/api/account/list`, requestBody);

      if (getUsers.data) {
        const commentObjects = response.data.entries.map((c: any) => ({
          _id: c._id,
          name: getUsers.data.filter((u: any) => u._id == c.user)[0].name,
          mail: getUsers.data.filter((u: any) => u._id == c.user)[0].email,
          date: new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(c.date),
          text: c.comment,
          image:
            getUsers.data.filter((u: any) => u._id == c.user)[0].avatar?.path ??
            "/assets/images/profile-photo.png",
        }));

        setComments(commentObjects);
        return response.data.entries;
      }
    }

    setComments([]);
    return [];
  };

  const getBusinessInfo = async () => {
    let response;

    try {
      response = await axios.post(`/api/businesses/get`, { user, projectId });

      if (response.status == 401) {
        if (session !== undefined) {
          await signOutGoogle();
        }
        dispatchRedux(signOutReducer());
        router.push("/");
        return;
      }

      if (response.data) {
        if (response.data.entries.length > 0) {
          setProjectInfo(response.data.entries[0]);
          const timeformat: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          setCreationDate(
            new Date(
              response.data.entries[0]._created * 1000,
            ).toLocaleDateString("uk-UA", timeformat),
          );
        } else {
          router.push("/404");
          return false;
        }
      }
    } catch (error) {
      router.push("/404");
      return false;
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

  // const getCurrencyRate = async () => {
  //   const { data: rateUSD, status: rateUSDStus } = await axios.get(
  //     `/api/currency/get`,
  //   );

  //   if (rateUSDStus == 200) {
  //     setRate(rateUSD);
  //   }
  // };

  const closeAnalysisModal = () => {
    dispatch({ type: "toggle_analysisModal" });
  };
  const closeAnalysisTariffsModal = () => {
    dispatch({ type: "toggle_analysisTariffsModal" });
  };

  const closeAnalysisThankSuccessModal = () => {
    dispatch({ type: "toggle_analysisThankSuccessModal" });
  };

  const closeAnalysisThankErrorModal = () => {
    dispatch({ type: "toggle_analysisThankErrorModal" });
  };

  const closeAnalysisThankPendingModal = () => {
    dispatch({ type: "toggle_analysisThankPendingModal" });
  };

  const closeLargeImage = () => {
    dispatch({ type: "toggle_large-image" });
  };

  const closeMoreAboutBusinessModal = () => {
    dispatch({ type: "toggle_moreAboutBusinessModal" });
  };

  const closeThankComment = () => {
    dispatch({ type: "toggle_thankComment" });
  };

  // useEffect(() => {
  //   getCurrencyRate();
  // }, []);

  useEffect(() => {
    if (projectInfo == null) {
      return;
    } else {
      getBusinesses();
    }
  }, [projectInfo]);

  useEffect(() => {
    getBusinessInfo();
  }, [projectId]);

  useEffect(() => {
    if (projectInfo == null) {
      setLoading(true);
    } else {
      getBusinessComments();
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
      user_id: user._id,
      business_title: projectInfo.title,
      business_id: projectInfo._id,
      comment,
      date: Date.now().toString(),
    };

    console.log(newComment);

    try {
      const newCommentResponse = await axios.post(`/api/comments/post`, {
        data: newComment,
        user,
      });

      if (newCommentResponse.status == 200) {
        dispatch({ type: "toggle_thankComment" });
        setCommentIsSent(true);
        setTimeout(() => setCommentIsSent(false), 3000);
        getBusinessComments();
      }

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
        title: projectInfo.title,
      },
    };

    const response = await axios.post(`/api/account/favourites`, requestBody);

    if (response.status == 200) {
      dispatchRedux(
        signInReducer({
          ...user,
          favourites: response.data,
        }),
      );
    }
  };

  function escapeHtml(text: string) {
    const map: any = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    if (text == undefined) {
      return;
    }
    return text.replace(/[&<>"']/g, function (m: any) {
      return map[m];
    });
  }

  return (
    <section className="projectInfo">
      <div className="container projectInfo__container">
        <div className="projectInfo__arrow-back" onClick={() => router.back()}>
          <ArrowBackSVG />
        </div>

        <div className="projectInfo__title">
          <h1 className="projectInfo__title--text title">
            {projectInfo.title}
          </h1>
          <div className="projectInfo__title--icons">
            {!!user && (
              <button
                onClick={handleFavourites}
                className={`projectInfo__title--heart-icon ${
                  isLiked ? "active" : ""
                }`}
              >
                <HeartSVG />
              </button>
            )}
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
          {projectInfo.state?.display}, {projectInfo.city?.display}
        </p>
        <Breadcrumbs
          businessName={projectInfo.title}
          categories={projectInfo.area}
        />
        <div className="projectInfo__image-slider">
          {projectInfo.images && projectInfo.images.length > 1 ? (
            <Slider {...imageSliderSettings}>
              {projectInfo.images.map((img: any, index: number) => (
                <li
                  key={index}
                  className="projectInfo__image-slider--image"
                  onClick={() => {
                    if (!state.isOpenLargeImage) {
                      dispatch({ type: "toggle_large-image" });
                      state.imageIdx = index;
                      state.images = projectInfo.images;
                    }
                  }}
                >
                  <Image
                    className=""
                    src={`${
                      img.meta.assets == "" ? `` : `https://admin.bissbox.com`
                    }${img.path}`}
                    layout="fill"
                    objectFit="cover"
                    loading="eager"
                    alt=""
                  />
                </li>
              ))}
            </Slider>
          ) : (
            projectInfo.images.map((img: any, index: number) => (
              <li
                key={index}
                className="projectInfo__image-slider--image"
                onClick={() => {
                  dispatch({ type: "toggle_large-image" });
                  state.imageUrl =
                    img.meta.assets == ""
                      ? `${img.path}`
                      : `https://admin.bissbox.com${img.path}`;
                }}
              >
                <Image
                  className=""
                  src={`${
                    img.meta.assets == "" ? `` : `https://admin.bissbox.com`
                  }${img.path}`}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </li>
            ))
          )}
        </div>
        <div className="projectInfo__categories-slider">
          <ul className="projectInfo__buttons">
            {/* <Slider {...categoriesSliderSettings}> */}
            {projectInfo.area.map((business: string, idx: string) => (
              <li key={idx} className="projectInfo__buttons__item">
                <Link href={`/catalog/category/${business}`}>
                  <a>
                    <MainButtonBlack label={business} />
                  </a>
                </Link>
              </li>
            ))}
            {/* </Slider> */}
          </ul>
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
            {!isInvestmentBusiness ? (
              <button
                onClick={() => {
                  dispatch({ type: "toggle_moreAboutBusinessModal" });
                }}
                className="projectInfo__button-analysis"
              >
                Детальніше про бізнес
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch({ type: "toggle_analysisTariffsModal" });
                  window.gtag("event", "conversion", {
                    send_to: "AW-11042174734/4IffCOP-4oQYEI7uqJEp",
                  });
                }}
                className="projectInfo__button-analysis"
              >
                Замовити аналіз бізнесу
              </button>
            )}{" "}
          </div>
          <div className="projectInfo__price">
            <p className="section__primary-text">
              {`Ціна${!isInvestmentBusiness ? ", розмір вкладень:" : ":"} `}
            </p>

            <p className="projectInfo__amount title">
              {projectInfo.negotiatedPrice
                ? "Договірна"
                : UseUsd(projectInfo.currency, projectInfo.price, rate)}
            </p>

            {projectInfo.negotiatedPrice ? (
              ""
            ) : (
              <div className="projectInfo__amount-uah">
                <p className="section__secondary-text">
                  {UseUah(projectInfo.currency, projectInfo.price, rate)}
                </p>
                <div className="projectInfo__rate">
                  <p className="projectInfo__rate--top section__secondary-text">
                    USD {rate} грн
                  </p>
                  <p className="projectInfo__rate--bottom">
                    за даними privatbank.ua
                  </p>
                </div>
              </div>
            )}
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
            {isInvestmentBusiness ? (
              <button
                onClick={() => {
                  dispatch({ type: "toggle_moreAboutBusinessModal" });
                }}
                className="projectInfo__button-analysis"
              >
                Детальніше про бізнес
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch({ type: "toggle_analysisTariffsModal" });
                  window.gtag("event", "conversion", {
                    send_to: "AW-11042174734/4IffCOP-4oQYEI7uqJEp",
                  });
                }}
                className="projectInfo__button-analysis"
              >
                Замовити аналіз бізнесу
              </button>
            )}{" "}
          </div>
        </div>
        <p className="projectInfo__date section__secondary-text">
          Дата створення бізнесу: {creationDate}
        </p>
        <ProfileInfo projectData={projectInfo} />
        {comments.length > 0 ? (
          <ul className="projectInfo__comments">
            {comments.map(({ _id, name, mail, date, text, image }: any) => (
              <Comment
                key={_id}
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
                  minLength={1}
                  maxLength={1000}
                  required
                  placeholder="Додати коментар..."
                />
              </label>
              <div className="projectInfo__button-send">
                <p
                  className={`projectInfo__button-send--success ${
                    commentIsSent ? "active" : ""
                  }`}
                >
                  Коментар буде опубліковано після модерації
                </p>
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
        <LargeImage onClose={closeLargeImage} />
        <Link href="https://t.me/bissbox">
          <a target="_blank" className={`projectInfo__tg`}>
            <p className="projectInfo__tg--text section__secondary-text">
              Оперативно на каналі
            </p>
            <TelegramSVG />
          </a>
        </Link>
      </div>

      <ModalAnalysis onClose={closeAnalysisModal} />
      <ModalAnalysisTariffs onClose={closeAnalysisTariffsModal} />
      <ModalAnalysisThankSuccess onClose={closeAnalysisThankSuccessModal} />
      <ModalAnalysisThankError onClose={closeAnalysisThankErrorModal} />
      <ModalAnalysisThankPending onClose={closeAnalysisThankPendingModal} />

      <ModalMoreAboutBusiness onClose={closeMoreAboutBusinessModal} />
      <ModalThankComment onClose={closeThankComment} />
    </section>
  );
};

export default ProjectInfo;
