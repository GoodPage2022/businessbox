import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ReactTooltip from "react-tooltip";

import ArrowBackSVG from "../../../assets/svg/project-info-arrow.svg";
import HeartSVG from "../../../assets/svg/heart.svg";
import ArrowSVG from "../../../assets/svg/arrow-project.svg";
import BusinessCard from "../../shared/BusinessCard";
import { useDispatch, useSelector } from "react-redux";
import { signIn as signInReducer } from "../../../../store/actions/auth";
import CardsSlider from "../../HomePage/CardsSlider/CardsSlider";

const DetailInfo = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isInvestmentBusiness, setIsInvestmentBusiness] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatchRedux = useDispatch();
  const [cards, setCards] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.user);

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

  const getBusinesses = async () => {
    console.log('2222');
    
    const filter = {
      $and: [
        { area: { $in: projectInfo.area } },
        { 
          sold_out: false, 
          // investing: { $exists: false } 
        },
        {
          "$or": [
            {"investing": {$exists: false}}, 
            {"investing": false}
          ]
        }
      ],
    };
    const response = await axios.post(`/api/businesses/getList`, {
      user,
      limit: 10,
      filter,
    });

    if (response.data) {
      setCards(response.data.entries);
      return response.data.entries;
    }

    setCards([]);
    return [];
  };

  useEffect(() => {
    if (!!user && !!user.favourites && !!projectInfo)
      setIsLiked(
        user.favourites.map((f: any) => f._id).includes(projectInfo._id)
          ? true
          : false,
      );
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
    getBusinessInfo();
  }, []);

  useEffect(() => {
    if (projectInfo == null) {
      setLoading(true);
    } else {
      setLoading(false);
      getBusinesses();
    }
  }, [projectInfo]);

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

  if (loading) return <></>;
  console.log(projectInfo, "projectInfo");
  return (
    <section className="detailInfo">
      <div className="container detailInfo__container">
        <div className="projectInfo__arrow-back" onClick={() => router.back()}>
          <ArrowBackSVG />
        </div>
        <div className="detailInfo__title">
          <h1 className="detailInfo__title--text title">{projectInfo.title}</h1>
          <div className="detailInfo__title--icons">
            {!!user && (
              <button
                onClick={handleFavourites}
                className={`detailInfo__title--heart-icon ${
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
          {projectInfo.state?.display}, {projectInfo.city?.display}
        </p>
        {projectInfo.invest_status == "На етапі створення" ? (
          <ul className="detailInfo__list">
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
                Ваш бізнес має сезонність?
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.seasonality ? "так" : "ні"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Відсоток повернення на капітал
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.capital_return_percentage
                  ? projectInfo.capital_return_percentage +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Період повернення інвестицій
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.return_on_investment
                  ? projectInfo.return_on_investment
                  : "– – – – –"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Річний дохід
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.annual_profit
                  ? projectInfo.annual_profit +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
              </p>
            </li>
          </ul>
        ) : (
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
                {projectInfo.year_turnover
                  ? projectInfo.year_turnover +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Приблизний щомісячний чистий прибуток
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.monthly_net_profit
                  ? projectInfo.monthly_net_profit +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Приблизний валовий дохід щомісячний
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.gross_monthly_income
                  ? projectInfo.gross_monthly_income +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Прогнозований оборот наступного року
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.estimated_turnover_next_year
                  ? projectInfo.estimated_turnover_next_year +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
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
                Орієнтовний період окупності бізнесу
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.return_on_investment ?? "– – – – –"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Щомісячний зарплатний фонд (враховуючи премії та бонуси)
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.monthly_salary_fund
                  ? projectInfo.monthly_salary_fund +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Приблизна ринкова вартість активів та обладнання
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.equipment_market_value
                  ? projectInfo.equipment_market_value +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
              </p>
            </li>
            <li className="detailInfo__list-item">
              <p className="detailInfo__list-item--left section__primary-text--bold">
                Приблизна сума непостійних витрат протягом року
              </p>
              <p className="detailInfo__list-item--right section__primary-text">
                {projectInfo.year_nonfixed_costs
                  ? projectInfo.year_nonfixed_costs +
                    (projectInfo.currency == "Долар" ? "$" : "₴")
                  : "– – – – –"}
              </p>
            </li>
          </ul>
        )}

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
            <p className="detailInfo__data-label section__primary-text--bold">
              Наявність CRM
            </p>
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
