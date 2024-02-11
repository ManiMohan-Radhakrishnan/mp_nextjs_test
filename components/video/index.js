import style from "./style.module.scss";
import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

const Video = ({ src, type, poster }) => {
  const [showPoster, setShowPoster] = useState(true);
  const vidRef = useRef(null);
  const handlePlay = () => {
    setShowPoster(false);
    vidRef.current.play();
  };
  return (
    <div className={style["video-container"]}>
      <video
        ref={vidRef}
        className={style["app-video"]}
        width="100%"
        controls
        poster={poster}
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
      {showPoster && (
        <div
          className={style["play-img-block"]}
          style={{ backgroundImage: `url(${poster})` }}
          onClick={handlePlay}
        >
          <span className={style["play-btn"]}>
            <FaPlay color={"#000"} size={50} />
          </span>
        </div>
      )}
    </div>
  );
};

export default Video;
