import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosRequestConfig } from "axios";
import { signIn as signInReducer } from "../../../store/actions/auth";

import EditSVG from "../../assets/svg/edit.svg";
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
  const dispatchRedux = useDispatch();
  const router = useRouter();
  const [isMyBusinessesPage, setIsMyBusinessesPage] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (router.pathname === "/account/my-businesses") {
      setIsMyBusinessesPage(true);
    }
  }, []);

  useEffect(() => {
    setIsLiked(user.favourites.map((f: any)=>f._id).includes(alias) ? true : false)
  }, [user]);

  const handleFavourites = async () => {
    const requestBody = {
      user,
      project: {
        _id: alias,
        title
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

  return (
    <li className="business-card">
      <Link href={`/catalog/${alias}`}>
        <a className="business-card__link" title={title}></a>
      </Link>
      {isMyBusinessesPage ? (
        <button
          className="business-card__button-edit"
          onClick={() => router.push(`/account/edit-business/${alias}`)}
        >
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
        <button
          onClick={handleFavourites}
          className={`business-card__heart-icon ${isLiked ? "active" : ""}`}
        >
          <HeartSVG />
        </button>
      </div>
      <div className="business-card__info">
        <h3 className="business-card__title">
          <span>{title}</span>

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
        <div className="business-card__footer-mob">
          <div className="business-card__footer-mob--first">
            <p className="business-card__price">{price}₴</p>
            <button
              onClick={handleFavourites}
              className={`business-card__heart-icon--mob ${
                isLiked ? "active" : ""
              }`}
            >
              <HeartSVG />
            </button>
          </div>
          <div className="business-card__footer-mob--second">
            <div className="business-card__views">
              <EyeSVG className="business-card__eye-icon" />
              <p className="business-card__views-count section__secondary-text">
                {views}
              </p>
            </div>
            <CheckSVG
              data-tip={
                isVerified ? "Верифіковано сайтом" : "Не верифіковано сайтом"
              }
              className={`business-card__ckeck-icon--mob ${
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

export default BusinessCard;
