import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import CardsSlider from "../CardsSlider/CardsSlider";

const NewBusinesses = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);

  const getBusinesses = async () => {
    const requestBody = {
      user,
      limit: 10,
      sort: {
        _created: -1,
      },
      filter: {
        sold_out: false
      }
    };

    const response = await axios.post(`/api/businesses/getList`, requestBody);

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
    <section className="newBusinesses">
      <div className="container newBusinesses__container">
        <h2 className="newBusinesses__title title">Нові бізнеси</h2>

        <ul className="newBusinesses__cards">
          <CardsSlider cards={cards} />
        </ul>
      </div>
    </section>
  );
};

export default NewBusinesses;
