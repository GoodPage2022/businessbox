const DeliveryPayment = () => {
  return (
    <section className="information">
      <div className="container information__container">
        <h1 className="title information__title">Просування оголошення</h1>
        {/* <h2 className="information__pre-title"></h2> */}
        <p className="information__text section__primary-text">
          Просування оголошення - частина функціональності Веб-сайту (Сервісу),
          Business Box дозволяє Користувачам використовувати платні послуги,
          такі як:
        </p>
        <p className="information__text section__primary-text">
          <span className="information__text--bold">
            Підняття оголошення в ТОП
          </span>{" "}
          – це переміщення Оголошення, яке відповідає критеріям пошуку та
          очікуванням Покупця, на початок списку в певній категорії зі
          спеціальним рекламним значком. Щоб переконатися, що Оголошення
          правильно виділено та викликає більше інтересу дана послуга є платною
          та автоматично надається Продавцю (Бізнесу), як тільки Продавець
          (Бізнес) сплачує її рекламодавцю (Business Box).
        </p>
        <p className="information__text section__primary-text">
          Вартість даної послуги становить 40 грн за одне підняття одного
          оголошення в ТОП.
        </p>{" "}
        <p className="information__text section__primary-text">
          Тривалість даної послуги 30 календарних днів.
        </p>
        <p className="information__text section__primary-text">
          Кількість разів користування даною послугою - 1 раз на місяць.
        </p>
      </div>
    </section>
  );
};

export default DeliveryPayment;
