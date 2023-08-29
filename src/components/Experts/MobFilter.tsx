import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Checkbox from "../shared/CheckboxExperts";
import CustomSelect from "../shared/CustomSelect";
import OurCategories from "../../constants/categories";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import MoreCategoriesSVG from "../../assets/svg/more-categ.svg";
import { MainContext } from "../../contexts/mainContext";
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
              <button
                type="button"
                onClick={() => {
                  changeFilter("e", true);
                }}
                className="mobFilter__reset-btn  section__secondary-text"
              >
                Скинути фільтри
              </button>

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
                        )
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
                        )
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

              <button
                className="mobFilter__button"
                onClick={() => dispatch({ type: "toggle_mobFilter" })}
              >
                Застосувати фільтри
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MobFilter;
