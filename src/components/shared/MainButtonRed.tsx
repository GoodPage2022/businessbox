const MainButtonRed = ({ label }: { label: string }) => {
  return (
    <button
      type="submit"
      className="main-button--red section__secondary-text--white"
    >
      {label}
    </button>
  );
};

export default MainButtonRed;
