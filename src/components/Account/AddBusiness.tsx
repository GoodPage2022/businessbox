import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomSelect from "../shared/CustomSelect";
import CrossSVG from "../../assets/svg/cross.svg";

const AddBusiness = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [files, setFiles] = useState<string[]>([]);
  const [addBusinessError, setAddBusinessError] = useState("");
  const [listAreas, setListAreas] = useState<any>();
  const [listCities, setListCities] = useState([]);
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

  // useEffect(()=>{
  //   console.log(listCities);
  // },[listCities])

  useEffect(()=>{
    getListAreas()
  },[])

  const removeFile = (url: string) => {
    setFiles(files.filter((f: any) => f != url))
  }

  const uploadToServer = async (file: any) => {
    const uploadImageURL = file;

    const formData = new FormData();
    formData.append("file", uploadImageURL);
    formData.append("folder", "businesses");

    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    console.log("send form");
    

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

  const handleSubmit = async (
    values: any,
    { resetForm, setFieldValue }: any,
  ) => {
    const { name, price, description, business, region, year, city, file } =
      values;

    let newBusiness: any = {
      title: name,
      area: business,
      price,
      description,
      region,
      year,
      city,
      file,
    };

    if (files) {
      const images = files.map((f: any) => ({
          meta: {
            title: "",
            assets: "",
          },
          path: f,
      }))

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

    return text.replace(/[&<>"']/g, function (m: any) {
      return map[m];
    });
  }

  return (
    <section className="addBusiness">
      <div className="container addBusiness__container">
        <Formik
          initialValues={{
            name: "",
            business: "",
            price: "",
            description: "",
            region: "",
            year: "",
            city: "",
            file: null,
          }}
          validate={(values: any) => {
            const errors: any = {};
            // if (typeof values.price != "number")
            //   error[]

            escapeHtml(values.name);
            escapeHtml(values.business);
            escapeHtml(values.price);
            escapeHtml(values.description);
            escapeHtml(values.region);
            escapeHtml(values.year);
            escapeHtml(values.city);

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="addBusiness__form">
            <div className="addBusiness__info-wrapper">
              <div className="addBusiness__info-wrapper--left">
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Назва</span>
                  <Field
                    className="addBusiness__input section__primary-text"
                    type="text"
                    name="name"
                    minLength={1}
                    maxLength={255}
                    required
                    placeholder="-----"
                  />
                </label>
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Категорія</span>
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
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Область</span>
                  <Field
                    type="text"
                    name="region"
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
              <div className="addBusiness__info-wrapper--right-desctop">
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Опис</span>
                  <Field
                    as="textarea"
                    className="addBusiness__textarea section__primary-text"
                    type="text"
                    name="description"
                    minLength={2}
                    maxLength={1000}
                    required
                    placeholder="Писати тут..."
                  />
                </label>
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Рік створення</span>
                  <Field
                    className="addBusiness__input section__primary-text"
                    type="text"
                    name="year"
                    minLength={2}
                    maxLength={255}
                    required
                    placeholder="-----"
                  />
                </label>
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Ціна</span>
                  <span className="addBusiness__input-thumb">
                    <Field
                      className="addBusiness__input section__primary-text"
                      type="text"
                      name="price"
                      pattern="[0-9]+"
                      minLength={2}
                      maxLength={255}
                      required
                      placeholder="-----"
                    />
                    <span className="addBusiness__icon">$</span>
                  </span>
                </label>
              </div>
              <div className="addBusiness__info-wrapper--right-mob">
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Рік створення</span>
                  <Field
                    className="addBusiness__input section__primary-text"
                    type="text"
                    name="year"
                    minLength={2}
                    maxLength={255}
                    required
                    placeholder="-----"
                  />
                </label>
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Ціна</span>
                  <span className="addBusiness__input-thumb">
                    <Field
                      className="addBusiness__input section__primary-text"
                      type="text"
                      name="price"
                      pattern="[0-9]+"
                      minLength={2}
                      maxLength={255}
                      required
                      placeholder="-----"
                    />
                    <span className="addBusiness__icon">$</span>
                  </span>
                </label>
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Опис</span>
                  <Field
                    as="textarea"
                    className="addBusiness__textarea section__primary-text"
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
            <span className="addBusiness__label">Медіа</span>
            <div className="addBusiness__addMedia-wrapper">
              {files && files.map((f: any, i: number) => <div key={i} className="addBusiness__addMedia-wrapper--image">
                <Image
                  className=""
                  src={f}
                  layout="fill"
                  objectFit="cover"
                  alt="building"
                />
                <button type="button" onClick={() => removeFile(f)} className="addBusiness__button-close">
                  <CrossSVG />
                </button>
              </div>)}
              <div className="addBusiness__addMedia-wrapper--add-file">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*,.png,.jpg"
                  className="addBusiness__custom-file-input--desctop"
                  data-label={`Додати медіафал`}
                  onChange={async (e) => {
                    if (e.currentTarget?.files?.length) {
                      const uploadedFiles: any = await uploadToServer(e.currentTarget.files[0]);
                      console.log(uploadedFiles.data.url);
                      setFiles([
                        ...files,
                        uploadedFiles.data.url
                      ]);
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
                      const uploadedFiles: any = await uploadToServer(e.currentTarget.files[0]);
                      console.log(uploadedFiles.data.url);
                      setFiles([
                        ...files,
                        uploadedFiles.data.url
                      ]);
                    }
                  }}
                />
                <CrossSVG />
              </div>
            </div>
            {addBusinessError && (
              <div className="addBusiness__failed">{addBusinessError}</div>
            )}
            <button type="submit" className="addBusiness__button">
              Далі
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default AddBusiness;
