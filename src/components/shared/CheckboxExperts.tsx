import { useEffect, useState } from "react";
const CheckboxExperts = ({
  text,
  changeFilter,
  specializations,
  datakey,
  name,
}: {
  datakey: number;
  text: string;
  changeFilter: any;
  specializations: string[];
  name?: string;
}) => {
  const [isChosen, setIsChosen] = useState<boolean>(false);

  useEffect(() => {
    setIsChosen(specializations.includes(text));
  }, [specializations, text]);

  return (
    <div
      className="checkbox__wrapper"
      onClick={(e: any) => {
        // if (e.target.name == "sorting") {
        //   if (!categories.includes(text)) {
        //     changeFilter({
        //       target: {
        //         name: "sorting",
        //         value: text,
        //       },
        //     });
        //   } else {
        //     changeFilter({
        //       target: {
        //         name: "sorting",
        //         value: "",
        //       },
        //     });
        //   }
        //   setIsChosen((prev) => !prev);
        //   return;
        // }
        // if (e.target.name != "category") return true;

        if (!specializations.includes(text) && !!changeFilter) {
          changeFilter({
            target: {
              name: "specialization",
              value: [...specializations, text],
            },
          });
        } else {
          const categoriesFiltered = specializations.filter((c) => c != text);

          if (!!changeFilter) {
            changeFilter({
              target: {
                name: "specialization",
                value: categoriesFiltered,
              },
            });
          }
        }
        setIsChosen((prev) => !prev);
      }}
    >
      <input
        name={name ?? "category"}
        value={text}
        id={`cat_${datakey}`}
        type="checkbox"
        className={`checkbox__input agree`}
        checked={isChosen}
        onChange={() => {
          // console.log(isChosen);
        }}
      />
      <label htmlFor={`cat_${datakey}`} className="checkbox__label">
        <span className="checkbox__text section__secondary-text">{text}</span>
      </label>
    </div>
  );
};

export default CheckboxExperts;
