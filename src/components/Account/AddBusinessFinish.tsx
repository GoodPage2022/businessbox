import { Formik, Form, Field } from "formik";
// import { useRouter } from "next/router";

const addBusinessFinish = () => {
  // const router = useRouter();
  const handleSubmit = async (values: any, { resetForm }: any) => {
    resetForm({});
  };

  return (
    <section className="addBusinessFinish">
      <div className="container addBusinessFinish__container">
        <Formik
          initialValues={{ name: "", phone: "", wishes: "" }}
          validate={(values) => {
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
                <Field
                  className="addBusinessFinish__input section__primary-text"
                  type="text"
                  name="ownership"
                  required
                  placeholder="-----"
                />
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
                <Field
                  as="select"
                  className="addBusinessFinish__select section__primary-text"
                  type="text"
                  name="seasonality"
                  required
                  placeholder="Так"
                >
                  <option value="yes">Так</option>
                  <option value="no">Ні</option>
                </Field>
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
                <label className="addBusinessFinish__field--select">
                  <span className="addBusinessFinish__label">
                    Наявність кредитів
                  </span>
                  <Field
                    as="select"
                    className="addBusinessFinish__select--short section__primary-text"
                    type="text"
                    name="credits"
                    required
                    placeholder="Ні"
                  >
                    <option value="yes">Так</option>
                    <option value="no">Ні</option>
                  </Field>
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

export default addBusinessFinish;
