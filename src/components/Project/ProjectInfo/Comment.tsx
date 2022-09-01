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
    <div className="comment">
      <div className="comment__header">
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
      <p className="comment__text">{text}</p>
    </div>
  );
};

export default Comment;
