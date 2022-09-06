import PopularCards from "../../constants/popular";
import PopularCard from "../shared/BusinessCard";
import Image from "next/image";
import { Chart } from "../Chart/Chart";
import { useEffect, useState } from "react";
import axios from 'axios'

const Favorites = () => {
  const [cards, setCards] = useState<any>([]);

  const getBusinesses = async () => {
    const { data } = await axios.get(`${process.env.cockpitApiUrl}/collections/get/Businesses?token=${process.env.cockpitApiToken}`)

    if (data) {
      setCards(data)
      return data
    }

    setCards([])
    return [];
  }
  
  useEffect(() => {
    getBusinesses()
  }, [])

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
                />
                <div className="favorites__graphic">
                  <Chart />
                </div>

                {/* <div className="favorites__graphic">
                  <Image
                    className=""
                    src="/assets/images/graphic.png"
                    layout="fill"
                    objectFit="cover"
                    alt="building"
                  />
                </div> */}
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
