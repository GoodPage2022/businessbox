import Image from "next/image";

import PhoneSVG from "../../../assets/svg/phone.svg";
import MailSVG from "../../../assets/svg/mail.svg";
import InstagramSVG from "../../../assets/svg/instagram.svg";
import TwitterSVG from "../../../assets/svg/twitter.svg";
import Link from "next/link";

const ProfileInfo = () => {
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
        <Link href="/">
          <a className="profileInfo__networks--item">
            <PhoneSVG />
          </a>
        </Link>
        <Link href="/">
          <a className="profileInfo__networks--item">
            <MailSVG />
          </a>
        </Link>
        <Link href="/">
          <a className="profileInfo__networks--item">
            <InstagramSVG />
          </a>
        </Link>
        <Link href="/">
          <a className="profileInfo__networks--item">
            <TwitterSVG />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
