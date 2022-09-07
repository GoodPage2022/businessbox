import PopularCards from "../../constants/popular";
import PopularCard from "../shared/BusinessCard";
import Image from "next/image";
import { Chart } from "../Chart/Chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Favorites = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);

  const getBusinesses = async () => {
    const response = await axios.post(`/api/businesses/get`, { user });

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
    <section className="favorites">
      <div className="container favorites__container">
        {cards.length > 0 ? (
          <ul className="favorites__cards">
            {cards.map(({ _id, title, description, images }: any) => (
              <div key={_id} className="favorites__cards__item">
                <PopularCard
                  title={title}
                  description={description}
                  image={`http://157.230.99.45:8082${images[0].path}`}
                  price="12"
                  views="123"
                  isVerified={true}
                />
                <div className="favorites__graphic">
                  <Chart />
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
