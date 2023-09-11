import Image from "next/image";
import Link from "next/link";
import PhoneSVG from "../../../assets/svg/phone.svg";
import EmailSVG from "../../../assets/svg/mail.svg";
import InstagramSVG from "../../../assets/svg/instagram.svg";
import YoutubeSVG from "../../../assets/svg/youtube.svg";
import FacebookSVG from "../../../assets/svg/facebook.svg";
import TelegramSVG from "../../../assets/svg/telegram.svg";
import SiteSVG from "../../../assets/svg/site.svg";
import { useState } from "react";
const Contacts = ({ data }: any) => {
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);
  const [isEmailClicked, setIsEmailClicked] = useState(false);
  const [isFacebookClicked, setIsFacebookClicked] = useState(false);
  const [isTelegramClicked, setIsTelegramClicked] = useState(false);
  const [isInstagramClicked, setIsInstagramClicked] = useState(false);

  return (
    <div className="contacts">
      <div className="contacts__container container">
        <h2 className="contacts__title">Контакти</h2>
        <div className="contacts__wrapper">
          {(data.phone_1 || data.phone_2) && (
            <div className="contacts__network">
              <div
                onClick={() => {
                  setIsPhoneClicked((prev) => !prev);
                  setIsEmailClicked(false);
                  setIsFacebookClicked(false);
                  setIsInstagramClicked(false);
                  setIsTelegramClicked(false);
                }}
              >
                <PhoneSVG />
              </div>{" "}
              <div
                className={`contacts__network-text ${
                  isPhoneClicked && "active"
                } section__primary-text`}
              >
                {data.phone_1 && (
                  <Link href={`tel:${data.phone_1}`}>
                    <a className="section__primary-text">{data.phone_1}</a>
                  </Link>
                )}
                {data.phone_2 && (
                  <Link href={`tel:${data.phone_2}`}>
                    <a className="section__primary-text">{data.phone_2}</a>
                  </Link>
                )}
              </div>
            </div>
          )}
          {(data.email_1 || data.email_2) && (
            <div className="contacts__network">
              <div
                onClick={() => {
                  setIsEmailClicked((prev) => !prev);
                  setIsPhoneClicked(false);
                  setIsFacebookClicked(false);
                  setIsInstagramClicked(false);
                  setIsTelegramClicked(false);
                }}
              >
                {" "}
                <EmailSVG />
              </div>

              <div
                className={`contacts__network-text ${
                  isEmailClicked && "active"
                } section__primary-text`}
              >
                {" "}
                {data.email_1 && (
                  <Link href={`mailto:${data.email_1}`}>
                    <a className="section__primary-text">{data.email_1}</a>
                  </Link>
                )}
                {data.email_2 && (
                  <Link href={`mailto:${data.email_2}`}>
                    <a className="section__primary-text">{data.email_2}</a>
                  </Link>
                )}
              </div>
            </div>
          )}
          {data.site && (
            <div className="contacts__network">
              <Link href={data.site}>
                <a target="_blank">
                  <SiteSVG />{" "}
                </a>
              </Link>
            </div>
          )}
          {(data.facebook_1 || data.facebook_2) && (
            <div className="contacts__network facebook">
              <div
                onClick={() => {
                  setIsFacebookClicked((prev) => !prev);
                  setIsEmailClicked(false);
                  setIsPhoneClicked(false);
                  setIsInstagramClicked(false);
                  setIsTelegramClicked(false);
                }}
              >
                <FacebookSVG />
              </div>

              <div
                className={`contacts__network-text ${
                  isFacebookClicked && "active"
                } section__primary-text`}
              >
                {data.facebook_1 && (
                  <Link href={data.facebook_1}>
                    <a target="_blank" className="section__primary-text">
                      {data.facebook_1}
                    </a>
                  </Link>
                )}
                {data.facebook_2 && (
                  <Link href={data.facebook_1}>
                    <a target="_blank" className="section__primary-text">
                      {data.facebook_2}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}

          {(data.telegram_1 || data.telegram_2) && (
            <div className="contacts__network telegram">
              <div
                onClick={() => {
                  setIsTelegramClicked((prev) => !prev);
                  setIsFacebookClicked(false);
                  setIsEmailClicked(false);
                  setIsPhoneClicked(false);
                  setIsInstagramClicked(false);
                }}
              >
                <TelegramSVG />
              </div>

              <div
                className={`contacts__network-text ${
                  isTelegramClicked && "active"
                } section__primary-text`}
              >
                {" "}
                {data.telegram_1 && (
                  <Link href={data.telegram_1}>
                    <a target="_blank" className="section__primary-text">
                      {data.telegram_1}
                    </a>
                  </Link>
                )}
                {data.telegram_2 && (
                  <Link href={data.telegram_2}>
                    <a target="_blank" className="section__primary-text">
                      {data.telegram_2}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}

          {(data.instagram_1 || data.instagram_2) && (
            <div className="contacts__network instagram">
              <div
                onClick={() => {
                  setIsInstagramClicked((prev) => !prev);
                  setIsFacebookClicked(false);
                  setIsEmailClicked(false);
                  setIsPhoneClicked(false);
                  setIsTelegramClicked(false);
                }}
              >
                <InstagramSVG />
              </div>

              <div
                className={`contacts__network-text ${
                  isInstagramClicked && "active"
                } section__primary-text`}
              >
                {" "}
                {data.instagram_1 && (
                  <Link href={data.instagram_1}>
                    <a target="_blank" className="section__primary-text">
                      {data.instagram_1}
                    </a>
                  </Link>
                )}
                {data.instagram_2 && (
                  <Link href={data.instagram_2}>
                    <a target="_blank" className="section__primary-text">
                      {data.instagram_2}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}

          {data.youtube && (
            <div className="contacts__network youtube">
              <Link href={data.youtube}>
                <a target="_blank">
                  <YoutubeSVG />{" "}
                </a>
              </Link>
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default Contacts;
