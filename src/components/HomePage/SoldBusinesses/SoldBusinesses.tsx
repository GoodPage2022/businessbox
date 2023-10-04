import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardsSlider from "../CardsSlider/CardsSlider";
import { Oval } from "react-loader-spinner";

const SoldBusinesses = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBusinesses = async () => {
    setIsLoading(true);
    const requestBody = {
      user,
      limit: 10,
      sort: {
        _modified: -1,
        _created: -1,
      },
      filter: {
        // active: true,
        sold_out: true,
      },
    };

    const response = await axios.post(`/api/businesses/getList`, requestBody);

    if (response.data) {
      setCards(response.data.entries);
      setIsLoading(false);
      return response.data.entries;
    }
    setIsLoading(false);

    setCards([]);
    return [];
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  return cards.length ? (
    <section className="soldBusinesses">
      <div className="container soldBusinesses__container">
        <h2 className="soldBusinesses__title title">Продані</h2>
        {isLoading && (
          <Oval
            height={150}
            width={150}
            color="#f22a4e"
            wrapperStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              zIndex: "99999",
            }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#e95973"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        )}
        <ul
          className={`soldBusinesses__cards ${cards.length < 1 ? "grid" : ""}`}
        >
          <CardsSlider cards={cards} />
        </ul>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default SoldBusinesses;
