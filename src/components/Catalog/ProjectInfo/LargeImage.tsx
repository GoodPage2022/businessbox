import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MainContext } from "../../../contexts/mainContext";
import ArrowBackSVG from "../../../assets/svg/project-info-arrow.svg";

const LargeImage = ({ onClose }: { onClose: any }) => {
  const [state, dispatch] = React.useContext(MainContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePrev = () => {
    if (currentImageIdx == 0) return;
    setCurrentImageIdx((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentImageIdx == state.images.length - 1) return;
    setCurrentImageIdx((prev) => prev + 1);
  };

  useEffect(() => {
    if (!state.imageIdx) return;
    setCurrentImageIdx(state.imageIdx);
  }, [state.imageIdx]);

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
      <div className="largeImage__container" onClick={onClose}>
        <div className="largeImage__image-wrapper">
          <Image
            className=""
            src={
              state.images[currentImageIdx]?.meta.assets == ""
                ? `${state.images[currentImageIdx].path}`
                : `https://admin.bissbox.com/${state.images[currentImageIdx]?.path}`
            }
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>

        <div className="largeImage__buttons">
          <button
            className="largeImage__btn largeImage__first-btn"
            onClick={handlePrev}
          >
            <ArrowBackSVG />
          </button>
          <button
            className="largeImage__btn largeImage__second-btn"
            onClick={handleNext}
          >
            <ArrowBackSVG />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LargeImage;
