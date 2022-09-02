import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import ProfileData from "../../constants/profile-data";
import { AccountEditButtonContext } from "../../contexts/AccountEditButton";
import React from "react";
import MainButtonRed from "../shared/MainButtonRed";

const ContactInfo = () => {
  const [avatar, setAvatar]: [any, any] = useState(
    "/assets/images/profile-photo.png",
  );
  const [state, dispatch] = React.useContext(AccountEditButtonContext);
  console.log(state.active);

  const [name, setName] = useState(ProfileData.name);
  const [lastname, setLastname] = useState(ProfileData.lastname);
  const [city, setCity] = useState(ProfileData.city);
  const [mail, setMail] = useState(ProfileData.mail);
  const [phone, setPhone] = useState(ProfileData.phone);
  const [businessSphere, setBusinessSphere] = useState(
    ProfileData.businessSphere,
  );
  const [isEdit, setIsEdit] = useState();
  const handleSubmit = async (values: any, { resetForm }: any) => {
    resetForm({});
  };

  const handleUpload = async (e: any) => {
    const formData = new FormData();
    if (e.target.files != null) {
      formData.append("image", e.target.files[0]);

      const res = await fetch("someUrl", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setAvatar(data);
    }
  };

  return (
    <section className="contactInfo">
      <div className="container contactInfo__container">
        <div className="contactInfo__profile">
          <div className="contactInfo__photo">
            <div className="contactInfo__image">
              <Image
                className=""
                src={avatar}
                layout="fill"
                objectFit="cover"
                alt="card-image"
              />
            </div>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/*,.png,.jpg"
              className="contactInfo__custom-file-input"
              onChange={handleUpload}
            />
            {/* <button className="contactInfo__btn section__secondary-text">
            Змінити фото
          </button> */}
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
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    readOnly={state.active ? false : true}
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
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                    readOnly={state.active ? false : true}
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
                    name="lastname"
                    value={lastname}
                    onChange={(e: any) => setLastname(e.target.value)}
                    readOnly={state.active ? false : true}
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
                    value={mail}
                    onChange={(e: any) => setMail(e.target.value)}
                    readOnly={state.active ? false : true}
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
                    value={city}
                    onChange={(e: any) => setCity(e.target.value)}
                    readOnly={state.active ? false : true}
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
                    value={businessSphere}
                    onChange={(e: any) => setBusinessSphere(e.target.value)}
                    readOnly={state.active ? false : true}
                    required
                    placeholder="Графічний дизайн"
                  />
                </label>
              </div>
            </Form>
          </Formik>
        </div>
        {state.active ? (
          <div
            className="contactInfo__submit-btn"
            onClick={() => dispatch({ type: "toggle_edit" })}
          >
            <MainButtonRed label="Зберегти" />
          </div> // <button onClick={() => dispatch({ type: "toggle_edit" })}>
        ) : // </button>
        null}
      </div>
    </section>
  );
};

export default ContactInfo;
