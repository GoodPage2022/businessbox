import YoutubeSVG from "../../assets/svg/youtube.svg";
import TelegramSVG from "../../assets/svg/telegram.svg";
import InstagramSVG from "../../assets/svg/instagram-black.svg";
import FacebookSVG from "../../assets/svg/facebook.svg";
import ViberSVG from "../../assets/svg/viber.svg";
import WhatsappSVG from "../../assets/svg/whatsapp.svg";
import Link from "next/link";

const Networks = () => {
  return (
    <ul className="networks">
      <li className="networks__item ">
        <Link href="https://www.youtube.com/@businessbox">
          <a className="section__secondary-text--white" target="blank">
            <button className="networks__btn networks__btn--youtube">
              <YoutubeSVG />
            </button>
          </a>
        </Link>
      </li>
      <li className="networks__item ">
        <Link href="https://wa.me/+380662026304">
          <a className="section__secondary-text--white" target="blank">
            <button className="networks__btn networks__btn--whatsapp">
              <WhatsappSVG />
            </button>
          </a>
        </Link>
      </li>
      <li className="networks__item">
        <Link href="https://t.me/bissbox">
          <a className="section__secondary-text--white" target="blank">
            <button className="networks__btn networks__btn--telegram">
              <TelegramSVG />
            </button>
          </a>
        </Link>
      </li>

      <li className="networks__item ">
        <Link href="https://invite.viber.com/?g2=AQAApW8%2BdobisFBqhf8YhczKIEenhjU46XOxwNmOQIm9Sgbz6bjGSSupD89ujXHt">
          <a className="section__secondary-text--white" target="blank">
            <button className="networks__btn networks__btn--viber">
              <ViberSVG />
            </button>
          </a>
        </Link>
      </li>

      <li className="networks__item ">
        <Link href="https://www.instagram.com/biss.box/?igshid=YmMyMTA2M2Y%3D">
          <a className="section__secondary-text--white" target="blank">
            <button className="networks__btn networks__btn--instagram">
              <InstagramSVG />
            </button>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default Networks;
