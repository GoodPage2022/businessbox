import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

import PhoneSVG from "../../../assets/svg/phone.svg";
import MailSVG from "../../../assets/svg/mail.svg";
import InstagramSVG from "../../../assets/svg/instagram.svg";
import YoutubeSVG from "../../../assets/svg/youtube.svg";

const ProfileInfo = ({ projectData }: { projectData: any }) => {
  const [isPhoneShow, setIsPhoneShow] = useState(false);
  const [isEmailShow, setIsEmailShow] = useState(false);
  const [isInstagramShow, setIsInstagramShow] = useState(false);
  const user = useSelector((state: any) => state.auth.user);

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
          <p className="profileInfo__name section__primary-text">Ім’я автора</p>
          <p className="profileInfo__city section__primary-text">
            Місто, Країна
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
            ) : (
              user.phone
            )}
          </p>
        )}
        {isEmailShow && (
          <p className="profileInfo__contact section__primary-text">
            {user == null ? (
              <span className="profileInfo__contact--notAuth">
                Тільки для авторизованих користувачів
              </span>
            ) : (
              user.email
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
