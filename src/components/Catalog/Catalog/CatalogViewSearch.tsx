import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import FilterSVG from "../../../assets/svg/filter.svg";
import DotsSVG from "../../../assets/svg/dots1.svg";
import LinesSVG from "../../../assets/svg/lines.svg";
import BusinessCard from "../../shared/BusinessCard";
import Sidebar from "./Sidebar";
import Pagination from "../../shared/Pagination/Pagination";
import { useRouter } from "next/router";
import IconButton from "../../shared/IconButton";
import MobFilter from "./MobFilter";
import { MainContext } from "../../../contexts/mainContext";
import React from "react";
import BusinessCardFavorites from "../../shared/BusinessCardFavorite";

import { signOut as signOutReducer } from "../../../../store/actions/auth";
import { useSession, signOut as signOutGoogle } from "next-auth/react";
import { Oval } from "react-loader-spinner";

const CancelToken = axios.CancelToken;
let cancel: any;

const CatalogViewSearch = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [cards, setCards] = useState<any>([]);
  const [countCards, setCountCards] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filtersObj, setFiltersObj] = useState<any>({});
  const [isRowsActive, setIsRowsActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<any>(window.screen.width);
  const router = useRouter();
  const { data: session } = useSession();
  const dispatchRedux = useDispatch();

  const [state, dispatch] = React.useContext(MainContext);
  const { s } = router.query;

  useEffect(() => {
    if (!!s && s.length) buildFiltersObj();
  }, [s]);

  const buildFiltersObj = () => {
    let filtersObjB: any = {};

    if (s && Array.isArray(s)) {
        const sSliced = s.slice(1, s.length)

        sSliced.map((f: string, i: number) => {
            if (i % 2 == 1) {
                filtersObjB[sSliced[i - 1]] = f;
            }
        });
    }

    setFiltersObj(filtersObjB);
  };

  const cardsPerPage = screenWidth < 768 ? 8 : 9;

  const getBusinesses = async (resetLimit?: boolean) => {
    dispatch({ type: "toggle_loader" });
    let filterSetOfExp: any = [];

    if (cancel !== undefined) {
      cancel();
    }

    Object.keys(filtersObj).map((f: any) => {
      switch (f) {
        case "page":
          break;
        default:
          let param: any = {};
          param[f] = filtersObj[f];
          filterSetOfExp.push(param);
          break;
      }
    });

    filterSetOfExp.push({
      sold_out: false,
    });

    filterSetOfExp.push({
        $or: [
            {
                title: {
                    $regex: Array.isArray(s) ? s[0] : s,
                    $options: 'i'
                }
            },
            {
                description: {
                    $regex: Array.isArray(s) ? s[0] : s,
                    $options: 'i'
                }
            }
        ]
    });

    let requestBody: any = {
      user,
      sort: {
        _created: -1,
      },
    };

    if (!resetLimit) {
        requestBody["skip"] =
        filtersObj.page && filtersObj.page > 1
            ? cardsPerPage * (parseInt(filtersObj.page) - 1)
            : 0;
        requestBody["limit"] = cardsPerPage;
    }

    if (filterSetOfExp.length) {
      requestBody["filter"] = {
        $and: filterSetOfExp,
      };
    }

    try {
      const response = await axios.post(
        `/api/businesses/getList`,
        requestBody,
        {
          cancelToken: new CancelToken((c) => {
            cancel = c;
          }),
        },
      );

      if (response.data) {
        if (resetLimit) {
          setCountCards(response.data.entries.length);
          setIsLoading(false);
          return response.data.entries.length;
        } else {
          setCards(response.data.entries);
          setIsLoading(false);
          return response.data.entries;
        }
      }
    } catch (error: any) {
      if (error.response?.status == 401) {
        if (session !== undefined) {
          await signOutGoogle();
        }
        dispatchRedux(signOutReducer());
      }
      console.log(error);
    }

    setCards([]);
    return [];
  };

  useEffect(() => {
    if (cards.length > 0) {
      getBusinesses(true);
    }
  }, [cards]);

  useEffect(() => {
    getBusinesses();
    setPageNumber(filtersObj.page ?? 1);
  }, [filtersObj]);
  
  return (
    <section
      className={`catalogView searchView`}
    >
      <div className="container catalogView__container">
        <div className={`catalogView__buttons`}></div>

        <h2 className="title catalogView__title showAlways">Пошук: &quot;{ Array.isArray(s) ? s[0] : s }&quot;</h2>
        <div className="catalogView__wrapper">
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
            <ul
              className={`catalogView__cards ${isRowsActive ? "" : "active"}`}
            >
              {cards.map(
                ({
                  _id,
                  title,
                  description,
                  images,
                  view_count,
                  price,
                  is_verified,
                  currency,
                  negotiatedPrice,
                }: any) =>
                  isRowsActive && screenWidth < 768 ? (
                    <BusinessCardFavorites
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
                  ) : (
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
                                : `https://admin.bissbox.com`
                            }${images[0].path}`
                      }
                      price={price}
                      views={view_count ?? 0}
                      isVerified={is_verified}
                      currency={currency}
                      negotiatedPrice={negotiatedPrice}
                    />
                  ),
              )}
            </ul>
          ) : (
            <div className="catalogView__empty">
              <h1 className="title">На жаль, бізнесів поки що немає</h1>
            </div>
          )}
        </div>
        {/* {Math.ceil(countCards / cardsPerPage)} */}
        {Math.ceil(countCards / cardsPerPage) > 1 && (
          <Pagination
            search={Array.isArray(s) ? s[0] : s}
            cardsPerPage={cardsPerPage}
            pageNumber={pageNumber}
            countCards={countCards}
          />
        )}
      </div>
    </section>
  );
};

export default CatalogViewSearch;
