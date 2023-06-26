import { useRouter } from "next/router";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { MainContext } from "../../contexts/mainContext";

const BusinessType = () => {
  const [state, dispatch] = useContext(MainContext);

  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();

  const onForSellClick = () => {
    if (user != null) {
      router.push(`${"/account/add-business"}`);
    } else {
      localStorage.setItem("redirectToAddBusiness", "true");
      dispatch({ type: "toggle_authModal" });
    }
  };

  const onForInvestClick = () => {
    if (user != null) {
      router.push(`${"/invest/add-business"}`);
    } else {
      localStorage.setItem("redirectToAddInvestBusiness", "true");
      dispatch({ type: "toggle_authModal" });
    }
  };

  return (
    <>
      <section className="invest business-type">
        <div className="container invest__container">
          <div className="invest__cards">
            <div className="invest__card" onClick={onForSellClick}>
              <h2 className="invest__card--title">Маю бізнес для продажу</h2>

              <div>
                <button className="invest__button-register">
                  Зареєструвати бізнес
                </button>
              </div>
            </div>
            <div className="invest__card" onClick={onForInvestClick}>
              <h2 className="invest__card--title">
                Маю бізнес для інвестування
              </h2>{" "}
              <div>
                <button className="invest__button-register">
                  Зареєструвати бізнес
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessType;
