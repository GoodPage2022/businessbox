import Image from "next/image";

const Comment = ({
  image,
  name,
  mail,
  date,
  text,
}: {
  image: any;
  name: string;
  mail: string;
  date: string;
  text: string;
}) => {
  const newDate = `${date[3]}${date[4]}.${date[0]}${date[1]}.${date[6]}${date[7]}${date[8]}${date[9]}`;

  return (
    <li className="comment">
      <div className="comment__header--desctop">
        <div className="comment__user">
          <div className="comment__photo">
            <Image
              className=""
              src={image}
              layout="fill"
              objectFit="cover"
              alt="card-image"
            />
          </div>
          <p className="comment__name section__primary-text">{name}</p>
          <p className="comment__mail section__primary-text">{mail}</p>
        </div>
        <p className="comment__date section__primary-text">{newDate}</p>
      </div>
      <div className="comment__header--mob">
        <div className="comment__photo">
          <Image
            className=""
            src={image}
            layout="fill"
            objectFit="cover"
            alt="card-image"
          />
        </div>
        <div className="comment__user">
          <p className="comment__name section__primary-text">{name}</p>
          <p className="comment__mail section__primary-text">{mail}</p>
          <p className="comment__date section__primary-text">{newDate}</p>
        </div>
      </div>
      <p className="comment__text section__primary-text">{text}</p>
    </li>
  );
};

export default Comment;
