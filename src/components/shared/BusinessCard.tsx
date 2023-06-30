import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosRequestConfig } from "axios";
import { signIn as signInReducer } from "../../../store/actions/auth";

import TopSVG from "../../assets/svg/top-label.svg";
import InvestSVG from "../../assets/svg/invest.svg";

import SoldSVG from "../../assets/svg/sold.svg";
import EditSVG from "../../assets/svg/edit.svg";
import HeartSVG from "../../assets/svg/heart.svg";
import CheckSVG from "../../assets/svg/check.svg";
import EyeSVG from "../../assets/svg/eye.svg";
import UseUah from "../../utils/useUah";
import UseUsd from "../../utils/useUsd";
import MainButtonRed from "./MainButtonRed";
import MainButtonBlack from "./MainButtonBlack";
import { MainContext } from "../../contexts/mainContext";
import ModalActive from "../Modals/Modal-active/Modal-active";

const BusinessCard = ({
  image,
  title,
  description,
  price,
  views,
  isVerified,
  alias,
  isSoldOut,
  currency = "Гривня",
  negotiatedPrice,
  order,
  investing,
  inactive = false,
}: {
  image: any;
  title: string;
  description: string;
  price: string;
  views: string;
  isVerified: boolean;
  alias: string;
  isSoldOut?: boolean;
  currency?: string;
  negotiatedPrice?: boolean;
  order?: number;
  investing?: boolean;
  inactive?: boolean;
}) => {
  const [state, dispatch] = React.useContext(MainContext);
  const dispatchRedux = useDispatch();
  const router = useRouter();
  const [isMyBusinessesPage, setIsMyBusinessesPage] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [clickTime, setClickTime] = useState<number>(0);
  const [clickPos, setClickPos] = useState<any>({});
  // const [rate, setRate] = useState<number>(0);
  const rate = useSelector((state: any) => state.currency.value);
  // const [isInvestmentBusiness, setIsInvestmentBusiness] =
  //   useState<boolean>(false);

  let onContextMenuClick = false;
  useEffect(() => {
    if (router.pathname === "/account/my-businesses") {
      setIsMyBusinessesPage(true);
    }
  }, []);

  const onSoldClick = async () => {
    try {
      const response = await axios.post(`/api/businesses/sold-business`, {
        id: alias,
      });
      if (response.data.success) {
        dispatch({ type: "toggle_thankSold" });
      }
      // console.log(response.data, "response");
    } catch (error) {
      console.log(error, "errer");
    }
  };

  useEffect(() => {
    if (!!user && !!user.favourites)
      setIsLiked(
        user.favourites.map((f: any) => f._id).includes(alias) ? true : false
      );
  }, [user]);

  const handleFavourites = async () => {
    const requestBody = {
      user,
      project: {
        _id: alias,
        title,
      },
    };

    const response = await axios.post(`/api/account/favourites`, requestBody);

    if (response.status == 200) {
      dispatchRedux(
        signInReducer({
          ...user,
          favourites: response.data,
        })
      );
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

  // useEffect(() => {
  //   getCurrencyRate();
  // }, []);

  return (
    <li
      className={`business-card ${isSoldOut ? "sold" : ""}`}
      // onContextMenu={(e) => {
      //   e.preventDefault();
      //   onContextMenuClick = true;
      //   window.open(`/catalog/${alias}`, "_ blank", "noreferrer, noopener");
      // }}
      // onMouseDown={(e: any) => {
      //   setClickTime(Date.now());
      //   setClickPos({
      //     x: e.screenX,
      //     y: e.screenY,
      //   });
      // }}
      // onMouseUp={(e: any) => {
      //   const clickedTime = Date.now() - clickTime;
      //   const clickedPos = {
      //     x: clickPos.x - e.screenX,
      //     y: clickPos.y - e.screenY,
      //   };
      //   console.log(clickedTime);
      //   console.log(clickedPos);
      //   setTimeout(function () {
      //     if (clickedPos.x == 0 &&
      //         clickedPos.y == 0 &&
      //         !onContextMenuClick) {

      //           if ((typeof e.target.parentNode.className == 'string' && !e.target.parentNode.className.includes('business-card__heart-icon')) &&
      //           (typeof e.target.className == 'string' && !e.target.className.includes('business-card__heart-icon'))) {
      //             console.log(onContextMenuClick);
      //             router.push(`/catalog/${alias}`);
      //             console.log("clicked END");
      //           }
      //     }
      //   }, 0);
      // }}
    >
      {isSoldOut && (
        <div className="business-card__sold-label">
          <SoldSVG />
        </div>
      )}

      {!!order && (
        <div className="business-card__top">
          <TopSVG />
        </div>
      )}

      {investing && isMyBusinessesPage && (
        <div className="business-card__invest">
          <InvestSVG />
        </div>
      )}

      <Link href={`/catalog/${alias}`}>
        <a
          className={`business-card__link ${inactive ? "inactive" : ""}`}
          title={title}
        ></a>
      </Link>
      {isMyBusinessesPage ? (
        <button
          data-tip="Редагувати бізнес"
          className="business-card__button-edit"
          onClick={() => router.push(`/account/edit-business/${alias}`)}
        >
          <ReactTooltip />
          <EditSVG />
        </button>
      ) : null}
      <div className="business-card__image">
        {image && (
          <Image
            className=""
            src={image}
            layout="fill"
            objectFit="cover"
            alt="card-image"
          />
        )}
        {!!user && (
          <button
            onClick={handleFavourites}
            className={`business-card__heart-icon ${isLiked ? "active" : ""}`}
          >
            <HeartSVG />
          </button>
        )}
      </div>
      <div className="business-card__info">
        <h3 className="business-card__title">
          <span>{title}</span>
          {/* <div>
            <CheckSVG
              data-tip={
                isVerified ? "Верифіковано сайтом" : "Не верифіковано сайтом"
              }
              className={`business-card__ckeck-icon ${
                isVerified ? "active" : ""
              }`}
            />
          </div> */}

          <ReactTooltip place="top" type="dark" effect="solid" />
        </h3>
        <p
          className="business-card__description section__secondary-text"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="business-card__footer">
          <div className="business-card__footer--top">
            <div className="business-card__views">
              <EyeSVG className="business-card__eye-icon" />
              <p className="business-card__views-count section__secondary-text">
                {views}
              </p>
            </div>

            <p className="business-card__price">
              {negotiatedPrice ? "Договірна" : UseUsd(currency, price, rate)}
            </p>
          </div>
          {negotiatedPrice ? (
            ""
          ) : (
            <div className="business-card__footer--bottom">
              <p className="section__secondary-text">
                {UseUah(currency, price, rate)}
              </p>
              <div className="business-card__rate">
                <p className="business-card__rate--top section__secondary-text">
                  USD {rate} грн
                </p>
                <p className="business-card__rate--bottom">
                  за даними privatbank.ua
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="business-card__footer-mob">
          <div className="business-card__footer-mob--first">
            <p className="business-card__price">
              {negotiatedPrice ? "Договірна" : UseUsd(currency, price, rate)}
            </p>

            {!!user && (
              <button
                onClick={handleFavourites}
                className={`business-card__heart-icon--mob ${
                  isLiked ? "active" : ""
                }`}
              >
                <HeartSVG />
              </button>
            )}
          </div>
          {negotiatedPrice ? (
            ""
          ) : (
            <div className="business-card__footer-mob--price">
              <p className="section__secondary-text">
                {UseUah(currency, price, rate)}
              </p>
              <div className="business-card__rate">
                <p className="business-card__rate--top section__secondary-text">
                  USD {rate} грн
                </p>
                <p className="business-card__rate--bottom">
                  за даними privatbank.ua
                </p>
              </div>
            </div>
          )}

          <div className="business-card__footer-mob--second">
            <div className="business-card__views">
              <EyeSVG className="business-card__eye-icon" />
              <p className="business-card__views-count section__secondary-text">
                {views}
              </p>
            </div>
            {/* <CheckSVG
              data-tip={
                isVerified ? "Верифіковано сайтом" : "Не верифіковано сайтом"
              }
              className={`business-card__ckeck-icon--mob ${
                isVerified ? "active" : ""
              }`}
            /> */}
            <ReactTooltip place="top" type="dark" effect="solid" />
          </div>
        </div>{" "}
        {inactive && !isSoldOut && (
          <div className="business-card__inactive">
            <MainButtonRed
              label="Активувати"
              onClick={() => {
                dispatch({ type: "toggle_modalActive" });
              }}
            />{" "}
            <MainButtonBlack label="Продано" onClick={onSoldClick} />
          </div>
        )}
      </div>
      <ModalActive
        onClose={() => {
          dispatch({ type: "toggle_modalActive" });
        }}
        projectId={alias}
      />
    </li>
  );
};

export default BusinessCard;
