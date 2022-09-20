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
        <p className="comment__date section__primary-text">{date}</p>
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
          <p className="comment__date section__primary-text">{date}</p>
        </div>
      </div>
      <p className="comment__text section__primary-text">{text}</p>
    </li>
  );
};

export default Comment;
