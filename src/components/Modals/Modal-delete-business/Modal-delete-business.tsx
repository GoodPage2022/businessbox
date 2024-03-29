import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import CrossSVG from "../../../assets/svg/cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";
import axios from "axios";
import { useRouter } from "next/router";
import CustomInput from "../../shared/CustomInput";

function ModalDeleteBusiness({
  onClose,
  projectId,
  projectTitle,
}: {
  onClose: any;
  projectId: string;
  projectTitle: string;
}) {
  const dispatchRedux = useDispatch();
  const [state, dispatch] = React.useContext(MainContext);
  const [deleteBusinessError, setdeleteBusinessError] = useState("");
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const { deleteReason, deleteReasonOther } = values;

    const data = {
      user,
      deleteReason,
      deleteReasonOther,
      projectId,
      projectTitle,
    };

    try {
      const reponseDelete = await axios.post("/api/businesses/delete", data);
    } catch (error) {
      console.log(error);
    }

    try {
      const reponseDeleteReason = await axios.post(
        "/api/businesses/deleteReason",
        data,
      );
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: "toggle_deleteBusiness" });
    router.push("/account/my-businesses");
  };

  function validate(e: any) {
    const input = e.target as HTMLInputElement;
    input?.setCustomValidity("");
    const validityState = input?.validity;
    if (!validityState?.valid) {
      input?.setCustomValidity("Заповнити поле");
    }
  }

  return (
    <div
      className={`modal-deleteBusiness__overlay${
        state.isOpenDeleteBusiness ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-deleteBusiness__container">
        <div className="modal-deleteBusiness__header">
          <h2 className="modal-deleteBusiness__title title--white">
            Видалити бізнес
          </h2>
          <p className="modal-deleteBusiness__text--desctop">
            Вкажіть будь ласка причину видалення вашого бізнесі
          </p>
          <button
            onClick={onClose}
            className="modal-deleteBusiness__button-close--mob"
          >
            <CrossSVG />
          </button>
        </div>
        <div className="modal-deleteBusiness__body">
          <button
            onClick={onClose}
            className="modal-deleteBusiness__button-close--desctop"
          >
            <CrossSVG />
          </button>
          <p className="modal-deleteBusiness__text--mob">
            Вкажіть будь ласка причину видалення вашого бізнесі
          </p>
          <Formik
            initialValues={{
              deleteReasonOther: "",
              deleteReason: "sold",
            }}
            validate={(values) => {
              const errors: any = {};
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="modal-deleteBusiness__form">
                {deleteBusinessError && (
                  <div className="modal-deleteBusiness__failed">
                    {deleteBusinessError}
                  </div>
                )}
                <label className="modal-deleteBusiness__field">
                  <Field
                    className="modal-deleteBusiness__input section__primary-text"
                    type="radio"
                    value="sold"
                    required
                    name="deleteReason"
                  />
                  <span className="modal-deleteBusiness__label">
                    Бізнес вже продано
                  </span>
                </label>
                <label className="modal-deleteBusiness__field">
                  <Field
                    className="modal-deleteBusiness__input section__primary-text"
                    type="radio"
                    value="incorect"
                    required
                    name="deleteReason"
                  />
                  <span className="modal-deleteBusiness__label">
                    Введена некоректна інформація
                  </span>
                </label>
                <label className="modal-deleteBusiness__field">
                  <Field
                    className="modal-deleteBusiness__input section__primary-text"
                    type="radio"
                    value="other"
                    name="deleteReason"
                    required
                  />
                  <span className="modal-deleteBusiness__label">Інше</span>
                </label>
                <label className="modal-deleteBusiness__field">
                  <Field
                    className="modal-deleteBusiness__input-text section__primary-text"
                    type="text"
                    name="deleteReasonOther"
                    minLength={1}
                    maxLength={255}
                    required={values.deleteReason == "other" ? true : false}
                    component={CustomInput}
                    placeholder="Передумав продавати..."
                  />
                </label>

                <div className="modal-deleteBusiness__button">
                  <MainButtonRed label="Відправити" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default ModalDeleteBusiness;
