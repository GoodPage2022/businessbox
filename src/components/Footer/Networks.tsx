import YoutubeSVG from "../../assets/svg/youtube.svg";
import TelegramSVG from "../../assets/svg/telegram.svg";
import InstagramSVG from "../../assets/svg/instagram-black.svg";
import FacebookSVG from "../../assets/svg/facebook.svg";
import Link from "next/link";

const Networks = () => {
  return (
    <ul className="networks">
      <li className="networks__item">
        <Link href="/">
          <a className="section__secondary-text--white">
            <button className="networks__btn">
              <YoutubeSVG />
            </button>
          </a>
        </Link>
      </li>
      <li className="networks__item">
        <Link href="/">
          <a className="section__secondary-text--white">
            <button className="networks__btn">
              <TelegramSVG />
            </button>
          </a>
        </Link>
      </li>
      <li className="networks__item">
        <Link href="/">
          <a className="section__secondary-text--white">
            <button className="networks__btn">
              <InstagramSVG />
            </button>
          </a>
        </Link>
      </li>
      <li className="networks__item">
        <Link href="/">
          <a className="section__secondary-text--white">
            <button className="networks__btn">
              <FacebookSVG />
            </button>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default Networks;
