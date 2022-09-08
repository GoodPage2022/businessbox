import FilterSVG from "../../../assets/svg/filter.svg";
import DotsSVG from "../../../assets/svg/dots.svg";
import LinesSVG from "../../../assets/svg/lines.svg";
import IconButton from "../../shared/IconButton";
import PopularCards from "../../../constants/popular";
import PopularCard from "../../shared/BusinessCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Popular = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);

  const getBusinesses = async () => {
    const response = await axios.post(`/api/businesses/getList`, { user });

    if (response.data) {
      setCards(response.data.entries);
      return response.data.entries;
    }

    setCards([]);
    return [];
  };

  useEffect(() => {
    getBusinesses();
  }, []);

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
          {cards /* PopularCards */
            .map(
              ({
                _id,
                title,
                description,
                images /* ,
                price,
                views,
                isVerified, */,
              }: any) => (
                <PopularCard
                  key={_id}
                  title={title}
                  alias={_id}
                  description={description}
                  image={
                    /* images */ `http://157.230.99.45:8082${images[0].path}`
                  }
                  price="12"
                  views="123"
                  isVerified={true}
                  // price={price}
                  // views={views}
                  // isVerified={isVerified}
                />
              ),
            )}
        </ul>
      </div>
    </section>
  );
};

export default Popular;
