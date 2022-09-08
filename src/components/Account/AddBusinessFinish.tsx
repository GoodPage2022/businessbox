import { Formik, Form, Field, FieldProps } from "formik";
import CustomSelect from "../shared/CustomSelect";

const AddBusinessFinish = () => {
  const handleSubmit = async (values: any, { resetForm }: any) => {
    resetForm({});
  };

  // const addBusinessSelect: React.FC<FieldProps & CustomSelectProps> = ({
  //   field,
  //   options,
  //   form,
  //   placeholder,
  //   setter,
  // }): JSX.Element => {
  //   return (
  //     <Select
  //       styles={customStyles}
  //       name={field.name}
  //       options={options}
  //       classNamePrefix="custom-select"
  //       // menuIsOpen
  //       placeholder={placeholder}
  //       onChange={(e) => {
  //         if (!!setter) setter(e.value);
  //         form.setFieldValue(field.name, e.value);
  //       }}
  //       value={
  //         options
  //           ? options.find((option: any) => option.value === field.value)
  //           : ""
  //       }
  //     />
  //   );
  // };

  // const customStyles = {
  //   dropdownIndicator: (base: any, state: any) => ({
  //     ...base,
  //     transition: "all .2s ease",
  //     transform: state.selectProps.menuIsOpen ? "rotate(90deg)" : null,
  //   }),
  //   menu: (provided: any, state: any) => ({
  //     ...provided,
  //     margin: "0",
  //     padding: 0,
  //     cursor: "pointer",
  //     boxShadow: "none",
  //   }),
  //   control: (styles: any, state: any) => ({}),
  //   option: (styles: any, state: any) => ({
  //     ...styles,
  //   }),
  //   valueContainer: (styles: any) => ({}),
  //   indicatorsContainer: (styles: any) => ({
  //     ...styles,
  //   }),

  //   input: (styles: any) => ({
  //     ...styles,
  //     opacity: "0",
  //     margin: "0",
  //     padding: "0",
  //   }),
  // };

  return (
    <section className="addBusinessFinish">
      <div className="container addBusinessFinish__container">
        <Formik
          initialValues={{
            ownership: "",
            quantityFounders: "",
            quantityEmployees: "",
            seasonality: "",
            turnoverPerYear: "",
            netProfit: "",
            grossProfit: "",
            turnoverNextYear: "",
            credits: "",
            returnEstimate: "",
            assetsAndEquipment: "",
            salaryFund: "",
            nonPermanentCosts: "",
            site: "",
            instagram: "",
            facebook: "",
            youtube: "",
            file: "",
            reviews: "",
            financialAccounting: "",
            CRM: "",
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
                    name="ownership"
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
                  name="quantityFounders"
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
                  name="quantityEmployees"
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
                    name="turnoverPerYear"
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
                    name="netProfit"
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
                    name="grossProfit"
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
                      name="turnoverNextYear"
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
                      name="credits"
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
                    name="returnEstimate"
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
                    name="assetsAndEquipment"
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
                    name="salaryFund"
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
                    name="nonPermanentCosts"
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
                  name="site"
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
                  name="reviews"
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
                  name="financialAccounting"
                  required
                  placeholder="-----"
                />
              </label>
              <label className="addBusinessFinish__field">
                <span className="addBusinessFinish__label">Наявність CRM</span>
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="CRM"
                  required
                  placeholder="-----"
                />
              </label>
            </div>
            <button
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
