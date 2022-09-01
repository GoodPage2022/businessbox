import PopularCards from "../../constants/popular";
import PopularCard from "../shared/BusinessCard";

const MyBusinesses = () => {
  return (
    <section className="myBusinesses">
      <div className="container myBusinesses__container">
        {PopularCards.length > 0 ? (
          <ul className="myBusinesses__cards">
            {PopularCards.map(({ id, title, description, image }) => (
              <PopularCard
                key={id}
                title={title}
                description={description}
                image={image}
              />
            ))}
          </ul>
        ) : (
          <div className="myBusinesses__empty">
            <h1 className="title">Тут немає жодної вашої компанії</h1>
            <p className="myBusinesses__text">
              Натисніть «Додати бізнес», щоб додати новий
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBusinesses;
