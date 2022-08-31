const MainButton = ({ label }: { label: string }) => {
  return (
    <button className="main-button section__secondary-text--white">
      {label}
    </button>
  );
};

export default MainButton;
