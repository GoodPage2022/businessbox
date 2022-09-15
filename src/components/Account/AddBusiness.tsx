import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import CustomSelect from "../shared/CustomSelect";

const AddBusiness = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [files, setFiles] = useState<any>();
  const [addBusinessError, setAddBusinessError] = useState("");

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
      const filesToUpload = [...files];

      let images: any = [];
      await Promise.all(
        filesToUpload.map(async (f: any) => {
          const uploadedFiles: any = await uploadToServer(f);

          console.log("uploadedFiles");
          console.log(uploadedFiles);

          images.push({
            meta: {
              title: "",
              assets: "",
            },
            path: `/${uploadedFiles.data.fields.folder ?? `avatars`}/${
              uploadedFiles.data.files.file.originalFilename
            }`,
          });
        }),
      );

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
            escapeHtml(values.name);
            escapeHtml(values.business);
            escapeHtml(values.price);
            escapeHtml(values.description);
            escapeHtml(values.region);
            escapeHtml(values.year);
            escapeHtml(values.city);

            const errors: any = {};

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
                  <span className="addBusiness__label">Регіон</span>
                  <Field
                    type="text"
                    name="region"
                    required
                    placeholder="Україна"
                    component={CustomSelect}
                    options={[
                      { value: "yes", label: "Україна" },
                      { value: "category_1", label: "Не Україна" },
                    ]}
                  />
                </label>
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Місто</span>
                  <Field
                    type="text"
                    name="city"
                    required
                    placeholder="Дніпро"
                    component={CustomSelect}
                    options={[
                      { value: "yes", label: "Дніпро" },
                      { value: "category_1", label: "Київ" },
                      { value: "category_2", label: "Житомир" },
                      { value: "category_3", label: "Львів" },
                    ]}
                  />
                </label>
              </div>
              <div className="addBusiness__info-wrapper--right">
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
                      minLength={2}
                      maxLength={255}
                      required
                      placeholder="-----"
                    />
                    <span className="addBusiness__icon">$</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="addBusiness__addMedia-wrapper">
              <div className="addBusiness__addMedia-wrapper--image">
                <Image
                  className=""
                  src="/assets/images/add-media.png"
                  layout="fill"
                  objectFit="cover"
                  alt="building"
                />
              </div>
              <div className="addBusiness__addMedia-wrapper--add-file">
                <input
                  id="file"
                  name="file"
                  type="file"
                  multiple
                  accept="image/*,.png,.jpg"
                  className="addBusiness__custom-file-input"
                  data-label={`${
                    files && files.length > 0
                      ? `Додано ${files.length} медіафали`
                      : `Додати медіафали`
                  }`}
                  onChange={(e) => {
                    if (e.currentTarget.files) setFiles(e.currentTarget.files);
                  }}
                />
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
