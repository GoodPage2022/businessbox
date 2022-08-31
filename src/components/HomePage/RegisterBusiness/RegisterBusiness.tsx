import MainButton from "../../shared/MainButton";

const RegisterBusiness = () => {
  return (
    <section className="registerBusiness">
      <div className="container registerBusiness__container--desc">
        <h2 className="registerBusiness__title title--white">
          Хочеш продати бізнес?
          <br /> Реєструй вже зараз
        </h2>

        <button className="registerBusiness__button section__primary-text--white">
          Зареєструвати
        </button>
      </div>
    </section>
  );
};

export default RegisterBusiness;
