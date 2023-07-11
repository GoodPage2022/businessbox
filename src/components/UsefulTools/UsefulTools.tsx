import Link from "next/link";

const UsefulTools = () => {
  return (
    <section className="usefulTools">
      <div className="container usefulTools__container">
        <h1 className="title usefulTools__title">Business Box</h1>{" "}
        <h2 className="pre-title usefulTools__pre-title">
          Як підготувати бізнес до продажу або залучення інвестицій
        </h2>
        <p className="usefulTools__date section__primary-text">
          28 червня 2023 р.
        </p>
        <p className="usefulTools__text section__primary-text mb-15">
          Як підготувати компанію (бізнес) до залучення інвестицій чи продажу :
          чек-лист необхідних дій буде постійно доповнюватися та модернізуватися
        </p>
        <ul className="mb-30">
          <li className="usefulTools__text text-indent-none section__primary-text mb-5">
            <Link href="#first">
              1. Визначте об`єкт інвестування чи продажу
            </Link>
          </li>
          <li className="usefulTools__text text-indent-none section__primary-text mb-5">
            <Link href="#second">
              2. Оформіть на компанію всі активи, які використовуються або
              використовуватимуться компанією у бізнесі
            </Link>{" "}
            <p className="pl-30 section__primary-text mb-5">
              {" "}
              <Link href="#third">1.1. Права Інтелектуальної власності</Link>
            </p>{" "}
            <p className="pl-30 section__primary-text mb-5">
              {" "}
              <Link href="#fourth">1.3. Нерухомість, транспортні засоби</Link>
            </p>
          </li>
          <li className="usefulTools__text text-indent-none section__primary-text mb-5">
            <Link href="#fifth">
              3. Права та доступи до інформаційних ресурсів та каналів
              комунікації
            </Link>
          </li>
          <li className="usefulTools__text text-indent-none section__primary-text mb-5">
            <Link href="#sixth">
              4. Упорядкуйте всі важливі корпоративні документи
            </Link>
          </li>
          <li className="usefulTools__text text-indent-none section__primary-text mb-5">
            <Link href="#seventh">
              5. Усуньте ймовірність виникнення конфліктів у компанії
            </Link>{" "}
            <p className="usefulTools__text text-indent-none section__primary-text mb-5 pl-30">
              <Link href="#eighth">
                Висока ймовірність конфлікту може бути обумовлена:
              </Link>
            </p>
          </li>
          <li className="usefulTools__text text-indent-none section__primary-text mb-5">
            <Link href="#tenth">
              6. Наведіть показники, відображені в інвестиційній презентації, у
              відповідність до реальності
            </Link>{" "}
          </li>
          <li className="usefulTools__text text-indent-none section__primary-text mb-5">
            <Link href="#eleventh">
              8. Дізнайтеся про потенційного інвестора якнайбільше інформації
              (легальными способами, звичайно)
            </Link>
          </li>
          <li className="usefulTools__text text-indent-none section__primary-text mb-5">
            <Link href="#twelfth">
              9. Усуньте порушення законодавства та прав третіх осіб, у тому
              числі підстави для таких порушень
            </Link>
            <p className="usefulTools__text text-indent-none section__primary-text mb-5 pl-30">
              <Link href="#thirteenth">
                Такі порушення можуть існувати в області:
              </Link>
            </p>
          </li>

          <li className="usefulTools__text text-indent-none section__primary-text">
            <Link href="#fourteenth">
              10. Намагайтеся визначити реальну вартість (оцінку) своєї
              компанії, не варто її недооцінювати та переоцінювати
            </Link>
          </li>
        </ul>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="first"
        >
          1. Визначте об`єкт інвестування чи продажу{" "}
        </h3>
        <div className="mb-30">
          {" "}
          <p className="usefulTools__text section__primary-text mb-10">
            Якщо у вас Юридична особа - ТОВ, АО, ЗАО та інші то визначаємося що
            ми хочемо продати, за скільки та йдемо то до пункту 2.
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10">
            Якщо бізнес оформлений як ФОП і навіть якщо з Найманими працівниками
            то ми пам`ятаємо, що неможливо продати ФОП - Торгівля людьми
            заборонена міжнародним Законодавством :)) Який вихід - ми
            домовляємося з Інвестором про відкриття ТОВ куди будуть зібрані всі
            Активи, договори та передані всі права.
          </p>{" "}
          <p className="usefulTools__text section__primary-text">
            Якщо маємо Бізнес Це группа компаній - декілька ТОВ (одні працюють з
            імпортом, інші з внутрішніми продажами на різні регіони, а одна
            володіє корпоративними правами на програмне забезпечення ) також
            маємо десяток ФОП для продажів на ринках чи будь яка інша
            конструкція з управлінським обліком та перехресними
            взаєморозрахунками та боргами - тоді складніше :) Залучаємо
            фінансових аналітиків та юристів та разом визначаємося з об`єктом
            інвестування чи продажу.
          </p>
        </div>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="second"
        >
          2. Оформіть на компанію всі активи, які використовуються або
          використовуватимуться компанією у бізнесі
        </h3>
        <div className="mb-30">
          <h4
            className="usefulTools__small-pre-title section__secondary-text mb-10 scroll-margin-top"
            id="third"
          >
            1.1. Права Інтелектуальної власності
          </h4>{" "}
          <p className="usefulTools__text section__primary-text mb-10">
            Найчастіше «губляться» об`єкти інтелектуальної власності. На початку
            все часто робиться нашвидкуруч - малюється дизайн, пишеться код,
            реєструється домен і так далі. У результаті виходить, що правами на
            бізнес-активи володіє будь-хто, але не компанія.
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10">
            Засновники часто забувають, що виняткові права на об`єкти
            інтелектуальної власності виникають завжди на самому початку у їх
            творців і поки не буде оформлений спеціальний документ ( договір про
            відчуження виняткового права , договір авторського замовлення ,
            трудовий договір , що передбачає створення службового твору тощо) ,
            <span className="fw-700">
              {" "}
              Нехай навіть у формі електронного листування,{" "}
            </span>
            права належать їм (авторам-творцям), незважаючи на те, що компанія
            фактично приступить до використання об`єктів інтелектуальної
            власності (далі - об`єкти ІВ) .
          </p>
          <p className="usefulTools__text section__primary-text mb-10">
            Використання ж компанією об`єктів ІВ без оформлення зазначених
            документів створює ризик стягнення з неї{" "}
            <Link href={"#"}>
              <a target="_blank"> чималої компенсації</a>
            </Link>{" "}
            на користь автора та накладення{" "}
            <Link href={"#"}>
              <a target="_blank"> заборони на використання об`єкта ІВ </a>
            </Link>{" "}
            .
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10">
            Тому жоден грамотний інвестор не інвестуватиме в проект, поки
            виняткові права на об`єкти ІВ не будуть передані компанії
            (принаймні, на пізніших стадіях проекту точно).
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10">
            На крайній випадок можливе надання компанії ліцензії (права
            використання об`єктів ІВ), але такий розклад також навряд чи влаштує
            більшість інвесторів. Тому краще відразу подбати про передачу
            компанії виключного права на кожен об`єкт ІВ, який використовується
            або використовуватиметься нею у своїй діяльності.
          </p>{" "}
          <div className="pl-30 mb-20">
            {" "}
            <p className="usefulTools__text section__primary-text mb-10">
              На які об`єкти ІВ передусім дивляться інвестори:
            </p>{" "}
            <ul>
              <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
                <span className="color-violet fw-700">
                  Товарний знак, торгова марка
                </span>{" "}
                - має бути зареєстрований, або перебувати на стадії реєстрації
                (в середньому розгляд заявки та процес реєстрації триває 1 рік).
                Товарний знак нерідко буває представлений у вигляді
                «намальованого» логотипу, тому виняткове право на логотип
                (художній твір) компанії також необхідно придбати у дизайнера.
              </li>{" "}
              <li className="usefulTools__text section__primary-text usefulTools__list-item mb-10">
                <span className="color-violet fw-700">
                  Дизайн, програмне забезпечення, текстовий/ аудіо/ відео/
                  графічний та інший контент
                </span>{" "}
                - виняткові права на зазначені об`єкти за договором повинні бути
                передані компанії від їх авторів. Реєструвати права на зазначені
                активи у Роспатенті не обов`язково, достатньо документально
                оформити передачу компанії виняткових прав.
              </li>{" "}
              <li className="usefulTools__text section__primary-text usefulTools__list-item mb-10">
                <span className="color-violet fw-700">
                  Домен, та хостинг повинен бути також зареєстрований на
                  компанію.
                </span>{" "}
                - нерідко ми бачили що права оформлено на адміна як фізособу або
                на студію що розробляла.
              </li>{" "}
              <li className="usefulTools__text section__primary-text usefulTools__list-item mb-10">
                <span className="color-violet fw-700">
                  Корисні моделі, промислові зразки, винаходи
                </span>{" "}
                - на них повинні бути отримані патенти, або подано заявки на їх
                отримання. Звичайно ж, правовласником патентів має виступати
                компанія.
              </li>{" "}
              <li className="usefulTools__text section__primary-text usefulTools__list-item mb-10">
                <span className="color-violet fw-700">Бази даних</span> - ними
                також поширюється законодавство про інтелектуальної власності.
                Виключне право на базу даних також має належати компанії.
              </li>{" "}
              <li className="usefulTools__text section__primary-text usefulTools__list-item mb-10">
                <span className="color-violet fw-700">База даних клієнтів</span>{" "}
                - особливу увагу приділяють увагу базі клієнтів як покупців так
                і постачальників, взаємовідносини між ними , які активно
                співпрацюють а які вже давно не працюють, умови співпраці.
              </li>{" "}
              <li className="usefulTools__text section__primary-text usefulTools__list-item mb-10">
                <span className="color-violet fw-700">Ноу-хау</span> - виключне
                право на секрет виробництва також має належати компанії.
                Реєструвати ноу-хау у Роспатенті не потрібно.
              </li>{" "}
              <li className="usefulTools__text section__primary-text usefulTools__list-item">
                інше
              </li>
            </ul>
          </div>
          <p className="usefulTools__text section__primary-text mb-20">
            Так, є ще один важливий нюанс, пов`язаний із закріпленням прав на
            бізнес-активи за компанією, яка залучає інвестиції — засновники
            можуть самі помилятися в тому, що виняткові права на об`єкти ІВ
            належним чином передані компанії, і можуть ввести в оману інвестора.{" "}
            <span className="text-italic fw-700">
              Тому яким би педантичним не був інвестор, він не завжди може
              повністю переконатися в «чистоті» прав компанії на об`єкти ІВ,
              тому для того, щоб хоч якось підстрахувати свої ризики, інвестори
              беруть від засновників та (або) керівника компанії письмові
              запевнення (гарантії) того, що компанії належать права
              (виключні/ліцензійні, права власності/оренди) на всі
              бізнес-активи, які вона використовує. У разі, якщо зазначені
              засвідчення (гарантії) виявляться недостовірними, інвестор може
              розірвати інвестиційну угоду та (або) вимагати відшкодування
              збитків (виплати неустойки/штрафу).
            </span>
          </p>{" "}
          <h4
            className="usefulTools__small-pre-title section__secondary-text mb-10 scroll-margin-top"
            id="fourth"
          >
            1.3. Нерухомість, транспортні засоби
          </h4>{" "}
          <p className="usefulTools__text section__primary-text ">
            Звичайно, крім об`єктів ІВ у бізнесі можуть використовуватися й інші
            активи – нерухомість, транспортні засоби, технічні засоби тощо. Про
            передачу компанії прав на них також не варто забувати.
          </p>{" "}
        </div>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="fifth"
        >
          3. Права та доступи до інформаційних ресурсів та каналів комунікації.
        </h3>
        <div className="mb-30">
          <p className="usefulTools__text section__primary-text mb-10">
            Нагадуємо що в сучасному світі інформаційні канали та ваші підписки
            в соцмережах то є невід`ємний актив компанії.
          </p>
          <p className="usefulTools__text section__primary-text mb-10">
            Не рідко коли канали складають важливу частину вартості компанії.
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10">
            Необхідно оформити права корпоративного телефону та корпоративної
            почти що зареєстрований на компанії.
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10">
            Додатково акумулюємо як актив та перевіряємо :
          </p>
          <ul className="pl-30">
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              <span className="fw-700">Instagram</span> аккаунт - зареєстрований
              за номером телефону та імейлом
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              <span className="fw-700">FB</span> аккаунт. Доступ та доступ до
              рекламного аккаунта
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              <span className="fw-700">Youtube</span> канал, та доступ до
              рекламного аккаунта
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              Доступ до корпоративних серверів та право власності
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item">
              інші
            </li>{" "}
          </ul>
        </div>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="sixth"
        >
          4. Упорядкуйте всі важливі корпоративні документи
        </h3>
        <div className="mb-30">
          <p className="usefulTools__text section__primary-text mb-10">
            Будь-яка важлива корпоративна процедура та угода повинні
            обґрунтовувати належним чином оформленим документом.
          </p>{" "}
          <p className="usefulTools__text fw-700 section__primary-text mb-10">
            Це стосується:
          </p>
          <ul className="pl-30">
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              <span className="fw-700 color-violet">
                протоколів загальних зборів учасників ,
              </span>{" "}
              у яких обиралися директори компанії, формувався рада директорів
              (якщо формувався, звісно), розподілялися казначейські частки
              (частки, що належать компанії), схвалювалися сумнівні (великі, із
              зацікавленістю тощо.) угоди, змінювався розмір статутного капіталу
              , Змінювалася пропорційність часток учасників компанії і т.д.;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              <span className="fw-700 color-violet">наказів</span> на
              призначенні генерального директора (директорів – якщо їх кілька),
              головного бухгалтера;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              <span className="fw-700 color-violet">податкових декларацій</span>{" "}
              (мають бути достовірними та вчасно поданими);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              {" "}
              <span className="fw-700 color-violet">
                бухгалтерських документів
              </span>{" "}
              (мають відображати реальний стан речей у компанії);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item">
              <span className="fw-700 color-violet">
                первинних документів про прийняття та виплатою компанією
                грошових сум ,
              </span>{" "}
              особливо якщо ці суми приймалися та виплачувались у рамках
              корпоративних процедур (оплати статутного капіталу компанії,
              виплати дійсної вартості частки учаснику, що вийшов з компанії
              тощо);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item">
              <span className="fw-700 color-violet">
                корпоративних договорів
              </span>{" "}
              (корпоративні договори, як мінімум, не повинні перешкоджати
              реалізації майбутньої інвестиційної угоди);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item">
              <span className="fw-700 color-violet">статуту компанії</span>{" "}
              (статут компанії, як мінімум, не повинен перешкоджати реалізації
              майбутньої інвестиційної угоди);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item">
              і так далі.
            </li>{" "}
          </ul>
        </div>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="seventh"
        >
          5. Усуньте ймовірність виникнення конфліктів у компанії
        </h3>{" "}
        <div className="mb-30">
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            Висока вірогідність конфліктів у компанії — це стоп-сигнал для
            багатьох інвесторів.
          </p>{" "}
          <p
            className="color-violet fw-700 mb-10 scroll-margin-top"
            id="eighth"
          >
            Висока ймовірність конфлікту може бути обумовлена:
          </p>
          <ul className="pl-30">
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              наявністю тих самих функцій у різних учасників команди (дублювання
              ролей);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              відсутністю належної оплати праці того чи іншого учасника команди;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              суміщенням ключовим учасником команди діяльності у проекті та
              високої зайнятості в іншому місці;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              несправедливим розподілом часток у команді;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              наявністю у статуті «умов уповільненої дії» — наприклад, високої
              ймовірності дідлока (нерозв`язної ситуації) при вирішенні того чи
              іншого важливого питання порядку денного на загальних зборах
              учасників компанії (відсутністю механізму швидкого вирішення
              дідлока);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              наявністю у компанії значного боргу перед тим чи іншим учасником
              команди;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              наявність у компанії боргу перед недружнім інвестором;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              наявністю у команді учасника (учасників) зі слабкою мотивацією (у
              разі, якщо такий учасник команди володіє часткою у компанії);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              наявністю у тих чи інших учасників команди нереальних KPI (і тим
              паче зворотних опціонів у разі невиконання таких KPI);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              володінням тим чи іншим учасником команди правами на активи, що
              використовуються в бізнесі;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              безліччю інших чинників.
            </li>{" "}
          </ul>
          <p className="usefulTools__text text-italic fw-700 section__primary-text">
            Цей розділ статті переважно для психологічних аспектів . Але треба
            розуміти, що будь-який психологічний фактор рано чи пізно може
            перерости в юридичний чинник з усіма наслідками, що випливають.
            Інвестори це дуже добре розуміють, тому й звертають увагу на
            психологічні моменти.
          </p>
        </div>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="tenth"
        >
          6. Наведіть показники, відображені в інвестиційній презентації, у
          відповідність до реальності
        </h3>{" "}
        <div className="mb-30">
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            Нерідко засновники компаній вказують в інвестиційних презентаціях
            нереальні дані (показники економічної діяльності компанії),
            намагаючись завищити інвестиційну привабливість своєї компанії. Це
            може призвести до того, що інвестор, може вимагати від засновників
            та (або) від компанії відшкодування збитків, викликаних наданням
            недостовірної інформації на переговорах, а ще й вимагати розірвання
            інвестиційної угоди.
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            На що звернути увагу
          </p>
          <ul className="pl-30">
            <li className="usefulTools__text section__primary-text  text-indent-none mb-10">
              1.{" "}
              <span className="fw-700">
                Підготуйте облікову систему для перевірки.{" "}
              </span>
              Не бухгалтерську а Облікову :) Це перше що можуть запитати при
              заході в бізнес.
            </li>{" "}
            <li className="usefulTools__text section__primary-text  text-indent-none mb-10">
              2.{" "}
              <span className="fw-700">
                Перевірте рух по банкам та касам на співпадіння з обліковими
                системами з яких генерується звітність .{" "}
              </span>
              Якщо залишок на початок \ сума приходу \ сума витрат \ сума на
              кінець по всім касам та банкам не співпадають - тоді у вас
              недосконалий облік і вірити подальшим цифрам буде складно, ждіть
              детальну перевірку.
            </li>{" "}
            <li className="usefulTools__text section__primary-text  text-indent-none mb-10">
              3. <span className="fw-700">Перевірте CashFlow </span>а особливо
              рух по статтям витрат які складно пояснити
            </li>{" "}
            <li className="usefulTools__text section__primary-text  text-indent-none mb-10">
              4. <span className="fw-700">Сформуйте P&L </span>- він повинен
              відповідати наведеним у презентації.
            </li>{" "}
          </ul>
        </div>{" "}
        <h3 className="usefulTools__small-title section__primary-text mb-10">
          7. Перевір свою компанію по відкритих джерелах.
        </h3>{" "}
        <div className="mb-30">
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            {" "}
            <Link
              className="section__primary-text"
              href={"https://youcontrol.com.ua/"}
            >
              <a target="_blank"> https://youcontrol.com.ua/</a>
            </Link>{" "}
            <Link
              className="section__primary-text"
              href={"https://opendatabot.ua/"}
            >
              <a target="_blank">https://opendatabot.ua/</a>
            </Link>
          </p>
        </div>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="eleventh"
        >
          8. Дізнайтеся про потенційного інвестора якнайбільше інформації
          (легальными способами, звичайно)
        </h3>{" "}
        <div className="mb-30">
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            За допомогою широко відомих нині онлайн-сервісів{" "}
            <Link
              className="section__primary-text"
              href={"https://youcontrol.com.ua/"}
            >
              <a target="_blank">https://youcontrol.com.ua/</a>
            </Link>{" "}
            <Link
              className="section__primary-text"
              href={"https://opendatabot.ua/"}
            >
              <a target="_blank"> https://opendatabot.ua/</a>
            </Link>{" "}
            можна легко дізнатися, частками в яких компаніях раніше володів
            потенційний інвестор, у яких судових процесах брав участь, які борги
            має, чи визнав банкрут і т.д. Така перевірка може значною мірою
            пролити світло на його попередню активність та сформувати його
            точний бізнес-портрет.
          </p>
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            На жаль, серед «інвесторів» все ще трапляються люди, які своєю
            пріоритетною метою ставлять захоплення (придбання) якомога більшого
            корпоративного контролю в компанії та його подальше використання у
            своїх несумлінних цілях. Звичайно, такий інвестор навряд чи зможе
            принести компанії щось корисне, навіть забезпечивши її на першому
            етапі інвестиційною підтримкою.
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            Тому перед тим, як «вдарити по руках» краще поцікавитись у
            попередніх проектів, ким насправді є громадянин «інвестор», як він
            поводився раніше в рамках тих чи інших корпоративних процедур,
            допомагав чи заважав він компанії рости і т.д. .
          </p>{" "}
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            Так, в даний час є способи захисту щодо недобросовісних дій
            токсичних інвесторів (корпоративні договори, опціони (примусові
            викупи часток), грамотно прописані статути, засвідчення та гарантії,
            неустойки (штрафи), заходи судового захисту тощо). Проте, не всі
            заходи є швидкими та беззбитковими для проекту. Тому краще
            заздалегідь вжити превентивних заходів і не допустити до компанії
            осіб несумлінних.
          </p>{" "}
          <p className="usefulTools__text section__primary-text  text-indent-none">
            Якщо ж попередня перевірка нічого поганого не виявила, краще все
            одно підстрахуватися та використовувати раніше вказані заходи
            захисту. Зайвим це точно не буде.
          </p>
        </div>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="twelfth"
        >
          9. Усуньте порушення законодавства та прав третіх осіб, у тому числі
          підстави для таких порушень
        </h3>{" "}
        <div className="mb-30">
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            Буває, що діяльність компанії порушує ті чи інші норми законодавства
            та/або права третіх осіб. Такі порушення можуть бути незначними та
            обіцяти максимум штраф, але часто така картина складається лише на
            перший погляд. Навіть найнезначніше порушення може спричинити низку
            інших, важливіших порушень, і як наслідок - серйозніші санкції.
          </p>
          <p
            className="color-violet fw-700 mb-10 scroll-margin-top"
            id="thirteenth"
          >
            Такі порушення можуть існувати в області:
          </p>
          <ul className="pl-30">
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              захисту прав споживачів;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              оподаткування та митних правил;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              захисту персональних даних;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item usefulTools__list-item--red mb-10">
              протидії легалізації та моніторингу руху коштів (фінансового
              контролю);
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              медицини;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              трудових та інших соціальних прав працівників;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              реклами;
            </li>{" "}
            <li className="usefulTools__text section__primary-text usefulTools__list-item  mb-10">
              і так далі.
            </li>{" "}
          </ul>
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            Будь-яке порушення закону чи прав третіх осіб створює для інвестора
            додаткові ризики та впливає інвестиційну привабливість (оцінку)
            компанії. Дуже показово це працює на фондовому ринку, коли навіть
            незначна на перший погляд новина може сильно знизити ціну акцій тієї
            чи іншої компанії.
          </p>{" "}
          <p className="usefulTools__text section__primary-text text-indent-none">
            Звичайно, якщо порушення малозначні, то інвестор може ними
            знехтувати, проте ключове слово тут може.{" "}
            <span className="fw-700">
              Так чи інакше, але навіть незначні порушення часто сприймаються
              інвесторами як недисциплінованість.
            </span>{" "}
            І якщо компанія недбало ставиться до своїх обов`язків перед законом
            та іншими особами, то й інвестор може надалі випробувати це на собі.
            Звісно, такі ризики нікому не сподобаються. Тому краще заздалегідь
            попрацювати над тим, щоб постати перед інвестором у бездоганному
            вигляді.
          </p>
        </div>
        <h3
          className="usefulTools__small-title section__primary-text mb-10 scroll-margin-top"
          id="fourteenth"
        >
          10. Намагайтеся визначити реальну вартість (оцінку) своєї компанії, не
          варто її недооцінювати та переоцінювати
        </h3>{" "}
        <div className="">
          <p className="usefulTools__text section__primary-text mb-10 text-indent-none">
            Помилка в оцінці компанії може негативно позначитися як на рівні
            реалізації корпоративного контролю компанії (коли інвестору дають
            надто велику частку в компанії, а значить, і надто великий рівень
            корпоративного контролю в потенціалі), так і на рівні залучення
            наступних інвестицій (коли компанія була дуже оцінена дорого раніше
            і наступний раунд може не відбутися через відсутність відповідної
            дельти зростання вартості компанії).
          </p>{" "}
          <p className="usefulTools__text section__primary-text text-indent-none">
            Є висока невизначеність в оцінці компанії, краще використовувати
            модель конвертованої позики, коли інвестор дає позику компанії і
            конвертує (переводить) її в частку на етапі наступного раунду
            інвестицій (при заході в компанію наступного інвестора), коли даних
            для точної оцінки компанії значно більше її можна зробити з вищим
            рівнем достовірності. Звичайно, перший інвестор при цьому отримує
            частку за нижчою оцінкою, тобто з дисконтом, який, як правило,
            відразу прописується в угоді позики, що конвертується.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UsefulTools;
