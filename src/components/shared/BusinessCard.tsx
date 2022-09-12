import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import ReactTooltip from "react-tooltip";

import HeartSVG from "../../assets/svg/heart.svg";
import CheckSVG from "../../assets/svg/check.svg";
import EyeSVG from "../../assets/svg/eye.svg";

const BusinessCard = ({
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

  return (
    <li className="business-card">
      <div className="business-card__image">
        {image && <Image
          className=""
          src={image}
          layout="fill"
          objectFit="cover"
          alt="card-image"
        />}
        <button
          onClick={() => setIsLiked((prev) => !prev)}
          className={`business-card__heart-icon ${isLiked ? "active" : ""}`}
        >
          <HeartSVG />
        </button>
      </div>
      <div className="business-card__info">
        <Link href={`/catalog/${alias}`}>
          <a className="business-card__link" title={title}></a>
        </Link>
        <h3 className="business-card__title">
          {title}

          <CheckSVG
            data-tip={
              isVerified ? "Верифіковано сайтом" : "Не верифіковано сайтом"
            }
            className={`business-card__ckeck-icon ${
              isVerified ? "active" : ""
            }`}
          />
          <ReactTooltip />
        </h3>
        <p
          className="business-card__description section__secondary-text"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="business-card__footer">
          <div className="business-card__views">
            <EyeSVG className="business-card__eye-icon" />
            <p className="business-card__views-count section__secondary-text">
              {views}
            </p>
          </div>
          <p className="business-card__price">{price}₴</p>
        </div>
      </div>
    </li>
  );
};

export default BusinessCard;
