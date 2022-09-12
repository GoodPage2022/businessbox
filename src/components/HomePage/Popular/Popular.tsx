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
import PopularCards from "../../../constants/popular";
import PopularCard from "../../shared/BusinessCard";

const Popular = () => {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  const [cards, setCards] = useState<any>([]);
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  const getBusinesses = async () => {
    const response = await axios.post(`/api/businesses/getList`, { user });

    if (response.data) {
      setCards(response.data.entries);
      return response.data.entries;
    }

    setCards([]);
    return [];
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    resetForm({});
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <section className="popular">
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
          </div>
          <div className="popular__buttons--right">
            {/* <IconButton borderColor="#0C0C0C" icon={<DotsSVG />} /> */}
            {/* <IconButton borderColor="#0C0C0C" icon={<LinesSVG />} /> */}
          </div>
        </div>
        {isShowFilter && (
          <div className="popular__filter">
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
              <Form className="popular__form">
                <label className="popular__field">
                  <span className="popular__label">Ціна</span>
                  <Field
                    type="text"
                    name="price"
                    required
                    placeholder="-----"
                    component={CustomSelect}
                    options={[
                      { value: "yes", label: "Так" },
                      { value: "no", label: "Ні" },
                    ]}
                  />
                </label>
                <label className="popular__field">
                  <span className="popular__label">Область</span>
                  <Field
                    type="text"
                    name="region"
                    required
                    placeholder="-----"
                    component={CustomSelect}
                    options={[
                      { value: "yes", label: "Так" },
                      { value: "no", label: "Ні" },
                    ]}
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
                  />
                </label>
                <label className="popular__field">
                  <span className="popular__label">Сфера бізнесу</span>
                  <Field
                    component={CustomSelect}
                    className="popular__select section__primary-text"
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
              </Form>
            </Formik>
          </div>
        )}
        <div className="popular__title">
          <h2 className="title">Найпопулярніші</h2>
          <button
            className="popular__title-button"
            onClick={() => router.push("/catalog")}
          >
            Підібрати бізнес
          </button>
        </div>

        <ul className="popular__cards">
          {cards.map(({ _id, title, description, images, view_count, price, is_verified }: any) => (
            <PopularCard
              key={_id}
              alias={_id}
              title={title}
              description={description}
              image={
                images == null || !images.length
                  ? ""
                  : `${images[0].meta.assets == "" ? `` : `http://157.230.99.45:8082`}${images[0].path}`
              }
              price={price}
              views={view_count ?? 0}
              isVerified={is_verified}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Popular;
