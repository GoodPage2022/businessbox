import Image from "next/image";
import React, { useEffect } from "react";
import { MainContext } from "../../../contexts/mainContext";

const LargeImage = ({ onClose }: { onClose: any }) => {
  const [state, dispatch] = React.useContext(MainContext);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={`largeImage ${state.isOpenLargeImage ? "active" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className="largeImage__container">
        <div className="largeImage__image-wrapper">
          <Image
            className=""
            src={state.imageUrl}
            layout="fill"
            objectFit="cover"
            alt="building"
          />
        </div>
      </div>
    </div>
  );
};

export default LargeImage;
