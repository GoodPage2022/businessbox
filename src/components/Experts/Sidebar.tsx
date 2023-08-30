import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Checkbox from "../shared/CheckboxExperts";
import CustomSelect from "../shared/CustomSelect";
import { useRouter } from "next/router";
import axios from "axios";
import { MainContext } from "../../contexts/mainContext";
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
  const [fieldsExpertise, setFieldsExpertise] = useState<any>([]);
  const [state, dispatch] = React.useContext(MainContext);

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
  // console.log(fieldsExpertise, "fieldsExpertise");

  useEffect(() => {
    getFieldsExpertise();
  }, []);

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
        }
      });
    }
    setFiltersObjI(filtersObjB);
  };

  useEffect(() => {
    buildFiltersObj();
  }, [filters]);

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
        {({ values }) => {
          return (
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

              <div className="sidebar__field">
                <span className="sidebar__label">Категорія</span>
                <ul className="sidebar__categories">
                  {fieldsExpertise &&
                    fieldsExpertise.map((item: string, index: number) => (
                      <li key={index} className="sidebar__category">
                        <Checkbox
                          datakey={index}
                          changeFilter={changeFilter}
                          text={item}
                          name="specialization"
                          specializations={filtersObjI.specialization ?? []}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Sidebar;
