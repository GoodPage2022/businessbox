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

  const getListAreas = async () => {
    try {
      const reponse = await axios.post("/api/locations/getAreas", {});

      if (reponse.status == 200) {
        setListAreas(reponse.data)
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  const getListCities = async (selectedArea: string) => {
    try {
      const reponse = await axios.post("/api/locations/getCities", { selectedArea });

      if (reponse.status == 200) {
        setListCities(reponse.data)
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  useEffect(()=>{
    getListCities(selectedArea)
  },[selectedArea])

  useEffect(()=>{
    getListAreas()
  },[])

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
      setSelectedArea(businessInfo.state._id)
      console.log(businessInfo.city._id);
      
      setLoading(false);
    }
  }, [businessInfo]);

  const handleSubmit = async (
    values: any,
    { resetForm, setFieldValue }: any,
  ) => {
    const { name, price, description, business, state, year, city } =
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
        display: listAreas.filter((e:any)=>e.value==state)[0].label
      },
      year,
      city: {
        _id: city,
        link: "Areas",
        display: listCities.filter((e:any)=>e.value==city)[0].label
      },
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

      router.push(`/catalog/${projectId}`);
      setAddBusinessError("");
      console.log("newBusinessResponse");
      console.log(newBusinessResponse);
    } catch (err: any) {
      setAddBusinessError("На жаль, виникла помилка. Спробуйте ще раз");
      console.log("newUserResponse3");
      console.log(JSON.parse(err.response.data.err));
    }

    // resetForm({});
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

  console.log(businessInfo);

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
                    placeholder="Графічний дизайн"
                    component={CustomSelect}
                    options={[
                      { value: "yes", label: "Графічний дизайн" },
                      { value: "category_1", label: "Категорія 2" },
                      { value: "category_2", label: "Категорія 3" },
                      { value: "category_3", label: "Категорія 4" },
                    ]}
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
                    minLength={2}
                    maxLength={1000}
                    required
                    placeholder="Писати тут..."
                  />
                </label>
                <label className="addBusinessEdit__field">
                  <span className="addBusinessEdit__label">Рік створення</span>
                  <Field
                    className="addBusinessEdit__input section__primary-text"
                    type="text"
                    name="year"
                    minLength={2}
                    maxLength={255}
                    required
                    placeholder="-----"
                  />
                </label>
                <label className="addBusinessEdit__field">
                  <span className="addBusinessEdit__label">Ціна</span>
                  <span className="addBusinessEdit__input-thumb">
                    <Field
                      className="addBusinessEdit__input section__primary-text"
                      type="text"
                      name="price"
                      minLength={2}
                      maxLength={255}
                      required
                      placeholder="-----"
                    />
                    <span className="addBusinessEdit__icon">$</span>
                  </span>
                </label>
              </div>
              <div className="addBusinessEdit__info-wrapper--right-mob">
                <label className="addBusinessEdit__field">
                  <span className="addBusinessEdit__label">Рік створення</span>
                  <Field
                    className="addBusinessEdit__input section__primary-text"
                    type="text"
                    name="year"
                    minLength={2}
                    maxLength={255}
                    required
                    placeholder="-----"
                  />
                </label>
                <label className="addBusinessEdit__field">
                  <span className="addBusinessEdit__label">Ціна</span>
                  <span className="addBusinessEdit__input-thumb">
                    <Field
                      className="addBusinessEdit__input section__primary-text"
                      type="text"
                      name="price"
                      pattern="[0-9]+"
                      minLength={2}
                      maxLength={255}
                      required
                      placeholder="-----"
                    />
                    <span className="addBusinessEdit__icon">$</span>
                  </span>
                </label>
                <label className="addBusinessEdit__field">
                  <span className="addBusinessEdit__label">Опис</span>
                  <Field
                    as="textarea"
                    className="addBusinessEdit__textarea section__primary-text"
                    type="text"
                    name="description"
                    minLength={2}
                    maxLength={1000}
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
                  data-label={`Додати медіафал`}
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
              <div className="addBusinessEdit__failed">{addBusinessError}</div>
            )}
            <div className="addBusinessEdit__buttons">
              <button
                onClick={() => dispatch({ type: "toggle_deleteBusiness" })}
                type="button"
                className="addBusinessEdit__delete-button"
              >
                Видалити
              </button>
              <button type="submit" className="addBusinessEdit__save-button">
                Зберегти
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <ModalDeleteBusiness onClose={closeModal} />
    </section>
  );
};

export default AddBusinessEdit;
