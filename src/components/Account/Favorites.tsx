import PopularCards from "../../constants/popular";
import PopularCard from "../shared/BusinessCard";
import Image from "next/image";

const Favorites = () => {
  return (
    <section className="favorites">
      <div className="container favorites__container">
        {PopularCards.length > 0 ? (
          <ul className="favorites__cards">
            {PopularCards.map(({ id, title, description, image }) => (
              <div key={id} className="favorites__cards__item">
                <PopularCard
                  title={title}
                  description={description}
                  image={image}
                />
                <div className="favorites__graphic">
                  <Image
                    className=""
                    src="/assets/images/graphic.png"
                    layout="fill"
                    objectFit="cover"
                    alt="building"
                  />
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <div className="favorites__empty">
            <h1 className="title">Тут немає жодної обраної компанії</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
