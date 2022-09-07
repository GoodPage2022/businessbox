import PopularCards from "../../constants/popular";
import PopularCard from "../shared/BusinessCard";
import { useEffect, useState } from "react";
import axios from 'axios'

const MyBusinesses = () => {
  const [cards, setCards] = useState<any>([]);

  const getBusinesses = async () => {
    const { data } = await axios.get(`/api/businesses/get`)

    if (data) {
      setCards(data.entries)
      return data.entries
    }

    setCards([])
    return [];
  }
  
  useEffect(() => {
    getBusinesses()
  }, [])

  return (
    <section className="myBusinesses">
      <div className="container myBusinesses__container">
        {cards.length > 0 ? (
          <ul className="myBusinesses__cards">
            {cards.map(({ _id, title, description, images }: any) => (
              <PopularCard
                key={_id}
                title={title}
                description={description}
                image={`http://157.230.99.45:8082${images[0].path}`}
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
