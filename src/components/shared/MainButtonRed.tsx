const MainButtonRed = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: any;
}) => {
  return (
    <button
      type="submit"
      className="main-button--red section__secondary-text--white"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MainButtonRed;
