import PopularCard from "../shared/BusinessCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PlusSVG from "../../assets/svg/plus.svg";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import RaiseRating from "./RaiseRating";
import ModalRaiseRating from "../Modals/Modal-RaiseRating/Modal-RaiseRating";
import { MainContext } from "../../contexts/mainContext";
import React from "react";
import ModalThankActive from "../Modals/Modal-thank-active/Modal-thank-active";

const MyBusinesses = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topBusinesses, setTopBusinesses] = useState<any>([]);
  const [lowRatingBusinesses, setLowRatingBusinesses] = useState<any>([]);
  const [state, dispatch] = React.useContext(MainContext);

  const router = useRouter();
  const getBusinesses = async () => {
    const filter = {
      _by: user._id,
      active: true,
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

  const getTopBusinesses = async () => {
    try {
      const response = await axios.post(`/api/businesses/getTop`);

      if (response.data) {
        setTopBusinesses(response.data.entries);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkMyBusinessesRating = (
    myBusinesses: [any],
    topBusinesses: [any]
  ) => {
    const topBusinessesId = topBusinesses.map((business) => business._id);

    const filteredBusinesses = myBusinesses.filter(
      (business) => !topBusinessesId.includes(business._id)
    );

    console.log("filteredBusinesses", filteredBusinesses);

    setLowRatingBusinesses(filteredBusinesses);

    return filteredBusinesses;
  };

  const activateBusiness = async () => {
    try {
      const response = await axios.post(`/api/businesses/activateBusiness`, {
        id: "649bf057eb340f7fd5066c53",
      });
      console.log(response.data, "response");
    } catch (error) {
      console.log(error, "errer");
    }
  };

  const checkBusinesses = async () => {
    try {
      const response = await axios.post(
        `/api/businesses/check-activity-warn`,
        {}
      );
      console.log(response.data, "response");
    } catch (error) {
      console.log(error, "errer");
    }
  };

  const checkBusinessesInactive = async () => {
    console.log("rerr");

    try {
      const response = await axios.post(
        `/api/businesses/check-activity-inactive`,
        {}
      );
      console.log(response.data, "response");
    } catch (error) {
      console.log(error, "errer");
    }
  };

  useEffect(() => {
    // checkBusinessesInactive();
    // checkBusinesses();
  }, []);

  const addTimestamp = async () => {
    try {
      const response = await axios.post(`/api/businesses/add-timestamp`, {});
      console.log(response.data, "response");
    } catch (error) {
      console.log(error, "errer");
    }
  };
  const sendNews = async (email: string) => {
    try {
      const response = await axios.post(`/api/businesses/send-news`, {
        email,
      });
      console.log(response.data, "response");
    } catch (error) {
      console.log(error, "errer");
    }
  };

  const getBusinessOwner = async (by: any) => {
    // console.log(by, "by");

    const requestBody = {
      userId: by,
    };
    try {
      const response = await axios.post(`/api/account/list`, requestBody);
      if (response.data) {
        const emails = response.data.map((user: any) => {
          return user.email;
        });
        return emails;
      }
    } catch (error) {
      console.log(error, "getBusinessOwnerErr");
    }
  };

  const getUsers = async () => {
    try {
      // const response = await axios.post(`/api/businesses/get-users`, {});
      // console.log(response.data, "response");

      // const otherEma: any = [];
      // const ownerId: any = [];
      // response.data.entries.map((item: any) => {
      //   if (item.contact_seller_email) {
      //     // console.log(item.contact_seller_email, "ccc");
      //     if (otherEma.includes(item.contact_seller_email)) {
      //       return;
      //     }
      //     otherEma.push(item.contact_seller_email);
      //   } else {
      //     if (ownerId.includes(item._by)) {
      //       return;
      //     } else ownerId.push(item._by);
      //   }
      // });

      // const data = await getBusinessOwner(ownerId);

      // otherEma.forEach((oter: any) => {
      //   data.forEach((dat: any) => {
      //     if (oter == dat) {
      //       console.log(oter, dat);
      //     }
      //   });
      // });
      const em = [""];

      em.map((item: string) => {
        sendNews(item);
      });
    } catch (error) {
      console.log(error, "errer");
    }
  };

  useEffect(() => {
    // activateBusiness();
    // checkBusinesses();
    // getUsers();
  }, []);

  const closeRaiseRatingModal = () => {
    dispatch({ type: "toggle_raiseRatingModal" });
  };

  useEffect(() => {
    getBusinesses();
    getTopBusinesses();
  }, []);

  useEffect(() => {
    if (topBusinesses.length > 0) {
      checkMyBusinessesRating(cards, topBusinesses);
    }
  }, [cards, topBusinesses]);

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
            {lowRatingBusinesses.length > 0 && <RaiseRating />}
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
                  warned,
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
                    warned={warned}
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
            <h1 className="title">Тут немає жодної вашої компанії</h1>
            <p className="myBusinesses__text">
              Натисніть «Додати бізнес», щоб додати новий
            </p>
          </div>
        )}
      </div>
      <ModalRaiseRating
        onClose={closeRaiseRatingModal}
        lowRatingBusinesses={lowRatingBusinesses}
      />
      <ModalThankActive
        onClose={() => {
          dispatch({ type: "toggle_thankActive" });
        }}
      />
    </section>
  );
};

export default MyBusinesses;
