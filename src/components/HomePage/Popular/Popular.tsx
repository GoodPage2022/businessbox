import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import CustomSelect from "../../shared/CustomSelect";
import FilterSVG from "../../../assets/svg/filter.svg";
import DotsSVG from "../../../assets/svg/dots.svg";
import LinesSVG from "../../../assets/svg/lines.svg";
import IconButton from "../../shared/IconButton";
import CardsSlider from "../CardsSlider/CardsSlider";

const Popular = () => {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  const [cards, setCards] = useState<any>([]);
  const [filtersObj, setFiltersObj] = useState<any>();
  const [filterURL, setFilterURL] = useState<string>("/catalog");
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  const [mobFilter, setMobFilter] = useState<any>(null);
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
    const requestBody = {
      user,
      limit: 10,
      sort: {
        view_count: -1,
        _created: -1,
      },
    };

    const response = await axios.post(`/api/businesses/getList`, requestBody);

    if (response.data) {
      setCards(response.data.entries);
      return response.data.entries;
    }

    setCards([]);
    return [];
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    console.log(values);

    // resetForm({});
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <section
      className="popular"
      onClick={(e) => {
        setMobFilter(
          document.querySelector(".popular__filter--mob") as HTMLElement,
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
                      options={[
                        { value: "yes", label: "Так" },
                        { value: "no", label: "Ні" },
                      ]}
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
                      options={[
                        { value: "yes", label: "Так" },
                        { value: "no", label: "Ні" },
                      ]}
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
                      options={[
                        { value: "yes", label: "Так" },
                        { value: "no", label: "Ні" },
                      ]}
                      required
                      placeholder="-----"
                      changeFilter={changeFilter}
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
                        options={[
                          { value: "yes", label: "Так" },
                          { value: "no", label: "Ні" },
                        ]}
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
                        options={[
                          { value: "yes", label: "Так" },
                          { value: "no", label: "Ні" },
                        ]}
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
                      options={[
                        { value: "yes", label: "Так" },
                        { value: "no", label: "Ні" },
                      ]}
                      required
                      placeholder="-----"
                      changeFilter={changeFilter}
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
          <CardsSlider cards={cards} />
        </ul>
      </div>
    </section>
  );
};

export default Popular;
