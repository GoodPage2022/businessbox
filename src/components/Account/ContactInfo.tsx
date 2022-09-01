import Image from "next/image";
import { Formik, Form, Field } from "formik";

const ContactInfo = () => {
  const handleSubmit = async (values: any, { resetForm }: any) => {
    resetForm({});
  };

  return (
    <section className="contactInfo">
      <div className="container contactInfo__container">
        <div className="contactInfo__photo">
          <div className="contactInfo__image">
            <Image
              className=""
              src="/assets/images/profile-photo.png"
              layout="fill"
              objectFit="cover"
              alt="card-image"
            />
          </div>
          <button className="contactInfo__btn section__secondary-text">
            Змінити фото
          </button>
          <button className="contactInfo__btn section__secondary-text">
            Видалити фото
          </button>
        </div>

        <Formik
          initialValues={{ name: "", phone: "", wishes: "" }}
          validate={(values) => {
            const errors: any = {};

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="contactInfo__form">
            <div className="contactInfo__first-wrapper">
              <label className="contactInfo__field">
                <span className="contactInfo__label">Ім’я</span>
                <Field
                  className="contactInfo__input section__primary-text"
                  type="text"
                  name="name"
                  required
                  placeholder="Петро"
                />
              </label>
              <label className="contactInfo__field">
                <span className="contactInfo__label">Телефон</span>
                <Field
                  className="contactInfo__input section__primary-text"
                  type="text"
                  name="phone"
                  required
                  placeholder="+380 (__) __ __ __"
                />
              </label>
            </div>
            <div className="contactInfo__second-wrapper">
              <label className="contactInfo__field">
                <span className="contactInfo__label">Призвіще</span>
                <Field
                  className="contactInfo__input section__primary-text"
                  type="text"
                  name="surname"
                  required
                  placeholder="Петренко"
                />
              </label>
              <label className="contactInfo__field">
                <span className="contactInfo__label">Електрона пошта</span>
                <Field
                  className="contactInfo__input section__primary-text"
                  type="mail"
                  name="mail"
                  required
                  placeholder="example@mail.com"
                />
              </label>
            </div>
            <div className="contactInfo__third-wrapper">
              <label className="contactInfo__field">
                <span className="contactInfo__label">Місто</span>
                <Field
                  className="contactInfo__input section__primary-text"
                  type="text"
                  name="city"
                  required
                  placeholder="Дніпро"
                />
              </label>
              <label className="contactInfo__field">
                <span className="contactInfo__label">Сфера бізнесу</span>
                <Field
                  className="contactInfo__input section__primary-text"
                  type="text"
                  name="business"
                  required
                  placeholder="Графічний дизайн"
                />
              </label>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default ContactInfo;
