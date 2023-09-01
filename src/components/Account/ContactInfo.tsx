import Image from "next/image";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import MaskedInput from "react-text-mask";

import EditSVG from "../../assets/svg/edit.svg";
import ProfileData from "../../constants/profile-data";
import { MainContext } from "../../contexts/mainContext";
import MainButtonRed from "../shared/MainButtonRed";
import phoneNumberMask from "../../masks/phoneNumberMask";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosRequestConfig } from "axios";
import { signIn as signInReducer } from "../../../store/actions/auth";
import { signOut as signOutReducer } from "../../../store/actions/auth";
import { useSession, signOut as signOutGoogle } from "next-auth/react";
import CustomInput from "../shared/CustomInput";
import { Oval } from "react-loader-spinner";

const ContactInfo = () => {
  const { data: session } = useSession();
  const user = useSelector((state: any) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatchRedux = useDispatch();

  const defaultAvatar = "/assets/images/profile-photo.png";
  const [avatar, setAvatar] = useState(defaultAvatar);

  const [state, dispatch] = React.useContext(MainContext);

  useEffect(() => {
    if (user && !!user.avatar) {
      setAvatar(user.avatar.path);
    }
  }, [user]);

  // const signOut = async () => {
  //   if (session !== undefined) {
  //     await signOutGoogle();
  //   }
  //   dispatchRedux(signOutReducer());
  // };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
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
        data
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
          })
        );
      }
      resetForm({
        values: {
          password: "",
        },
      });
    } catch (error) {
      console.log("error");
      console.log(error);
      resetForm({});
    }
    setIsLoading(false);
  };

  const uploadToServer = async (e: any) => {
    setIsLoading(true);
    const uploadImageURL = e.target.files[0];

    const formData = new FormData();
    formData.append("file", uploadImageURL);
    formData.append("userApiKey", user.api_key);
    formData.append("userEmail", user.email);
    formData.append("subFolder", user._id);

    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const reponse = await axios.post("/api/upload", formData, options);
      console.log(reponse.data);

      if (reponse.status == 200) {
        setAvatar(
          `${
            reponse.data.files
              ? "/avatars/" + reponse.data.files.file.originalFilename
              : reponse.data.url
          }`
        );

        const data = {
          user,
          userUpdate: {
            _id: user._id,
            avatar: {
              path: `${
                reponse.data.files
                  ? "/avatars/" + reponse.data.files.file.originalFilename
                  : reponse.data.url
              }`,
            },
          },
        };

        try {
          const updateUserResponse = await axios.post(
            `/api/account/userUpdate`,
            data
          );

          if (updateUserResponse.status == 200) {
            dispatchRedux(
              signInReducer({
                ...user,
                avatar: {
                  path: `${
                    reponse.data.files
                      ? "/avatars/" + reponse.data.files.file.originalFilename
                      : reponse.data.url
                  }`,
                },
              })
            );
          }
          console.log(updateUserResponse);
        } catch (error) {
          console.log("error");
          console.log(error);
        }
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <section className="contactInfo">
      <div className="container contactInfo__container">
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
            <div className="contactInfo__image-buttons">
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
                onClick={async () => {
                  setAvatar(defaultAvatar);

                  const data = {
                    user,
                    userUpdate: {
                      _id: user._id,
                      avatar: {
                        path: defaultAvatar,
                      },
                    },
                  };

                  try {
                    const updateUserResponse = await axios.post(
                      `/api/account/userUpdate`,
                      data
                    );

                    if (updateUserResponse.status == 200) {
                      dispatchRedux(
                        signInReducer({
                          ...user,
                          avatar: {
                            path: defaultAvatar,
                          },
                        })
                      );
                    }

                    console.log(updateUserResponse);
                  } catch (error) {
                    console.log("error");
                    console.log(error);
                  }
                }}
              >
                Видалити фото
              </button>
            </div>

            {/* <button
              onClick={signOut}
              className="contactInfo__signout-btn--desctop section__secondary-text--white"
            >
              Вийти
            </button> */}
          </div>

          <Formik
            initialValues={{
              name: user ? user.name : "",
              phone: user ? user.phone : "",
              surname: user ? user.surname : "",
              email: user ? user.email : "",
              city: user ? user.city : "",
              password: "",
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
                  <div className="contactInfo__label--wrapper">
                    <span className="contactInfo__label--first">Ім’я</span>
                    <button
                      type="button"
                      className="contactInfo__button-edit"
                      onClick={() => dispatch({ type: "toggle_edit" })}
                    >
                      <EditSVG />
                    </button>
                  </div>

                  <Field
                    className="contactInfo__input section__primary-text"
                    type="text"
                    name="name"
                    readOnly={state.isEdit ? false : true}
                    required
                    component={CustomInput}
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
                        component={CustomInput}
                        className="contactInfo__input section__primary-text"
                      />
                    )}
                  />
                </label>
              </div>
              <div className="contactInfo__second-wrapper">
                <label className="contactInfo__field">
                  <span className="contactInfo__label">Прізвище</span>
                  <Field
                    className="contactInfo__input section__primary-text"
                    type="text"
                    name="surname"
                    readOnly={state.isEdit ? false : true}
                    required
                    component={CustomInput}
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
                    component={CustomInput}
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
                    component={CustomInput}
                    placeholder="Дніпро"
                  />
                </label>
                <label className="contactInfo__field">
                  <span className="contactInfo__label">Пароль</span>
                  <Field
                    className="contactInfo__input section__primary-text"
                    type="password"
                    name="password"
                    component={CustomInput}
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
        {/* <button
          type="button"
          onClick={signOut}
          className="contactInfo__signout-btn--mob section__secondary-text--white"
        >
          Вийти
        </button> */}
      </div>
    </section>
  );
};

export default ContactInfo;
