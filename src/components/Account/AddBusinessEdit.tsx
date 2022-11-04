import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomSelect from "../shared/CustomSelect";
import CrossSVG from "../../assets/svg/cross.svg";
import { MainContext } from "../../contexts/mainContext";
import React from "react";
import ModalDeleteBusiness from "../Modals/Modal-delete-business/Modal-delete-business";
import OurCategories from "../../constants/categories-select";

const AddBusinessEdit = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [files, setFiles] = useState<any>();
  const [addBusinessError, setAddBusinessError] = useState("");
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = React.useContext(MainContext);
  const [listAreas, setListAreas] = useState<any>();
  const [listCities, setListCities] = useState<any>();
  const [selectedArea, setSelectedArea] = useState("");
  const [isSentBusiness, setIsSentBusiness] = useState<boolean>(false);
  const [isSaveClicked, setIsSaveClicked] = useState<boolean>(false);
  const [isContinueClicked, setIsContinueClicked] = useState<boolean>(false);
  const [currencyState, setCurrencyState] = useState(businessInfo?.currency);

  const getListAreas = async () => {
    try {
      const reponse = await axios.post("/api/locations/getAreas", {});

      if (reponse.status == 200) {
        setListAreas(reponse.data);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const getListCities = async (selectedArea: string) => {
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
  };

  useEffect(() => {
    getListCities(selectedArea);
  }, [selectedArea]);

  useEffect(() => {
    getListAreas();
  }, []);

  const removeFile = (i: number) => {
    setFiles(
      files.filter((f: any, fi: number) => {
        console.log("fi", fi);

        return fi != i;
      }),
    );
  };
  const closeModal = () => {
    dispatch({ type: "toggle_deleteBusiness" });
  };

  const uploadToServer = async (file: any) => {
    const uploadImageURL = file;

    const formData = new FormData();
    formData.append("file", uploadImageURL);
    formData.append("folder", "businesses");
    formData.append("userApiKey", user.api_key);
    formData.append("userEmail", user.email);
    formData.append("subFolder", projectId);

    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const reponse = await axios.post("/api/upload", formData, options);
      console.log("reponse");
      console.log(reponse);
      return reponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getBusinessInfo = async () => {
    let response;

    try {
      console.log("start");
      console.log(user);
      console.log(projectId);

      response = await axios.post(`/api/businesses/get`, { user, projectId });
      console.log(response);

      if (response.data) {
        setBusinessInfo(response.data.entries[0]);
      }
    } catch (error) {
      router.push("/404");
    }
  };

  useEffect(() => {
    getBusinessInfo();
  }, []);

  useEffect(() => {
    if (businessInfo == null) {
      setLoading(true);
    } else {
      setFiles(businessInfo.images.map((img: any) => img.path));
      setSelectedArea(businessInfo.state._id);
      console.log(businessInfo.city._id);

      setLoading(false);
    }
  }, [businessInfo]);

  const handleSubmit = async (values: any) => {
    const { name, price, description, business, state, year, city, currency } =
      values;

    let newBusiness: any = {
      _id: projectId,
      title: name,
      area: business,
      price,
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
        ...businessInfo.price_history,
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
      console.log(newBusinessResponse);
      setAddBusinessError("");
      if (isSaveClicked) {
        router.push(`/catalog/${projectId}`);
      }
      if (isContinueClicked) {
        setIsSentBusiness(true);
        localStorage.setItem("currency", currencyState);
        router.push(`/account/edit-business-finish/${projectId}`);
      }
    } catch (err: any) {
      setAddBusinessError("На жаль, виникла помилка. Спробуйте ще раз");
      console.log("newUserResponse3");
      console.log(JSON.parse(err.response.data.err));
    }
  };

  function escapeHtml(text: string) {
    const map: any = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return text.replace(/[&<>"']/g, function (m: any) {
      return map[m];
    });
  }

  return (
    <section className="addBusinessEdit">
      <div className="container addBusinessEdit__container">
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: businessInfo != null ? businessInfo.title : "",
            business: businessInfo != null ? businessInfo.area : "",
            price: businessInfo != null ? businessInfo.price : "",
            description: businessInfo != null ? businessInfo.description : "",
            state: businessInfo != null ? businessInfo.state._id : "",
            year: businessInfo != null ? businessInfo.year : "",
            city: businessInfo != null ? businessInfo.city._id : "",
            // currency: businessInfo != null ? businessInfo.currency : "",
            file:
              businessInfo != null ? businessInfo.public_reviews_media : null,
          }}
          validate={(values: any) => {
            escapeHtml(values.name ?? "");
            escapeHtml(values.business ?? "");
            escapeHtml(values.price ?? "");
            escapeHtml(values.description ?? "");
            escapeHtml(values.state ?? "");
            escapeHtml(values.year ?? "");
            escapeHtml(values.city ?? "");

            const errors: any = {};

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="addBusinessEdit__form">
                <div className="addBusinessEdit__info-wrapper">
                  <div className="addBusinessEdit__info-wrapper--left">
                    <label className="addBusinessEdit__field">
                      <span className="addBusinessEdit__label">Назва</span>
                      <Field
                        className="addBusinessEdit__input section__primary-text"
                        type="text"
                        name="name"
                        minLength={1}
                        maxLength={255}
                        required
                        placeholder="-----"
                      />
                    </label>
                    <label className="addBusinessEdit__field">
                      <span className="addBusinessEdit__label">Категорія</span>
                      <Field
                        type="text"
                        name="business"
                        required
                        placeholder="Торгівля"
                        component={CustomSelect}
                        options={OurCategories}
                      />
                    </label>
                    <label className="addBusinessEdit__field">
                      <span className="addBusinessEdit__label">Область</span>
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
                    <label className="addBusinessEdit__field">
                      <span className="addBusinessEdit__label">Місто</span>
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
                  <div className="addBusinessEdit__info-wrapper--right-desctop">
                    <label className="addBusinessEdit__field">
                      <span className="addBusinessEdit__label">Опис</span>
                      <Field
                        as="textarea"
                        className="addBusinessEdit__textarea section__primary-text"
                        type="text"
                        name="description"
                        minLength={1}
                        maxLength={2000}
                        required
                        placeholder="Писати тут..."
                      />
                    </label>
                    <label className="addBusinessEdit__field">
                      <span className="addBusinessEdit__label">
                        Рік створення
                      </span>
                      <Field
                        className="addBusinessEdit__input section__primary-text"
                        type="text"
                        name="year"
                        minLength={1}
                        onChange={(e: any) => {
                          setFieldValue(
                            "year",
                            e.target.value.replaceAll(
                              /[A-Za-zА-Яа-я,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        maxLength={255}
                        required
                        placeholder="-----"
                      />
                    </label>{" "}
                    <div className="addBusinessEdit__price">
                      <label className="addBusinessEdit__field">
                        <span className="addBusinessEdit__label">Ціна</span>
                        <span className="addBusinessEdit__input-thumb">
                          <Field
                            className="addBusinessEdit__input section__primary-text"
                            type="text"
                            name="price"
                            minLength={1}
                            onChange={(e: any) => {
                              setFieldValue(
                                "price",
                                e.target.value.replaceAll(
                                  /[A-Za-zА-Яа-я,./'` ]/g,
                                  "",
                                ),
                              );
                            }}
                            maxLength={255}
                            required
                            placeholder="-----"
                          />
                          <span className="addBusinessEdit__icon">
                            {currencyState === "Гривня" ? "₴" : "$"}
                          </span>
                        </span>
                      </label>
                      <label className="addBusinessEdit__field">
                        <span className="addBusinessEdit__label">Валюта</span>
                        <Field
                          type="text"
                          name="currency"
                          required
                          placeholder="Оберіть"
                          setter={setCurrencyState}
                          component={CustomSelect}
                          options={[
                            { value: "Гривня", label: "Гривня" },
                            { value: "Долар", label: "Долар" },
                          ]}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="addBusinessEdit__info-wrapper--right-mob">
                    <label className="addBusinessEdit__field">
                      <span className="addBusinessEdit__label">
                        Рік створення
                      </span>
                      <Field
                        className="addBusinessEdit__input section__primary-text"
                        type="text"
                        name="year"
                        onChange={(e: any) => {
                          setFieldValue(
                            "year",
                            e.target.value.replaceAll(
                              /[A-Za-zА-Яа-я,./'` ]/g,
                              "",
                            ),
                          );
                        }}
                        minLength={1}
                        maxLength={255}
                        required
                        placeholder="-----"
                      />
                    </label>
                    <div className="addBusinessEdit__price">
                      <label className="addBusinessEdit__field">
                        <span className="addBusinessEdit__label">Ціна</span>
                        <span className="addBusinessEdit__input-thumb">
                          <Field
                            className="addBusinessEdit__input section__primary-text"
                            type="text"
                            name="price"
                            pattern="[0-9]+"
                            minLength={1}
                            onChange={(e: any) => {
                              setFieldValue(
                                "price",
                                e.target.value.replaceAll(
                                  /[A-Za-zА-Яа-я,./'` ]/g,
                                  "",
                                ),
                              );
                            }}
                            maxLength={255}
                            required
                            placeholder="-----"
                          />
                          <span className="addBusinessEdit__icon">
                            {businessInfo?.currency === "Гривня" ? "₴" : "$"}
                          </span>
                        </span>
                      </label>
                      <label className="addBusinessEdit__field">
                        <span className="addBusinessEdit__label">Валюта</span>
                        <Field
                          type="text"
                          name="currency"
                          required
                          placeholder="Оберіть"
                          component={CustomSelect}
                          options={[
                            { value: "Гривня", label: "Гривня" },
                            { value: "Долар", label: "Долар" },
                          ]}
                        />
                      </label>
                    </div>
                    <label className="addBusinessEdit__field">
                      <span className="addBusinessEdit__label">Опис</span>
                      <Field
                        as="textarea"
                        className="addBusinessEdit__textarea section__primary-text"
                        type="text"
                        name="description"
                        minLength={1}
                        maxLength={2000}
                        required
                        placeholder="Писати тут..."
                      />
                    </label>
                  </div>
                </div>
                <span className="addBusinessEdit__label">Медіа</span>
                <div className="addBusinessEdit__addMedia-wrapper">
                  {files?.map((f: string, i: number) => (
                    <div
                      key={i}
                      className="addBusinessEdit__addMedia-wrapper--image"
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
                        onClick={() => removeFile(i)}
                        className="addBusinessEdit__button-close"
                      >
                        <CrossSVG />
                      </button>
                    </div>
                  ))}
                  <div className="addBusinessEdit__addMedia-wrapper--add-file">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      multiple
                      accept="image/*,.png,.jpg"
                      className="addBusinessEdit__custom-file-input--desctop"
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
                      className="addBusinessEdit__custom-file-input--mob"
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
                  <div className="addBusinessEdit__failed">
                    {addBusinessError}
                  </div>
                )}
                <div className="addBusinessEdit__buttons">
                  <button
                    onClick={() => dispatch({ type: "toggle_deleteBusiness" })}
                    type="button"
                    className="addBusinessEdit__delete-button"
                  >
                    Видалити
                  </button>
                  <div className="addBusinessEdit__buttons-wrapper">
                    <button
                      disabled={isSentBusiness ? true : false}
                      type="submit"
                      onClick={() => setIsContinueClicked(true)}
                      className="addBusiness__button"
                    >
                      Далі
                    </button>
                    <button
                      type="submit"
                      className="addBusinessEdit__save-button"
                      onClick={() => setIsSaveClicked(true)}
                    >
                      Зберегти
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ModalDeleteBusiness
        projectId={projectId}
        projectTitle={businessInfo?.title}
        onClose={closeModal}
      />
    </section>
  );
};

export default AddBusinessEdit;
