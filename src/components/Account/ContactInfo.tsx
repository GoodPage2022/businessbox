import Image from "next/image";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import MaskedInput from "react-text-mask";

import ProfileData from "../../constants/profile-data";
import { MainContext } from "../../contexts/mainContext";
import MainButtonRed from "../shared/MainButtonRed";
import phoneNumberMask from "../../masks/phoneNumberMask";

const ContactInfo = () => {
  const defaultAvatar = "/assets/images/profile-photo.png";
  const [avatar, setAvatar] = useState(defaultAvatar);

  const [state, dispatch] = React.useContext(MainContext);

  const [name, setName] = useState(ProfileData.name);
  const [lastname, setLastname] = useState(ProfileData.lastname);
  const [city, setCity] = useState(ProfileData.city);
  const [email, setEmail] = useState(ProfileData.email);
  const [phone, setPhone] = useState(ProfileData.phone);
  const [businessSphere, setBusinessSphere] = useState(
    ProfileData.businessSphere,
  );

  const handleSubmit = async (values: any, { resetForm }: any) => {
    dispatch({ type: "toggle_edit" });
    resetForm({});
  };

  const uploadToServer = async (e: any) => {
    const uploadImageURL = e.target.files[0];

    const body = new FormData();
    body.append("file", uploadImageURL);
    await fetch("/api/upload", {
      method: "POST",
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setAvatar(`/avatars/${r.files.file.originalFilename}`);
      });
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
              onChange={uploadToServer}
            />

            <button
              className="contactInfo__btn section__secondary-text"
              onClick={() => setAvatar(defaultAvatar)}
            >
              Видалити фото
            </button>
          </div>

          <Formik
            initialValues={{ name: "", phone: "", wishes: "", email: "" }}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

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
                    readOnly={state.isEdit ? false : true}
                    required
                    placeholder="Петро"
                  />
                </label>
                <label className="contactInfo__field">
                  <span className="contactInfo__label">Телефон</span>
                  <Field
                    name="phone"
                    render={({ field }: { field: any }) => (
                      <MaskedInput
                        {...field}
                        mask={phoneNumberMask}
                        placeholder="+380 (__) __ __ __"
                        type="text"
                        value={phone}
                        readOnly={state.isEdit ? false : true}
                        required
                        onChange={(e: any) => setPhone(e.target.value)}
                        className="contactInfo__input section__primary-text"
                      />
                    )}
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
                    readOnly={state.isEdit ? false : true}
                    required
                    placeholder="Петренко"
                  />
                </label>
                <label className="contactInfo__field">
                  <span className="contactInfo__label">Електронна пошта</span>
                  <Field
                    className="contactInfo__input section__primary-text"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    readOnly={state.isEdit ? false : true}
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
                    readOnly={state.isEdit ? false : true}
                    required
                    placeholder="Дніпро"
                  />
                </label>
                <label className="contactInfo__field">
                  <span className="contactInfo__label">Категорія</span>
                  <Field
                    className="contactInfo__input section__primary-text"
                    type="text"
                    name="business"
                    value={businessSphere}
                    onChange={(e: any) => setBusinessSphere(e.target.value)}
                    readOnly={state.isEdit ? false : true}
                    required
                    placeholder="Графічний дизайн"
                  />
                </label>
              </div>
              {state.isEdit ? (
                <div
                  className="contactInfo__submit-btn"
                  // onClick={() => dispatch({ type: "toggle_edit" })}
                >
                  <MainButtonRed label="Зберегти" />
                </div>
              ) : null}
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
