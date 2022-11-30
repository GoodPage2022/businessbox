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
import Checkbox from "../../shared/Checkbox";

const CancelToken = axios.CancelToken;
let cancel: any;

const CatalogView = () => {
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
  const { filters } = router.query;

  const cardsPerPage = screenWidth < 768 ? 8 : 9;

  const buildFiltersObj = () => {
    let filtersObjB: any = {};

    if (filters && Array.isArray(filters)) {
      filters.map((f: string, i: number) => {
        if (i % 2 == 1) {
          filtersObjB[filters[i - 1]] =
            filters[i - 1] == "category" ? f.split(",") : f;
        }
      });
    }

    setFiltersObj(filtersObjB);
  };

  const getBusinesses = async (resetLimit?: boolean) => {
    dispatch({ type: "toggle_loader" });
    let filterSetOfExp: any = [];

    if (cancel !== undefined) {
      cancel();
    }
    let requestBody: any = {
      user,
      sort: {
        _created: -1,
      },
    };
    Object.keys(filtersObj).map((f: any) => {
      switch (f) {
        case "page":
          break;
        case "priceFrom":
          if (parseFloat(filtersObj[f]) > 0)
            filterSetOfExp.push({
              $expr: {
                $gte: [
                  {
                    $toDouble: "$price",
                  },
                  parseFloat(filtersObj[f]),
                ],
              },
            });
          break;
        case "priceTo":
          if (parseFloat(filtersObj[f]) > 0)
            filterSetOfExp.push({
              $expr: {
                $lte: [
                  {
                    $toDouble: "$price",
                  },
                  parseFloat(filtersObj[f]),
                ],
              },
            });
          break;
        case "category":
          if (filtersObj[f].length > 0) {
            let param: any = {};
            param["area"] = {
              $in: filtersObj[f],
            };
            filterSetOfExp.push(param);
          }
          break;
        case "sorting":
          requestBody.sort["view_count"] = -1;
          delete requestBody.sort["_created"];
          break;
        case "state":
          filterSetOfExp.push({
            "state._id": filtersObj[f],
          });
          break;
        case "city":
          filterSetOfExp.push({
            "city._id": filtersObj[f],
          });
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

    if (!filtersObj.sorting) {
      requestBody.sort["_created"] = -1;
      delete requestBody.sort["view_count"];
    }

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
    if (!!filters && filters.length) buildFiltersObj();
  }, [filters]);

  useEffect(() => {
    if (cards.length > 0) {
      getBusinesses(true);
    }
  }, [cards]);

  useEffect(() => {
    getBusinesses();
    setPageNumber(filtersObj.page ?? 1);
  }, [filtersObj]);

  const changeFilter = (e: any) => {
    const filtersObjFirstPage = {
      ...filtersObj,
      page: undefined,
      [e.target.name]: e.target.value,
    };

    setFiltersObj(filtersObjFirstPage);

    let filtersObjFirstPageString = "";
    Object.keys(filtersObjFirstPage).map((f: any) => {
      if (filtersObjFirstPage[f] != undefined && filtersObjFirstPage[f] != "")
        filtersObjFirstPageString += "/" + f + "/" + filtersObjFirstPage[f];
    });

    router.replace(`/catalog${filtersObjFirstPageString}`);
  };

  return (
    <section
      className={`catalogView ${state.isActiveMobFilter ? "active" : ""}`}
    >
      <div className="container catalogView__container">
        <div
          className={`catalogView__buttons ${
            state.isActiveMobFilter ? "active" : ""
          }`}
          onClick={(e) => {
            if (state.isActiveMobFilter && e.currentTarget === e.target) {
              dispatch({ type: "toggle_mobFilter" });
              // document
              //   .querySelector("body")
              //   ?.classList.toggle("disable-scroll");
            }
          }}
        >
          <div className="catalogView__buttons--left">
            <button
              className={`catalogView__button__mob-filter ${
                state.isActiveMobFilter ? "active" : ""
              }`}
              onClick={() => {
                dispatch({ type: "toggle_mobFilter" });
                // document
                //   .querySelector("body")
                //   ?.classList.toggle("disable-scroll");
              }}
            >
              <FilterSVG />
            </button>
          </div>
          <div className="catalogView__buttons--right">
            <button
              onClick={() => setIsRowsActive((prev) => !prev)}
              className={`catalogView__button__columns ${
                isRowsActive ? "active" : ""
              }`}
            >
              <DotsSVG />
            </button>
            <button
              onClick={() => setIsRowsActive((prev) => !prev)}
              className={`catalogView__button__rows ${
                !isRowsActive ? "active" : ""
              }`}
            >
              <LinesSVG />
            </button>
          </div>
          <MobFilter
            isActive={state.isActiveMobFilter}
            changeFilter={changeFilter}
            filtersObj={filtersObj}
          />
        </div>
        <div className="catalogView__title-wrapper">
          <h2 className="title catalogView__title">Каталог бізнесів</h2>
          <p>
            <Checkbox
              text="Відсортувати за популярністю"
              datakey={999}
              changeFilter={changeFilter}
              categories={filtersObj.sorting ?? []}
              name={"sorting"}
            />
          </p>
        </div>

        <div className="catalogView__wrapper">
          <Sidebar changeFilter={changeFilter} filtersObj={filtersObj} />
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
            cardsPerPage={cardsPerPage}
            pageNumber={pageNumber}
            countCards={countCards}
          />
        )}
      </div>
    </section>
  );
};

export default CatalogView;
