import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import FilterSVG from "../../assets/svg/filter.svg";
import DotsSVG from "../../../assets/svg/dots1.svg";
import LinesSVG from "../../../assets/svg/lines.svg";
import ExpertCard from "../shared/ExpertCard";
import Sidebar from "./Sidebar";
import Pagination from "../shared/Pagination/Pagination";
import { useRouter } from "next/router";
import IconButton from "../shared/IconButton";
import MobFilter from "./MobFilter";
import { MainContext } from "../../contexts/mainContext";
import React from "react";

import { signOut as signOutReducer } from "../../../store/actions/auth";
import { useSession, signOut as signOutGoogle } from "next-auth/react";
import { Oval } from "react-loader-spinner";
// import Checkbox from "../shared/Checkbox";
import CustomSelect from "../shared/CustomSelect";
import { Field, FormikProvider, useFormik } from "formik";
import Search from "./Search";

// const CancelToken = axios.CancelToken;
// let cancel: any;

const CatalogView = () => {
  const user = useSelector((state: any) => state.auth.user);
  const rate = useSelector((state: any) => state.currency.value);
  const [cards, setCards] = useState<any>([]);
  const [countCards, setCountCards] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filtersObj, setFiltersObj] = useState<any>({});
  const [isRowsActive, setIsRowsActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<any>(
    typeof window !== "undefined" ? window?.screen.width : 0
  );
  // const [rate, setRate] = useState<number>(0);
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
            filters[i - 1] == "specialization" ? f.split(",") : f;
        }
      });
    }

    setFiltersObj(filtersObjB);
  };

  const getExperts = async (resetLimit?: boolean) => {
    // if (!resetLimit) dispatch({ type: "toggle_loader" });

    if (!resetLimit) setIsLoading(true);
    let filterSetOfExp: any = [];

    // if (cancel !== undefined) {
    //   cancel();
    // }
    let requestBody: any = {
      user,
    };
    Object.keys(filtersObj).map((f: any) => {
      switch (f) {
        case "page":
          break;
        case "specialization":
          if (filtersObj[f].length > 0) {
            let param: any = {};
            param["field_of_expertise"] = {
              $in: filtersObj[f],
            };
            filterSetOfExp.push(param);
          }
          break;

        default:
          let param: any = {};
          param[f] = filtersObj[f];
          filterSetOfExp.push(param);
          break;
      }
    });
    filterSetOfExp.push({});

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
        `/api/experts/getList`,
        requestBody /*  {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      } */
      );

      if (response.data) {
        if (resetLimit) {
          setCountCards(response.data.entries.length);
          setIsLoading(false);
          return;
        } else {
          setCards(response.data.entries);
          setIsLoading(false);
          return;
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

    // setCards([]);
    return;
  };

  useEffect(() => {
    if (!!filters && filters.length && cards.length == 0) buildFiltersObj();
  }, [filters]);

  useEffect(() => {
    if (cards.length > 0) {
      getExperts(true);
    } else setCountCards(0);
  }, [cards]);

  useEffect(() => {
    getExperts();
    setPageNumber(filtersObj.page ?? 1);
  }, [filtersObj]);

  useEffect(() => {
    if (state.isActiveAnalysisTariffsModal) {
      dispatch({ type: "toggle_analysisTariffsModal" });
    }
    if (state.isActiveAnalysisModal) {
      dispatch({ type: "toggle_analysisModal" });
    }
  }, []);

  const changeFilter = (e: any, clean?: boolean) => {
    if (clean) {
      setFiltersObj({});
      router.push("/experts");
      return;
    }

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

    router.replace(`/experts${filtersObjFirstPageString}`);
  };
  const initialValues = {
    sorting: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  return (
    <section
      className={`experts-catalogView ${
        state.isActiveMobFilter ? "active" : ""
      }`}
    >
      <div className="container experts-catalogView__container">
        <div
          className={`experts-catalogView__buttons ${
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
          <div className="experts-catalogView__buttons--left">
            <button
              className={`experts-catalogView__button__mob-filter ${
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

          {state.isActiveMobFilter && (
            <MobFilter
              isActive={state.isActiveMobFilter}
              changeFilter={changeFilter}
              filtersObj={filtersObj}
            />
          )}
        </div>
        <div className="experts-catalogView__title-wrapper">
          <h2 className="title experts-catalogView__title">
            Каталог експертів
          </h2>
          {/* <p>
            <Checkbox
              text="Відсортувати за популярністю"
              datakey={999}
              changeFilter={changeFilter}
              categories={filtersObj.sorting ?? []}
              name={"sorting"}
            />
          </p> */}
          <Search />
        </div>
        <p className="experts-catalogView__qty section__primary-text">
          Знайдено експертів:
          <span className="section__primary-text experts-catalogView__qty--bold">
            {" "}
            {countCards}
          </span>{" "}
        </p>
        <div className="experts-catalogView__wrapper">
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
              className={`experts-catalogView__cards ${
                isRowsActive ? "" : "active"
              }`}
            >
              {cards.map(
                ({
                  _id,
                  firstname,
                  lastname,
                  avatar,
                  field_of_expertise,
                }: any) => (
                  <ExpertCard
                    key={_id}
                    id={_id}
                    firstname={firstname}
                    lastname={lastname}
                    specialization={
                      Array.isArray(field_of_expertise)
                        ? field_of_expertise
                        : [field_of_expertise]
                    }
                    image={
                      avatar && avatar.path
                        ? `https://admin.bissbox.com/storage/uploads${avatar.path}`
                        : ""
                    }
                  />
                )
              )}
            </ul>
          ) : (
            <div className="experts-catalogView__empty">
              <h1 className="title">На жаль, експертів поки що немає</h1>
            </div>
          )}
        </div>
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
