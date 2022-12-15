import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import CrossSVG from "../../../assets/svg/cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { MainContext } from "../../../contexts/mainContext";
import MainButtonRed from "../../shared/MainButtonRed";
import axios from "axios";
import { useRouter } from "next/router";

function ModalRaiseRating({
  onClose,
  lowRatingBusinesses,
}: {
  onClose: any;
  lowRatingBusinesses: [any];
}) {
  const [state, dispatch] = React.useContext(MainContext);
  const [raiseRatingError, setraiseRatingError] = useState("");
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
    // const { deleteReason, deleteReasonOther } = values;
    console.log(values);
    // const data = {
    //   user,
    // deleteReason,
    // deleteReasonOther,
    // projectId,
    // projectTitle,
    // };

    try {
      // const reponseDelete = await axios.post("/api/businesses/delete", data);
    } catch (error) {
      console.log(error);
    }

    // router.push("/account/my-businesses");
  };

  return (
    <div
      className={`modal-raiseRating__overlay${
        state.isActiveRaiseRatingModal ? " active" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div className="modal-raiseRating__container">
        <div className="modal-raiseRating__header">
          <h2 className="modal-raiseRating__title title--white">
            Просунути бізнес
          </h2>
          <p className="modal-raiseRating__text--desctop">
            Оберіть один чи декілька бізнесів, оголошення на них будуть
            переміщені на перші позиції каталогу
          </p>
          <button
            onClick={onClose}
            className="modal-raiseRating__button-close--mob"
          >
            <CrossSVG />
          </button>
        </div>
        <div className="modal-raiseRating__body">
          <button
            onClick={onClose}
            className="modal-raiseRating__button-close--desctop"
          >
            <CrossSVG />
          </button>

          <Formik
            initialValues={{
              checked: [],
            }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="modal-raiseRating__form">
                {raiseRatingError && (
                  <div className="modal-raiseRating__failed">
                    {raiseRatingError}
                  </div>
                )}
                <ul>
                  {lowRatingBusinesses.map((i) => (
                    <li key={i._id} className="modal-raiseRating__checkbox">
                      <Field
                        id={`cat_${i._id}`}
                        className="checkbox__input agree"
                        type="checkbox"
                        name="checked"
                        value={i._id}
                      />
                      <label
                        htmlFor={`cat_${i._id}`}
                        className="checkbox__label"
                      >
                        <span className="checkbox__text section__secondary-text">
                          {i.title}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="modal-raiseRating__button">
                  <MainButtonRed label="До оплати" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default ModalRaiseRating;
