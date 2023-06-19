import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

import PhoneSVG from "../../../assets/svg/phone.svg";
import MailSVG from "../../../assets/svg/mail.svg";
import InstagramSVG from "../../../assets/svg/instagram.svg";
import YoutubeSVG from "../../../assets/svg/youtube.svg";
import Script from "next/script";
import React from "react";
import { MainContext } from "../../../contexts/mainContext";

const ProfileInfo = ({
  projectData,
  businessOwner,
  isOtherBusinesses,
}: {
  projectData: any;
  businessOwner: any;
  isOtherBusinesses: boolean;
}) => {
  const [isPhoneShow, setIsPhoneShow] = useState(false);
  const [isEmailShow, setIsEmailShow] = useState(false);

  const [isInstagramShow, setIsInstagramShow] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [state, dispatch] = React.useContext(MainContext);

  return (
    <div className="profileInfo">
      <div className="profileInfo__info">
        <div className="profileInfo__image">
          <Image
            className=""
            src={
              projectData.contact_seller_name
                ? "/assets/images/profile-photo.png"
                : businessOwner && businessOwner.avatar?.path
                ? businessOwner.avatar?.path
                : "/assets/images/profile-photo.png"
            }
            layout="fill"
            objectFit="cover"
            alt="card-image"
          />
        </div>
        <div className="profileInfo__data">
          <p className="profileInfo__name section__primary-text">
            {projectData.contact_seller_name ??
              (businessOwner ? businessOwner.name : "Невідомо")}
          </p>
          <p className="profileInfo__city section__primary-text">
            {projectData.contact_seller_name
              ? ""
              : businessOwner
              ? businessOwner.city
              : "Невідомо"}
          </p>
          {isOtherBusinesses && (
            <button
              onClick={() => dispatch({ type: "toggle_otherBusinesses" })}
              className="profileInfo__other-businesses section__primary-text"
            >
              Інші бізнеси продавця
            </button>
          )}{" "}
        </div>
      </div>{" "}
      <div className="profileInfo__networks">
        {isPhoneShow && (
          <p className="profileInfo__contact section__primary-text">
            {/* {user == null ? (
              <span className="profileInfo__contact--notAuth">
                Тільки для авторизованих користувачів
              </span>
            ) : (
              projectData.contact_seller_phone ??
              (businessOwner ? businessOwner.phone : "Невідомо")
            )} */}
            {projectData.contact_seller_phone ??
              (businessOwner ? businessOwner.phone : "Невідомо")}
          </p>
        )}
        {isEmailShow && (
          <p className="profileInfo__contact section__primary-text">
            {/* {user == null ? (
              <span className="profileInfo__contact--notAuth">
                Тільки для авторизованих користувачів
              </span>
            ) : (
              projectData.contact_seller_email ??
              (businessOwner ? businessOwner.email : "Невідомо")
            )} */}
            {projectData.contact_seller_email ??
              (businessOwner ? businessOwner.email : "Невідомо")}
          </p>
        )}
        {isInstagramShow && (
          <p className="profileInfo__contact section__primary-text">
            {/* {user == null ? (
              <span className="profileInfo__contact--notAuth">
                Тільки для авторизованих користувачів
              </span>
            ) : (
              projectData.instagram
            )} */}
            {projectData.instagram}
          </p>
        )}
        <div className="profileInfo__networks--wrapper">
          <button
            onClick={() => {
              setIsPhoneShow((prev) => !prev);
              setIsEmailShow(false);
              setIsInstagramShow(false);
              window.gtag("event", "conversion", {
                send_to: "AW-11042174734/IV-OCOD-4oQYEI7uqJEp",
              });
            }}
            className="profileInfo__networks--item"
          >
            <PhoneSVG />
          </button>
          <button
            onClick={() => {
              setIsEmailShow((prev) => !prev);
              setIsPhoneShow(false);
              setIsInstagramShow(false);
            }}
            className="profileInfo__networks--item"
          >
            <MailSVG />
          </button>
          {projectData.instagram && (
            <button
              onClick={() => {
                setIsInstagramShow((prev) => !prev);
                setIsPhoneShow(false);
                setIsEmailShow(false);
              }}
              className="profileInfo__networks--item"
            >
              <InstagramSVG />
            </button>
          )}
          {projectData.youtube && (
            <Link href={projectData.youtube}>
              <a className="profileInfo__networks--item">
                <YoutubeSVG />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
