import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

const AddBusiness = () => {
  const router = useRouter();

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const { name, phone, price, description, business } = values;

    const newBusiness = {
      data: {
        title: name,
        area: business,
        price,
        description,
        // file,
      },
    };

    try {
      const newBusinessResponse = await axios.post(
        `${process.env.cockpitApiUrl}/collections/save/Businesses?token=${process.env.cockpitApiToken}`,
        newBusiness,
      );
      console.log("newUserResponse");
      console.log(newBusinessResponse);
    } catch (err: any) {
      console.log("newUserResponse3");
      console.log(err);
    }

    resetForm({});
  };

  return (
    <section className="addBusiness">
      <div className="container addBusiness__container">
        <Formik
          initialValues={{
            name: "",
            phone: "",
            business: "",
            price: "",
            description: "",
            file: "",
          }}
          validate={(values: any) => {
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
                    required
                    placeholder="-----"
                  />
                </label>
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Категорія</span>
                  <Field
                    className="addBusiness__input section__primary-text"
                    type="text"
                    name="business"
                    required
                    placeholder="Графічний дизайн"
                  />
                </label>
                <label className="addBusiness__field">
                  <span className="addBusiness__label">Ціна</span>
                  <span className="addBusiness__input-thumb">
                    <Field
                      className="addBusiness__input section__primary-text"
                      type="text"
                      name="price"
                      required
                      placeholder="-----"
                    />
                    <span className="addBusiness__icon">$</span>
                  </span>
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
                    required
                    placeholder="Писати тут..."
                  />
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
                  className="addBusiness__custom-file-input"
                  onChange={(event) => {
                    // setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => router.push("/account/add-business-finish")}
              className="addBusiness__button"
            >
              Далі
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default AddBusiness;
