import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import BusinessCard from "../../shared/BusinessCard";
import Sidebar from "./Sidebar";
import Pagination from "../../shared/Pagination/Pagination";

const CatalogView = () => {
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
    <section className="catalogView">
      <div className="container catalogView__container">
        {cards.length > 0 ? (
          <>
            <h2 className="title catalogView__title">Назва категорії</h2>
            <div className="catalogView__wrapper">
              <Sidebar />
              <ul className="catalogView__cards">
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
                          : `${images[0].meta.assets == "" ? `` : `http://157.230.99.45:8082`}${images[0].path}`
                      }
                      price={price}
                      views={view_count ?? 0}
                      isVerified={is_verified}
                    />
                  ),
                )}
              </ul>
            </div>
            <Pagination />
          </>
        ) : (
          <div className="catalogView__empty">
            <h1 className="title">На жаль, бізнесів поки що немає</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogView;
