import Image from "next/image";

const HeroExpert = ({ data }: any) => {
  return (
    <div className="heroExpert">
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
