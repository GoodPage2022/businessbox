import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactTooltip from "react-tooltip";

import EditSVG from "../../assets/svg/edit.svg";
import HeartSVG from "../../assets/svg/heart.svg";
import CheckSVG from "../../assets/svg/check.svg";
import EyeSVG from "../../assets/svg/eye.svg";
import UseUsd from "../../utils/useUsd";
import UseUah from "../../utils/useUah";
import axios from "axios";
import { useSelector } from "react-redux";

const BusinessCardFavorites = ({
  image,
  title,
  description,
  price,
  views,
  isVerified,
  alias,
  currency = "Гривня",
  negotiatedPrice,
}: {
  image: any;
  title: string;
  description: string;
  price: string;
  views: string;
  isVerified: boolean;
  alias: string;
  currency?: string;
  rate?: number;
  negotiatedPrice?: boolean;
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isMyBusinessesPage, setIsMyBusinessesPage] = useState(false);
  // const [rate, setRate] = useState<number>(0);
  const rate = useSelector((state: any) => state.currency.value);

  // const getCurrencyRate = async () => {
  //   const { data: rateUSD, status: rateUSDStus } = await axios.get(
  //     `/api/currency/get`,
  //   );

  //   if (rateUSDStus == 200) {
  //     setRate(rateUSD);
  //   }
  // };

  useEffect(() => {
    if (router.pathname === "/account/my-businesses") {
      setIsMyBusinessesPage(true);
    }
  }, []);

  // useEffect(() => {
  //   getCurrencyRate();
  // }, []);

  return (
    <li className="business-card-favorite">
      <Link href={`/catalog/${alias}`}>
        <a className="business-card-favorite__link" title={title}></a>
      </Link>
      {isMyBusinessesPage ? (
        <button
          className="business-card-favorite__button-edit"
          onClick={() => router.push(`/account/edit-business/${alias}`)}
        >
          <EditSVG />
        </button>
      ) : null}
      <div className="business-card-favorite__image">
        {image && (
          <Image
            className=""
            src={image}
            layout="fill"
            objectFit="cover"
            alt="card-image"
          />
        )}
        <button
          onClick={() => setIsLiked((prev) => !prev)}
          className={`business-card-favorite__heart-icon ${
            isLiked ? "active" : ""
          }`}
        >
          <HeartSVG />
        </button>
      </div>
      <div className="business-card-favorite__info">
        <h3 className="business-card-favorite__title">
          <span>{title}</span>
          {/* <div>
            <CheckSVG
              data-tip={
                isVerified ? "Верифіковано сайтом" : "Не верифіковано сайтом"
              }
              className={`business-card-favorite__ckeck-icon ${
                isVerified ? "active" : ""
              }`}
            />
          </div> */}

          <ReactTooltip />
        </h3>
        <p
          className="business-card-favorite__description section__secondary-text"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="business-card-favorite__footer">
          <div className="business-card__footer--top">
            <div className="business-card-favorite__views">
              <EyeSVG className="business-card-favorite__eye-icon" />
              <p className="business-card-favorite__views-count section__secondary-text">
                {views}
              </p>
            </div>
            {negotiatedPrice ? (
              <p className="section__secondary-text">Договірна</p>
            ) : (
              <p className="business-card-favorite__price">
                {UseUsd(currency, price, rate)}
              </p>
            )}
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
        <div className="business-card-favorite__footer-mob">
          <div className="business-card-favorite__footer-mob--first">
            {negotiatedPrice ? (
              <p className="section__secondary-text">Договірна</p>
            ) : (
              <p className="business-card-favorite__price">
                {UseUsd(currency, price, rate)}
              </p>
            )}

            <button
              onClick={() => setIsLiked((prev) => !prev)}
              className={`business-card-favorite__heart-icon--mob ${
                isLiked ? "active" : ""
              }`}
            >
              <HeartSVG />
            </button>
          </div>
          {negotiatedPrice ? (
            ""
          ) : (
            <div className="business-card-favorite__footer-mob--price">
              <p className="section__secondary-text">
                {UseUah(currency, price, rate)}
              </p>
              <div className="business-card-favorite__rate">
                <p className="business-card-favorite__rate--top section__secondary-text">
                  USD {rate} грн
                </p>
                <p className="business-card-favorite__rate--bottom">
                  за даними privatbank.ua
                </p>
              </div>
            </div>
          )}
          <div className="business-card-favorite__footer-mob--second">
            <div className="business-card-favorite__views">
              <EyeSVG className="business-card-favorite__eye-icon" />
              <p className="business-card-favorite__views-count section__secondary-text">
                {views}
              </p>
            </div>
            {/* <CheckSVG
              data-tip={
                isVerified ? "Верифіковано сайтом" : "Не верифіковано сайтом"
              }
              className={`business-card-favorite__ckeck-icon--mob ${
                isVerified ? "active" : ""
              }`}
            /> */}
            <ReactTooltip />
          </div>
        </div>
      </div>
    </li>
  );
};

export default BusinessCardFavorites;
