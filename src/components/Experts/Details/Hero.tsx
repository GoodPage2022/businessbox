import Image from "next/image";
import Link from "next/link";

const HeroExpert = ({ data }: any) => {
  return (
    <div className="heroExpert">
      <ul className="breadcrumbs container">
        <li className="breadcrumbs__item section__secondary-text">
          <Link href="/">
            <a>
              Головна
              <span className="breadcrumbs__arrow">{">"}</span>
            </a>
          </Link>
        </li>
        <li className="breadcrumbs__item section__secondary-text">
          <Link href="/experts">
            <a>
              Каталог
              <span className="breadcrumbs__arrow"> {">"}</span>
            </a>
          </Link>
        </li>
        <li className="breadcrumbs__item section__secondary-text">
          <Link href={`/experts/specialization/${data.field_of_expertise[0]}`}>
            <a>
              {data.field_of_expertise[0]}
              <span className="breadcrumbs__arrow">{">"}</span>
            </a>
          </Link>
        </li>
        <li className="breadcrumbs__item section__secondary-text">
          {" "}
          {data.firstname} {data.lastname}
        </li>
      </ul>
      <div className="heroExpert__container container">
        <div className="heroExpert__image">
          <Image
            className=""
            src={
              data && data.avatar
                ? `https://admin.bissbox.com/storage/uploads${data.avatar.path}`
                : ""
            }
            layout="fill"
            objectFit="cover"
            alt="avatar"
          />
        </div>
        <div className="heroExpert__info">
          <div className="heroExpert__city section__primary-text">
            {data.location}
          </div>
          <div className="heroExpert__name">
            {data.firstname} {data.lastname}
          </div>
          <div className="heroExpert__specialization section__primary-text">
            {data.specialization}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroExpert;
