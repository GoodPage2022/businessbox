import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ReactTooltip from "react-tooltip";

import HeartSVG from "../../../assets/svg/heart.svg";
import ArrowSVG from "../../../assets/svg/arrow-project.svg";
import BusinessCard from "../../shared/BusinessCard";
import { useDispatch, useSelector } from "react-redux";
import { signIn as signInReducer } from "../../../../store/actions/auth";
import CardsSlider from "../../HomePage/CardsSlider/CardsSlider";

const DetailInfo = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatchRedux = useDispatch();
  const [cards, setCards] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.user);

  const [link, setLink] = useState("");
  const [projectInfo, setProjectInfo] = useState<any>(null);
  // console.log(projectInfo);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLink(window.location.href);
    }
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
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

  useEffect(() => {
    if (!!user && !!user.favourites && !!projectInfo)
      setIsLiked(user.favourites.map((f: any)=>f._id).includes(projectInfo._id) ? true : false)
  }, [user, projectInfo]);

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

  if (loading) return <></>;

  return (
    <section className="detailInfo">
      <div className="container detailInfo__container">
        <div className="detailInfo__title">
          <h1 className="detailInfo__title--text title">{projectInfo.title}</h1>
          <div className="detailInfo__title--icons">
            {!!user && <button
              onClick={handleFavourites}
              className={`detailInfo__title--heart-icon ${
                isLiked ? "active" : ""
              }`}
            >
              <HeartSVG />
            </button>}
            <button
              data-tip
              data-for="copyTip"
              data-event="click"
              className="detailInfo__title--transparent-icon"
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
        <p className="detailInfo__city section__primary-text">
          {projectInfo.state.display}, {projectInfo.city.display}
        </p>
        <ul className="detailInfo__list">
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Форма власності
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.property_form ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Кількість засновників
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.number_of_founders ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Кількість працівників
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.crm ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Ваш бізнес має сезонність?
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.seasonality ? "так" : "ні"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Оборот протягом року
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.year_turnover ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Приблизний щомісячний чистий прибуток
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.monthly_net_profit ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Приблизний валовий дохід щомісячний
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.gross_monthly_income ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Прогнозований оборот наступного року
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.estimated_turnover_next_year ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Наявність кредитів
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.loans ? "так" : "ні"}
            </p>
          </li>

          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Зразкова оцінка повернення інвестицій для покупця, враховуючи
              бажану вартість продажу бізнесу
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.return_on_investment ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Щомісячний зарплатний фонд (з огляду на премії та бонуси)
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.monthly_salary_fund ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Приблизна ринкова вартість активів та обладнання
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.equipment_market_value ?? "– – – – –"}
            </p>
          </li>
          <li className="detailInfo__list-item">
            <p className="detailInfo__list-item--left section__primary-text--bold">
              Приблизна сума непостійних витрат за роком
            </p>
            <p className="detailInfo__list-item--right section__primary-text">
              {projectInfo.year_nonfixed_costs ?? "– – – – –"}
            </p>
          </li>
        </ul>
        <div className="detailInfo__first-wrapper">
          <div className="detailInfo__data-wrapper--left">
            <p className="detailInfo__data-label section__primary-text--bold">
              Сайт компанії
            </p>
            <p className="detailInfo__data-name section__primary-text">
              {projectInfo.website ?? "– – – – –"}
            </p>
          </div>
          <div className="detailInfo__data-wrapper--right">
            <p className="detailInfo__data-label section__primary-text--bold">
              Інстаграм
            </p>
            <p className="detailInfo__data-name section__primary-text">
              {projectInfo.instagram ?? "– – – – –"}
            </p>
          </div>
        </div>
        <div className="detailInfo__second-wrapper">
          <div className="detailInfo__data-wrapper--left">
            <p className="detailInfo__data-label section__primary-text--bold">
              Фейсбук
            </p>
            <p className="detailInfo__data-name section__primary-text">
              {projectInfo.facebook ?? "– – – – –"}
            </p>
          </div>
          <div className="detailInfo__data-wrapper--right">
            <p className="detailInfo__data-label section__primary-text--bold">
              Ютюб канал
            </p>
            <p className="detailInfo__data-name section__primary-text">
              {projectInfo.youtube ?? "– – – – –"}
            </p>
          </div>
        </div>
        <div className="detailInfo__third-wrapper">
          <p className="detailInfo__data-label section__primary-text--bold">
            Відгуки про компанію, статті у ЗМІ
          </p>
          <p className="detailInfo__data-name section__primary-text">
            {projectInfo.public_reviews ?? "– – – – –"}
          </p>
        </div>
        <div className="detailInfo__fourth-wrapper">
          <div className="detailInfo__data-wrapper--left detailInfo__data-wrapper--left--tablet">
            <p className="detailInfo__data-label section__primary-text--bold">
              У якій системі ведеться фінансовий облік?
            </p>
            <p className="detailInfo__data-name section__primary-text">
              {projectInfo.financial_accounting_system ?? "– – – – –"}
            </p>
          </div>
          <div className="detailInfo__data-wrapper--right detailInfo__data-wrapper--right--tablet section__primary-text--bold">
            <p className="detailInfo__data-label">Наявність CRM</p>
            <p className="detailInfo__data-name section__primary-text">
              {projectInfo.crm ?? "– – – – –"}
            </p>
          </div>
        </div>
        <div className="detailInfo__button-wrapper">
          <button
            className="detailInfo__button-back"
            onClick={() => router.back()}
          >
            Назад
          </button>
        </div>

        <h2 className="detailInfo__offers-title title">Схожі пропозиції</h2>
        <ul className="detailInfo__cards">
          <CardsSlider cards={cards} />
        </ul>
      </div>
    </section>
  );
};

export default DetailInfo;
