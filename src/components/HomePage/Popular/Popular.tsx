import FilterSVG from "../../../assets/svg/filter.svg";
import DotsSVG from "../../../assets/svg/dots.svg";
import LinesSVG from "../../../assets/svg/lines.svg";
import IconButton from "../../shared/IconButton";
import PopularCards from "../../../constants/popular";
import PopularCard from "../../shared/BusinessCard";

const Popular = () => {
  return (
    <section className="popular">
      <div className="container popular__container">
        <div className="popular__buttons">
          <div className="popular__buttons--left">
            <button className="popular__button__filter">
              <FilterSVG />{" "}
              <span className="popular__button__filter--text section__secondary-text">
                Фільтр
              </span>
            </button>
          </div>
          <div className="popular__buttons--right">
            <IconButton borderColor="#0C0C0C" icon={<DotsSVG />} />
            <IconButton borderColor="#0C0C0C" icon={<LinesSVG />} />
          </div>
        </div>

        <h2 className="popular__title title">Найпопулярніші</h2>
        <ul className="popular__cards">
          {PopularCards.map(({ id, title, description, image }) => (
            <PopularCard
              key={id}
              title={title}
              description={description}
              image={image}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Popular;
