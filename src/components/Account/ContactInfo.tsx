import Image from "next/image";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import MaskedInput from "react-text-mask";

import ProfileData from "../../constants/profile-data";
import { MainContext } from "../../contexts/mainContext";
import MainButtonRed from "../shared/MainButtonRed";
import phoneNumberMask from "../../masks/phoneNumberMask";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { signIn as signInReducer } from "../../../store/actions/auth";
import { signOut as signOutReducer } from "../../../store/actions/auth";

const ContactInfo = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatchRedux = useDispatch();

  const defaultAvatar = "/assets/images/profile-photo.png";
  const [avatar, setAvatar] = useState(defaultAvatar);

  const [state, dispatch] = React.useContext(MainContext);

  const signOut = () => {
    dispatchRedux(signOutReducer());
  };

  // const [name, setName] = useState(user.name);
  // const [lastname, setLastname] = useState(user.surname);
  // const [city, setCity] = useState(user.city);
  // const [email, setEmail] = useState(user.email);
  // const [phone, setPhone] = useState(user.phone);
  // const [businessSphere, setBusinessSphere] = useState(
  //   user.area,
  // );

  const handleSubmit = async (values: any, { resetForm }: any) => {
    dispatch({ type: "toggle_edit" });
    const { name, phone, email, surname, city, password } = values;

    const data = {
      user,
      userUpdate: {
        _id: user._id,
        name,
        user: email,
        email,
        phone,
        surname,
        city,
        password,
      },
    };

    try {
      const updateUserResponse = await axios.post(
        `/api/account/userUpdate`,
        data,
      );

      if (updateUserResponse.status == 200) {
        dispatchRedux(
          signInReducer({
            ...user,
            name,
            user: email,
            email,
            phone,
            surname,
            city,
          }),
        );
      }
      resetForm({
        values: {
          password: ""
        }
      });
    } catch (error) {
      console.log("error");
      console.log(error);
      resetForm({});
    }

    // resetForm({});
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
              className="contactInfo__delete-btn section__secondary-text"
              onClick={() => setAvatar(defaultAvatar)}
            >
              Видалити фото
            </button>

            <button
              onClick={signOut}
              className="contactInfo__signout-btn section__secondary-text--white"
            >
              Вийти
            </button>
          </div>

          <Formik
            initialValues={{ 
                name: user.name, 
                phone: user.phone, 
                surname: user.surname, 
                email: user.email,  
                city: user.city,
                password: ""
              }}
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
                        value={field.value}
                        readOnly={state.isEdit ? false : true}
                        required
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
                    name="surname"
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
                    readOnly={state.isEdit ? false : true}
                    required
                    placeholder="Дніпро"
                  />
                </label>
                <label className="contactInfo__field">
                  <span className="contactInfo__label">Пароль</span>
                  <Field
                    className="contactInfo__input section__primary-text"
                    type="password"
                    name="password"
                    readOnly={state.isEdit ? false : true}
                    placeholder="********"
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
