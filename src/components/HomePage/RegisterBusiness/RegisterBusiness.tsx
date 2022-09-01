import { useRouter } from "next/router";

const RegisterBusiness = () => {
  const router = useRouter();
  return (
    <section className="registerBusiness">
      <div className="container registerBusiness__container">
        <h2 className="registerBusiness__title title--white">
          Хочеш продати бізнес?
          <br /> Реєструй вже зараз
        </h2>

        <button
          className="registerBusiness__button section__primary-text--white"
          onClick={() => router.push("/account/add-business")}
        >
          Зареєструвати
        </button>
      </div>
    </section>
  );
};

export default RegisterBusiness;
