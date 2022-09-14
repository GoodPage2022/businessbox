import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import BusinessCard from "../../shared/BusinessCard";

const SoldBusinesses = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);

  const getBusinesses = async () => {
    const requestBody = {
      user,
      limit: 4,
      sort: {
        _created: -1
      },
      filter: {
        sold_out: true
      }
    }

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

        <ul className="soldBusinesses__cards">
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

export default SoldBusinesses;
