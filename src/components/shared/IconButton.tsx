const IconButton = ({
  icon,
  borderColor,
  onClick,
}: {
  icon: any;
  borderColor: string;
  onClick: any;
}) => {
  return (
    <button
      onClick={onClick}
      style={{ borderColor: borderColor }}
      className="icon-button"
    >
      {icon}
    </button>
  );
};

export default IconButton;
