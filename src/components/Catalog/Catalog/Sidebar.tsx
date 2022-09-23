import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Checkbox from "../../shared/Checkbox";
import CustomSelect from "../../shared/CustomSelect";
import OurCategories from "../../../constants/categories";
import { useRouter } from "next/router";

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
    if (filters) {
      buildFiltersObj();
    }
  }, [filters]);

  useEffect(() => {
    setInitialValues({
      priceTo: filtersObjI.priceTo ?? "",
      priceFrom: filtersObjI.priceFrom ?? "",
      city: filtersObjI.city ?? "",
      state: filtersObjI.state ?? "",
    });
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
            <label className="sidebar__field">
              <span className="sidebar__label">Ціна</span>
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
            </label>
            <label className="sidebar__field">
              <span className="sidebar__label">Область</span>
              <Field
                component={CustomSelect}
                className="sidebar__select section__primary-text"
                type="text"
                name="state"
                options={[
                  { value: "Так", label: "Так" },
                  { value: "Ні", label: "Ні" },
                ]}
                changeFilter={changeFilter}
                required
                placeholder="-----"
              ></Field>
            </label>
            <label className="sidebar__field">
              <span className="sidebar__label">Місто</span>
              <Field
                type="text"
                name="city"
                required
                placeholder="-----"
                component={CustomSelect}
                changeFilter={changeFilter}
                options={[
                  { value: "Київ", label: "Київ" },
                  { value: "Дніпро", label: "Дніпро" },
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
