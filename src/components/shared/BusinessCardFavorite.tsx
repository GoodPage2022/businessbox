import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactTooltip from "react-tooltip";

import EditSVG from "../../assets/svg/edit.svg";
import HeartSVG from "../../assets/svg/heart.svg";
import CheckSVG from "../../assets/svg/check.svg";
import EyeSVG from "../../assets/svg/eye.svg";

const BusinessCardFavorites = ({
  image,
  title,
  description,
  price,
  views,
  isVerified,
  alias,
}: {
  image: any;
  title: string;
  description: string;
  price: string;
  views: string;
  isVerified: boolean;
  alias: string;
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isMyBusinessesPage, setIsMyBusinessesPage] = useState(false);

  useEffect(() => {
    if (router.pathname === "/account/my-businesses") {
      setIsMyBusinessesPage(true);
    }
  }, []);

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

          <CheckSVG
            data-tip={
              isVerified ? "Верифіковано сайтом" : "Не верифіковано сайтом"
            }
            className={`business-card-favorite__ckeck-icon ${
              isVerified ? "active" : ""
            }`}
          />
          <ReactTooltip />
        </h3>
        <p
          className="business-card-favorite__description section__secondary-text"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="business-card-favorite__footer">
          <div className="business-card-favorite__views">
            <EyeSVG className="business-card-favorite__eye-icon" />
            <p className="business-card-favorite__views-count section__secondary-text">
              {views}
            </p>
          </div>
          <p className="business-card-favorite__price">{price}₴</p>
        </div>
        <div className="business-card-favorite__footer-mob">
          <div className="business-card-favorite__footer-mob--first">
            <p className="business-card-favorite__price">{price}₴</p>
            <button
              onClick={() => setIsLiked((prev) => !prev)}
              className={`business-card-favorite__heart-icon--mob ${
                isLiked ? "active" : ""
              }`}
            >
              <HeartSVG />
            </button>
          </div>
          <div className="business-card-favorite__footer-mob--second">
            <div className="business-card-favorite__views">
              <EyeSVG className="business-card-favorite__eye-icon" />
              <p className="business-card-favorite__views-count section__secondary-text">
                {views}
              </p>
            </div>
            <CheckSVG
              data-tip={
                isVerified ? "Верифіковано сайтом" : "Не верифіковано сайтом"
              }
              className={`business-card-favorite__ckeck-icon--mob ${
                isVerified ? "active" : ""
              }`}
            />
            <ReactTooltip />
          </div>
        </div>
      </div>
    </li>
  );
};

export default BusinessCardFavorites;
