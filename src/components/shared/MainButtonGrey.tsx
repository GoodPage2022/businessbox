const MainButtonGrey = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: any;
}) => {
  return (
    <button
      onClick={onClick}
      className="main-button-grey section__secondary-text"
    >
      {label}
    </button>
  );
};

export default MainButtonGrey;
