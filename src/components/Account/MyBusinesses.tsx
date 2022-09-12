import PopularCards from "../../constants/popular";
import PopularCard from "../shared/BusinessCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyBusinesses = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);

  const getBusinesses = async () => {
    const filter = {
      _by: user._id,
    };
    const response = await axios.post(`/api/businesses/getList`, {
      user,
      filter,
    });

    if (response.data) {
      console.log(response.data.entries);

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
    <section className="myBusinesses">
      <div className="container myBusinesses__container">
        {cards.length > 0 ? (
          <ul className="myBusinesses__cards">
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
                <PopularCard
                  key={_id}
                  alias={_id}
                  title={title}
                  description={description}
                  image={
                    images == null || !images.length
                      ? ""
                      : `${images[0].meta.assets == "" ? `` : `http://157.230.99.45:8082`}${images[0].path}`
                  }
                  price={price}
                  views={view_count ?? 0}
                  isVerified={is_verified}
                />
              ),
            )}
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
