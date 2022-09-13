import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import BusinessCard from "../../shared/BusinessCard";

const NewBusinesses = () => {
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
    <section className="newBusinesses">
      <div className="container newBusinesses__container">
        <h2 className="newBusinesses__title title">Нові бізнеси</h2>

        <ul className="newBusinesses__cards">
          {cards.map(
            ({
              _id,
              title,
              description,
              images,
              view_count,
              price,
              is_verified,
            }: any) => (
              <BusinessCard
                key={_id}
                alias={_id}
                title={title}
                description={description}
                image={
                  images == null || !images.length
                    ? ""
                    : `${
                        images[0].meta.assets == ""
                          ? ``
                          : `http://157.230.99.45:8082`
                      }${images[0].path}`
                }
                price={price}
                views={view_count ?? 0}
                isVerified={is_verified}
              />
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default NewBusinesses;
