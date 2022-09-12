import { Formik, Form, Field } from "formik";
import Checkbox from "../../shared/Checkbox";
import CustomSelect from "../../shared/CustomSelect";
import OurCategories from "../../../constants/categories";

const Sidebar = () => {
  const handleSubmit = async (values: any, { resetForm }: any) => {
    resetForm({});
  };

  return (
    <div className="sidebar">
      <Formik
        initialValues={{
          price: "",
          businessSphere: "",
          city: "",
          region: "",
        }}
        validate={(values: any) => {
          const errors: any = {};

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form className="sidebar__form">
          <label className="sidebar__field">
            <span className="sidebar__label">Ціна</span>
            <div className="sidebar__price">
              <Field
                className="sidebar__input section__primary-text"
                type="text"
                name="from"
                placeholder="від"
              />
              <p className="sidebar__price--text">—</p>
              <Field
                className="sidebar__input section__primary-text"
                type="text"
                name="to"
                placeholder="до"
              />
            </div>
          </label>
          <label className="sidebar__field">
            <span className="sidebar__label">Категорія</span>
            <ul className="sidebar__categories">
              {OurCategories.map(({ id, content }) => (
                <li key={id} className="sidebar__category">
                  <Checkbox text={content} />
                </li>
              ))}
            </ul>
          </label>
          <label className="sidebar__field">
            <span className="sidebar__label">Регіон</span>
            <Field
              component={CustomSelect}
              className="sidebar__select section__primary-text"
              type="text"
              name="businessSphere"
              options={[
                { value: "yes", label: "Так" },
                { value: "no", label: "Ні" },
              ]}
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
              options={[
                { value: "yes", label: "Так" },
                { value: "no", label: "Ні" },
              ]}
            />
          </label>
        </Form>
      </Formik>
    </div>
  );
};

export default Sidebar;
