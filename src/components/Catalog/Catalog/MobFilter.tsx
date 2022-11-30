import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Checkbox from "../../shared/Checkbox";
import CustomSelect from "../../shared/CustomSelect";
import OurCategories from "../../../constants/categories";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import MoreCategoriesSVG from "../../../assets/svg/more-categ.svg";
import { MainContext } from "../../../contexts/mainContext";
import React from "react";

const MobFilter = ({
  changeFilter,
  filtersObj,
  isActive,
}: {
  changeFilter: any;
  filtersObj: any;
  isActive: boolean;
}) => {
  const [debouncedChange, setDebouncedChange] = useState<any>();
  const [filtersObjI, setFiltersObjI] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>({});
  const [cutOurCategories, setCutOurCategories] = useState<any>(null);
  const [isCutCategories, setIsCutCategories] = useState<any>(false);
  const router = useRouter();
  const { filters } = router.query;
  const [state, dispatch] = React.useContext(MainContext);
  const [listAreas, setListAreas] = useState<any>();
  const [listCities, setListCities] = useState<any>();
  const [selectedArea, setSelectedArea] = useState("");

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

  useEffect(() => {
    if (OurCategories.length > 10) {
      setCutOurCategories(OurCategories.slice(0, 10));
    }
  }, []);

  useEffect(() => {
    if (filtersObjI.category != null) {
      setIsCutCategories(false);
    } else {
      setIsCutCategories(true);
    }
  }, [filtersObjI]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    resetForm({});
  };

  const buildFiltersObj = () => {
    let filtersObjB: any = {};

    if (filters && Array.isArray(filters)) {
      filters.map((f: string, i: number) => {
        if (i % 2 == 1) {
          if (filters[i - 1] == "category") {
            filtersObjB[filters[i - 1]] = f.split(",").filter((c) => c != "");
          } else {
            filtersObjB[filters[i - 1]] = f;
          }
        } else {
          filtersObjB = {};
        }
      });
    }

    setFiltersObjI(filtersObjB);
  };

  useEffect(() => {
    buildFiltersObj();
  }, [filters]);

  useEffect(() => {
    setInitialValues({
      priceTo: filtersObjI.priceTo ?? "",
      priceFrom: filtersObjI.priceFrom ?? "",
      city: filtersObjI.city ?? "",
      state: filtersObjI.state ?? "",
    });

    setSelectedArea(filtersObjI.state);
  }, [filtersObjI]);

  useEffect(() => {
    if (debouncedChange != undefined) {
      const timeOutId = setTimeout(() => changeFilter(debouncedChange), 500);
      return () => clearTimeout(timeOutId);
    }
  }, [debouncedChange]);

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: "toggle_mobFilter" });
    }
  };

  return (
    <div
      className={`mobFilter__overlay ${isActive ? "active" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={`mobFilter ${isActive ? "active" : ""}`}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={(values: any) => {
            const errors: any = {};

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="mobFilter__form">
              <label className="mobFilter__field">
                <span className="mobFilter__label">Ціна</span>
                <div className="mobFilter__price">
                  <Field
                    className="mobFilter__input section__primary-text"
                    type="text"
                    name="priceFrom"
                    placeholder="від"
                    onChange={(e: any) => {
                      values[e.currentTarget.name] = e.currentTarget.value;
                      setDebouncedChange(e);
                    }}
                  />
                  <p className="mobFilter__price--text">—</p>
                  <Field
                    className="mobFilter__input section__primary-text"
                    type="text"
                    name="priceTo"
                    placeholder="до"
                    onChange={(e: any) => {
                      values[e.currentTarget.name] = e.currentTarget.value;
                      setDebouncedChange(e);
                    }}
                  />
                </div>
              </label>
              <label className="mobFilter__field mobFilter__field--currency">
                <span className="mobFilter__label">Валюта</span>
                <Field
                  type="text"
                  name="currency"
                  setter={() => dispatch({ type: "toggle_currency" })}
                  placeholder="Оберіть"
                  defaultValue={[{ value: "Долар", label: "Долар" }]}
                  component={CustomSelect}
                  options={[
                    { value: "Гривня", label: "Гривня" },
                    { value: "Долар", label: "Долар" },
                  ]}
                />
              </label>
              <div className="mobFilter__field">
                <span className="mobFilter__label">Категорія</span>
                <ul className="mobFilter__categories">
                  {isCutCategories
                    ? cutOurCategories?.map(
                        ({ id, content }: { id: any; content: any }) => (
                          <li key={id} className="mobFilter__category">
                            <Checkbox
                              datakey={id}
                              changeFilter={changeFilter}
                              text={content}
                              categories={filtersObjI.category ?? []}
                            />
                          </li>
                        ),
                      )
                    : OurCategories.map(
                        ({ id, content }: { id: any; content: any }) => (
                          <li key={id} className="mobFilter__category">
                            <Checkbox
                              datakey={id}
                              changeFilter={changeFilter}
                              text={content}
                              categories={filtersObjI.category ?? []}
                            />
                          </li>
                        ),
                      )}
                  {/* {(cutOurCategories ?? OurCategories).map(
                    ({ id, content }: { id: any; content: any }) => (
                      <li key={id} className="mobFilter__category">
                        <Checkbox
                          datakey={id}
                          changeFilter={changeFilter}
                          text={content}
                          categories={filtersObjI.category ?? []}
                        />
                      </li>
                    ),
                  )} */}
                </ul>
                {isCutCategories && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCutCategories(false);
                    }}
                    className="mobFilter__more-categories"
                  >
                    ще категорії <MoreCategoriesSVG />
                  </button>
                )}
              </div>
              <div className="mobFilter__city">
                <label className="mobFilter__field">
                  <span className="mobFilter__label">Область</span>
                  <Field
                    component={CustomSelect}
                    className="mobFilter__select section__primary-text"
                    type="text"
                    name="state"
                    setter={setSelectedArea}
                    options={listAreas}
                    changeFilter={changeFilter}
                    required
                    placeholder="-----"
                  ></Field>
                </label>
                <label className="mobFilter__field">
                  <span className="mobFilter__label">Місто</span>
                  <Field
                    type="text"
                    name="city"
                    required
                    placeholder="-----"
                    component={CustomSelect}
                    changeFilter={changeFilter}
                    options={listCities}
                  />
                </label>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MobFilter;
