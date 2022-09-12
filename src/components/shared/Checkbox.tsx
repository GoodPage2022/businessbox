import { useState } from "react";

const Checkbox = ({ text }: { text: string }) => {
  const [isChosen, setIsChosen] = useState(false);
  const [isCheckboxtrue, setCheckboxtrue] = useState(true);

  return (
    <div
      className="checkbox__wrapper"
      onClick={() => {
        setIsChosen((prev) => !prev);
        // setCheckboxtrue(true);
      }}
    >
      <input
        name="agree"
        type="checkbox"
        className="checkbox__input agree"
        onChange={() => setIsChosen((prev) => !prev)}
        checked={isChosen ? true : false}
      />
      <label className="checkbox__label"></label>
      <span className="checkbox__text section__secondary-text">{text}</span>
    </div>
  );
};

export default Checkbox;
