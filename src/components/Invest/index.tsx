import { useRouter } from "next/router";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { MainContext } from "../../contexts/mainContext";
import Description from "./Description";

const Invest = () => {
  const [state, dispatch] = useContext(MainContext);
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  console.log(state.isInvestor, "state.isInvestorindex");
  const openModalAuth = () => {
    dispatch({ type: "toggle_authModal" });
    dispatch({ type: "toggle_investor" });
    state.isInvestor = 1;
  };

  const onForInvestorClick = () => {
    if (!user) {
      openModalAuth();
    } else {
      router.push("/invest/catalog");
    }
  };

  const onInvestmentBusinessClick = () => {
    if (!user) {
      openModalAuth();
    } else {
      router.push("/invest/add-business");
    }
  };

  return (
    <>
      <section className="invest">
        <div className="container invest__container">
          <div className="invest__cards">
            <button className="invest__card" onClick={onForInvestorClick}>
              <h2 className="invest__card--title">Для інвестора</h2>
              <p className="invest__card--text">
                Реєструйся та отримуй доступ до каталогу бізнесів яким потрібна
                підримка
              </p>
            </button>
            <button
              className="invest__card"
              onClick={onInvestmentBusinessClick}
            >
              <h2 className="invest__card--title">
                Маю бізнес для інвестування
              </h2>
              <p className="invest__card--text">
                Реєструй свій бізнес і знаходь інвестора вже зараз!
              </p>
            </button>
          </div>
        </div>
      </section>
      <Description />
    </>
  );
};

export default Invest;
