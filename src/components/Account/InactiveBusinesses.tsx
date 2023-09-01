import PopularCard from "../shared/BusinessCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PlusSVG from "../../assets/svg/plus.svg";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import { MainContext } from "../../contexts/mainContext";
import React from "react";
import ModalThankActive from "../Modals/Modal-thank-active/Modal-thank-active";
import ModalThankSold from "../Modals/Modal-thank-sold/Modal-thank-sold";

const InactiveBusinesses = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [state, dispatch] = React.useContext(MainContext);

  const router = useRouter();
  const getBusinesses = async () => {
    const filter = {
      _by: user ? user._id : "",
      active: false,
    };
    const response = await axios.post(`/api/businesses/getList`, {
      user,
      filter,
    });

    if (response.data) {
      // console.log(response.data.entries);

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
  }, [state.thankActive, state.thankSold]);

  return (
    <section className="myBusinesses">
      <div className="container myBusinesses__container">
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
            <ul className="myBusinesses__cards--desctop">
              {cards.map(
                ({
                  _id,
                  title,
                  description,
                  images,
                  view_count,
                  price,
                  is_verified,
                  sold_out,
                  currency,
                  negotiatedPrice,
                  _order,
                  investing,
                }: any) => (
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
                    isSoldOut={sold_out}
                    currency={currency}
                    negotiatedPrice={negotiatedPrice}
                    order={_order}
                    investing={investing}
                    inactive={true}
                  />
                )
              )}
            </ul>
            {/* <ul className="myBusinesses__cards--tablet">
              <CardsSlider cards={cards} />
            </ul> */}
            <button
              onClick={() => router.push("/account/add-business")}
              className="myBusinesses__button-plus"
            >
              <PlusSVG />
              <span className="myBusinesses__button-plus--text">
                Додати бізнес
              </span>
            </button>
          </>
        ) : (
          <div className="myBusinesses__empty">
            <h1 className="title">У Вас немає неактивних бізнесів</h1>
            <p className="myBusinesses__text">
              Бізнес деактивується через 30 днів з моменту публікації
            </p>
          </div>
        )}
      </div>

      <ModalThankActive
        onClose={() => {
          dispatch({ type: "toggle_thankActive" });
        }}
      />
      <ModalThankSold
        onClose={() => {
          dispatch({ type: "toggle_thankSold" });
        }}
      />
    </section>
  );
};

export default InactiveBusinesses;
