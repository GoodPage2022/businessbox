const MainButtonBlack = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: any;
}) => {
  return (
    <button
      onClick={onClick}
      className="main-button-black section__secondary-text"
    >
      {label}
    </button>
  );
};

export default MainButtonBlack;
