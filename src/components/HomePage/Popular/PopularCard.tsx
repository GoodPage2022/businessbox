import HeartSVG from "../../../assets/svg/heart.svg";
import MessageSVG from "../../../assets/svg/message.svg";
import IconButton from "../../shared/IconButton";
import Image from "next/image";

const PopularCard = ({
  image,
  title,
  description,
}: {
  image: any;
  title: string;
  description: string;
}) => {
  return (
    <li className="popular__card">
      <div className="popular__card--image">
        <Image
          className=""
          src={image}
          layout="fill"
          objectFit="cover"
          alt="card-image"
        />
      </div>
      <div className="popular__card--info">
        <h3 className="popular__card--title">{title}</h3>
        <p className="popular__card--description section__secondary-text">
          {description}
        </p>
        <div className="popular__card--buttons">
          <IconButton borderColor="#0C0C0C" icon={<HeartSVG />} />
          <IconButton borderColor="#0C0C0C" icon={<MessageSVG />} />
        </div>
      </div>
    </li>
  );
};

export default PopularCard;
