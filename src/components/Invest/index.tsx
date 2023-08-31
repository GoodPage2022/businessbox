import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { MainContext } from "../../contexts/mainContext";
import MainButtonRed from "../shared/MainButtonRed";
import Description from "./Description";

const Invest = () => {
  const [state, dispatch] = useContext(MainContext);
  const [detailFindInvest, setDetailFindInvest] = useState(false);
  const [detailForInvestor, setDetailForInvestor] = useState(false);

  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();

  const onForInvestorClick = () => {
    // if (!user) {
    //   dispatch({ type: "toggle_authModal" });
    //   dispatch({ type: "toggle_investor" });
    //   state.isInvestor = 1;
    // } else {
    //   router.push("/invest/catalog");
    // }
    router.push("/invest/catalog");
  };

  const onInvestmentBusinessClick = () => {
    if (!user) {
      dispatch({ type: "toggle_authModal" });
      dispatch({ type: "toggle_investor" });
      state.isInvestor = 2;
    } else {
      router.push("/invest/add-business");
    }
  };

  return (
    <>
      <section className="invest">
        <div className="container invest__container">
          <div className="invest__cards">
            <div className="invest__card">
              {detailForInvestor ? (
                <>
                  <h2 className="invest__card--title">Для інвестора</h2>
                  <p className="invest__card--text">
                    В даному розділі ви можете знайти цікави проекти для
                    інвестування, ознайомитися з умовами залучення коштів та
                    підібрати для себе оптимальний варіант з точки зору
                    інтерес/ризик/прибуток. А також, знайшовши варіант для себе,
                    ви можете замовити додаткову аналітику проекту. В цьому
                    звіті наші експерти нададуть розгорнуту інформацію стосовно
                    обраного бізнесу та рекомендації по інвестуванню.
                    Розрахункова вартість такого звіту прораховується за кожним
                    запитом окремо та залежить від типу, сфери діяльності,
                    масштабу та локального розташування обраного проекту.{" "}
                  </p>
                  <button
                    className="invest__card--text invest__card--link"
                    onClick={onForInvestorClick}
                  >
                    Перейти до каталогу
                  </button>
                  <div onClick={() => setDetailForInvestor(false)}>
                    <MainButtonRed label="Згорнути" />
                  </div>
                </>
              ) : (
                <>
                  <h2
                    className="invest__card--title"
                    onClick={onForInvestorClick}
                  >
                    Для інвестора
                  </h2>
                  <p
                    className="invest__card--text"
                    onClick={onForInvestorClick}
                  >
                    Реєструйся та отримуй доступ до каталогу бізнесів яким
                    потрібна підримка
                  </p>
                  <div onClick={() => setDetailForInvestor(true)}>
                    <MainButtonRed label="Детальніше" />
                  </div>
                </>
              )}
            </div>
            <div className="invest__card">
              {detailFindInvest ? (
                <>
                  {" "}
                  <h2 className="invest__card--title">Шукаю інвестиції</h2>
                  <div className="invest__card--text">
                    <p className="invest__card--text">
                      У цьому розділі ви можете розмістити свою пропозицію
                      (бізнес) під залучення інвестицій. Для цього необхідно
                      надати максимум інформації стосовно предмету інвестування,
                      а саме:
                    </p>
                    <p className="invest__card--text">
                      1. Детально описати продукт (бізнес, проект)
                    </p>
                    <p className="invest__card--text">
                      2. Яка сума інвестицій необхідна?
                    </p>
                    <p className="invest__card--text">
                      3. На яких умовах ви готові залучати кошти?
                    </p>
                    <p className="invest__card--text">
                      4. Вказати термін повернення інвестицій.
                    </p>
                    <p className="invest__card--text">
                      5. Вказати цільову дохідність інвестицій.
                    </p>
                    <p className="invest__card--text">
                      6. Вказати забезпечення коштів (якщо таке є).
                    </p>
                    <p className="invest__card--text">
                      7. Прикріпити коротку фінансову звітність (достатньо p&l)
                    </p>
                  </div>{" "}
                  <button
                    className="invest__card--text invest__card--link"
                    onClick={onInvestmentBusinessClick}
                  >
                    Зареєструвати бізнес
                  </button>
                  <div onClick={() => setDetailFindInvest(false)}>
                    <MainButtonRed label="Згорнути" />
                  </div>
                </>
              ) : (
                <>
                  <h2
                    className="invest__card--title"
                    onClick={onInvestmentBusinessClick}
                  >
                    Маю бізнес для інвестування
                  </h2>{" "}
                  <p
                    className="invest__card--text"
                    onClick={onInvestmentBusinessClick}
                  >
                    Реєструй свій бізнес і знаходь інвестора вже зараз!
                  </p>
                  <div onClick={() => setDetailFindInvest(true)}>
                    <MainButtonRed label="Детальніше" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Description />
    </>
  );
};

export default Invest;
