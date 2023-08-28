import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import FilterSVG from "../../assets/svg/filter.svg";
import DotsSVG from "../../../assets/svg/dots1.svg";
import LinesSVG from "../../../assets/svg/lines.svg";
import React from "react";
import ReactPlayer from "react-player";
const Video = ({ video }: { video: string }) => {
  const user = useSelector((state: any) => state.auth.user);
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className="video">
      <div className="video__container container">
        <div>
          <div className="video__wrapper">
            {hasWindow && (
              <ReactPlayer
                // muted={true}
                loop={true}
                config={{
                  youtube: {
                    playerVars: { showinfo: 0, autoplay: 0 },
                  },
                }}
                url={`https://www.youtube.com/embed/${video}`}
              />
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
