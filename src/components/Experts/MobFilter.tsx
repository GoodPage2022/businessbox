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
  const [cutFieldsExpertise, setCutFieldsExpertise] = useState<any>(null);
  const [isCutFieldsExpertise, setIsCutFieldsExpertise] = useState<any>(false);
  const router = useRouter();
  const { filters } = router.query;
  const [state, dispatch] = React.useContext(MainContext);
  const [fieldsExpertise, setFieldsExpertise] = useState<any>([]);

  console.log(isCutFieldsExpertise, "cutFieldsExpertise");

  const getFieldsExpertise = async () => {
    try {
      const response = await axios.post("/api/experts/getFieldsExpertise", {});

      if (response.status == 200) {
        setFieldsExpertise(response.data);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  useEffect(() => {
    getFieldsExpertise();
  }, []);

  useEffect(() => {
    if (fieldsExpertise.length > 10) {
      setCutFieldsExpertise(fieldsExpertise.slice(0, 10));
    }
  }, [fieldsExpertise]);

  useEffect(() => {
    console.log(filtersObjI.specialization, cutFieldsExpertise, "cutf");
    if (filtersObjI.specialization != undefined || cutFieldsExpertise == null) {
      setIsCutFieldsExpertise(false);
    } else {
      setIsCutFieldsExpertise(true);
    }
  }, [filtersObjI, fieldsExpertise]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    resetForm({});
  };

  const buildFiltersObj = () => {
    let filtersObjB: any = {};

    if (filters && Array.isArray(filters)) {
      filters.map((f: string, i: number) => {
        if (i % 2 == 1) {
          if (filters[i - 1] == "specialization") {
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

  console.log(fieldsExpertise, "fieldsExpertise");

  useEffect(() => {
    buildFiltersObj();
  }, [filters]);

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
                  {isCutFieldsExpertise
                    ? cutFieldsExpertise?.map(
                        ({ id, content }: { id: any; content: any }) => (
                          <li key={id} className="mobFilter__category">
                            <Checkbox
                              datakey={id}
                              changeFilter={changeFilter}
                              text={content}
                              specializations={filtersObjI.specialization ?? []}
                            />
                          </li>
                        )
                      )
                    : fieldsExpertise.map((item: string, index: number) => (
                        <li key={index} className="mobFilter__category">
                          <Checkbox
                            datakey={index}
                            changeFilter={changeFilter}
                            text={item}
                            specializations={filtersObjI.specialization ?? []}
                          />
                        </li>
                      ))}
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
                {isCutFieldsExpertise && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCutFieldsExpertise(false);
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
