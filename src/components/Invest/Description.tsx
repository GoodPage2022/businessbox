import RocketSVG from "../../assets/svg/rocket.svg";
const Description = () => {
  return (
    <div className="container invest__container">
      <p className="invest__text section__primary-text">
        Даний розділ створений для взаємодії бізнес проектів, що шукають
        інвестиції, та інвесторів, що шукають куди б інвестувати. Наша платформа
        є точкою взаємодії цих двох напрямків, та може надати додаткову детальну
        аналітику стосовно того чи іншого проекту (надається за окремим запитом)
      </p>
      <p className="invest__text section__primary-text">
        Обирайте напрям, що вас зацікавив та долучайтеся долучайтесь{" "}
        <RocketSVG />
      </p>
    </div>
  );
};

export default Description;
