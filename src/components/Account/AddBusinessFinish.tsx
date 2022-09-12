import { Formik, Form, Field } from "formik";
import CustomSelect from "../shared/CustomSelect";
import { useRouter } from 'next/router'
import axios from "axios";
import { useSelector } from "react-redux";

const AddBusinessFinish = () => {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user);
  const { businessId } = router.query  
  
  const handleSubmit = async (values: any, { resetForm }: any) => {
    const {
      property_form,
      number_of_founders,
      number_of_employees,
      seasonality,
      year_turnover,
      monthly_net_profit,
      gross_monthly_income,
      estimated_turnover_next_year,
      loans,
      return_on_investment,
      equipment_market_value,
      monthly_salary_fund,
      year_nonfixed_costs,
      website,
      instagram,
      facebook,
      youtube,
      file,
      public_reviews,
      financial_accounting_system,
      crm,
    } = values

    const newBusiness = {
      _id: businessId,
      property_form,
      number_of_founders,
      number_of_employees,
      seasonality,
      year_turnover,
      monthly_net_profit,
      gross_monthly_income,
      estimated_turnover_next_year,
      loans,
      return_on_investment,
      equipment_market_value,
      monthly_salary_fund,
      year_nonfixed_costs,
      website,
      instagram,
      facebook,
      youtube,
      // file,
      public_reviews,
      financial_accounting_system,
      crm,
      _by: user._id
    };

    try {
      const newBusinessResponse = await axios.post(`/api/businesses/post`, {
        data: newBusiness,
        user,
      });

      router.push(`/account/my-businesses`)

      console.log("newUserResponse");
      console.log(newBusinessResponse);
    } catch (err: any) {
      console.log("newUserResponse3");
      console.log(JSON.parse(err.response.data.err));
    }

    resetForm({});
  };

  return (
    <section className="addBusinessFinish">
      <div className="container addBusinessFinish__container">
        <Formik
          initialValues={{
            property_form: "",
            number_of_founders: "",
            number_of_employees: "",
            seasonality: "",
            year_turnover: "",
            monthly_net_profit: "",
            gross_monthly_income: "",
            estimated_turnover_next_year: "",
            loans: "",
            return_on_investment: "",
            equipment_market_value: "",
            monthly_salary_fund: "",
            year_nonfixed_costs: "",
            website: "",
            instagram: "",
            facebook: "",
            youtube: "",
            file: "",
            public_reviews: "",
            financial_accounting_system: "",
            crm: "",
          }}
          validate={(values: any) => {
            const errors: any = {};

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="addBusinessFinish__form">
            <div className="addBusinessFinish__first-wrapper">
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Форма власності
                </span>
                <span className="addBusinessFinish__select--thumb">
                  <Field
                    className="addBusinessFinish__input section__primary-text"
                    type="text"
                    name="property_form"
                    // classNamePrefix="custom-select"
                    required
                    placeholder="-----"
                    component={CustomSelect}
                    // className="addBusinessFinish__select section__primary-text"
                    options={[
                      { value: "yes", label: "Так" },
                      { value: "no", label: "Ні" },
                    ]}
                  />

                  {/* <PolygonSVG className="addBusinessFinish__select--icon" /> */}
                </span>
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Кількість засновників
                </span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="number_of_founders"
                  required
                  placeholder="-----"
                />
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Кількість працівників
                </span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="number_of_employees"
                  required
                  placeholder="-----"
                />
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Ваш бізнес має сезонність?
                </span>
                <span className="addBusinessFinish__select--thumb">
                  <Field
                    // as="select"
                    component={CustomSelect}
                    className="addBusinessFinish__select section__primary-text"
                    type="text"
                    name="seasonality"
                    options={[
                      { value: "yes", label: "Так" },
                      { value: "no", label: "Ні" },
                    ]}
                    required
                    placeholder="Так"
                  >
                    {/* <option value="yes">Так</option>
                    <option value="no">Ні</option> */}
                  </Field>

                  {/* <PolygonSVG className="addBusinessFinish__select--icon" /> */}
                </span>
              </label>
            </div>
            <div className="addBusinessFinish__second-wrapper">
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Оборот протягом року
                </span>
                <span className="addBusinessFinish__input-thumb">
                  <Field
                    className="addBusinessFinish__input section__primary-text"
                    type="text"
                    name="year_turnover"
                    required
                    placeholder="-----"
                  />
                  <span className="addBusinessFinish__icon">$</span>
                </span>
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Приблизний щомісячний чистий прибуток
                </span>
                <span className="addBusinessFinish__input-thumb">
                  <Field
                    className="addBusinessFinish__input section__primary-text"
                    type="text"
                    name="monthly_net_profit"
                    required
                    placeholder="-----"
                  />
                  <span className="addBusinessFinish__icon">$</span>
                </span>
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Приблизний валовий дохід щомісячний
                </span>
                <span className="addBusinessFinish__input-thumb">
                  <Field
                    className="addBusinessFinish__input section__primary-text"
                    type="text"
                    name="gross_monthly_income"
                    required
                    placeholder="-----"
                  />
                  <span className="addBusinessFinish__icon">$</span>
                </span>
              </label>
            </div>
            <div className="addBusinessFinish__third-wrapper">
              <div className="addBusinessFinish__third-wrapper--left">
                <label className="addBusinessFinish__field">
                  <span className="addBusinessFinish__label">
                    Прогнозований оборот наступного року
                  </span>
                  <span className="addBusinessFinish__input-thumb">
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      name="estimated_turnover_next_year"
                      required
                      placeholder="-----"
                    />
                    <span className="addBusinessFinish__icon">$</span>
                  </span>
                </label>
                <label className="addBusinessFinish__field__select">
                  <span className="addBusinessFinish__label">
                    Наявність кредитів
                  </span>
                  <span className="addBusinessFinish__select--thumb">
                    <Field
                      as="select"
                      className="addBusinessFinish__select--short section__primary-text"
                      type="text"
                      name="loans"
                      placeholder="Ні"
                      component={CustomSelect}
                      options={[
                        { value: "yes", label: "Так" },
                        { value: "no", label: "Ні" },
                      ]}
                      required
                    ></Field>
                  </span>
                </label>
              </div>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Зразкова оцінка повернення інвестицій для покупця, враховуючи
                  бажану вартість продажу бізнесу
                </span>
                <span className="addBusinessFinish__input-thumb">
                  <Field
                    className="addBusinessFinish__input section__primary-text"
                    type="text"
                    name="return_on_investment"
                    required
                    placeholder="-----"
                  />
                  <span className="addBusinessFinish__icon">$</span>
                </span>
              </label>
            </div>
            <div className="addBusinessFinish__fourth-wrapper">
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Приблизна ринкова вартість активів та обладнання
                </span>
                <span className="addBusinessFinish__input-thumb">
                  <Field
                    className="addBusinessFinish__input section__primary-text"
                    type="text"
                    name="equipment_market_value"
                    required
                    placeholder="-----"
                  />
                  <span className="addBusinessFinish__icon">$</span>
                </span>
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Щомісячний зарплатний фонд (з огляду на премії та бонуси)
                </span>
                <span className="addBusinessFinish__input-thumb">
                  <Field
                    className="addBusinessFinish__input section__primary-text"
                    type="text"
                    name="monthly_salary_fund"
                    required
                    placeholder="-----"
                  />
                  <span className="addBusinessFinish__icon">$</span>
                </span>
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  Приблизна сума непостійних витрат за роком
                </span>
                <span className="addBusinessFinish__input-thumb">
                  <Field
                    className="addBusinessFinish__input section__primary-text"
                    type="text"
                    name="year_nonfixed_costs"
                    required
                    placeholder="-----"
                  />
                  <span className="addBusinessFinish__icon">$</span>
                </span>
              </label>
            </div>
            <hr />
            <div className="addBusinessFinish__fifth-wrapper">
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">Сайт компанії</span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="website"
                  required
                  placeholder="-----"
                />
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">Інстаграм</span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="instagram"
                  required
                  placeholder="-----"
                />
              </label>
            </div>
            <div className="addBusinessFinish__sixth-wrapper">
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">Фейсбук</span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="facebook"
                  required
                  placeholder="-----"
                />
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">Ютюб канал</span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="youtube"
                  required
                  placeholder="-----"
                />
              </label>
            </div>
            <div className="addBusinessFinish__seventh-wrapper">
              <label className="addBusinessFinish__field">
                <div className="addBusinessFinish__label-wrapper">
                  <span className="addBusinessFinish__label">
                    Відгуки про компанію, статті у ЗМІ
                  </span>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="addBusinessFinish__custom-file-input"
                    onChange={(event) => {
                      // setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                </div>
                <Field
                  as="textarea"
                  className="addBusinessFinish__textarea section__primary-text"
                  type="text"
                  name="public_reviews"
                  required
                  placeholder="-----"
                />
              </label>
            </div>
            <div className="addBusinessFinish__eighth-wrapper">
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">
                  У якій системі ведеться фінансовий облік?
                </span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="financial_accounting_system"
                  required
                  placeholder="-----"
                />
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">Наявність CRM</span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="crm"
                  required
                  placeholder="-----"
                />
              </label>
            </div>
            <button
              type="submit"
              // onClick={() => router.push("/account/add-business-finish")}
              className="addBusinessFinish__button"
            >
              Зареєструвати бізнес
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default AddBusinessFinish;
