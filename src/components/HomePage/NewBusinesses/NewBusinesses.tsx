import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import CardsSlider from "../CardsSlider/CardsSlider";
import { Oval } from "react-loader-spinner";

const NewBusinesses = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBusinesses = async () => {
    setIsLoading(true);
    const requestBody = {
      user,
      limit: 10,
      sort: {
        _created: -1,
      },
      filter: {
        sold_out: false,
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

  return (
    <section className="newBusinesses">
      <div className="container newBusinesses__container">
        <h2 className="newBusinesses__title title">Нові бізнеси</h2>
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
        <ul className="newBusinesses__cards">
          <CardsSlider cards={cards} />
        </ul>
      </div>
    </section>
  );
};

export default NewBusinesses;
