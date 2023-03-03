import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomSelect from "../shared/CustomSelect";
import Editor from "../shared/Editor";
import CrossSVG from "../../assets/svg/cross.svg";
import OurCategories from "../../constants/categories-select";
import { Oval } from "react-loader-spinner";
import CustomInput from "../shared/CustomInput";

const AddBusiness = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [files, setFiles] = useState<string[]>([]);
  const [tempFiles, setTempFiles] = useState<string[]>([]);
  const [addBusinessError, setAddBusinessError] = useState("");
  const [listAreas, setListAreas] = useState<any>();
  const [listCities, setListCities] = useState<any>();
  const [selectedArea, setSelectedArea] = useState("");
  const [currencyState, setCurrencyState] = useState("Гривня");
  const [isSentBusiness, setIsSentBusiness] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNegotiatedPrice, setIsNegotiatedPrice] = useState<boolean>(false);

  const getListAreas = async () => {
    setIsLoading(true);
    try {
      const reponse = await axios.post("/api/locations/getAreas", {});

      if (reponse.status == 200) {
        setListAreas(reponse.data);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
    setIsLoading(false);
  };

  const getListCities = async (selectedArea: string) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  useEffect(() => {
    getListCities(selectedArea);
  }, [selectedArea]);

  useEffect(() => {
    getListAreas();
  }, []);

  const removeFile = (url: string) => {
    setFiles(files.filter((f: any) => f != url));
  };

  const uploadToServer = async (file: any) => {
    setIsLoading(true);
    const uploadImageURL = file;

    const formData = new FormData();
    formData.append("file", uploadImageURL);
    formData.append("folder", "businesses");
    formData.append("subFolder", "temp");
    formData.append("userApiKey", user.api_key);
    formData.append("userEmail", user.email);

    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    console.log("send form");

    try {
      const response = await axios.post("/api/upload", formData, options);
      setTempFiles([...tempFiles, response.data.url]);
      console.log("reponse");
      console.log(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return error;
    }
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    if (files.length == 0) {
      setAddBusinessError("Додайте медіафайл");
      return;
    }
    setIsLoading(true);
    const { name, price, description, business, state, year, city, currency } =
      values;
    console.log(business);

    let newBusiness: any = {
      title: name,
      area: business,
      price: isNegotiatedPrice ? 0 : price,
      negotiatedPrice: isNegotiatedPrice,
      description,
      state: {
        _id: state,
        link: "Areas",
        display: listAreas.filter((e: any) => e.value == state)[0].label,
      },
      year,
      currency,
      city: {
        _id: city,
        link: "Areas",
        display: listCities.filter((e: any) => e.value == city)[0].label,
      },

      price_history: [
        {
          value: {
            price,
            date:
              new Date().getFullYear() +
              "-" +
              ("0" + new Date().getMonth()).slice(-2) +
              "-" +
              ("0" + new Date().getDate()).slice(-2),
          },
        },
      ],
    };
    console.log(newBusiness);

    if (files) {
      const images = files.map((f: any) => ({
        meta: {
          title: "",
          assets: "",
        },
        path: f,
      }));

      newBusiness["images"] = images;
    }

    console.log("newBusiness");
    console.log(newBusiness);

    try {
      const newBusinessResponse = await axios.post(`/api/businesses/post`, {
        data: newBusiness,
        user,
      });

      const formData = {
        folder: "businesses",
        subFolder: newBusinessResponse.data.data._id,
        tempPaths: tempFiles,
      };

      try {
        const reponse = await axios.post("/api/upload/moveFiles", formData);
        console.log("reponse");
        console.log(reponse);
      } catch (error) {
        console.log("error");
      }
      setIsSentBusiness(true);
      localStorage.setItem("currency", currencyState);
      router.push(
        `/account/add-business-finish/${newBusinessResponse.data.data._id}`,
      );

      setAddBusinessError("");
      console.log("newUserResponse");
      console.log(newBusinessResponse);
    } catch (err: any) {
      setAddBusinessError("На жаль, виникла помилка. Спробуйте ще раз");
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
    <section className="addBusiness">
      <div className="container addBusiness__container">
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
            name: "",
            business: [],
            price: "",
            negotiatedPrice: false,
            description: "",
            state: "",
            year: "",
            city: "",
            currency: "Гривня",
            file: null,
          }}
          validate={(values: any) => {
            escapeHtml(values.name);
            // escapeHtml(values.business);
            escapeHtml(values.price);
            escapeHtml(values.description);
            escapeHtml(values.state);
            escapeHtml(values.year);
            escapeHtml(values.city);
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="addBusiness__form">
                <div className="addBusiness__info-wrapper">
                  <div className="addBusiness__info-wrapper--left">
                    <label className="addBusiness__field">
                      <span className="addBusiness__label">Назва</span>
                      <Field
                        className="addBusiness__input section__primary-text"
                        type="text"
                        id="name"
                        name="name"
                        minLength={1}
                        maxLength={255}
                        required
                        placeholder="-----"
                        component={CustomInput}
                      />
                    </label>
                    <label className="addBusiness__field">
                      <span className="addBusiness__label">Категорія</span>
                      <Field
                        type="text"
                        name="business"
                        required
                        placeholder="Торгівля"
                        component={CustomSelect}
                        options={OurCategories}
                        isMulti={true}
                      />
                    </label>
                    <label className="addBusiness__field">
                      <span className="addBusiness__label">Область</span>
                      <Field
                        type="text"
                        name="state"
                        required
                        placeholder="Оберіть"
                        component={CustomSelect}
                        setter={setSelectedArea}
                        options={listAreas}
                      />
                    </label>
                    <label className="addBusiness__field">
                      <span className="addBusiness__label">Місто</span>
                      <Field
                        type="text"
                        name="city"
                        required
                        placeholder="Оберіть"
                        component={CustomSelect}
                        options={listCities}
                      />
                    </label>
                  </div>
                  {typeof window !== "undefined" && window.innerWidth > 767 && (
                    <div className="addBusiness__info-wrapper--right-desctop">
                      <div className="addBusiness__field">
                        <span className="addBusiness__label">Опис</span>
                        <Field
                          as="textarea"
                          className="addBusiness__textarea section__primary-text"
                          type="text"
                          name="description"
                          id="description"
                          minLength={1}
                          maxLength={2000}
                          required
                          placeholder="Писати тут..."
                          component={Editor}
                        />
                      </div>
                      <label className="addBusiness__field">
                        <span className="addBusiness__label">
                          Рік створення
                        </span>
                        <Field
                          className="addBusiness__input section__primary-text"
                          type="text"
                          required
                          name="year"
                          id="year"
                          minLength={1}
                          maxLength={255}
                          component={CustomInput}
                          onChange={(e: any) => {
                            setFieldValue(
                              "year",
                              e.target.value.replaceAll(
                                /[A-Za-zА-Яа-я,./'` ]/g,
                                "",
                              ),
                            );
                          }}
                          placeholder="-----"
                        />
                      </label>
                      <div
                        className={`addBusiness__price ${
                          isNegotiatedPrice ? "addBusiness__disabled" : ""
                        }`}
                      >
                        <label className="addBusiness__field addBusiness__mb">
                          <span className="addBusiness__label">Ціна</span>
                          <span className="addBusiness__input-thumb">
                            <Field
                              className="addBusiness__input section__primary-text "
                              type="text"
                              name="price"
                              id="price"
                              component={CustomInput}
                              pattern="[0-9]+"
                              onChange={(e: any) => {
                                setFieldValue(
                                  "price",
                                  e.target.value.replaceAll(
                                    /[A-Za-zА-Яа-я,./'` ]/g,
                                    "",
                                  ),
                                );
                              }}
                              minLength={1}
                              readOnly={isNegotiatedPrice}
                              maxLength={255}
                              required={isNegotiatedPrice ? false : true}
                              placeholder="-----"
                            />
                            <span className="addBusiness__icon">
                              {currencyState === "Гривня" ? "₴" : "$"}
                            </span>
                          </span>
                        </label>
                        <label
                          className={`addBusiness__field ${
                            isNegotiatedPrice ? "pointer-none" : ""
                          } `}
                        >
                          <span className="addBusiness__label">Валюта</span>
                          <Field
                            type="text"
                            name="currency"
                            setter={setCurrencyState}
                            placeholder="Оберіть"
                            component={CustomSelect}
                            options={[
                              { value: "Гривня", label: "Гривня" },
                              { value: "Долар", label: "Долар" },
                            ]}
                          />
                        </label>
                      </div>
                      <label className="addBusiness__field addBusiness__negotiatedPriceField">
                        <input
                          type="checkbox"
                          name="negotiatedPrice"
                          id=""
                          onChange={() => setIsNegotiatedPrice((prev) => !prev)}
                        />
                        <span className="addBusiness__label  addBusiness__negotiatedPriceLabel">
                          Договірна
                        </span>
                      </label>
                    </div>
                  )}
                  {typeof window !== "undefined" && window.innerWidth < 768 && (
                    <div className="addBusiness__info-wrapper--right-mob">
                      <label className="addBusiness__field">
                        <span className="addBusiness__label">
                          Рік створення
                        </span>
                        <Field
                          className="addBusiness__input section__primary-text"
                          type="text"
                          name="year"
                          id="year"
                          minLength={1}
                          maxLength={255}
                          component={CustomInput}
                          onChange={(e: any) => {
                            setFieldValue(
                              "year",
                              e.target.value.replaceAll(
                                /[A-Za-zА-Яа-я,./'` ]/g,
                                "",
                              ),
                            );
                          }}
                          required
                          placeholder="-----"
                        />
                      </label>
                      <div
                        className={`addBusiness__price ${
                          isNegotiatedPrice ? "addBusiness__disabled" : ""
                        }`}
                      >
                        <label className="addBusiness__field addBusiness__mb">
                          <span className="addBusiness__label">Ціна</span>
                          <span className="addBusiness__input-thumb">
                            <Field
                              className="addBusiness__input section__primary-text"
                              type="text"
                              name="price"
                              id="price"
                              pattern="[0-9]+"
                              minLength={1}
                              readOnly={isNegotiatedPrice}
                              maxLength={255}
                              required={isNegotiatedPrice ? false : true}
                              onChange={(e: any) => {
                                setFieldValue(
                                  "price",
                                  e.target.value.replaceAll(
                                    /[A-Za-zА-Яа-я,./'` ]/g,
                                    "",
                                  ),
                                );
                              }}
                              component={CustomInput}
                              placeholder="-----"
                            />
                            <span className="addBusiness__icon">
                              {currencyState === "Гривня" ? "₴" : "$"}
                            </span>
                          </span>
                        </label>
                        <label
                          className={`addBusiness__field ${
                            isNegotiatedPrice ? "pointer-none" : ""
                          } `}
                        >
                          <span className="addBusiness__label">Валюта</span>
                          <Field
                            type="text"
                            name="currency"
                            required
                            setter={setCurrencyState}
                            placeholder="Оберіть"
                            component={CustomSelect}
                            options={[
                              { value: "Гривня", label: "Гривня" },
                              { value: "Долар", label: "Долар" },
                            ]}
                          />
                        </label>
                      </div>
                      <label className="addBusiness__field addBusiness__negotiatedPriceField">
                        <input
                          type="checkbox"
                          name="negotiatedPrice"
                          id=""
                          onChange={() => setIsNegotiatedPrice((prev) => !prev)}
                        />
                        <span className="addBusiness__label  addBusiness__negotiatedPriceLabel">
                          Договірна
                        </span>
                      </label>
                      <div className="addBusiness__field">
                        <span className="addBusiness__label">Опис</span>
                        <Field
                          as="textarea"
                          className="addBusiness__textarea section__primary-text"
                          type="text"
                          name="description"
                          id="description"
                          minLength={1}
                          maxLength={2000}
                          required
                          placeholder="Писати тут..."
                          component={Editor}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <span className="addBusiness__label">Медіа</span>
                <div className="addBusiness__addMedia-wrapper">
                  {files &&
                    files.map((f: any, i: number) => (
                      <div
                        key={i}
                        className="addBusiness__addMedia-wrapper--image"
                      >
                        <Image
                          className=""
                          src={f}
                          layout="fill"
                          objectFit="cover"
                          alt="building"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(f)}
                          className="addBusiness__button-close"
                        >
                          <CrossSVG />
                        </button>
                      </div>
                    ))}
                  <div className="addBusiness__addMedia-wrapper--add-file">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*,.png,.jpg"
                      className="addBusiness__custom-file-input--desctop"
                      data-label={`Додати медіафайл`}
                      onChange={async (e) => {
                        if (e.currentTarget?.files?.length) {
                          const uploadedFiles: any = await uploadToServer(
                            e.currentTarget.files[0],
                          );
                          console.log(uploadedFiles.data.url);
                          setFiles([...files, uploadedFiles.data.url]);
                        }
                      }}
                    />
                    <input
                      id="file"
                      name="file"
                      type="file"
                      multiple
                      accept="image/*,.png,.jpg"
                      className="addBusiness__custom-file-input--mob"
                      // data-label={`${
                      //   files && files.length > 0
                      //     ? `Додано ${files.length} медіафали`
                      //     : `+`
                      // }`}
                      onChange={async (e) => {
                        if (e.currentTarget?.files?.length) {
                          const uploadedFiles: any = await uploadToServer(
                            e.currentTarget.files[0],
                          );
                          console.log(uploadedFiles.data.url);
                          setFiles([...files, uploadedFiles.data.url]);
                        }
                      }}
                    />
                    <CrossSVG />
                  </div>
                </div>
                {addBusinessError && (
                  <div className="addBusiness__failed">{addBusinessError}</div>
                )}
                <button
                  disabled={isSentBusiness ? true : false}
                  type="submit"
                  className="addBusiness__button"
                >
                  Далі
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export default AddBusiness;
