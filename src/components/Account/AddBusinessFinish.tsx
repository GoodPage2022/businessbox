import { Formik, Form, Field } from "formik";
import CustomSelect from "../shared/CustomSelect";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomInput from "../shared/CustomInput";
import { Oval } from "react-loader-spinner";

const AddBusinessFinish = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [addBusinessError, setAddBusinessError] = useState("");
  const { businessId } = router.query;
  const [currency, setCurrency] = useState(localStorage.getItem("currency"));
  const [isGoBackClicked, setIsGoBackClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.onpopstate = () => {
      router.push(`/account/edit-business/${businessId}`);
    };
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
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
    } = values;

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
      _by: user._id,
    };

    try {
      const newBusinessResponse = await axios.post(`/api/businesses/post`, {
        data: newBusiness,
        user,
      });
      setAddBusinessError("");
      console.log("newUserResponse");
      console.log(newBusinessResponse);
      localStorage.removeItem("currency");
      if (isGoBackClicked) {
        router.push(`/account/edit-business/${businessId}`);
      } else {
        router.push(`/account/my-businesses`);
      }
    } catch (err: any) {
      setAddBusinessError("???? ????????, ?????????????? ??????????????. ?????????????????? ???? ??????");
      console.log("newUserResponse3");
      console.log(JSON.parse(err.response.data.err));
    }
    setIsLoading(false);
    resetForm({});
  };

  function escapeHtml(text: string) {
    const map: any = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
if (text == undefined) {
  return;
}
    return text.replace(/[&<>"']/g, function (m: any) {
      return map[m];
    });
  }

  return (
    <section className="addBusinessFinish">
      <div className="container addBusinessFinish__container">
        {isLoading && (
          <Oval
            height={150}
            width={150}
            color="#f22a4e"
            wrapperStyle={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "50vh",
              zIndex: "99999",
            }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#e95973"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        )}
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
            escapeHtml(values.property_form);
            escapeHtml(values.number_of_founders);
            escapeHtml(values.number_of_employees);
            escapeHtml(values.seasonality);
            escapeHtml(values.year_turnover);
            escapeHtml(values.monthly_net_profit);
            escapeHtml(values.gross_monthly_income);
            escapeHtml(values.estimated_turnover_next_year);
            escapeHtml(values.loans);
            escapeHtml(values.return_on_investment);
            escapeHtml(values.equipment_market_value);
            escapeHtml(values.monthly_salary_fund);
            escapeHtml(values.year_nonfixed_costs);
            escapeHtml(values.website);
            escapeHtml(values.loans);
            escapeHtml(values.instagram);
            escapeHtml(values.facebook);
            escapeHtml(values.youtube);
            escapeHtml(values.public_reviews);
            escapeHtml(values.financial_accounting_system);
            escapeHtml(values.crm);
            const errors: any = {};

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="addBusinessFinish__form">
                <div className="addBusinessFinish__first-wrapper">
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?????????? ??????????????????
                    </span>
                    <span className="addBusinessFinish__select--thumb">
                      <Field
                        className="addBusinessFinish__input section__primary-text"
                        type="text"
                        name="property_form"
                        // classNamePrefix="custom-select"
                        required={isGoBackClicked ? false : true}
                        placeholder="-----"
                        component={CustomSelect}
                        // className="addBusinessFinish__select section__primary-text"
                        options={[
                          { value: "????????????????", label: "????????????????" },
                          { value: "????????????????????", label: "????????????????????" },
                          { value: "????????????????", label: "????????????????" },
                        ]}
                      />

                      {/* <PolygonSVG className="addBusinessFinish__select--icon" /> */}
                    </span>
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?????????????????? ??????????????????????
                    </span>
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      name="number_of_founders"
                      minLength={1}
                      maxLength={255}
                      onChange={(e: any) => {
                        setFieldValue(
                          "number_of_founders",
                          e.target.value.replaceAll(
                            /[A-Za-z??-????-??,./'` ]/g,
                            "",
                          ),
                        );
                      }}
                      required={isGoBackClicked ? false : true}
                      component={CustomInput}
                      placeholder="-----"
                    />
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?????????????????? ??????????????????????
                    </span>
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      minLength={1}
                      maxLength={255}
                      onChange={(e: any) => {
                        setFieldValue(
                          "number_of_employees",
                          e.target.value.replaceAll(
                            /[A-Za-z??-????-??,./'` ]/g,
                            "",
                          ),
                        );
                      }}
                      name="number_of_employees"
                      placeholder="-----"
                    />
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?????? ???????????? ?????? ?????????????????????
                    </span>
                    <span className="addBusinessFinish__select--thumb">
                      <Field
                        // as="select"
                        component={CustomSelect}
                        className="addBusinessFinish__select section__primary-text"
                        type="text"
                        name="seasonality"
                        options={[
                          { value: "yes", label: "??????" },
                          { value: "no", label: "????" },
                        ]}
                        placeholder="??????"
                      >
                        {/* <option value="yes">??????</option>
                    <option value="no">????</option> */}
                      </Field>

                      {/* <PolygonSVG className="addBusinessFinish__select--icon" /> */}
                    </span>
                  </label>
                </div>
                <div className="addBusinessFinish__second-wrapper">
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ???????????? ???????????????? ????????
                    </span>
                    <span className="addBusinessFinish__input-thumb">
                      <Field
                        className="addBusinessFinish__input section__primary-text"
                        type="text"
                        name="year_turnover"
                        onChange={(e: any) => {
                          setFieldValue(
                            "year_turnover",
                            e.target.value.replaceAll(
                              /[A-Za-z??-????-??,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        minLength={1}
                        maxLength={255}
                        placeholder="-----"
                      />
                      <span className="addBusinessFinish__icon">
                        {currency === "????????????" ? "???" : "$"}
                      </span>
                    </span>
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ???????????????????? ???????????????????? ???????????? ????????????????
                    </span>
                    <span className="addBusinessFinish__input-thumb">
                      <Field
                        className="addBusinessFinish__input section__primary-text"
                        type="text"
                        name="monthly_net_profit"
                        minLength={1}
                        onChange={(e: any) => {
                          setFieldValue(
                            "monthly_net_profit",
                            e.target.value.replaceAll(
                              /[A-Za-z??-????-??,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        maxLength={255}
                        placeholder="-----"
                      />
                      <span className="addBusinessFinish__icon">
                        {currency === "????????????" ? "???" : "$"}
                      </span>
                    </span>
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ???????????????????? ?????????????? ?????????? ????????????????????
                    </span>
                    <span className="addBusinessFinish__input-thumb">
                      <Field
                        className="addBusinessFinish__input section__primary-text"
                        type="text"
                        name="gross_monthly_income"
                        minLength={1}
                        onChange={(e: any) => {
                          setFieldValue(
                            "gross_monthly_income",
                            e.target.value.replaceAll(
                              /[A-Za-z??-????-??,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        maxLength={255}
                        placeholder="-----"
                      />
                      <span className="addBusinessFinish__icon">
                        {currency === "????????????" ? "???" : "$"}
                      </span>
                    </span>
                  </label>
                </div>
                <div className="addBusinessFinish__third-wrapper">
                  <div className="addBusinessFinish__third-wrapper--left">
                    <label className="addBusinessFinish__field">
                      <span className="addBusinessFinish__label">
                        ?????????????????????????? ???????????? ???????????????????? ????????
                      </span>
                      <span className="addBusinessFinish__input-thumb">
                        <Field
                          className="addBusinessFinish__input section__primary-text"
                          type="text"
                          name="estimated_turnover_next_year"
                          minLength={1}
                          onChange={(e: any) => {
                            setFieldValue(
                              "estimated_turnover_next_year",
                              e.target.value.replaceAll(
                                /[A-Za-z??-????-??,./'` ]/g,
                                "",
                              ),
                            );
                          }}
                          maxLength={255}
                          placeholder="-----"
                        />
                        <span className="addBusinessFinish__icon">
                          {currency === "????????????" ? "???" : "$"}
                        </span>
                      </span>
                    </label>
                    <label className="addBusinessFinish__field__select">
                      <span className="addBusinessFinish__label">
                        ?????????????????? ????????????????
                      </span>
                      <span className="addBusinessFinish__select--thumb">
                        <Field
                          as="select"
                          className="addBusinessFinish__select--short section__primary-text"
                          type="text"
                          name="loans"
                          placeholder="????"
                          component={CustomSelect}
                          options={[
                            { value: "yes", label: "??????" },
                            { value: "no", label: "????" },
                          ]}
                        ></Field>
                      </span>
                    </label>
                  </div>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?????????????????????? ???????????? ?????????????????? ??????????????
                    </span>
                    <span className="addBusinessFinish__input-thumb">
                      <Field
                        className="addBusinessFinish__input section__primary-text"
                        type="text"
                        name="return_on_investment"
                        minLength={1}
                        onChange={(e: any) => {
                          setFieldValue(
                            "return_on_investment",
                            e.target.value.replaceAll(
                              /[A-Za-z??-????-??,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        maxLength={255}
                        placeholder="-----"
                      />
                      <span className="addBusinessFinish__icon">
                        {currency === "????????????" ? "???" : "$"}
                      </span>
                    </span>
                  </label>
                </div>
                <div className="addBusinessFinish__fourth-wrapper">
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?????????????????? ?????????????? ???????????????? ?????????????? ???? ????????????????????
                    </span>
                    <span className="addBusinessFinish__input-thumb">
                      <Field
                        className="addBusinessFinish__input section__primary-text"
                        type="text"
                        name="equipment_market_value"
                        minLength={1}
                        onChange={(e: any) => {
                          setFieldValue(
                            "equipment_market_value",
                            e.target.value.replaceAll(
                              /[A-Za-z??-????-??,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        maxLength={255}
                        placeholder="-----"
                      />
                      <span className="addBusinessFinish__icon">
                        {currency === "????????????" ? "???" : "$"}
                      </span>
                    </span>
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ???????????????????? ???????????????????? ???????? (???????????????????? ???????????? ???? ????????????)
                    </span>
                    <span className="addBusinessFinish__input-thumb">
                      <Field
                        className="addBusinessFinish__input section__primary-text"
                        type="text"
                        name="monthly_salary_fund"
                        onChange={(e: any) => {
                          setFieldValue(
                            "monthly_salary_fund",
                            e.target.value.replaceAll(
                              /[A-Za-z??-????-??,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        minLength={1}
                        maxLength={255}
                        placeholder="-----"
                      />
                      <span className="addBusinessFinish__icon">
                        {currency === "????????????" ? "???" : "$"}
                      </span>
                    </span>
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?????????????????? ???????? ?????????????????????? ???????????? ???????????????? ????????
                    </span>
                    <span className="addBusinessFinish__input-thumb">
                      <Field
                        className="addBusinessFinish__input section__primary-text"
                        type="text"
                        name="year_nonfixed_costs"
                        minLength={1}
                        onChange={(e: any) => {
                          setFieldValue(
                            "year_nonfixed_costs",
                            e.target.value.replaceAll(
                              /[A-Za-z??-????-??,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        maxLength={255}
                        placeholder="-----"
                      />
                      <span className="addBusinessFinish__icon">
                        {currency === "????????????" ? "???" : "$"}
                      </span>
                    </span>
                  </label>
                </div>
                <hr />
                <div className="addBusinessFinish__fifth-wrapper">
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ???????? ????????????????
                    </span>
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      name="website"
                      minLength={1}
                      maxLength={255}
                      placeholder="-----"
                    />
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">??????????????????</span>
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      name="instagram"
                      minLength={1}
                      maxLength={255}
                      placeholder="-----"
                    />
                  </label>
                </div>
                <div className="addBusinessFinish__sixth-wrapper">
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">??????????????</span>
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      name="facebook"
                      minLength={1}
                      maxLength={255}
                      placeholder="-----"
                    />
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">???????? ??????????</span>
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      name="youtube"
                      minLength={1}
                      maxLength={255}
                      placeholder="-----"
                    />
                  </label>
                </div>
                <div className="addBusinessFinish__seventh-wrapper">
                  <label className="addBusinessFinish__field">
                    <div className="addBusinessFinish__label-wrapper">
                      <span className="addBusinessFinish__label">
                        ?????????????? ?????? ????????????????, ???????????? ?? ??????
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
                      minLength={1}
                      maxLength={1000}
                      placeholder="-----"
                    />
                  </label>
                </div>
                <div className="addBusinessFinish__eighth-wrapper">
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?? ???????? ?????????????? ???????????????? ???????????????????? ???????????
                    </span>
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      name="financial_accounting_system"
                      minLength={1}
                      maxLength={255}
                      placeholder="-----"
                    />
                  </label>
                  <label className="addBusinessFinish__field">
                    <span className="addBusinessFinish__label">
                      ?????????????????? CRM
                    </span>
                    <Field
                      className="addBusinessFinish__input section__primary-text"
                      type="text"
                      name="crm"
                      minLength={1}
                      maxLength={255}
                      placeholder="-----"
                    />
                  </label>
                </div>
                {addBusinessError && (
                  <div className="addBusinessFinish__failed">
                    {addBusinessError}
                  </div>
                )}
                <div className="addBusinessFinish__buttons">
                  <button
                    type="submit"
                    onClick={
                      () => setIsGoBackClicked(true)
                      // router.push(`/account/edit-business/${businessId}`)
                    }
                    className="addBusinessFinish__button-back"
                  >
                    ??????????
                  </button>
                  <button
                    type="submit"
                    // onClick={() => router.push("/account/add-business-finish")}
                    className="addBusinessFinish__button"
                  >
                    ?????????????????????????? ????????????
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export default AddBusinessFinish;
