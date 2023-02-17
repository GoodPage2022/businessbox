import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Checkbox from "../../shared/Checkbox";
import CustomSelect from "../../shared/CustomSelect";
import OurCategories from "../../../constants/categories";
import { useRouter } from "next/router";
import axios from "axios";
import { MainContext } from "../../../contexts/mainContext";
import React from "react";

const Sidebar = ({
  changeFilter,
  filtersObj,
}: {
  changeFilter: any;
  filtersObj: any;
}) => {
  const [debouncedChange, setDebouncedChange] = useState<any>();
  const [filtersObjI, setFiltersObjI] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>({});
  const router = useRouter();
  const { filters } = router.query;
  const [listAreas, setListAreas] = useState<any>();
  const [listCities, setListCities] = useState<any>();
  const [selectedArea, setSelectedArea] = useState("");
  const [state, dispatch] = React.useContext(MainContext);

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

  return (
    <div className="sidebar">
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
          <Form className="sidebar__form">
            <button
              type="button"
              onClick={() => {
                changeFilter("e", true);
              }}
              className="sidebar__reset-btn  section__secondary-text"
            >
              Скинути фільтри
            </button>
            <label className="sidebar__field">
              <span className="sidebar__label">Розмір інвестицій</span>
              <div className="sidebar__price">
                <Field
                  className="sidebar__input section__primary-text"
                  type="text"
                  name="priceFrom"
                  placeholder="від"
                  onChange={(e: any) => {
                    values[e.currentTarget.name] = e.currentTarget.value;
                    setDebouncedChange(e);
                  }}
                />
                <p className="sidebar__price--text">—</p>
                <Field
                  className="sidebar__input section__primary-text"
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
            <label className="sidebar__field">
              <span className="sidebar__label">Валюта</span>
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
            <div className="sidebar__field">
              <span className="sidebar__label">Категорія</span>
              <ul className="sidebar__categories">
                {OurCategories.map(({ id, content }) => (
                  <li key={id} className="sidebar__category">
                    <Checkbox
                      datakey={id}
                      changeFilter={changeFilter}
                      text={content}
                      categories={filtersObjI.category ?? []}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <label className="sidebar__field">
              <span className="sidebar__label">Статус бізнесу</span>
              <Field
                type="text"
                name="currency"
                // setter={() => dispatch({ type: "toggle_currency" })}
                placeholder="Оберіть"
                defaultValue={[{ value: "Вже працює", label: "Вже працює" }]}
                component={CustomSelect}
                options={[
                  { value: "Вже працює", label: "Вже працює" },
                  { value: "На етапі створення", label: "На етапі створення" },
                ]}
              />
            </label>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Sidebar;
