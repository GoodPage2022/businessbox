import React from "react";
import { useRouter } from "next/router";
import { MainContext } from "../../../contexts/mainContext";
import { useSelector } from "react-redux";

const RegisterBusiness = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user)
  const [state, dispatch] = React.useContext(MainContext);

  const openModal = () => {
    router.push("#auth");
    dispatch({ type: "toggle_authModal" });
  };

  return (
    <section className="registerBusiness">
      <div className="container registerBusiness__container">
        <h2 className="registerBusiness__title title--white">
          Хочеш продати бізнес?
          <br /> Реєструй вже зараз
        </h2>

        <button
          className="registerBusiness__button section__primary-text--white"
          onClick={() => user != null ? router.push("/account/add-business") : openModal()}
        >
          Зареєструвати
        </button>
      </div>
    </section>
  );
};

export default RegisterBusiness;
