import { useEffect, useState } from "react";
const Checkbox = ({
  text,
  changeFilter,
  categories,
  datakey,
}: {
  datakey: number;
  text: string;
  changeFilter: any;
  categories: string[];
}) => {
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const [isCheckboxtrue, setCheckboxtrue] = useState(true);

  useEffect(() => {
    setIsChosen(categories.includes(text));
  }, [categories]);

  return (
    <div
      className="checkbox__wrapper"
      onClick={(e: any) => {
        if (e.target.name != "category") return true;

        if (!categories.includes(text)) {
          changeFilter({
            target: {
              name: "category",
              value: [...categories, text],
            },
          });
        } else {
          const categoriesFiltered = categories.filter((c) => c != text);
          changeFilter({
            target: {
              name: "category",
              value: categoriesFiltered,
            },
          });
        }

        setIsChosen((prev) => !prev);
      }}
    >
      <input
        name="category"
        value={text}
        id={`cat_${datakey}`}
        type="checkbox"
        className={`checkbox__input agree`}
        checked={isChosen}
      />
      <label htmlFor={`cat_${datakey}`} className="checkbox__label">
        <span className="checkbox__text section__secondary-text">{text}</span>
      </label>
    </div>
  );
};

export default Checkbox;
