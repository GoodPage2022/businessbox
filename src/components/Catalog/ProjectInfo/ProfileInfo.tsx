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

    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const response = await axios.post(`/api/account/list`, requestBody, options);

    if (response.data) {
      setBusinessOwner(response.data);
      return response.data;
    }
  };
  // console.log(businessOwner);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profileInfo">
      <div className="profileInfo__info">
        <div className="profileInfo__image">
          <Image
            className=""
            src="/assets/images/profile-photo.png"
            layout="fill"
            objectFit="cover"
            alt="card-image"
          />
        </div>
        <div className="profileInfo__data">
          <p className="profileInfo__name section__primary-text">
            {businessOwner ? businessOwner.name : "Невідомо"}
          </p>
          <p className="profileInfo__city section__primary-text">
            {businessOwner ? businessOwner.city : "Невідомо"}
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
            ) : businessOwner ? (
              businessOwner.phone
            ) : (
              "Невідомо"
            )}
          </p>
        )}
        {isEmailShow && (
          <p className="profileInfo__contact section__primary-text">
            {user == null ? (
              <span className="profileInfo__contact--notAuth">
                Тільки для авторизованих користувачів
              </span>
            ) : businessOwner ? (
              businessOwner.email
            ) : (
              "Невідомо"
            )}
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
  );
};

export default ProfileInfo;
