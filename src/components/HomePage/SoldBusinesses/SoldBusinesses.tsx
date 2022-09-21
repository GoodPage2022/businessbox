import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardsSlider from "../CardsSlider/CardsSlider";

const SoldBusinesses = () => {
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
        sold_out: true,
      },
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
    <section className="soldBusinesses">
      <div className="container soldBusinesses__container">
        <h2 className="soldBusinesses__title title">Продані</h2>

        <ul
          className={`soldBusinesses__cards ${cards.length < 5 ? "grid" : ""}`}
        >
          <CardsSlider cards={cards} />
        </ul>
      </div>
    </section>
  );
};

export default SoldBusinesses;
