import HeartSVG from "../../assets/svg/heart.svg";
import MessageSVG from "../../assets/svg/message.svg";
import IconButton from "./IconButton";
import Image from "next/image";
import { useRouter } from "next/router";

const BusinessCard = ({
  image,
  title,
  description,
}: {
  image: any;
  title: string;
  description: string;
}) => {
  const router = useRouter();
  return (
    <li className="business-card" onClick={() => router.push("/project")}>
      <div className="business-card--image">
        <Image
          className=""
          src={image}
          layout="fill"
          objectFit="cover"
          alt="card-image"
        />
      </div>
      <div className="business-card--info">
        <h3 className="business-card--title">{title}</h3>
        <p className="business-card--description section__secondary-text">
          {description}
        </p>
        <div className="business-card--buttons">
          <IconButton borderColor="#0C0C0C" icon={<HeartSVG />} />
          <IconButton borderColor="#0C0C0C" icon={<MessageSVG />} />
        </div>
      </div>
    </li>
  );
};

export default BusinessCard;
