import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PhoneSVG from "../../../assets/svg/phone.svg";
import MailSVG from "../../../assets/svg/mail.svg";
import InstagramSVG from "../../../assets/svg/instagram.svg";
import YoutubeSVG from "../../../assets/svg/youtube.svg";
import axios, { AxiosRequestConfig } from "axios";

const ProfileInfo = ({ projectData }: { projectData: any }) => {
  const [isPhoneShow, setIsPhoneShow] = useState(false);
  const [isEmailShow, setIsEmailShow] = useState(false);
  const [businessOwner, setBusinessOwner]: [
    businessOwner: any,
    setBusinessOwner: any,
  ] = useState(null);
  const [isInstagramShow, setIsInstagramShow] = useState(false);
  const user = useSelector((state: any) => state.auth.user);

  const getUser = async () => {
    const requestBody = {
      userId: projectData._by,
    };

    const response = await axios.post(
      `/api/account/list`,
      requestBody
    );

    if (response.data) {
      // console.log(response.data[0]);
      setBusinessOwner(response.data[0]);
      return response.data;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profileInfo">
      <div className="profileInfo__info">
        <div className="profileInfo__image">
          <Image
            className=""
            src={projectData.contact_seller_name ? "/assets/images/profile-photo.png" : (businessOwner ? businessOwner.avatar.path : "/assets/images/profile-photo.png")}
            layout="fill"
            objectFit="cover"
            alt="card-image"
          />
        </div>
        <div className="profileInfo__data">
          <p className="profileInfo__name section__primary-text">
            {projectData.contact_seller_name ?? (businessOwner ? businessOwner.name : "Невідомо")}
          </p>
          <p className="profileInfo__city section__primary-text">
            {projectData.contact_seller_city ?? (businessOwner ? businessOwner.city : "Невідомо")}
          </p>
        </div>
      </div>
      <div className="profileInfo__networks">
        {isPhoneShow && (
          <p className="profileInfo__contact section__primary-text">
            {user == null ? (
              <span className="profileInfo__contact--notAuth">
                Тільки для авторизованих користувачів
              </span>
            ) : (projectData.contact_seller_phone ?? (businessOwner ? (
              businessOwner.phone
            ) : (
              "Невідомо"
            )))}
          </p>
        )}
        {isEmailShow && (
          <p className="profileInfo__contact section__primary-text">
            {user == null ? (
              <span className="profileInfo__contact--notAuth">
                Тільки для авторизованих користувачів
              </span>
            ) : (projectData.contact_seller_email ?? (businessOwner ? (
              businessOwner.email
            ) : (
              "Невідомо"
            )))}
          </p>
        )}
        {isInstagramShow && (
          <p className="profileInfo__contact section__primary-text">
            {user == null ? (
              <span className="profileInfo__contact--notAuth">
                Тільки для авторизованих користувачів
              </span>
            ) : (
              projectData.instagram
            )}
          </p>
        )}
        <div className="profileInfo__networks--wrapper">
          <button
            onClick={() => {
              setIsPhoneShow((prev) => !prev);
              setIsEmailShow(false);
              setIsInstagramShow(false);
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
