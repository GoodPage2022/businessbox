import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import CustomSelect from "../../shared/CustomSelect";
import FilterSVG from "../../../assets/svg/filter.svg";
import CardsSlider from "../CardsSlider/CardsSlider";

import { signOut as signOutReducer } from "../../../../store/actions/auth";
import { useSession, signOut as signOutGoogle } from "next-auth/react";
import OurCategories from "../../../constants/categories-select";
import { Oval } from "react-loader-spinner";

const Popular = () => {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  const [cards, setCards] = useState<any>([]);
  const [filtersObj, setFiltersObj] = useState<any>();
  const [filterURL, setFilterURL] = useState<string>("/catalog");
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  const [mobFilter, setMobFilter] = useState<any>(null);
  const [listAreas, setListAreas] = useState<any>();
  const [listCities, setListCities] = useState<any>();
  const [selectedArea, setSelectedArea] = useState("");
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatchRedux = useDispatch();

  const getListAreas = async () => {
    try {
      const reponse = await axios.post("/api/locations/getAreas", {});

      if (reponse.status == 200) {
        setListAreas(reponse.data);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const getListCities = async (selectedArea: string) => {
    try {
      const reponse = await axios.post("/api/locations/getCities", {
        selectedArea,
      });

      if (reponse.status == 200) {
        setListCities(reponse.data);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  useEffect(() => {
    getListCities(selectedArea);
  }, [selectedArea]);

  useEffect(() => {
    getListAreas();
  }, []);

  const submitFilter = () => {
    router.push(filterURL);
  };

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

    setFilterURL(`/catalog${filtersObjFirstPageString}`);
  };

  const getBusinesses = async () => {
    setIsLoading(true);
    const requestBody = {
      user,
      limit: 10,
      sort: {
        _order: -1,
        view_count: -1,
        _created: -1,
      },
      filter: {
        // active: true,
        sold_out: false,
      },
    };

    try {
      const response = await axios.post(`/api/businesses/getList`, requestBody);

      if (response.data) {
        setCards(response.data.entries);
        setIsLoading(false);
        return response.data.entries;
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        if (session !== undefined) {
          await signOutGoogle();
        }
        dispatchRedux(signOutReducer());
      }
    }
    setIsLoading(false);
    setCards([]);
    return [];
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    console.log(values);
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <section
      className="popular"
      onClick={(e) => {
        setMobFilter(
          document.querySelector(".popular__filter--mob") as HTMLElement
        );
        // console.log(e.target == mobFilter);
        // console.log(mobFilter);
      }}
    >
      <div className="container popular__container">
        <div className="popular__buttons">
          <div className="popular__buttons--left">
            <button
              className="popular__button__filter"
              onClick={() => setIsShowFilter((prev) => !prev)}
            >
              <FilterSVG />
              <span className="popular__button__filter--text section__secondary-text">
                Фільтр
              </span>
            </button>
            <button
              className={`popular__button__mob-filter ${
                isShowFilter ? "active" : ""
              }`}
              onClick={() => {
                setIsShowFilter((prev) => !prev);
              }}
            >
              <FilterSVG />
            </button>
          </div>
          <div className="popular__buttons--right">
            {/* <IconButton borderColor="#0C0C0C" icon={<DotsSVG />} /> */}
            {/* <IconButton borderColor="#0C0C0C" icon={<LinesSVG />} /> */}
          </div>
        </div>
        {isShowFilter && (
          <>
            <div className="popular__filter--desctop">
              <Formik
                initialValues={
                  {
                    // priceFrom: "",
                    // priceTo: "",
                    // category: "",
                    // city: "",
                    // state: "",
                  }
                }
                validate={(values: any) => {
                  const errors: any = {};

                  return errors;
                }}
                onSubmit={handleSubmit}
              >
                <Form className="popular__form">
                  <label className="popular__field">
                    <span className="popular__label">Ціна</span>
                    <div className="popular__price">
                      <Field
                        className="popular__input section__primary-text"
                        type="text"
                        name="priceFrom"
                        placeholder="від"
                        onChange={changeFilter}
                      />
                      <p className="popular__price--text">—</p>
                      <Field
                        className="popular__input section__primary-text"
                        type="text"
                        name="priceTo"
                        placeholder="до"
                        onChange={changeFilter}
                      />
                    </div>
                  </label>
                  <label className="popular__field">
                    <span className="popular__label">Область</span>
                    <Field
                      type="text"
                      name="state"
                      required
                      placeholder="-----"
                      component={CustomSelect}
                      setter={setSelectedArea}
                      options={listAreas}
                      changeFilter={changeFilter}
                    />
                  </label>
                  <label className="popular__field">
                    <span className="popular__label">Місто</span>
                    <Field
                      type="text"
                      name="city"
                      required
                      placeholder="-----"
                      component={CustomSelect}
                      options={listCities}
                      changeFilter={changeFilter}
                    />
                  </label>
                  <label className="popular__field">
                    <span className="popular__label">Сфера бізнесу</span>
                    <Field
                      component={CustomSelect}
                      className="popular__select section__primary-text"
                      type="text"
                      name="category"
                      options={OurCategories}
                      required
                      placeholder="-----"
                      changeFilter={changeFilter}
                      isMulti={true}
                    ></Field>
                  </label>
                </Form>
              </Formik>
            </div>
            <div className="popular__filter--mob">
              <Formik
                initialValues={
                  {
                    // priceFrom: "",
                    // priceTo: "",
                    // category: "",
                    // city: "",
                    // state: "",
                  }
                }
                validate={(values: any) => {
                  const errors: any = {};

                  return errors;
                }}
                onSubmit={handleSubmit}
              >
                <Form className="popular__form">
                  <label className="popular__field">
                    <span className="popular__label">Ціна</span>
                    <div className="popular__price">
                      <Field
                        className="popular__input section__primary-text"
                        type="text"
                        //
                        name="priceFrom"
                        placeholder="від"
                        onChange={changeFilter}
                      />
                      <p className="popular__price--text">—</p>
                      <Field
                        className="popular__input section__primary-text"
                        type="text"
                        name="priceTo"
                        placeholder="до"
                        onChange={changeFilter}
                      />
                    </div>
                  </label>
                  <div className="popular__city-wrapper">
                    <label className="popular__field">
                      <span className="popular__label">Область</span>
                      <Field
                        type="text"
                        name="state"
                        required
                        placeholder="-----"
                        component={CustomSelect}
                        setter={setSelectedArea}
                        options={listAreas}
                        changeFilter={changeFilter}
                      />
                    </label>
                    <label className="popular__field">
                      <span className="popular__label">Місто</span>
                      <Field
                        type="text"
                        name="city"
                        required
                        placeholder="-----"
                        component={CustomSelect}
                        options={listCities}
                        changeFilter={changeFilter}
                      />
                    </label>
                  </div>

                  <label className="popular__field">
                    <span className="popular__label">Сфера бізнесу</span>
                    <Field
                      component={CustomSelect}
                      className="popular__select section__primary-text"
                      type="text"
                      name="category"
                      options={OurCategories}
                      required
                      placeholder="-----"
                      changeFilter={changeFilter}
                      isMulti={true}
                    ></Field>
                  </label>
                </Form>
              </Formik>
            </div>
          </>
        )}
        <div className="popular__title">
          <h2 className="title">Найпопулярніші</h2>
          <button className="popular__title-button" onClick={submitFilter}>
            Підібрати бізнес
          </button>
        </div>

        <ul className="popular__cards">
          {isLoading && (
            <Oval
              height={150}
              width={150}
              color="#f22a4e"
              wrapperStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                zIndex: "99999",
              }}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#e95973"
              strokeWidth={3}
              strokeWidthSecondary={3}
            />
          )}
          <CardsSlider cards={cards} />
        </ul>
      </div>
    </section>
  );
};

export default Popular;
