import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

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
}: {
  image: any;
  title: string;
  description: string;
  price: number;
  views: number;
  isVerified: boolean;
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  return (
    <li className="business-card">
      <div className="business-card__image">
        <Image
          className=""
          src={image}
          layout="fill"
          objectFit="cover"
          alt="card-image"
        />
        <button
          onClick={() => setIsLiked((prev) => !prev)}
          className={`business-card__heart-icon ${isLiked ? "active" : ""}`}
        >
          <HeartSVG />
        </button>
      </div>
      <div
        className="business-card__info"
        onClick={() => router.push("/project")}
      >
        <h3 className="business-card__title">
          {title}{" "}
          <CheckSVG
            className={`business-card__ckeck-icon ${
              isVerified ? "active" : ""
            }`}
          />
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
