import PopularCards from "../../constants/popular";
import PopularCard from "../shared/BusinessCard";
import PopularCardMob from "../shared/BusinessCardFavorite";
import Image from "next/image";
import { Chart } from "../Chart/Chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

const Favorites = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBusinesses = async () => {
    // console.log(user.favourites);

    if (!user.favourites || user.favourites.length == 0) {
      setCards([]);
      setIsLoading(false);
      return [];
    }

    const filter = {
      _id: {
        $in: user.favourites.map((f: any) => f._id),
      },
    };
    const response = await axios.post(`/api/businesses/getList`, {
      user,
      filter,
    });

    if (response.data) {
      setCards(response.data.entries);
      setIsLoading(false);
      return response.data.entries;
    }

    setCards([]);
    setIsLoading(false);
    return [];
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <section className="favorites">
      <div className="container favorites__container">
        {isLoading ? (
          <Oval
            height={150}
            width={150}
            color="#f22a4e"
            wrapperStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "50vh",
            }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#e95973"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        ) : cards.length > 0 ? (
          <>
            <ul className="favorites__cards--desctop">
              {cards.map(
                ({
                  _id,
                  title,
                  description,
                  images,
                  view_count,
                  price,
                  is_verified,
                  price_history,
                  _created,
                  currency,
                  negotiatedPrice,
                }: any) => (
                  <div key={_id} className="favorites__cards__item">
                    <PopularCard
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
                                : `https://admin.bissbox.com`
                            }${images[0].path}`
                      }
                      price={price}
                      views={view_count ?? 0}
                      isVerified={is_verified}
                      currency={currency}
                      negotiatedPrice={negotiatedPrice}
                    />
                    <div className="favorites__graphic">
                      <Chart
                        price_history={price_history}
                        price={price}
                        created={_created}
                      />
                    </div>
                  </div>
                ),
              )}
            </ul>
            <ul className="favorites__cards--mob">
              {cards.map(
                ({
                  _id,
                  title,
                  description,
                  images,
                  view_count,
                  price,
                  is_verified,
                  price_history,
                  _created,
                  currency,
                  negotiatedPrice,
                }: any) => (
                  <div key={_id} className="favorites__cards__item">
                    <PopularCardMob
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
                                : `https://admin.bissbox.com`
                            }${images[0].path}`
                      }
                      price={price}
                      views={view_count ?? 0}
                      isVerified={is_verified}
                      currency={currency}
                      negotiatedPrice={negotiatedPrice}
                    />
                    <div className="favorites__graphic">
                      <Chart
                        price_history={price_history}
                        price={price}
                        created={_created}
                      />
                    </div>
                  </div>
                ),
              )}
            </ul>
          </>
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
